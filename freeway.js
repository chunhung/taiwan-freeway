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
    document.getElementById('table-incident').innerHTML = incident.innerHTML;
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

  if ( document.body.addEventListener ) {
    document.getElementById('n').addEventListener("click", function(){map_url(this.id)}, false);
    document.getElementById('c').addEventListener("click", function(){map_url(this.id)}, false);
    document.getElementById('s').addEventListener("click", function(){map_url(this.id)}, false);
    document.getElementById('freeway').addEventListener("click", function(){map_url(cur_area)}, false);
    document.getElementById('position').addEventListener("click", change_position, false);
    document.getElementById('small').addEventListener("click", function(){change_size('-');}, false);
    document.getElementById('large').addEventListener("click", function(){change_size('+');}, false);
  }

