import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { 
    PanelBody, 
    SelectControl, 
    RangeControl,
    ToggleControl,
    __experimentalNumberControl as NumberControl
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

const MOBILE_MENU_STYLES = [
    { value: 'none', label: 'None' },
    { value: 'left-drawer', label: 'Left Drawer' },
    { value: 'right-drawer', label: 'Right Drawer' },
    { value: 'top-dropdown', label: 'Top Dropdown' },
    { value: 'bottom-popup', label: 'Bottom Popup' },
    { value: 'fullscreen', label: 'Fullscreen Overlay' },
];

const extendBlockWithMobileMenu = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { name, attributes, setAttributes, isSelected } = props;

        if (name !== 'core/navigation' || !isSelected) {
            return <BlockEdit {...props} />;
        }

        const { pdsMobileMenu = {} } = attributes;

        const updateSetting = (key, value) => {
            setAttributes({
                pdsMobileMenu: {
                    ...pdsMobileMenu,
                    [key]: value,
                },
            });
        };

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls group="settings">
                    <PanelBody title="Mobile Menu" initialOpen={false}>
                        <SelectControl
                            label="Menu Style"
                            value={pdsMobileMenu.style || 'none'}
                            options={MOBILE_MENU_STYLES}
                            onChange={(value) => updateSetting('style', value)}
                        />
                        
                        {pdsMobileMenu.style && pdsMobileMenu.style !== 'none' && pdsMobileMenu.style !== 'fullscreen' && (
                            <NumberControl
                                label="Menu Width (px)"
                                value={pdsMobileMenu.menuWidth || 320}
                                onChange={(value) => {
                                    const parsed = parseInt(value, 10);
                                    if (!isNaN(parsed)) updateSetting('menuWidth', parsed);
                                }}
                                min={200}
                                max={600}
                            />
                        )}

                        {pdsMobileMenu.style && pdsMobileMenu.style !== 'none' && (
                            <RangeControl
                                label="Overlay Opacity"
                                value={pdsMobileMenu.overlayOpacity ?? 50}
                                onChange={(value) => updateSetting('overlayOpacity', value)}
                                min={0}
                                max={100}
                            />
                        )}

                        {pdsMobileMenu.style && pdsMobileMenu.style !== 'none' && (
                            <RangeControl
                                label="Animation Speed (ms)"
                                value={pdsMobileMenu.animationSpeed ?? 300}
                                onChange={(value) => updateSetting('animationSpeed', value)}
                                min={100}
                                max={800}
                                step={50}
                            />
                        )}

                        {pdsMobileMenu.style && pdsMobileMenu.style !== 'none' && (
                            <NumberControl
                                label="Breakpoint (px)"
                                value={pdsMobileMenu.breakpoint || 768}
                                onChange={(value) => {
                                    const parsed = parseInt(value, 10);
                                    if (!isNaN(parsed)) updateSetting('breakpoint', parsed);
                                }}
                                min={320}
                                max={1200}
                            />
                        )}

                        {pdsMobileMenu.style && pdsMobileMenu.style !== 'none' && (
                            <ToggleControl
                                label="Close on Overlay Click"
                                checked={pdsMobileMenu.closeOnOverlay !== false}
                                onChange={(value) => updateSetting('closeOnOverlay', value)}
                            />
                        )}

                        {pdsMobileMenu.style && pdsMobileMenu.style !== 'none' && (
                            <ToggleControl
                                label="Close on Escape Key"
                                checked={pdsMobileMenu.closeOnEscape !== false}
                                onChange={(value) => updateSetting('closeOnEscape', value)}
                            />
                        )}

                        {pdsMobileMenu.style && pdsMobileMenu.style !== 'none' && (
                            <ToggleControl
                                label="Enable Submenus"
                                checked={pdsMobileMenu.enableSubmenus === true}
                                onChange={(value) => updateSetting('enableSubmenus', value)}
                            />
                        )}
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'extendBlockWithMobileMenu');

addFilter(
    'editor.BlockEdit',
    'pds-navigation/extend-block',
extendBlockWithMobileMenu
);

addFilter(
    'blocks.registerBlockType',
    'pds-navigation/extend-attributes',
    (settings, name) => {
        if (name === 'core/navigation') {
            return {
                ...settings,
                attributes: {
                    ...settings.attributes,
                    pdsMobileMenu: {
                        type: 'object',
                        default: {
                            style: 'none',
                            menuWidth: 320,
                            overlayOpacity: 50,
                            animationSpeed: 300,
                            breakpoint: 768,
                            closeOnOverlay: true,
                            closeOnEscape: true,
                            enableSubmenus: false,
                        },
                    },
                },
            };
        }
        return settings;
    }
);
