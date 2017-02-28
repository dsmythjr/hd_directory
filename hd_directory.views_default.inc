<?php
/**
 * Implementation of hook_views_default_views().
 */
function hd_directory_views_default_views() {
  $files = file_scan_directory(drupal_get_path('module', 'hd_directory'). '/views', '/\.view/');
  foreach ($files as $absolute => $file) {
    require $absolute;
    if (isset($view)) {
      $views[$file->name] = $view;
    }   
  }
  return $views;
}
