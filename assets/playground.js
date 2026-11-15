/* Plac zabaw szyfranta / cipher playground - wszystko dziala lokalnie w przegladarce */
(function(){
var A='ABCDEFGHIJKLMNOPQRSTUVWXYZ',$=function(i){return document.getElementById(i)};
var MO={A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..'};
var msg=$('pgIn');if(!msg)return;
function T(){return msg.value.toUpperCase()}
function letters(){return T().replace(/[^A-Z]/g,'')}
function shift(t,k){return t.split('').map(function(c){var i=A.indexOf(c);return i<0?c:A[(i+k)%26]}).join('')}
function pig(ch,w){var i=A.indexOf(ch),p=5,c=w/2,s='',dot=(i>=9&&i<=17)||i>=22;
  if(i<18){var k=i%9,r=Math.floor(k/3),cc=k%3;
    if(r>0)s+='<line x1="'+p+'" y1="'+p+'" x2="'+(w-p)+'" y2="'+p+'"/>';
    if(r<2)s+='<line x1="'+p+'" y1="'+(w-p)+'" x2="'+(w-p)+'" y2="'+(w-p)+'"/>';
    if(cc>0)s+='<line x1="'+p+'" y1="'+p+'" x2="'+p+'" y2="'+(w-p)+'"/>';
    if(cc<2)s+='<line x1="'+(w-p)+'" y1="'+p+'" x2="'+(w-p)+'" y2="'+(w-p)+'"/>';}
  else{var q=(i-18)%4,pts=[p+','+p+' '+c+','+(w-p)+' '+(w-p)+','+p, p+','+p+' '+(w-p)+','+c+' '+p+','+(w-p), (w-p)+','+p+' '+p+','+c+' '+(w-p)+','+(w-p), p+','+(w-p)+' '+c+','+p+' '+(w-p)+','+(w-p)][q];
    s='<polyline points="'+pts+'" fill="none"/>';}
  if(dot)s+='<circle cx="'+c+'" cy="'+c+'" r="2.6" fill="currentColor" stroke="none"/>';
  return '<svg viewBox="0 0 '+w+' '+w+'" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">'+s+'</svg>'}
function rail(t){t=t.replace(/[^A-Z]/g,'');var a='',b='';for(var i=0;i<t.length;i++){if(i%2)b+=t[i];else a+=t[i]}return {a:a,b:b,t:t}}
var R='EKMFLGDQVZNTOWYHXUSPAIBRCJ',F='YRUHQSLDPXNGOKMIEBFZCWVJAT';
function enigma(t,s){var p=A.indexOf(s),o='';t.split('').forEach(function(c){var x=A.indexOf(c);if(x<0){if(c===' ')o+=' ';return}
  p=(p+1)%26;var y=(A.indexOf(R[(x+p)%26])-p+26)%26,z=A.indexOf(F[y]),i=(R.indexOf(A[(z+p)%26])-p+26)%26;o+=A[i]});return o}
function kwa(k){var s='';(k+A).toUpperCase().split('').forEach(function(c){if(A.indexOf(c)>=0&&s.indexOf(c)<0)s+=c});return s}
function morse(){return T().split(/\s+/).filter(Boolean).map(function(w){return w.split('').map(function(c){return MO[c]||''}).filter(Boolean).join(' ')}).join(' / ')}
function draw(){
  var k=+$('pgK').value;$('pgKv').textContent=k;
  $('pgAlpha').innerHTML=A+'<br><span style="color:var(--holly)">'+shift(A,k)+'</span>';
  $('o-caesar').textContent=shift(T(),k);
  $('o-atbash').textContent=T().split('').map(function(c){var i=A.indexOf(c);return i<0?c:A[25-i]}).join('');
  $('o-a1').textContent=T().split(/\s+/).filter(Boolean).map(function(w){return w.split('').filter(function(c){return A.indexOf(c)>=0}).map(function(c){return A.indexOf(c)+1}).join('-')}).join('  ');
  $('o-bin').innerHTML=letters().split('').slice(0,24).map(function(c){var b=('00000'+(A.indexOf(c)+1).toString(2)).slice(-5);
    return '<span class="lampset" title="'+c+' = '+b+'">'+b.split('').map(function(x){return '<span class="lamp'+(x==='1'?' on':'')+'"></span>'}).join('')+'</span>'}).join('');
  $('o-bin-t').textContent=letters().split('').map(function(c){return ('00000'+(A.indexOf(c)+1).toString(2)).slice(-5)}).join(' ');
  $('o-morse').textContent=morse();
  $('o-pig').innerHTML=T().split('').slice(0,40).map(function(c){return A.indexOf(c)>=0?pig(c,36):'<span style="width:14px;display:inline-block"></span>'}).join('');
  var r=rail(T());$('o-rail-z').textContent=r.t.split('').map(function(c,i){return i%2?' ':c}).join(' ')+'\n'+r.t.split('').map(function(c,i){return i%2?c:' '}).join(' ');
  $('o-rail').textContent=r.a+r.b;
  var ka=kwa($('pgKw').value);$('o-kwa').textContent=ka.split('').join(' ');
  $('o-kw').textContent=T().split('').map(function(c){var i=A.indexOf(c);return i<0?c:ka[i]}).join('');
  $('o-enigma').textContent=enigma(T(),$('pgStart').value);
  $('o-rev').textContent=msg.value.split('').reverse().join('');
}
$('pgStart').innerHTML=A.split('').map(function(c){return '<option>'+c+'</option>'}).join('');
['pgIn','pgK','pgKw','pgStart'].forEach(function(i){$(i).addEventListener('input',draw);$(i).addEventListener('change',draw)});
document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){
  var t=$(b.getAttribute('data-copy')).textContent,done=function(){var o=b.textContent;b.textContent='✓ Skopiowano / Copied';setTimeout(function(){b.textContent=o},1400)};
  try{navigator.clipboard.writeText(t).then(done,function(){})}catch(e){}})});
/* Morse: dzwiek i latarka / sound and lantern */
var lamp=$('lantern'),busy=false;
function play(withSound){if(busy)return;busy=true;var code=morse(),u=110,t=0,ctx=null;
  if(withSound){try{ctx=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}
  code.split('').forEach(function(s){
    if(s==='.'||s==='-'){var len=s==='.'?u:3*u,start=t;
      setTimeout(function(){lamp.classList.add('on')},start);setTimeout(function(){lamp.classList.remove('on')},start+len);
      if(ctx){var o=ctx.createOscillator(),g=ctx.createGain(),a=ctx.currentTime+.05+start/1000;o.frequency.value=650;o.connect(g);g.connect(ctx.destination);
        g.gain.setValueAtTime(0,a);g.gain.linearRampToValueAtTime(.3,a+.005);g.gain.setValueAtTime(.3,a+len/1000-.005);g.gain.linearRampToValueAtTime(0,a+len/1000);o.start(a);o.stop(a+len/1000+.02)}
      t+=len+u}else if(s===' ')t+=2*u;else if(s==='/')t+=4*u});
  setTimeout(function(){busy=false},t+50)}
$('mFlash').addEventListener('click',function(){play(false)});
$('mSound').addEventListener('click',function(){play(true)});
draw();
})();
