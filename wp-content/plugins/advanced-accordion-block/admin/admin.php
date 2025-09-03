<?php
/**
 * Admin Support Page
 */
add_action( 'admin_menu', 'aab_plugin_admin_page' );
add_action( 'admin_enqueue_scripts', 'aab_admin_page_assets' );

// Admin Assets

if ( ! function_exists( 'aab_admin_page_assets' ) ) {
	function aab_admin_page_assets(): void {
		$page = $_GET['page'] ?? '';
		if ( $page == 'aab-settings' ) {
			wp_enqueue_style( 'aab-admin-css', plugins_url( 'assets/css/dashboard-app.css', __FILE__ ) );
		}
	}
}

/**
 * Registers an admin page and a submenu page for the Accordion Block plugin in the WordPress dashboard.
 *
 * @return void
 */
if ( ! function_exists( 'aab_plugin_admin_page' ) ) {
	function aab_plugin_admin_page() {
		add_menu_page(
			'Accordion Block',  // Page title
			'Accordion Block',  // Menu title
			'manage_options',      // Capability
			'aab-settings',        // Menu slug
			'aab_admin_page_content_callback', // No callback, will redirect instead
			'data:image/svg+xml;base64,' . base64_encode( preg_replace('/\s+/', ' ', file_get_contents( plugin_dir_path( __FILE__ ) . 'assets/custom-icon.svg' )) ),
			// Path to your SVG file,
			26
		);

		add_submenu_page(
			'aab-settings',
			'AAB Usage Table',
			'AAB Usage Table',
			'manage_options',
			'aab-block-usage-table',
			'aab_render_block_usage_table',
		);
	}
}
/**
 * Callback function to render the content of the admin page for the Advanced Accordion Block plugin.
 *
 * This function outputs the HTML structure for the admin page, including a welcome section, a quick introduction
 * to the plugin's functionality, an embedded video tutorial from YouTube, key features listed in sections,
 * and support links to assist users.
 *
 * @return void
 */

if ( ! function_exists( 'aab_admin_page_content_callback' ) ) {
	function aab_admin_page_content_callback(): void {
		?>
        <main class="py-2rem">
            <div class="ezd-custom-container ezd-container ">
                <div class="ezd-grid ezd-grid-cols-12">
                    <div class="ezd-xl-col-9">
                        <section class="ezd_dashboard_box">
                            <h2>Welcome to Advanced Accordion Block!</h2>
                            <p>Advanced Accordion Gutenberg Block is Built with Gutenberg
                                Native Components that allows you to build a FAQs Section or Accordion easily on your
                                site post and page using Gutenberg Editor.</p>
                            <div class="aab-video-container">
                                <iframe height="520" src="https://www.youtube.com/embed/K40z8KxojxE"
                                        title="YouTube video player" frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                            </div>
                            <span class="ezd-d-flex">
                        <a href="<?php echo esc_url(admin_url( 'post-new.php?post_type=page' )); ?>" target="_blank"
                           class="aab-btn btn-fill">
                            Create New Page
                        </a>
                        <a href="http://spider-themes.net/" target="_blank" class="aab-btn inline-flex ">
                            Visit Our Website
                        </a>
                    </span>
                        </section>
                    </div>
                    <div class="ezd-xl-col-3">
                        <section class="section-2-title ezd_dashboard_box box-2">
                            <h3> Key Features: </h3>
                            <p>
                                Advanced Accordion Gutenberg Block has unlimited Styling with Custom Margin,
                                Padding,
                                Border Radius, Color, Background, Tag Selection, etc.
                            </p>
                            <ul>
                                <li>Highly Customizable</li>
                                <li>Built with Gutenberg Native Components</li>
                                <li>Unlimited Nested Accordion</li>
                                <li>SEO Friendly</li>
                                <li>All Types of Content Supported</li>
                                <li>Responsive & Retina Ready</li>
                                <li>Super Fast, Slick</li>
                                <li>5 Pairs of Icons</li>
                                <li>Make Active Accordion on Page Load</li>
                            </ul>
                        </section>
                        <section class="section-2-title ezd_dashboard_box box-2">
                            <h3>Get 5-star Support</h3>
                            <p>Need some help? Our awesome support team is
                                here
                                to help you with any question you have.</p>
                            <a class="text-base text-aab focus:text-aab focus-visible:text-aab-hover active:text-aab-hover hover:text-aab-hover underline"
                               href="https://wordpress.org/support/plugin/advanced-accordion-block/" target="_blank"
                               rel="noreferrer">Get Support</a>
                            <a class="text-base text-aab focus:text-aab focus-visible:text-aab-hover active:text-aab-hover hover:text-aab-hover no-underline"
                               href="https://wordpress.org/support/plugin/advanced-accordion-block/" target="_blank"
                               rel="noreferrer"> → </a>
                        </section>
                    </div>
                </div>
            </div>
        </main>
		<?php
	}
}

if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}


/**
 * Renders the Block Usage Table in the WordPress admin interface for the Accordion Block plugin.
 *
 * @return void
 */
if ( ! function_exists( 'aab_render_block_usage_table' ) ) {
	function aab_render_block_usage_table() {
		$table = new AAB_Block_Usage_Table();
		$table->prepare_items();
		echo '<div class="wrap">';
		echo '<h1>Block Usage</h1>';
		echo '<form method="post">';
		$table->search_box( 'Search Pages/Posts', 'aab-block-usage-search' );
		$table->display();
		echo '</form>';
		echo '</div>';
	}
}
/**
 * Extends the WP_List_Table class to manage and display block usage data in a list table format.
 *
 * This class is designed to handle various actions such as preparing data,
 * managing columns, sorting, filtering, pagination, and bulk actions for displaying
 * the usage of specific block types (e.g., 'Separate Accordion', 'Group Accordion')
 * in WordPress posts and pages.
 */

if ( ! class_exists( 'AAB_Block_Usage_Table' ) ) {
	class AAB_Block_Usage_Table extends WP_List_Table {
		private $blocks
			= [
				'aab/accordion-block ' => 'Separate Accordion',
				'aab/group-accordion ' => 'Group Accordion',
				'aab/horizontal-accordion ' => 'Horizontal Accordion',
			];

		public function __construct() {
			parent::__construct( [
				'singular' => 'block_usage',
				'plural'   => 'block_usages',
				'ajax'     => false,
			] );
		}

		public function get_columns() {
			return [
				'cb'          => '<input type="checkbox" />', // Checkbox for bulk actions
				'title'       => __( 'Title', 'advanced-accordion-block' ),
				'author'      => __( 'Author', 'advanced-accordion-block' ),
				'block_names' => __( 'Block Name', 'advanced-accordion-block' ),
				'block_count' => __( 'Total Block Count', 'advanced-accordion-block' ),
				'post_type'   => __( 'Post Type', 'advanced-accordion-block' ), // Add Post Type Column
				'date'        => __( 'Date', 'advanced-accordion-block' ),
			];
		}


		public function get_sortable_columns() {
			return [
				'title'       => [ 'title', true ],
				'author'      => [ 'author', false ],
				'block_count' => [ 'block_count', false ],
				'date'        => [ 'date', false ],
			];
		}

		public function get_bulk_actions() {
			return [
				'delete' => 'Delete',
			];
		}

		public function column_cb( $item ) {
			return sprintf( '<input type="checkbox" name="page[]" value="%d" />', $item['ID'] );
		}

		public function column_title( $item ) {
			$actions = [
				'edit'  => sprintf( '<a href="%s">Edit</a>', get_edit_post_link( $item['ID'] ) ),
				'trash' => sprintf( '<a href="%s" class="submitdelete">Trash</a>', get_delete_post_link( $item['ID'] ) ),
				'view'  => sprintf( '<a href="%s" target="_blank">View</a>', get_permalink( $item['ID'] ) ),
			];

			return sprintf(
				'<strong><a class="row-title" href="%s">%s</a></strong> %s',
				esc_url( get_edit_post_link( $item['ID'] ) ),
				esc_html( $item['title'] ),
				$this->row_actions( $actions )
			);
		}

		/**
		 * Prepares the items for display in a list table.
		 *
		 * This method applies various tasks such as searching, filtering, sorting,
		 * pagination, and setting column headers for the items in the list table.
		 *
		 * @return void
		 */
		public function prepare_items() {
			$search      = isset( $_POST['s'] ) ? sanitize_text_field( $_POST['s'] ) : '';
			$date_filter = isset( $_POST['m'] ) ? sanitize_text_field( $_POST['m'] ) : '';

			$data = $this->get_block_usage_data( $search, $date_filter );

			// Handle bulk actions
			$this->process_bulk_action();

			// Handle sorting
			$orderby = $_GET['orderby'] ?? 'title';
			$order   = $_GET['order'] ?? 'asc';

			usort( $data, function ( $a, $b ) use ( $orderby, $order ) {
				$result = strnatcmp( $a[ $orderby ], $b[ $orderby ] );

				return ( $order === 'asc' ) ? $result : - $result;
			} );

			// Pagination setup
			$per_page     = 20;
			$current_page = $this->get_pagenum();
			$total_items  = count( $data );

			$data = array_slice( $data, ( $current_page - 1 ) * $per_page, $per_page );

			$this->set_pagination_args( [
				'total_items' => $total_items,
				'per_page'    => $per_page,
				'total_pages' => ceil( $total_items / $per_page ),
			] );

			$columns  = $this->get_columns();
			$hidden   = [];
			$sortable = $this->get_sortable_columns();

			$this->_column_headers = [ $columns, $hidden, $sortable ];
			$this->items           = $data;
		}

		public function column_default( $item, $column_name ) {
			return $item[ $column_name ] ?? '';

		}


		private function get_block_usage_data( $search = '', $date_filter = '' ) {
			global $wpdb;

			$data         = [];
			$where_clause = '';

			if ( ! empty( $search ) ) {
				$where_clause .= $wpdb->prepare(
					"AND post_title LIKE %s",
					'%' . $wpdb->esc_like( $search ) . '%'
				);
			}

			if ( ! empty( $date_filter ) ) {
				$where_clause .= $wpdb->prepare(
					"AND DATE_FORMAT(post_date, '%%Y%%m') = %s",
					$date_filter
				);
			}

			$posts = $wpdb->get_results( "
            SELECT ID, post_title, post_content, post_author, post_date 
            FROM {$wpdb->posts} 
            WHERE post_status = 'publish' 
            AND (post_type = 'post' OR post_type = 'page')
            $where_clause
        " );
			function block_exists( $block_name ): bool {
				$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

				return isset( $registered_blocks[ $block_name ] );
			}


			foreach ( $posts as $post ) {
				$block_summary = [];
				$total_count   = 0;
				foreach ( $this->blocks as $block_name => $block_label ) {
					$block_count = substr_count( $post->post_content, '<!-- wp:' . $block_name );

					if ( $block_count > 0 ) {
						$block_summary[] = sprintf( '%s (%d)', esc_html( $block_label ), $block_count );
						$total_count     += $block_count;
					}
				}

				if ( ! empty( $block_summary ) ) {
					$data[] = [
						'ID'          => $post->ID,
						'title'       => $post->post_title,
						'author'      => get_the_author_meta( 'display_name', $post->post_author ),
						'block_names' => implode( ', ', $block_summary ),
						'block_count' => $total_count,
						'post_type'   => get_post_type( $post->ID ),
						'date'        => gmdate( 'Y/m/d', strtotime( $post->post_date ) ),
					];
				}
			}

			return $data;
		}

		/**
		 * Check if a block type exists
		 *
		 * @param string $block_name The block name to check.
		 *
		 * @return bool Whether the block type exists.
		 */
		private function process_bulk_action() {
			if ( 'delete' === $this->current_action() ) {
				// Ensure 'page' is an array before processing
				$post_ids = isset( $_POST['page'] ) && is_array( $_POST['page'] ) ? array_map( 'intval', $_POST['page'] ) : [];

				// Ensure no null values are passed
				$post_ids = array_filter( $post_ids, function ( $id ) {
					return ! is_null( $id );
				} );

				if ( ! empty( $post_ids ) ) {
					foreach ( $post_ids as $post_id ) {
						if ( get_post_status( $post_id ) ) {
							wp_delete_post( $post_id, true );
						}
					}
				}
			}
		}

		protected function extra_tablenav( $which ) {
			if ( $which === 'top' ) {
				$this->months_dropdown( 'page' );
				submit_button( 'Filter', '', 'filter_action', false, [ 'id' => 'post-query-submit' ] );
			}
		}
	}
}
