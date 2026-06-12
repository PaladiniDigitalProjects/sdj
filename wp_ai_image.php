<?php
$post_id    = 56900;
$post       = get_post( $post_id );
$upload_dir = wp_upload_dir();

// Prompt basat en el títol del post
$prompt = 'A warm and inviting scene representing hospitality as a human value: diverse people sharing a meal around a table, soft natural lighting, community and belonging, photorealistic style, no text';

echo "Generant imatge...\n";

$result = wp_ai_client_prompt( $prompt )->generate_image_result();

if ( is_wp_error( $result ) ) {
    echo 'Error AI: ' . $result->get_error_message() . "\n";
    return;
}

// Extreure el fitxer de la resposta
$file = $result->getCandidates()[0]->getMessage()->getParts()[0]->getFile();

if ( ! $file ) {
    echo "No s'ha generat cap imatge.\n";
    return;
}

// Obtenir les dades de la imatge
$mime_type = $file->getMimeType();
$ext       = ( $mime_type === 'image/png' ) ? 'png' : 'jpg';
$filename  = 'ai-hospitalitat-' . time() . '.' . $ext;
$filepath  = $upload_dir['path'] . '/' . $filename;

// Desar la imatge al sistema de fitxers
$image_data = $file->getData();
if ( empty( $image_data ) ) {
    // Intentar via getUrl si getData no funciona
    $url = $file->getUrl();
    if ( $url ) {
        $response = wp_remote_get( $url );
        $image_data = wp_remote_retrieve_body( $response );
    }
}

if ( empty( $image_data ) ) {
    echo "No s'han pogut obtenir les dades de la imatge.\n";
    // Debug: mostrar mètodes disponibles
    $methods = get_class_methods( $file );
    echo "Mètodes File: " . implode( ', ', $methods ) . "\n";
    return;
}

// Desar fitxer
file_put_contents( $filepath, $image_data );

// Registrar a la media library de WordPress
$attachment_id = wp_insert_attachment( [
    'post_mime_type' => $mime_type,
    'post_title'     => sanitize_file_name( $filename ),
    'post_content'   => '',
    'post_status'    => 'inherit',
    'post_parent'    => $post_id,
], $filepath, $post_id );

if ( is_wp_error( $attachment_id ) ) {
    echo 'Error creant attachment: ' . $attachment_id->get_error_message() . "\n";
    return;
}

// Generar metadades de la imatge
require_once ABSPATH . 'wp-admin/includes/image.php';
$metadata = wp_generate_attachment_metadata( $attachment_id, $filepath );
wp_update_attachment_metadata( $attachment_id, $metadata );

// Assignar com a imatge destacada
set_post_thumbnail( $post_id, $attachment_id );

echo "ATTACHMENT_ID: {$attachment_id}\n";
echo "Fitxer: {$filepath}\n";
echo "Imatge destacada assignada al post {$post_id} ✓\n";
