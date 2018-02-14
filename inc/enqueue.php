<?php
// Enqueue scripts
function my_scripts() {
	// Use jQuery from a CDN
	wp_deregister_script('jquery');
	wp_register_script('jquery', '//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js', array(), null, false);
	// Enqueue our stylesheet and JS file with a jQuery dependency.
	// Note that we aren't using WordPress' default style.css, and instead enqueueing the file of compiled Sass.
	global $ver_num; // define global variable for the version number
	$ver_num = mt_rand(); // on each call/load of the style the $ver_num will get different value
	wp_enqueue_style( 'css', get_template_directory_uri() . '/assets/stylesheets/style.css', array(), $ver_num, 'all');
	wp_enqueue_script( 'js-vendor', get_template_directory_uri() . '/assets/scripts/vendors.min.js', array('jquery'), $ver_num, true );
	wp_enqueue_script( 'js-main', get_template_directory_uri() . '/assets/scripts/scripts.min.js', array('jquery'), $ver_num, true );

}

add_action( 'wp_enqueue_scripts', 'my_scripts' );

?>