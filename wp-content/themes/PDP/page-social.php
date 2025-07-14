<?php
/* Template Name: Solidaridad */

get_header();
?>

<main id="main" class="site-main" role="main">
	<?php while ( have_posts() ) : the_post(); ?>
		<article class="entry">
			<?php $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), "size" ); ?>
			<?php if($thumbnail): ?>
				<div class="entry-image" style="background: url('<?php echo ($thumbnail[0]); ?>') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"></div>
			<?php endif; ?>
			<header class="entry-header alignwide">
			<nav class="page-nav">
				<?php
					if ($post->post_parent) {
						$page = $post->post_parent;
					} else {
						$page = $post->ID;
					}
					$children = wp_list_pages(array(
						'child_of' => $page,
						'echo' => '0',
						'title_li' => ''
					));

					?>
					<span><?php _e('En esta sección','PDP'); ?></span>
					<?php
					if ($children) {
						echo "<ul class='menu-nav'>\n".$children."</ul>\n";
					} 
				?>

<?php 
global $post;
if( $post->ID != 687) : ?>
<div id="111Donaciones" class="wp-block-donaciones on">    
  <div class="donacion">
    <form action="" id="resultado">
      <button id="quiero-donar">
        <a onclick="displayForm()" class="quiero-donar"><?php _e('Donar', 'PDP'); ?><i class="ico ico-cuore"></i></a>
      </button>
    </form>

    <div id="display" class="hide postal-code">
      <input id="numb" maxlength="5" min="0" max="99999" placeholder="<?php _e('Entre su código postal', 'PDP'); ?>" />
      <button type="button" onclick="postalCode()"><?php _e('Validar', 'PDP'); ?></button>
      <p id="text"></p>
    </div>
  </div>
</div>
<script>

document.getElementById("quiero-donar").disabled = true;

function displayForm() {
  var show = document.getElementById("display");
  var why = document.getElementById("postal");
  show.classList.toggle("hide");
  why.classList.toggle("hide");
}

function showFunction() {
  var buttonOn = document.getElementById("show-more");
  var element = document.getElementById("porque");
  element.classList.toggle("hide");
  buttonOn.classList.toggle("on");
}

function postalCode() {
  let y = document.getElementById("numb").value;
  x =  y.substring(0, 2);
 
 const zoneA = ["03","07","08","12","17","22","25","30","43","44","46","50"];
 const zoneB = ["02","04","06","10","11","13","14","16","18","21","23","29","35","38","41","45","51","52"];
 const zoneC = ["01","05","09","15","19","20","24","26","27","28","31","32","33","34","36","37","39","40","42","47","48","49"];
  
 let text;
  
  if (isNaN(x) || x < 1 ) {
    text = "valla... prueba con un número entero de cinco cifras";
    document.getElementById("text").innerHTML = text;
    
  } else if( zoneA.includes(x)){
    url = "https://solidaritat.santjoandedeu.org/colabora/socios/?lang=es";
    text = "";
    window.open(url, '_blank');
  
  } else if( zoneB.includes(x)){
    // url = "https://www.sjd.es/estumomento/?q=/#donar";
    url = "https://solidaridad.sjd.es/?q=/#donar";
    text = "";
    window.open(url, '_blank');
      
  } else if( zoneC.includes(x)){
    url = "https://obrasocialsanjuandedios.es/quiero-donar/";
    text = "";
    window.open(url, '_blank');
    
  } else {
  	text = "<?php _e('No reconocemos el código postal, inténtelo de nuevo', 'PDP'); ?>";
  }
  
  document.getElementById("resultado").action = url;
  document.getElementById("resultado").classList.remove("hide");
  document.getElementById("quiero-donar").disabled = false;
  document.getElementById("text").innerHTML = text;
  document.getElementById("display").classList.toggle("hide");
  document.getElementById("<?php echo esc_attr($id); ?>").classList.toggle("ON");
  
}

</script>

</div>

<?php endif;?>
			</nav>

			<h1 class="entry-title"><?php the_title();?></h1>				
			</header>

			<div class="entry-content">
				<?php the_content();?>
			</div>
			
		</article>
	<?php endwhile; ?>
	<?php get_footer(); ?>
</main>