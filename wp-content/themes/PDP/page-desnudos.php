<?php
/* Template Name: Documental Desnudos */

get_header();
?>

<link rel='stylesheet' id='astra-google-fonts-css'  href='https://fonts.googleapis.com/css?family=Nobile%3A400%2Ci%2C700%7CFira+Sans%3A700%2C900%2C800%2C500%7CMerriweather%3A700%2C400&#038;display=swap&#038;ver=3.7.5' media='all' />

<main id="main" class="site-main desnudos" role="main">
	<?php while ( have_posts() ) : the_post(); ?>
		<article class="entry">
			<header class="entry-header">
				<h1 class="entry-title"><?php the_title();?></h1>				
			</header>
			<div class="entry-content alignwide">
				<?php the_content();?>
			</div>
		</article>
	<?php endwhile; ?>
</main>