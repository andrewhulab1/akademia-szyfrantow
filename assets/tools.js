/* Skrzynka narzedzi szyfranta / codebreaker's toolbox */
(function(){
var A='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var MO={A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',
 '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.'};
var RM={};for(var k in MO)RM[MO[k]]=k;
var $=function(id){return document.getElementById(id)};
var inp=$('tin'),out=$('tout');if(!inp)return;
function T(){return inp.value}
function U(){return inp.value.toUpperCase()}
function show(s){out.textContent=s}
function shift(t,k){return t.toUpperCase().split('').map(function(c){var i=A.indexOf(c);return i<0?c:A[(i+k+260)%26]}).join('')}
var F={
 shift:function(){show(shift(T(),+$('k').value))},
 all:function(){var r=[];for(var k=1;k<26;k++)r.push((k<10?' ':'')+k+': '+shift(T(),k));show(r.join('\n'))},
 atbash:function(){show(U().split('').map(function(c){var i=A.indexOf(c);return i<0?c:A[25-i]}).join(''))},
 l2n:function(){var o=A.indexOf(($('one').value||'A').toUpperCase()[0]);if(o<0)o=0;
   show(U().split(/\s+/).map(function(w){return w.split('').filter(function(c){return A.indexOf(c)>=0}).map(function(c){return (A.indexOf(c)-o+26)%26+1}).join(' ')}).join('  /  '))},
 n2l:function(){var o=A.indexOf(($('one').value||'A').toUpperCase()[0]);if(o<0)o=0;
   show((T().match(/\d+/g)||[]).map(function(n){n=+n;return (n>=1&&n<=26)?A[(n-1+o)%26]:'?'}).join(''))},
 l2b:function(){show(U().split('').filter(function(c){return A.indexOf(c)>=0}).map(function(c){return ('00000'+(A.indexOf(c)+1).toString(2)).slice(-5)}).join(' '))},
 b2l:function(){var g=(T().match(/[01]+/g)||[]);show(g.map(function(b){var n=parseInt(b,2);return n+'='+((n>=1&&n<=26)?A[n-1]:'?')}).join('   ')+'\n\n'+g.map(function(b){var n=parseInt(b,2);return (n>=1&&n<=26)?A[n-1]:'?'}).join(''))},
 l2m:function(){show(U().split(/\s+/).filter(Boolean).map(function(w){return w.split('').map(function(c){return MO[c]||''}).filter(Boolean).join(' ')}).join(' / '))},
 m2l:function(){var t=T().replace(/[·•]/g,'.').replace(/[–—_]/g,'-');show(t.split(/\s*[\/|]\s*/).map(function(w){return w.trim().split(/\s+/).map(function(s){return RM[s]||(s?'?':'')}).join('')}).join(' '))},
 mrev:function(){var t=T().replace(/[·•]/g,'.').replace(/[–—_]/g,'-').split('').reverse().join('');inp.value=t;F.m2l()},
 rev:function(){show(T().split('').reverse().join(''))},
 first:function(){show((T().match(/[A-Za-zÀ-ž]+/g)||[]).map(function(w){return w[0].toUpperCase()}).join(''))},
 last:function(){show((T().match(/[A-Za-zÀ-ž]+/g)||[]).map(function(w){return w[w.length-1].toUpperCase()}).join(''))},
 freq:function(){var c={},n=0;U().split('').forEach(function(x){if(A.indexOf(x)>=0){c[x]=(c[x]||0)+1;n++}});
   var r=Object.keys(c).sort(function(a,b){return c[b]-c[a]});
   show(n?r.map(function(x){return x+' '+Array(c[x]+1).join('█')+' '+c[x]}).join('\n')+'\n\nNajczęstsze w angielskim / most common in English: E T A O I N S H R':'—')},
 kwalpha:function(){var s='';(($('kw').value||'')+A).toUpperCase().split('').forEach(function(c){if(A.indexOf(c)>=0&&s.indexOf(c)<0)s+=c});
   var plain=U().split('').map(function(c){var i=s.indexOf(c);return i<0?c:A[i]}).join('');
   show('A B C D E F G H I J K L M N O P Q R S T U V W X Y Z\n'+s.split('').join(' ')+'\n\n'+(T().trim()?plain:''))},
 rail:function(){var r=Math.max(2,+$('rails').value||2),t=U().replace(/\s/g,''),n=t.length;
   var pat=[],row=0,d=1;for(var i=0;i<n;i++){pat.push(row);if(row===0)d=1;else if(row===r-1)d=-1;row+=d}
   var cnt=[];for(var x=0;x<r;x++)cnt.push(pat.filter(function(p){return p===x}).length);
   var rows=[],pos=0;for(x=0;x<r;x++){rows.push(t.substr(pos,cnt[x]).split(''));pos+=cnt[x]}
   show(pat.map(function(p){return rows[p].shift()}).join(''))}
};
document.querySelectorAll('[data-tool]').forEach(function(b){b.addEventListener('click',function(){F[b.getAttribute('data-tool')]()})});
var k=$('k');if(k)k.addEventListener('input',function(){$('kv').textContent=k.value;F.shift()});
var snd=$('beep');
if(snd)snd.addEventListener('click',function(){
  try{var ctx=new (window.AudioContext||window.webkitAudioContext)(),t=ctx.currentTime+.1,u=.09;
  var code=/^[\s.\-\/·•–—|]+$/.test(T())?T().replace(/[·•]/g,'.').replace(/[–—]/g,'-'):U().split('').map(function(c){return c===' '?'/':(MO[c]||'')}).join(' ');
  code.split('').forEach(function(s){
    if(s==='.'||s==='-'){var o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=650;o.connect(g);g.connect(ctx.destination);
      var len=s==='.'?u:3*u;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.3,t+.005);g.gain.setValueAtTime(.3,t+len-.005);g.gain.linearRampToValueAtTime(0,t+len);
      o.start(t);o.stop(t+len+.01);t+=len+u}
    else if(s===' ')t+=2*u;else if(s==='/'||s==='|')t+=4*u});
  }catch(e){}
});
})();
