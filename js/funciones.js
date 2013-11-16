function success(position) {
    var s = document.querySelector('#status');
  
    if (s.className == 'success') {
        return;
    }
  
    s.innerHTML = "Encontrado!";
    s.className = 'success';
  
    var mapcanvas = document.createElement('div');
    mapcanvas.id = 'mapcanvas';
    mapcanvas.style.height = '360px';
    mapcanvas.style.width = '520px';
    
    document.querySelector('div').appendChild(mapcanvas);
  
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeControl: false,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
      
    var marker = new google.maps.Marker({
        position: latlng, 
        map: map, 
        title:"Tu estas aqui! ( o dentro un radio "+position.coords.accuracy+" metros)"
    });
}

function error(msg) {
    var s = document.querySelector('#status');
    s.innerHTML = typeof msg == 'string' ? msg : "failed";
    s.className = 'fail';
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
}else{
    error('not supported');
}
