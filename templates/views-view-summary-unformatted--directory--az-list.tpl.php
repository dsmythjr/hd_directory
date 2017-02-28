<?php
$total = 0;
$letters = range ('A', 'Z');
foreach($rows as $id => $row){
  $existing_letters[] = $row->link;

  // remove query parameters that that have a value of "all"
  $parsed_url = parse_url($row->url);
  $parsed_query = array();
  $query_params_with_all_val = array();
  parse_str($parsed_url['query'], $parsed_query);

  // find parameters will "All" value
  foreach($parsed_query as $query_param => $value) {
    if ($value == 'All' || $value == '') {
      $query_params_with_all_val[] = $query_param;
    }
  }

  // remove the parameters with an "All" value
  foreach($query_params_with_all_val as $param_key) {
    unset($parsed_query[$param_key]);
  }

  // rebuild query string
  $new_query = http_build_query($parsed_query);
  if ($new_query != '') {
    $rebuilt_url = $parsed_url['path'] . '?' . http_build_query($parsed_query);
  }
  else {
    $rebuilt_url = $parsed_url['path'];
  }

  $urls[$row->link] = strtolower($rebuilt_url);
  $counts[$row->link] = $row->count;
  $total += $row->count;
}
//$letters[] = 'ALL';
//$existing_letters[] = 'ALL';

$url_query = explode('?', $rows[0]->url);

$urls['ALL'] = substr_replace(strtolower($url_query[0]), 'all', -1, strlen($rows[0]->link));
$urls['ALL'] = '/directory/all';
unset ($url_query[0]);
//if (isset($url_query)) { $urls['ALL'] .= '?' . implode('?', $url_query); }
$counts['ALL'] = $total;

print '<div class="views-summary views-summary-unformatted">';
print '<span class="result"><a href=/directory/all>ALL</a></span>';
foreach($letters as $letter){
  if(in_array($letter, $existing_letters)){
    $nav[] = '<span class="result"><a href=' . $urls[$letter] . '>' . $letter . '</a></span>'; // Uncomment for counts .'</span><span class="count">(' . $counts[$letter]. ')</span>';
  }
  else {
    $nav[] = '<span class="no-result">' . $letter . '</span>';
  }
}
print implode('', $nav);
print '</div>';
