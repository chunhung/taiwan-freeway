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
        document.getElementById('select').appendChild(select[0]);
    }
    for ( var i = 0; i < num_button; i++) {
        document.getElementById('select').appendChild(button[0]);
    }
    show('reset');
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

  function show(type) {
    if ( type == 'reset' ) {
      var tbody = document.getElementsByTagName('tbody');
      var tr = tbody[0].getElementsByTagName('tr');
      for ( var i = 0; i < tr.length; i++ ) {
        if ( tr[i].hasAttribute('class') ) {
          var tr_class = tr[i].getAttribute('class');
          if ( tr_class.contains('hide') ) {
            tr_class = tr_class.replace('hide', 'show');
          } else if ( !tr_class.contains('show') ) {
            tr_class = tr_class + ' show';
          }
          tr[i].setAttribute('class', tr_class);
        } else {
          tr[i].setAttribute('class', 'show');
        }
      }
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
    document.getElementById('button_search').addEventListener("click", show('filter'), false);
    document.getElementById('button_reset').addEventListener("click", show('reset'), false);
  }

