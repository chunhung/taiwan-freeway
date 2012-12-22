<?php
//  if ( date_default_timezone_set('Asia/Taipei') ) {
//    $datetime = getdate();
//    $minutes = $datetime['minutes'];
//    if ( intval($minutes) == 0 )
//      $minutes = '59';
//    else
//      $minutes = intval($minutes)-1;
//  }
?>

<html>
<head >
  <meta name="viewport" charset="utf-8" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" type="text/css" href="./freeway.css" />
  <!--<script src='./freeway.js' type='text/javascript'></script>-->
  <title>高速公路</title>
</head>
<body>
<div id="section" class="section">
  <div id="selection" class="selection_left">
    <span id="n" name="section" class="area">北</span>
    <span id="c" name="section" class="area">中</span>
    <span id="s" name="section" class="area">南</span>
    <span id="small" name="size" class="area">-</span>
    <span id="large" name="size" class="area">+</span>
  </div>
  <div id="position" class="pos_right">
    <span id="pos_button" class="pos_button">＊</span>
  </div>
  <div id="map" class="map">
    <img id='freeway'></img>
  </div>
  <div id="incident" class="event">
    <table id="table-incident" class="event">
    </table>
  </div>
</div>
<iframe id='iframe-incident' class='iframe-incident' src='incident.php' onload='showIncidents()'>
</iframe>
</body>
<script src='./freeway.js' type='text/javascript'></script>
</html>
