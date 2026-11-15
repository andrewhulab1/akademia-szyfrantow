/* Uproszczony model Enigmy: 1 wirnik (historyczny wirnik I) + reflektor B. Toy Enigma: 1 rotor + reflector B. */
(function(){
var A='ABCDEFGHIJKLMNOPQRSTUVWXYZ',R='EKMFLGDQVZNTOWYHXUSPAIBRCJ',F='YRUHQSLDPXNGOKMIEBFZCWVJAT';
var inp=document.getElementById('enIn'),out=document.getElementById('enOut'),st=document.getElementById('enStart'),pos=document.getElementById('enPos');
if(!inp)return;
function run(){var p=A.indexOf(st.value),o='';
  inp.value.toUpperCase().split('').forEach(function(c){var x=A.indexOf(c);if(x<0){if(c===' ')o+=' ';return}
    p=(p+1)%26;var y=(A.indexOf(R[(x+p)%26])-p+26)%26,z=A.indexOf(F[y]),i=(R.indexOf(A[(z+p)%26])-p+26)%26;o+=A[i]});
  out.textContent=o||'—';pos.textContent=A[p];}
st.innerHTML=A.split('').map(function(c){return '<option>'+c+'</option>'}).join('');
inp.addEventListener('input',run);st.addEventListener('change',run);run();
})();
