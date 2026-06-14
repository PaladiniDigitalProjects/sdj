( function ( wp ) {
	var data = window.pdsWpmlTemplateLang || {};
	var languages = data.languages || [];
	var currentLang = data.currentLang || '';

	function findLang( code ) {
		for ( var i = 0; i < languages.length; i++ ) {
			if ( languages[ i ].code === code ) {
				return languages[ i ];
			}
		}
		return null;
	}

	function urlWithParams( params ) {
		var url = new URL( window.location.href );
		Object.keys( params ).forEach( function ( key ) {
			url.searchParams.set( key, params[ key ] );
		} );
		return url.toString();
	}

	// --- Indicador flotante del idioma actual de WPML ---
	// Visible en todo el Editor del sitio (incluida la pantalla de inicio
	// "site-editor.php?p=%2F", donde no hay ninguna plantilla/patrón
	// abierto y el panel de la barra lateral no se muestra), para saber de
	// un vistazo en qué idioma se está navegando/editando.
	if ( wp && wp.element && wp.element.createElement && wp.element.render ) {
		var currentLangInfo = findLang( currentLang );

		if ( currentLangInfo ) {
			var badgeContainer = document.createElement( 'div' );
			badgeContainer.className = 'pds-wpml-current-lang-badge';
			document.body.appendChild( badgeContainer );

			var badgeChildren = [];

			if ( currentLangInfo.country_flag_url ) {
				badgeChildren.push(
					wp.element.createElement( 'img', {
						key: 'flag',
						className: 'pds-wpml-flag',
						src: currentLangInfo.country_flag_url,
						alt: currentLangInfo.native_name,
					} )
				);
			}

			if ( languages.length > 1 ) {
				badgeChildren.push(
					wp.element.createElement(
						'select',
						{
							key: 'select',
							value: currentLang,
							onChange: function ( event ) {
								window.location.assign(
									urlWithParams( {
										lang: event.target.value,
									} )
								);
							},
						},
						languages.map( function ( lang ) {
							return wp.element.createElement(
								'option',
								{ key: lang.code, value: lang.code },
								lang.native_name || lang.code
							);
						} )
					)
				);
			} else {
				badgeChildren.push(
					wp.element.createElement(
						'span',
						{ key: 'label' },
						currentLangInfo.native_name
					)
				);
			}

			wp.element.render(
				wp.element.createElement(
					wp.element.Fragment,
					{},
					badgeChildren
				),
				badgeContainer
			);
		}
	}

	// --- Panel en la barra lateral (columna "aside") ---
	if (
		wp &&
		wp.plugins &&
		wp.editor &&
		wp.editor.PluginDocumentSettingPanel &&
		wp.element &&
		wp.data &&
		wp.data.useSelect
	) {
		var createElement = wp.element.createElement;
		var useState = wp.element.useState;
		var useEffect = wp.element.useEffect;
		var useSelect = wp.data.useSelect;

		var SidebarLanguagePanel = function () {
			var edited = useSelect( function ( select ) {
				var templateTypes = [
					'wp_template',
					'wp_template_part',
					'wp_block',
				];

				// Editor del sitio (site-editor.php): la plantilla editada
				// se expone a través de core/edit-site.
				var editSite = select( 'core/edit-site' );
				if ( editSite && editSite.getEditedPostId ) {
					var siteType = editSite.getEditedPostType();
					if ( templateTypes.indexOf( siteType ) !== -1 ) {
						return {
							postId: editSite.getEditedPostId(),
							postType: siteType,
						};
					}
				}

				// "Editar plantilla" desde una página: el editor de
				// entradas navega a la plantilla dentro de core/editor.
				var editor = select( 'core/editor' );
				if ( editor && editor.getCurrentPostId ) {
					var editorType = editor.getCurrentPostType();
					if ( templateTypes.indexOf( editorType ) !== -1 ) {
						return {
							postId: editor.getCurrentPostId(),
							postType: editorType,
						};
					}
				}

				return { postId: null, postType: null };
			}, [] );

			var stateResult = useState( null );
			var result = stateResult[ 0 ];
			var setResult = stateResult[ 1 ];

			var stateCandidates = useState( null );
			var candidates = stateCandidates[ 0 ];
			var setCandidates = stateCandidates[ 1 ];

			var stateSelections = useState( {} );
			var selections = stateSelections[ 0 ];
			var setSelections = stateSelections[ 1 ];

			var stateLinking = useState( null );
			var linking = stateLinking[ 0 ];
			var setLinking = stateLinking[ 1 ];

			var stateLinkError = useState( '' );
			var linkError = stateLinkError[ 0 ];
			var setLinkError = stateLinkError[ 1 ];

			// Retrasa un frame el (des)registro del panel respecto al cambio
			// de postType: al entrar/salir del modo "Editar plantilla" desde
			// una página, el canvas de edit-site se reconstruye y montar
			// nuestro Fill en el mismo commit provoca un TypeError en los
			// efectos internos de @wordpress/block-editor sobre refs aún no
			// asignadas.
			var stateReady = useState( false );
			var ready = stateReady[ 0 ];
			var setReady = stateReady[ 1 ];

			useEffect(
				function () {
					setReady( false );
					var frame = window.requestAnimationFrame( function () {
						setReady( true );
					} );
					return function () {
						window.cancelAnimationFrame( frame );
					};
				},
				[ edited.postType ]
			);

			useEffect(
				function () {
					var postId = edited.postId;
					var postType = edited.postType;

					if (
						! postId ||
						( postType !== 'wp_template' &&
							postType !== 'wp_template_part' &&
							postType !== 'wp_block' )
					) {
						setResult( null );
						return;
					}

					wp.apiFetch( {
						path:
							'/pds/v1/wpml-template-translations?id=' +
							encodeURIComponent( postId ) +
							'&type=' +
							postType,
					} )
						.then( setResult )
						.catch( function () {
							setResult( null );
						} );
				},
				[ edited.postId, edited.postType ]
			);

			useEffect(
				function () {
					if ( ! result || ! result.trid ) {
						setCandidates( null );
						return;
					}

					var hasMissing = languages.some( function ( lang ) {
						return ! result.translations.some( function ( t ) {
							return t.language_code === lang.code;
						} );
					} );

					if ( ! hasMissing ) {
						setCandidates( null );
						return;
					}

					wp.apiFetch( {
						path:
							'/pds/v1/wpml-unlinked-elements?type=' +
							edited.postType +
							'&trid=' +
							result.trid,
					} )
						.then( setCandidates )
						.catch( function () {
							setCandidates( null );
						} );
				},
				[
					result ? result.trid : null,
					result ? result.translations.length : 0,
					edited.postType,
				]
			);

			function handleLink( langCode, elementId ) {
				if ( ! elementId || ! result ) {
					return;
				}

				var originalTranslation = result.translations.filter(
					function ( t ) {
						return t.is_original;
					}
				)[ 0 ];

				setLinkError( '' );
				setLinking( langCode );

				wp.apiFetch( {
					path: '/pds/v1/wpml-link-translation',
					method: 'POST',
					data: {
						element_id: parseInt( elementId, 10 ),
						current_element_id: result.currentElementId,
						type: edited.postType,
						trid: result.trid,
						language_code: langCode,
						source_language_code: originalTranslation
							? originalTranslation.language_code
							: '',
					},
				} )
					.then( function ( updated ) {
						setResult( updated );
						setSelections( function ( prev ) {
							var next = Object.assign( {}, prev );
							delete next[ langCode ];
							return next;
						} );

						// El listado de plantillas/partes/patrones del
						// Editor del sitio muestra el sufijo de idioma
						// "[XX]" según wpml; al vincular una traducción
						// cambia el idioma del elemento, así que invalidamos
						// la caché de getEntityRecords para que el listado
						// se refresque con el sufijo correcto.
						if (
							wp.data &&
							wp.data.dispatch &&
							wp.data.dispatch( 'core' )
								.invalidateResolutionForStoreSelector
						) {
							wp.data
								.dispatch( 'core' )
								.invalidateResolutionForStoreSelector(
									'getEntityRecords'
								);
						}
					} )
					.catch( function () {
						setLinkError( 'No se ha podido vincular la traducción.' );
					} )
					.finally( function () {
						setLinking( null );
					} );
			}

			var isTemplateContext =
				edited.postType === 'wp_template' ||
				edited.postType === 'wp_template_part' ||
				edited.postType === 'wp_block';

			if ( ! isTemplateContext || ! ready ) {
				return null;
			}

			var children = [];

			if ( result && result.trid ) {
				var items = languages.map( function ( lang ) {
					var translation = null;

					result.translations.forEach( function ( t ) {
						if ( t.language_code === lang.code ) {
							translation = t;
						}
					} );

					var flag =
						lang.country_flag_url && lang.code !== currentLang
							? createElement( 'img', {
									className: 'pds-wpml-flag',
									src: lang.country_flag_url,
									alt: lang.native_name,
							  } )
							: null;

					var content;
					var liClassName = '';

					if ( translation ) {
						if ( translation.element_id === result.currentElementId ) {
							liClassName = 'is-current';
							content = createElement( 'span', {}, translation.post_title );
						} else {
							var targetPostId =
								edited.postType === 'wp_block'
									? translation.element_id
									: data.theme + '//' + translation.post_name;

							content = createElement(
								'a',
								{
									href: urlWithParams( {
										postType: edited.postType,
										postId: targetPostId,
										lang: lang.code,
									} ),
								},
								translation.post_title
							);
						}
					} else {
						liClassName = 'is-missing';

						// La opción de "Vincular traducción" para el idioma
						// actualmente en curso (currentLang) es redundante:
						// si faltara su traducción, este elemento no se
						// estaría mostrando en ese idioma.
						if (
							candidates &&
							candidates.length &&
							lang.code !== currentLang
						) {
							var selectedId = selections[ lang.code ] || '';

							var selectOptions = [
								createElement(
									'option',
									{ key: '', value: '' },
									'— Vincular traducción —'
								),
							];

							candidates.forEach( function ( candidate ) {
								var label =
									candidate.post_title +
									' (' +
									candidate.post_name +
									')';

								if ( candidate.language_code ) {
									label =
										'[' +
										candidate.language_code.toUpperCase() +
										'] ' +
										label;
								}

								selectOptions.push(
									createElement(
										'option',
										{ key: candidate.id, value: candidate.id },
										label
									)
								);
							} );

							content = createElement(
								'div',
								{ className: 'pds-wpml-template-lang-link' },
								createElement(
									'select',
									{
										className: 'pds-wpml-template-lang-select',
										value: selectedId,
										onChange: function ( event ) {
											var value = event.target.value;
											setSelections( function ( prev ) {
												var next = Object.assign( {}, prev );
												next[ lang.code ] = value;
												return next;
											} );
										},
									},
									selectOptions
								),
								createElement(
									'button',
									{
										type: 'button',
										className: 'button button-small',
										disabled:
											! selectedId ||
											linking === lang.code,
										onClick: function () {
											handleLink( lang.code, selectedId );
										},
									},
									linking === lang.code
										? 'Vinculando…'
										: 'Vincular'
								)
							);
						} else {
							content = null;
						}
					}

					return createElement(
						'li',
						{ key: lang.code, className: liClassName },
						flag,
						content
					);
				} );

				children.push(
					createElement(
						'div',
						{
							className: 'pds-wpml-template-lang-translations',
							key: 'translations',
						},
						createElement(
							'div',
							{ className: 'pds-wpml-template-lang-title' },
							'Traducciones de este elemento'
						),
						createElement( 'ul', {}, items ),
						linkError
							? createElement(
									'p',
									{ className: 'pds-wpml-template-lang-error' },
									linkError
							  )
							: null
					)
				);
			}

			return createElement(
				wp.editor.PluginDocumentSettingPanel,
				{
					name: 'pds-wpml-template-lang',
					title: 'Idioma (WPML)',
					className: 'pds-wpml-template-lang-sidebar',
				},
				children
			);
		};

		wp.plugins.registerPlugin( 'pds-wpml-template-lang-sidebar', {
			render: SidebarLanguagePanel,
		} );
	}
} )( window.wp );
