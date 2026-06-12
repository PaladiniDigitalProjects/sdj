<div class="wrap wp-mcp-settings-wrap">
    <h1>
        <span class="dashicons dashicons-admin-settings" style="font-size: 30px; width: 30px; height: 30px;"></span>
        WP MCP Bridge Settings
        <span class="title-count">v<?php echo esc_html(WP_MCP_Settings::VERSION); ?></span>
    </h1>

    <p class="description">
        Activa o desactiva grupos de endpoints del MCP. Los cambios requieren guardar para aplicarse.
    </p>

    <form method="post" action="">
        <?php wp_nonce_field('wp_mcp_save_settings', 'wp_mcp_nonce'); ?>

        <table class="wp-mcp-groups-table">
            <thead>
                <tr>
                    <th class="check-column"></th>
                    <th>Grupo</th>
                    <th>Descripción</th>
                    <th class="endpoints-column">Endpoints</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($groups as $key => $group) : ?>
                    <tr>
                        <td class="check-column">
                            <input 
                                type="checkbox" 
                                id="wp_mcp_group_<?php echo esc_attr($key); ?>" 
                                name="wp_mcp_group_<?php echo esc_attr($key); ?>" 
                                value="1"
                                <?php checked($enabled[$key]); ?>
                            >
                        </td>
                        <td class="group-label">
                            <label for="wp_mcp_group_<?php echo esc_attr($key); ?>">
                                <strong><?php echo esc_html($group['label']); ?></strong>
                            </label>
                        </td>
                        <td class="group-description">
                            <span class="description"><?php echo esc_html($group['description']); ?></span>
                            <div class="group-routes">
                                <?php foreach ($group['routes'] as $route) : ?>
                                    <code><?php echo esc_html($route); ?></code>
                                <?php endforeach; ?>
                            </div>
                        </td>
                        <td class="endpoints-column">
                            <span class="endpoint-count"><?php echo esc_html($group['endpoints']); ?> endpoints</span>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <p class="submit">
            <input 
                type="submit" 
                name="wp_mcp_save_settings" 
                class="button button-primary button-large" 
                value="Guardar cambios"
            >
        </p>
    </form>

    <hr>

    <div class="wp-mcp-stats">
        <h2>Resumen</h2>
        <table class="wp-mcp-stats-table">
            <tr>
                <td><strong>Grupos habilitados:</strong></td>
                <td><?php echo esc_html($stats['enabled_groups']); ?> / <?php echo esc_html($stats['total_groups']); ?></td>
            </tr>
            <tr>
                <td><strong>Endpoints habilitados:</strong></td>
                <td><?php echo esc_html($stats['enabled_endpoints']); ?> / <?php echo esc_html($stats['total_endpoints']); ?></td>
            </tr>
        </table>
    </div>

    <div class="wp-mcp-info-box">
        <h3>Información</h3>
        <p>
            Este plugin expone endpoints REST bajo <code>/wp-json/mcp/v1/</code> para integración con MCP (Model Context Protocol).
            Los endpoints requieren autenticación via Application Password de WordPress.
        </p>
        <p>
            <a href="<?php echo esc_url(admin_url('users.php?page=wp_app_passwords')); ?>" target="_blank">
                Gestionar Application Passwords →
            </a>
        </p>
    </div>
</div>
