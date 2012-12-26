    var cur_area = 'n';
    var position = 'right';
    var cur_size = 2;
    var cur_mins = 0;

    if (window.addEventListener) {
        //window.addEventListener('load', map_url, false);
        window.onload = map_url(cur_area);
    }

    function showIncidents() {
        var incident = document.getElementById('iframe-incident').contentDocument.getElementById('incident');
        var select = document.getElementById('iframe-incident').contentDocument.getElementsByTagName('select');
        var button = document.getElementById('iframe-incident').contentDocument.getElementsByTagName('button');
        document.getElementById('table-incident').innerHTML = incident.innerHTML;
        num_select = select.length;
        num_button = button.length;

        for ( var i = 0; i < num_select; i++ ) {
            document.getElementById('div-select').appendChild(select[0]);
        }
        for ( var i = 0; i < num_button; i++) {
            document.getElementById('div-select').appendChild(button[0]);
        }

        if ( document.body.addEventListener ) {
            document.getElementById('button_reset').addEventListener("click", function(){show('reset', null);}, false);
            document.getElementById('button_search').addEventListener("click", function(){show('filter', null);}, false);
            var to = document.getElementsByClassName('to');
            var road = document.getElementsByClassName('road');
            var inc = document.getElementsByClassName('inc');
            for(var i = 0; i < to.length; i++) {
                to[i].addEventListener("click", function(click){show('filter', click)}, false);
            }
            for(var j = 0; j < road.length; j++) {
                road[j].addEventListener("click", function(click){show('filter', click);}, false);
            }
            for(var k = 0; k < inc.length; k++) {
                inc[k].addEventListener("click", function(click){show('filter', click);}, false);
            }
        }
    }

    function map_url(area) {
        cur_area = area;
        var d = new Date();
        var minutes = parseInt(d.getMinutes());
        if ( minutes == 0 )
            minutes = 59;
        else
            minutes = minutes - 1;
        if ( cur_mins != minutes )
            cur_mins = minutes;
        var map = document.getElementById('freeway');
        map.src = 'http://pda.freeway.gov.tw/m/map/map_'+area+'_'+cur_size+'_'+minutes+'.jpg#e';
        show_section((area!='n'), (area!='c'), (area!='s'));
    };

    function show_section(n,c,s) {
        document.getElementById('n').style.display = (n)?'block':'none';
        document.getElementById('c').style.display = (c)?'block':'none';
        document.getElementById('s').style.display = (s)?'block':'none';
    }

    function show_control(small, large) {
        if ( small )
            document.getElementById('small').style.display = 'block';
        else
            document.getElementById('small').style.display = 'none';

        if ( large )
            document.getElementById('large').style.display = 'block';
        else
            document.getElementById('large').style.display = 'none';
    }

    function change_size(size) {
        if ( size == '-' && cur_size > 1 ) {
            cur_size = cur_size - 1;
            map_url(cur_area);
            show_control((cur_size!=1), true);
        } else if ( size == '+' && cur_size < 3 ) {
            cur_size = cur_size + 1;
            map_url(cur_area);
            show_control(true, (cur_size!=3));
        }
    }

    function change_position() {
        var position = document.getElementById('position');
        var selection = document.getElementById('selection');
        if ( position.getAttribute('class') == 'pos_right' ) {
            position.setAttribute('class', 'pos_left');
            selection.setAttribute('class', 'selection_right');
        } else {
            position.setAttribute('class', 'pos_right');
            selection.setAttribute('class', 'selection_left');
        }
    }

    function change_incident_display(to, road, inc) {
        var tbody = document.getElementsByTagName('tbody');
        var tr = tbody[0].getElementsByTagName('tr');

        for ( var i = 0; i < tr.length; i++ ) {
            var status = 'show';
            var spans = tr[i].getElementsByTagName('span');
            for ( var j = 0; j < spans.length; j++ ) {
                var span_class = spans[j].getAttribute('class');
                var span_name = spans[j].getAttribute('Name');
                if ( to != '全部' && span_class == 'to' && status == 'show' )
                    status = ( span_name == to )?'show':'hide';
                if ( road != '全部' && span_class == 'road' && status == 'show' )
                    status = ( span_name == road )?'show':'hide';
                if ( inc != '全部' && span_class == 'inc' && status == 'show' )
                    status = ( span_name == inc )?'show':'hide';
                tr[i].setAttribute('class', status);
            }
        }
        document.getElementById('button_search').disabled = true;
    }

    function show(status, click) {
        if ( status == 'reset' ) {
            change_incident_display('全部', '全部', '全部');

            document.getElementById('select_to').value='全部';
            document.getElementById('select_road').value='全部';
            document.getElementById('select_inc').value='全部';

            document.getElementById('button_search').disabled = false;
        } else if ( status == 'filter' ){
            var filter = Array();
            filter['to'] = document.getElementById('select_to').value;
            filter['road'] = document.getElementById('select_road').value;
            filter['inc'] = document.getElementById('select_inc').value;

            if ( click != null ) {
                filter[ click.srcElement.getAttribute('class') ] = click.srcElement.getAttribute('name');
                document.getElementById('select_'+click.srcElement.getAttribute('class')).value=click.srcElement.getAttribute('name');
            }

            change_incident_display(filter['to'], filter['road'], filter['inc']);

            document.getElementById('button_search').disabled = true;
        }
    }

    if ( document.body.addEventListener ) {
        document.getElementById('n').addEventListener("click", function(){map_url(this.id)}, false);
        document.getElementById('c').addEventListener("click", function(){map_url(this.id)}, false);
        document.getElementById('s').addEventListener("click", function(){map_url(this.id)}, false);
        document.getElementById('freeway').addEventListener("click", function(){map_url(cur_area)}, false);
        document.getElementById('position').addEventListener("click", change_position, false);
        document.getElementById('small').addEventListener("click", function(){change_size('-');}, false);
        document.getElementById('large').addEventListener("click", function(){change_size('+');}, false);
    }

