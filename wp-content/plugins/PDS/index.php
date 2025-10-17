<?php
/**
 * Plugin Name:       PDS - Noticias y Relacionados
 * Description:       Carrousel de noticias y publicaciones seleccionadas
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Paladini Digital Solutions
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       PDS
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function create_block_pds_init() {
	register_block_type( __DIR__ . '/pds-noticias' );
}
add_action( 'init', 'create_block_pds_init' );


/* CHECK ACF */

if( ! class_exists('ACF') ) :

/* CREATE ACF FIELD */
add_action( 'acf/include_fields', function() {

	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_local_field_group( array(
		'key' => 'group_674632d1882ab',
		'title' => 'Noticias relacionadas',
		'fields' => array(
			
			array(
				'key' => 'field_674632d331eda',
				'label' => 'Título apartado',
				'name' => 'PDS_block_relacionado_title',
				'type' => 'text',
			),
			
			array(
				'key' => 'field_674632d331fb0',
				'label' => 'Tipos de Contenido',
				'name' => 'PDS_block_relacionado_tipos',
				'type' => 'checkbox',
				'choices' => array(
					'post' => 'Post',
					'page' => 'Page',
					'tribe_events' => 'Events',
					'publicaciones' => 'Publicaciones',
					'capitulo' => 'Capitulo 2026',
				),
				'allow_custom' => 0,
				'default_value' => array('post', 'publicaciones'),
				'layout' => 'vertical',
				'toggle' => 0,
				'wrapper' => array('width' => '25'),
			),
			array(
				'key' => 'field_674632d331fc4',
				'label' => 'Número de publicaciones',
				'name' => 'PDS_block_relacionado_numbers',
				'type' => 'number',
				'default_value' => 4,
				'min' => 1,
				'max' => 16,
				'wrapper' => array('width' => '25'),
			),
			array(
				'key' => 'field_674632d331fb3',
				'label' => 'Categoría',
				'name' => 'PDS_block_relacionado_categoria',
				'type' => 'taxonomy',
				'taxonomy' => 'category',
				'field_type' => 'select',
				'allow_null' => 1,
				'wrapper' => array('width' => '50'),
			),
		
		

			array(
				'key' => 'field_674632d331fa2',
				'label' => 'Seleccionar contenido manualmente',
				'name' => 'PDS_block_relacionado_contenido',
				'type' => 'relationship',
				'post_type' => array('post', 'page', 'tribe_events', 'publicaciones'),
				'filters' => array('search', 'post_type'),
				'return_format' => 'object',
				'wrapper' => array('width' => '100'),
			),
				
			array(
				'key' => 'field_674632d331f26',
				'label' => 'Llamada a la acción',
				'name' => 'PDS_block_relacionado_CTA',
				'type' => 'link',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'block',
					'operator' => '==',
					'value' => 'acf/pdsnoticias',
				),
			),
		),
		'active' => true,
	) );
});


endif;	