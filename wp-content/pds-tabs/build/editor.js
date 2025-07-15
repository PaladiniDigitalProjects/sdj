const { addFilter }   = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, RangeControl } = wp.components;

/**
 * 1️⃣  Extend block attributes
 */
addFilter(
	'blocks.registerBlockType',
	'tabs-auto-slide/attributes',
	(settings, name) => {
		if (name !== 'gutenberghub-tabs/tab-container') return settings;

		return {
			...settings,
			attributes: {
				...settings.attributes,
				autoSlideDuration: {
					type: 'number',
					default: 5000,
				},
				pauseOnHover: {
					type: 'boolean',
					default: true,
				},
			},
		};
	}
);

/**
 * 2️⃣  Add controls in the sidebar
 */
const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( props.name !== 'gutenberghub-tabs/tab-container' ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes } = props;
		const { autoSlideDuration, pauseOnHover } = attributes;

		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody title="Auto‑Slide" initialOpen={ true }>
						<RangeControl
							label="Duration (milliseconds)"
							min={ 1000 }
							max={ 20000 }
							step={ 500 }
							value={ autoSlideDuration }
							onChange={ ( val ) => setAttributes( { autoSlideDuration: val } ) }
						/>
						<ToggleControl
							label="Pause on hover"
							checked={ pauseOnHover }
							onChange={ ( val ) => setAttributes( { pauseOnHover: val } ) }
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withInspectorControls' );

addFilter(
	'editor.BlockEdit',
	'tabs-auto-slide/inspector-controls',
	withInspectorControls
);
