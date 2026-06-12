import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	Button,
	RangeControl,
	ToggleControl,
	SelectControl,
	Placeholder,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

const getLanguagesData = () => {
	const data = window.pdsMultilangLogo || {};
	const languages = Array.isArray( data.languages ) ? data.languages : [];
	const defaultLanguage = data.defaultLanguage || 'es';

	if ( languages.length ) {
		return { languages, defaultLanguage };
	}

	// WPML no disponible: modo "idioma único"
	return {
		languages: [
			{
				code: defaultLanguage,
				native_name: defaultLanguage.toUpperCase(),
				translated_name: defaultLanguage.toUpperCase(),
			},
		],
		defaultLanguage,
	};
};

export default function Edit( { attributes, setAttributes } ) {
	const { images, width, isLink, linkTarget } = attributes;
	const { languages, defaultLanguage } = getLanguagesData();

	const blockProps = useBlockProps( {
		className: 'wp-block-site-logo pds-multilang-logo',
		style: { width },
	} );

	const previewLang = images[ defaultLanguage ]
		? defaultLanguage
		: Object.keys( images )[ 0 ];
	const previewId = previewLang ? images[ previewLang ] : null;

	const media = useSelect(
		( select ) =>
			previewId ? select( 'core' ).getMedia( previewId ) : null,
		[ previewId ]
	);

	const setLanguageImage = ( code, id ) => {
		setAttributes( { images: { ...images, [ code ]: id } } );
	};

	const removeLanguageImage = ( code ) => {
		const next = { ...images };
		delete next[ code ];
		setAttributes( { images: next } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __(
						'Imágenes por idioma (WPML)',
						'pds-multilang-logo'
					) }
					initialOpen
				>
					{ languages.map( ( lang ) => (
						<PanelRow
							key={ lang.code }
							className="pds-multilang-logo__lang-row"
						>
							<div className="pds-multilang-logo__lang-label">
								{ lang.country_flag_url && (
									<img
										src={ lang.country_flag_url }
										alt=""
										className="pds-multilang-logo__flag"
									/>
								) }
								<span>
									{ lang.native_name ||
										lang.code.toUpperCase() }
								</span>
								{ lang.code === defaultLanguage && (
									<span className="pds-multilang-logo__default-badge">
										{ __(
											'(por defecto)',
											'pds-multilang-logo'
										) }
									</span>
								) }
							</div>
							<div className="pds-multilang-logo__lang-actions">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ ( selected ) =>
											setLanguageImage(
												lang.code,
												selected.id
											)
										}
										allowedTypes={ [ 'image' ] }
										value={ images[ lang.code ] }
										render={ ( { open } ) => (
											<Button
												variant="secondary"
												size="small"
												onClick={ open }
											>
												{ images[ lang.code ]
													? __(
															'Cambiar',
															'pds-multilang-logo'
													  )
													: __(
															'Elegir imagen',
															'pds-multilang-logo'
													  ) }
											</Button>
										) }
									/>
								</MediaUploadCheck>
								{ images[ lang.code ] && (
									<Button
										variant="link"
										isDestructive
										size="small"
										onClick={ () =>
											removeLanguageImage( lang.code )
										}
									>
										{ __( 'Quitar', 'pds-multilang-logo' ) }
									</Button>
								) }
							</div>
						</PanelRow>
					) ) }
				</PanelBody>
				<PanelBody
					title={ __( 'Ajustes', 'pds-multilang-logo' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Ancho (px)', 'pds-multilang-logo' ) }
						value={ width }
						onChange={ ( value ) =>
							setAttributes( { width: value } )
						}
						min={ 20 }
						max={ 600 }
					/>
					<ToggleControl
						label={ __(
							'Enlazar a la portada',
							'pds-multilang-logo'
						) }
						checked={ isLink }
						onChange={ ( value ) =>
							setAttributes( { isLink: value } )
						}
					/>
					{ isLink && (
						<SelectControl
							label={ __(
								'Destino del enlace',
								'pds-multilang-logo'
							) }
							value={ linkTarget }
							options={ [
								{
									label: __(
										'Misma pestaña',
										'pds-multilang-logo'
									),
									value: '_self',
								},
								{
									label: __(
										'Nueva pestaña',
										'pds-multilang-logo'
									),
									value: '_blank',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( { linkTarget: value } )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ media?.source_url ? (
					<img
						src={ media.source_url }
						alt={ media.alt_text || '' }
					/>
				) : (
					<Placeholder
						icon="translation"
						label={ __( 'Logo multiidioma', 'pds-multilang-logo' ) }
						instructions={ __(
							'Configura las imágenes por idioma en el panel lateral.',
							'pds-multilang-logo'
						) }
					/>
				) }
			</div>
		</>
	);
}
