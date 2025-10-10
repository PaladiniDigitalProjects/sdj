<?php
/**
 * Script de desinstalación para Terms Ver Más Plugin
 * 
 * Este archivo se ejecuta cuando el plugin es eliminado completamente
 * desde el panel de administración de WordPress.
 */

// Si no se llama desde WordPress, salir
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Limpiar opciones del plugin
delete_option('terms_ver_mas_version');
delete_option('terms_ver_mas_limit');
delete_option('terms_ver_mas_excluded_terms');

// Limpiar meta data relacionada si existe
global $wpdb;

// Eliminar meta data relacionada con el plugin
$wpdb->query("DELETE FROM {$wpdb->postmeta} WHERE meta_key LIKE '_terms_ver_mas_%'");

// Limpiar transients relacionados
$wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_terms_ver_mas_%'");
$wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_timeout_terms_ver_mas_%'");

// Limpiar cache
wp_cache_flush();

// Log de desinstalación (opcional)
error_log('Terms Ver Más Plugin: Plugin desinstalado completamente');

