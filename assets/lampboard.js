/* Tablica lampek Enigmy (strona główna). Ten sam model co enigma.js: wirnik I + reflektor B. */
(function(){
var A='ABCDEFGHIJKLMNOPQRSTUVWXYZ',R='EKMFLGDQVZNTOWYHXUSPAIBRCJ',F='YRUHQSLDPXNGOKMIEBFZCWVJAT';
var ROWS=['QWERTZUIO','ASDFGHJK','PYXCVBNML'];
var lb=document.getElementById('lb'),kb=document.getElementById('kb'),win=document.getElementById('rotorWin'),tin=document.getElementById('tapeIn'),tout=document.getElementById('tapeOut');
if(!lb)return;
var pos=0,lamps={},timer=null,plain='',ciph='';
ROWS.forEach(function(r){
  var row=document.createElement('div');row.className='row';
  var krow=document.createElement('div');krow.className='row';
  r.split('').forEach(function(c){
    var l=document.createElement('span');l.className='lamp-k';l.textContent=c;lamps[c]=l;row.appendChild(l);
    var k=document.createElement('button');k.type='button';k.className='key-btn';k.textContent=c;k.setAttribute('aria-label',c);
    k.addEventListener('click',function(){press(c)});krow.appendChild(k);
  });
  lb.appendChild(row);kb.appendChild(krow);
});
function enc(c){pos=(pos+1)%26;var x=A.indexOf(c),y=(A.indexOf(R[(x+pos)%26])-pos+26)%26,z=A.indexOf(F[y]);return A[(R.indexOf(A[(z+pos)%26])-pos+26)%26]}
function show(){win.textContent=A[pos];tin.textContent=plain.slice(-24)||'—';tout.textContent=ciph.slice(-24)||'—'}
function press(c){
  var o=enc(c);plain+=c;ciph+=o;
  Object.keys(lamps).forEach(function(k){lamps[k].classList.remove('lit')});
  lamps[o].classList.add('lit');clearTimeout(timer);timer=setTimeout(function(){lamps[o].classList.remove('lit')},700);
  show();
}
document.addEventListener('keydown',function(e){
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  var t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable))return;
  var c=(e.key||'').toUpperCase();if(c.length===1&&A.indexOf(c)>=0){press(c);}
});
document.getElementById('lbReset').addEventListener('click',function(){pos=0;plain='';ciph='';show()});
show();
})();
