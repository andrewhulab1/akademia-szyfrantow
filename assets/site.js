/* Akademia Szyfrantow - wspolny silnik / shared engine. Nic nie jest wysylane - zapis tylko w tej przegladarce. */
(function(){
var KEY='akademia-szyfrantow:v1';
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
function save(o){try{localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}}
function norm(s){return String(s||'').toUpperCase().replace(/[^A-Z0-9]/g,'')}
function hash(s){var h=5381;for(var i=0;i<s.length;i++){h=((h<<5)+h+s.charCodeAt(i))>>>0}return h.toString(16)}
window.AK={load:load,save:save,norm:norm};

var page=document.body.getAttribute('data-page');
var st=load();
function solvedAll(){
  var qs=document.querySelectorAll('.q[data-h]');
  if(!qs.length||!page)return;
  var p=st[page]||{},n=0;
  qs.forEach(function(q){if(p[q.id])n++});
  if(n===qs.length){
    st.badges=st.badges||{};
    if(!st.badges[page]){st.badges[page]=1;save(st)}
    var b=document.getElementById('banner');if(b)b.classList.add('show');
  }
}
document.querySelectorAll('.q[data-h]').forEach(function(q){
  var inp=q.querySelector('input'),btn=q.querySelector('button.chk'),msg=q.querySelector('.msg'),tries=0;
  var p=(st[page]||{});
  if(p[q.id]){q.classList.add('done');if(inp)inp.value=atob(q.getAttribute('data-a'))}
  function say(cls,pl,en){msg.className='msg show '+cls;msg.innerHTML=pl+' <span class="en">'+en+'</span>'}
  function check(){
    var v=norm(inp.value);
    if(!v){say('err','Wpisz odpowiedź.','Type an answer.');return}
    if(hash(v)===q.getAttribute('data-h')){
      q.classList.add('done');say('ok','Brawo! Dobra odpowiedź.','Well done! Correct.');
      st[page]=st[page]||{};st[page][q.id]=1;save(st);solvedAll();
    }else{
      tries++;
      if(tries>=3&&!q.querySelector('.rev')){
        var r=document.createElement('button');r.className='alt rev';r.type='button';
        r.textContent='Pokaż odpowiedź / Show answer';
        r.onclick=function(){say('ok','Odpowiedź:','Answer:');msg.innerHTML+=' <b class="mono">'+atob(q.getAttribute('data-a'))+'</b>'};
        btn.parentNode.appendChild(r);
      }
      say('err','Jeszcze nie. Spróbuj ponownie albo otwórz podpowiedź.','Not yet. Try again or open the hint.');
    }
  }
  btn.addEventListener('click',check);
  inp.addEventListener('keydown',function(e){if(e.key==='Enter')check()});
});
solvedAll();

/* odznaki na stronie glownej / badges on the home page */
var bd=(st.badges||{}),got=0;
document.querySelectorAll('[data-mission]').forEach(function(c){if(bd[c.getAttribute('data-mission')]){c.classList.add('got');got++}});
var pr=document.getElementById('progress');if(pr)pr.textContent=got;
var rs=document.getElementById('reset');
if(rs)rs.addEventListener('click',function(){save({});location.reload()});

/* odliczanie / countdown */
var cd=document.getElementById('countdown');
if(cd){var t=new Date(cd.getAttribute('data-date')+'T00:00:00'),d=Math.ceil((t-new Date())/864e5);
  cd.textContent=d>0?d:0;}

/* lampki binarne / binary lamps */
var bw=document.getElementById('bw');
if(bw){var upd=function(){var s=0;bw.querySelectorAll('input').forEach(function(i){if(i.checked)s+=+i.value});
  document.getElementById('bwn').textContent=s;document.getElementById('bwl').textContent=(s>=1&&s<=26)?String.fromCharCode(64+s):'—'};
  bw.addEventListener('change',upd);upd();}

/* suwak przesuniecia / shift slider */
var sh=document.getElementById('shift');
if(sh){var A='ABCDEFGHIJKLMNOPQRSTUVWXYZ',top=document.getElementById('shTop'),bot=document.getElementById('shBot'),lab=document.getElementById('shK');
  var draw=function(){var k=+sh.value;lab.textContent=k;top.textContent=A.split('').join(' ');
    bot.textContent=A.split('').map(function(c,i){return A[(i+k)%26]}).join(' ')};
  sh.addEventListener('input',draw);draw();}
})();
