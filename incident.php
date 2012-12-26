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
    $body = preg_replace("/<img[^>]+>/i", "", $body); //Remove image link
    $body = preg_replace("/<input class=\"inc_type\"[^>]+>/i", "", $body); //Remove incident type with hidden property
    $body = preg_replace('/<!--(.*)-->/Uis', '', $body); //Remove html comments

    $encoding = mb_detect_encoding($body);
    mb_internal_encoding($encoding);
    mb_regex_encoding($encoding);

    preg_match_all('/<a>(.*?)<\/a>/s', $body, $matches);
    foreach ($matches[1] as $match) {
        if ( !isset($free_str[$match]) )
            $road_str[$match] = '<span class="'.$match.'" name="road">'.$match.'</span>';
    }

    preg_match_all('/<td class="inc_info body_right">(.*?)<\/td>/s', $body, $matches);
    foreach ($matches[1] as $match) {
        if ( !isset($inc_str[$match]) )
            $inc_str[$match] = '<span class="'.$match.'" name="inc">'.$match.'</span>';
        $origin = '<td class="inc_info body_right">'.$match.'</td>';
        if ( !isset($inc_replace_str[$origin]) )
            $inc_replace_str[$origin] = '<td class="inc_info body_right"><span class="'.$match.'" name="inc">'.$match.'</span></td>';
    }

    $to_str = array(
        '南向' => '<span class="南向" name="to">南向</span>',
        '北向' => '<span class="北向" name="to">北向</span>',
        '東向' => '<span class="東向" name="to">東向</span>',
        '西向' => '<span class="西向" name="to">西向</span>');
    /*$free_str = array(
        '國道1號' => '<span class="國道1號" name="road">國道1號</span>',
        '國道2號' => '<span class="國道2號" name="road">國道2號</span>',
        '國道3號' => '<span class="國道3號" name="road">國道3號</span>',
        '國道4號' => '<span class="國道4號" name="road">國道4號</span>',
        '國道5號' => '<span class="國道5號" name="road">國道5號</span>',
        '國道6號' => '<span class="國道6號" name="road">國道6號</span>',
        '國道7號' => '<span class="國道7號" name="road">國道7號</span>',
        '國道8號' => '<span class="國道8號" name="road">國道8號</span>',
        '國道9號' => '<span class="國道9號" name="road">國道9號</span>',
        '國道10號' => '<span class="國道10號" name="road">國道10號</span>',);*/
    /*$inc_str = array(
        '出口匝道壅塞' => '<span class="出口匝道壅塞" name="inc">出口匝道壅塞</span>',
        '施工' => '<span class="施工" name="inc">施工</span>',
        '散落物' => '<span class="散落物" name="inc">散落物</span>',
        '>壅塞<' => '><span class="壅塞" name="inc">壅塞</span><');*/
    /*$fast_str = array(
        '汐五高架' => '<span class="汐五高架" name="road">汐五高架</span>',
        '快速公路74號' => '<span class="快速公路74號" name="road">快速公路74號</span>',
        '快速公路88號' => '<span class="快速公路88號" name="road">快速公路88號</span>');*/

    $replace_array = array(
        'to' => $to_str,
        //'road' => array_merge($free_str, $fast_str),
        'road' => $road_str,
        'inc' => $inc_replace_str);

    foreach ($replace_array as $key => $replace_str) {
        foreach ($replace_str as $str => $replace) {
            mb_ereg_search_init($body);
            if ( mb_ereg_search($str) ) {
                $body = mb_ereg_replace($str, $replace, $body);
            } else {
                unset($replace_array[$key][$str]);
            }
        }
    }
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
<?php 
    $replace_array['inc'] = $inc_str;
    foreach ( $replace_array as $type => $name ) {
        echo '<select id="select_'.$type.'" css="select_'.$type.'">';
        echo '<option value="全部">全部</option>';
        foreach ( $name as $key => $value ) {
            echo '<option value="'.$key.'">';
            echo $key;
            echo '</option>';
        }
        echo '</select>';
    }
    echo '<button id="button_search" name="button_search" value="尋找" />尋找</button>';
    echo '<button id="button_reset" name="button_reset" value="重設" />重設</button>';
?>

