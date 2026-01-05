<?php /* Template Name: Mision compartida centros */
get_header(); 
?>
<style>

.mision-compartida .flex.flex-v {
	flex-direction:column;
}

.mision-compartida .search-nav {
	margin-top:2rem;
	width: 100%;
	max-width:700px;
}

.mision-compartida #myInput {
  background-position: 10px 12px;
  background-repeat: no-repeat;
  width: 100%;
  font-size: 20px;
  padding: 12px 20px 12px 20px;
  border: 1px solid #007FAD;
  margin-bottom: 0;
  color:#007FAD;

}

.mision-compartida #myInput::placeholder {
  color:#68c1e2;
}


.mision-compartida #myUL {
  list-style-type: none;
  padding: 0;
  margin: 3rem 0;
  max-width:700px;
}

.mision-compartida .form {
	padding: 2rem;
	width: 100%;
}


.mision-compartida .form p{
	padding: 0;
}

.mision-compartida .form input.wpcf7-form-control,
.mision-compartida .form .wpcf7-select {
	width: 100%;
    padding: 1rem;
    border-radius: 3px;
    border: 1px solid rgb(208, 208, 208);
}

.mision-compartida .form .wpcf7-submit {
	max-width:30rem; 
    padding: 1rem;
    border-radius: 3px;
    border: none;
	float:right;
	font-size:1.4rem;
	background-color:#007FAD;
	color:#ffffff;
	text-transform:uppercase;
}

.mision-compartida #myUL li a {
  border: 0 solid #ddd;
  margin-top: -1px; /* Prevent double borders */
  /* padding: 12px; */
  text-decoration: none;
  /* font-size: 18px; */
  color:#007FAD;
  display: block
}

.mision-compartida #myUL li a:hover:not(.header) {
  background-color: #eee;
}
</style>
<main id="main" class="site-main mision-compartida" role="main">
  <?php $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), "size" ); ?>
	<?php if($thumbnail): ?>
		<div class="entry-image" style="background: url('<?php echo ($thumbnail[0]); ?>') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"></div>
	<?php endif; ?>
	<header class="entry-header alignwide">
		<h1 class="entry-title"><?php the_title();?></h1>
	</header>
	<div class="entry-content">
			<?php the_content();?>
	</div>
	<?php get_footer(); ?>
</main>