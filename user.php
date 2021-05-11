<?php
  $post = file_get_contents('php://input');
  $post = json_decode( $post );

  var_dump($post);
?>
