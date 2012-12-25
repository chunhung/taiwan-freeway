<?php header('Content-Type: text/html; charset=utf-8');?>
<table id='incident'>
<?php
    $ch = curl_init();
    $curl_opt = array(
        CURLOPT_URL=>'http://1968.freeway.gov.tw/incident/getallincs',
        CURLOPT_HEADER=>false,
        CURLOPT_HTTPGET=>true,
        CURLOPT_RETURNTRANSFER=>true);
    curl_setopt_array($ch, $curl_opt);
    $body = curl_exec($ch);
    $body = preg_replace("/<img[^>]+>/i", "", $body);
    //$body = mb_ereg_replace('國道一號', "<span clas='free1'>國道一號</span>", $body);
    echo $body;
        
    /*
    $doc = new DOMDocument('1.0', 'utf-8');
    $doc->preserveWhiteSpace = false;
    if( !$doc->loadHTML($body) )
      return NULL;
    while ( $doc->getElementsByTagName('img')->length ) {
        $img = $doc->getElementsByTagName('img')->item(0);
        $img->parentNode->removeChild($img);
    }
    echo $doc->saveHTML();*/
?>
</table>
