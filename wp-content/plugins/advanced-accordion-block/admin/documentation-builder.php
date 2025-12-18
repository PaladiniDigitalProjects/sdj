<?php
/**
 * Documentation Builder Admin Page
 * Promotional page for EazyDocs plugin
 */

/**
 * Renders the Documentation Builder presentation page promoting EazyDocs plugin.
 *
 * @return void
 */
if ( ! function_exists( 'aab_documentation_builder_page' ) ) {
	function aab_documentation_builder_page() {
		// Check if EazyDocs plugin is installed
		$plugin_file = 'eazydocs/eazydocs.php';
		$all_plugins = get_plugins();
		$is_installed = isset( $all_plugins[ $plugin_file ] );
		$is_active = is_plugin_active( $plugin_file );

		?>
        <div class="wrap aab-documentation-builder-wrap">
            <div class="aab-doc-builder-header">
                <div class="aab-header-content">
                    <img src="https://ps.w.org/eazydocs/assets/icon-128x128.png?rev=2987002" alt="EazyDocs Logo" class="aab-eazydocs-logo">
                    <div class="aab-header-text">
                        <h1>EazyDocs – Easy Knowledge Base, Wiki, and Documentation Builder</h1>
                        <p class="aab-subtitle">Create professional documentation, knowledge bases, and wikis with ease</p>
                    </div>
                </div>
            </div>

            <div class="aab-doc-builder-content">
                <!-- Hero Section -->
                <section class="aab-hero-section">
                    <div class="aab-hero-inner">
                        <h2>Transform Your Documentation Experience</h2>
                        <p>Designed with the reader in mind, EazyDocs prioritizes a seamless user experience. It is optimized for search engines, integrated with Schema.org, and provides sticky sidebars for easy navigation. The plugin supports multilingual and RTL languages, ensuring accessibility for a global audience.</p>

                        <div class="aab-hero-cta-buttons">
							<?php if ( $is_active ) : ?>
                                <a href="<?php echo esc_url( admin_url( 'edit.php?post_type=docs' ) ); ?>" class="aab-btn aab-btn-primary">
                                    ✓ Plugin Active - Go to EazyDocs
                                </a>
							<?php elseif ( $is_installed ) : ?>
                                <button id="aab-activate-eazydocs-hero" class="aab-btn aab-btn-primary" data-plugin="<?php echo esc_attr( $plugin_file ); ?>">
                                    Activate EazyDocs
                                </button>
							<?php else : ?>
                                <button id="aab-install-eazydocs-hero" class="aab-btn aab-btn-primary" data-slug="eazydocs">
                                    Install EazyDocs Now
                                </button>
							<?php endif; ?>

                            <a href="https://wordpress.org/plugins/eazydocs/" target="_blank" class="aab-btn aab-btn-outline">
                                Learn More on WordPress.org
                            </a>
                        </div>

                        <div id="aab-hero-plugin-message" class="aab-plugin-message" style="display: none;"></div>

                        <div class="aab-video-container">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/QOXcD_LqKKM?si=3WDopCeLoNouT-wl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                </section>

                <!-- Features Grid -->
                <section class="aab-features-section">
                    <h2 class="aab-section-title">Why Choose EazyDocs?</h2>
                    <div class="aab-features-grid">
                        <div class="aab-feature-card">
                            <div class="aab-feature-icon">📚</div>
                            <h3>No Limitations</h3>
                            <p>Create unlimited knowledge bases for your products. No restrictions on the number of docs you can create.</p>
                        </div>

                        <div class="aab-feature-card">
                            <div class="aab-feature-icon">🎨</div>
                            <h3>Beautiful by Default</h3>
                            <p>Modern design that makes your docs look professional without any design skills. Fully customizable to match your brand.</p>
                        </div>

                        <div class="aab-feature-card">
                            <div class="aab-feature-icon">🔍</div>
                            <h3>Ajax Live Search</h3>
                            <p>Allow your readers to search for docs without leaving the page. Provide relevant search results at every level.</p>
                        </div>

                        <div class="aab-feature-card">
                            <div class="aab-feature-icon">📱</div>
                            <h3>Responsive & Retina Ready</h3>
                            <p>100% responsive to make your knowledge base look beautiful and effective on all major devices.</p>
                        </div>

                        <div class="aab-feature-card">
                            <div class="aab-feature-icon">🚀</div>
                            <h3>SEO Optimized</h3>
                            <p>SEO-ready right from the first line of code with Schema.org integration to help you rank on search engines.</p>
                        </div>

                        <div class="aab-feature-card">
                            <div class="aab-feature-icon">🌍</div>
                            <h3>Multilingual & RTL Ready</h3>
                            <p>Translation ready & WPML compatible. Build your website in any language – even in an RTL one!</p>
                        </div>

                        <div class="aab-feature-card">
                            <div class="aab-feature-icon">🎯</div>
                            <h3>Drag & Drop Ordering</h3>
                            <p>Easily nest and re-order your docs by drag-n-drop to create a hierarchical structure.</p>
                        </div>

                        <div class="aab-feature-card">
                            <div class="aab-feature-icon">📊</div>
                            <h3>Get Feedback from Visitors</h3>
                            <p>Collect feedback easily so you can efficiently develop and refine your knowledge base articles.</p>
                        </div>

                        <div class="aab-feature-card">
                            <div class="aab-feature-icon">📋</div>
                            <h3>Built-in Table of Contents</h3>
                            <p>Automatically create a structured TOC while writing your documentation for easy navigation.</p>
                        </div>

                        <div class="aab-feature-card">
                            <div class="aab-feature-icon">🧩</div>
                            <h3>Gutenberg & Elementor</h3>
                            <p>Build your doc pages with pre-built Gutenberg blocks or Elementor widgets.</p>
                        </div>

                        <div class="aab-feature-card">
                            <div class="aab-feature-icon">⚡</div>
                            <h3>On Demand Asset Loading</h3>
                            <p>Loading only necessary assets on EazyDocs pages, keeping your site fast and efficient.</p>
                        </div>

                        <div class="aab-feature-card">
                            <div class="aab-feature-icon">🔁</div>
                            <h3>Easy Migration</h3>
                            <p>Migrate from BetterDocs to EazyDocs with one-click migration tool seamlessly.</p>
                        </div>
                    </div>
                </section>

                <!-- Screenshots Section -->
                <section class="aab-screenshots-section">
                    <h2 class="aab-section-title">See EazyDocs in Action</h2>
                    <div class="aab-screenshots-grid">
                        <div class="aab-screenshot-item">
                            <img src="https://ps.w.org/eazydocs/assets/screenshot-1.gif?rev=3091232" alt="Drag and Drop Ordering">
                            <p>Intuitive Drag & Drop Interface for Easy Organization</p>
                        </div>
                        <div class="aab-screenshot-item">
                            <img src="https://ps.w.org/eazydocs/assets/screenshot-2.gif?rev=3091232" alt="Live Customizer">
                            <p> Creating the Docs page with EazyDocs Shortcode and Search Banner block</p>
                        </div>
                        <div class="aab-screenshot-item">
                            <img src="https://ps.w.org/eazydocs/assets/screenshot-3.gif?rev=3091232" alt="Live Search">
                            <p>Powerful Live Customizer with Real-time Preview</p>
                        </div>
                        <div class="aab-screenshot-item">
                            <img src="https://ps.w.org/eazydocs/assets/screenshot-4.gif?rev=3091232" alt="User Feedback">
                            <p>Lightning-Fast Ajax Live Search Functionality</p>
                        </div>
                        <div class="aab-screenshot-item">
                            <img src="https://ps.w.org/eazydocs/assets/screenshot-5.gif?rev=3091232" alt="Share Docs">
                            <p>Collect Valuable User Feedback & Voting</p>
                        </div>
                        <div class="aab-screenshot-item">
                            <img src="https://ps.w.org/eazydocs/assets/screenshot-6.gif?rev=3091232" alt="Advanced Features">
                            <p>Share button to share the docs via all possible ways</p>
                        </div>
                    </div>
                </section>

                <!-- CTA Section -->
                <section class="aab-cta-section">
                    <div class="aab-cta-content">
                        <h2>Ready to Create Professional Documentation?</h2>
                        <p>Install EazyDocs now and start building beautiful documentation for your Advanced Accordion Block users!</p>

                        <div class="aab-cta-buttons">
							<?php if ( $is_active ) : ?>
                                <a href="<?php echo esc_url( admin_url( 'edit.php?post_type=docs' ) ); ?>" class="aab-btn aab-btn-primary">
                                    ✓ Plugin Active - Go to EazyDocs
                                </a>
							<?php elseif ( $is_installed ) : ?>
                                <button id="aab-activate-eazydocs" class="aab-btn aab-btn-primary" data-plugin="<?php echo esc_attr( $plugin_file ); ?>">
                                    Activate EazyDocs
                                </button>
							<?php else : ?>
                                <button id="aab-install-eazydocs" class="aab-btn aab-btn-primary" data-slug="eazydocs">
                                    Install EazyDocs Now
                                </button>
							<?php endif; ?>

                            <a href="https://wordpress.org/plugins/eazydocs/" target="_blank" class="aab-btn aab-btn-secondary">
                                Learn More on WordPress.org
                            </a>

                            <a href="https://eazydocs.spider-themes.net/" target="_blank" class="aab-btn aab-btn-outline">
                                View Premium Plans
                            </a>
                        </div>

                        <div id="aab-plugin-message" class="aab-plugin-message" style="display: none;"></div>
                    </div>
                </section>

                <!-- Useful Links -->
                <section class="aab-links-section">
                    <h3>Useful Links</h3>
                    <div class="aab-links-grid">
                        <a href="https://eazydocs.spider-themes.net/" target="_blank" class="aab-link-card">
                            <span class="aab-link-icon">🌐</span>
                            <span class="aab-link-text">Official Website</span>
                        </a>
                        <a href="https://wordpress-plugins.spider-themes.net/eazydocs-pro/" target="_blank" class="aab-link-card">
                            <span class="aab-link-icon">🎨</span>
                            <span class="aab-link-text">Frontend Demo</span>
                        </a>
                        <a href="https://www.youtube.com/playlist?list=PLeCjxMdg411XgYy-AekTE-bhvCXQguZWJ" target="_blank" class="aab-link-card">
                            <span class="aab-link-icon">📹</span>
                            <span class="aab-link-text">Video Tutorials</span>
                        </a>
                        <a href="https://helpdesk.spider-themes.net/docs/eazydocs-wordpress-plugin/" target="_blank" class="aab-link-card">
                            <span class="aab-link-icon">📖</span>
                            <span class="aab-link-text">Documentation</span>
                        </a>
                        <a href="https://wordpress.org/support/plugin/eazydocs/" target="_blank" class="aab-link-card">
                            <span class="aab-link-icon">💬</span>
                            <span class="aab-link-text">Support Forum</span>
                        </a>
                    </div>
                </section>

                <!-- Footer -->
                <footer class="aab-doc-builder-footer">
                    <p>Brought to you by <a href="https://spider-themes.net/" target="_blank">Spider Themes</a> |
                    <strong>Rating:</strong> 4.7 out of 5 stars (76+ reviews) |
                    <strong>Active Installations:</strong> 2,000+</p>
                </footer>
            </div>
        </div>
		<?php
	}
}
