/* Mapa: szkoła i Pyry. Ładuje Leaflet i kafelki OpenStreetMap dopiero po kliknięciu. / Loads only after a click. */
(function(){
var btn=document.getElementById('mapBtn'),box=document.getElementById('map');if(!btn||!box)return;
var SCHOOL=[52.158474,21.066302],PYRY=[52.128959,21.033297];
function css(h){var l=document.createElement('link');l.rel='stylesheet';l.href=h;document.head.appendChild(l)}
function js(s,cb){var e=document.createElement('script');e.src=s;e.onload=cb;e.onerror=function(){box.innerHTML='<p style="padding:14px">Nie udało się wczytać mapy. / The map could not be loaded.</p>'};document.head.appendChild(e)}
btn.addEventListener('click',function(){
  btn.disabled=true;btn.textContent='⏳ …';box.style.display='block';
  css('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css');
  js('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',function(){
    var m=L.map(box,{scrollWheelZoom:false});
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'}).addTo(m);
    L.polyline([SCHOOL,PYRY],{color:'#b3261e',weight:4,dashArray:'8 8'}).addTo(m).bindTooltip('≈ 4 km',{permanent:true,direction:'center',className:'maptip'});
    L.circleMarker(SCHOOL,{radius:11,color:'#123d2e',weight:3,fillColor:'#f2c35b',fillOpacity:1}).addTo(m)
      .bindTooltip('🏫 Nasza szkoła / Our school',{permanent:true,direction:'top',offset:[0,-10]});
    L.circleMarker(PYRY,{radius:11,color:'#123d2e',weight:3,fillColor:'#b3261e',fillOpacity:1}).addTo(m)
      .bindTooltip('🔐 Pyry, Las Kabacki — Biuro Szyfrów, 1939',{permanent:true,direction:'bottom',offset:[0,10]});
    m.fitBounds([SCHOOL,PYRY],{padding:[60,60]});
    btn.style.display='none';
  });
});
})();
