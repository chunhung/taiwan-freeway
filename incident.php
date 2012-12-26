<?php header('Content-Type: text/html; charset=utf-8');?>
<table id='incident'>
    <tbody>
<?php
    $ago = array(
        '300' => '5分鐘前',
        '600' => '10分鐘前',
        '1800' => '半小時前',
        '3600' => '1小時前',
        '7200' => '2小時前',
        '14400' => '4小時前',
        '28800' => '8小時前',
        '-1' => '很久以前');
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
            $road_str[$match] = '<span name="'.$match.'" class="road">'.$match.'</span>';
    }

    preg_match_all('/<td class="inc_info body_right">(.*?)<\/td>/s', $body, $matches);
    foreach ($matches[1] as $match) {
        if ( !isset($inc_str[$match]) )
            $inc_str[$match] = '<span name="'.$match.'" class="inc">'.$match.'</span>';
        $origin = '<td class="inc_info body_right">'.$match.'</td>';
        if ( !isset($inc_replace_str[$origin]) )
            $inc_replace_str[$origin] = '<td class="inc_info body_right"><span name="'.$match.'" class="inc">'.$match.'</span></td>';
    }

    preg_match_all('/<td class="inc_time inc_body">(.*?)<\/td>/s', $body, $matches);
    $cur_time = strftime('%Y-%m-%d %H:%M:%S');
    foreach ($matches[1] as $match) {
        if ( !isset($time_str[$match]) ) {
            $event_time = strtotime($match);
            $diff = strtotime($cur_time) - $event_time;
            foreach ($ago as $sec => $text) {
                if ( $diff < $sec ) {
                    $time_str[$match] = $text;
                    break;
                }
            }
            if ( !isset($time_str[$match]) )
                $time_str[$match] = $ago['-1'];
        }

    }
    $to_str = array(
        '南向' => '<span name="南向" class="to">南向</span>',
        '北向' => '<span name="北向" class="to">北向</span>',
        '東向' => '<span name="東向" class="to">東向</span>',
        '西向' => '<span name="西向" class="to">西向</span>');

    $replace_array = array(
        'to' => $to_str,
        'road' => $road_str,
        'inc' => $inc_replace_str,
        'time' => $time_str);

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
    </tbody>
</table>
<?php 
    $replace_array['inc'] = $inc_str;
    unset($replace_array['time']);
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

