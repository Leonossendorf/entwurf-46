(function(){
  var html=document.documentElement;
  var wenigBewegung=function(){return matchMedia('(prefers-reduced-motion: reduce)').matches;};

  /* ---------- Menü (Handy) ---------- */
  var mk=document.querySelector('.menue-knopf'), menue=document.getElementById('menue');
  if(mk&&menue){
    mk.addEventListener('click',function(){var o=menue.classList.toggle('offen');mk.setAttribute('aria-expanded',o?'true':'false');});
    menue.addEventListener('click',function(e){if(e.target.closest('a')){menue.classList.remove('offen');mk.setAttribute('aria-expanded','false');}});
  }

  /* ---------- Schalter oben: Grosse Schrift, Kontrast, Vorlesen (jeweils an oder aus) ---------- */
  var merk={};try{merk=JSON.parse(localStorage.getItem('mensing-anzeige')||'{}');}catch(e){}
  function sichern(){try{localStorage.setItem('mensing-anzeige',JSON.stringify(merk));}catch(e){}}
  var schalter={};document.querySelectorAll('[data-schalter]').forEach(function(b){schalter[b.getAttribute('data-schalter')]=b;});
  function anwenden(){
    ['gross','kontrast'].forEach(function(k){html.classList.toggle(k,!!merk[k]);if(schalter[k])schalter[k].setAttribute('aria-pressed',merk[k]?'true':'false');});
  }
  ['gross','kontrast'].forEach(function(k){if(schalter[k])schalter[k].addEventListener('click',function(){merk[k]=!merk[k];sichern();anwenden();});});
  anwenden();
  var sprecher=window.speechSynthesis, liest=false, vb=schalter.vorlesen;
  if(vb){
    if(!sprecher){vb.hidden=true;}
    else{
      var stoppLesen=function(){sprecher.cancel();liest=false;vb.setAttribute('aria-pressed','false');};
      vb.addEventListener('click',function(){
        if(liest){stoppLesen();return;}
        var teile=[];document.querySelectorAll('main h1, main h2, main h3, main p, main li, main figcaption, main legend, main label').forEach(function(el){
          if(el.closest('[hidden]')||!el.offsetParent)return;var x=el.textContent.replace(/\s+/g,' ').trim();if(x)teile.push(x);});
        liest=true;vb.setAttribute('aria-pressed','true');
        teile.forEach(function(x,i){var u=new SpeechSynthesisUtterance(x);u.lang='de-DE';u.rate=.95;if(i===teile.length-1)u.onend=stoppLesen;sprecher.speak(u);});
      });
      document.addEventListener('keydown',function(e){if(e.key==='Escape'&&liest)stoppLesen();});
      window.addEventListener('pagehide',function(){sprecher.cancel();});
    }
  }

  /* ---------- Was jetzt dran ist ---------- */
  var leiste=document.querySelector('.monate');
  if(leiste){
    var M=[
      ["Januar",["Obst- und Ziergehölze schneiden","Bäume fällen, Wurzelstock fräsen lassen","Gartenumbau fürs Frühjahr planen"],["Winterdienst: räumen und streuen","Baumkontrolle im unbelaubten Zustand","Gehölzpflege an Straßen und Wegen"],"g"],
      ["Februar",["Letzte Wochen für starken Rückschnitt und Fällung","Pflaster, Terrasse oder Zaun jetzt beauftragen","Obstgehölze schneiden"],["Winterdienst","Gehölze vor dem 1. März zurücknehmen","Baumkontrolle im unbelaubten Zustand"],"g"],
      ["März",["Beete und Boden vorbereiten","Pflaster, Terrasse und Zaun anlegen","Heckenpflege: nur noch schonend"],["Spielplätze nach dem Winter prüfen","Wildkraut auf Pflaster und Wegen, ohne Herbizide","Grünflächen für die Saison vorbereiten"],"s"],
      ["April",["Fertigrasen oder Einsaat","Pflanzarbeiten im Beet","Wege und Terrassen bauen"],["Grünflächenpflege startet: mähen, Kanten, Beete","Wildkraut auf Pflaster und Wegen","Pflanzarbeiten nach DIN 18916"],"s"],
      ["Mai",["Rasen anlegen","Terrasse für den Sommer fertig machen","Gartenpflege übernehmen lassen"],["Grünflächen regelmäßig mähen","Wildkraut ohne Herbizide","Hauptinspektion der Spielplätze planen"],"s"],
      ["Juni",["Hecken in Form schneiden","Rasen und Beete pflegen","Zaun und Sichtschutz setzen"],["Grünflächenpflege","Baumkontrolle im belaubten Zustand","Wildkraut auf Pflaster und Wegen"],"s"],
      ["Juli",["Hecken in Form schneiden","Gartenpflege übernehmen lassen","Herbstpflanzung planen"],["Grünflächenpflege","Baumkontrolle im belaubten Zustand","Luftbilder per Drohne"],"s"],
      ["August",["Pflaster und Terrasse für den Herbst planen","Rasen und Beete pflegen","Heckenformschnitt"],["Grünflächenpflege","Winterdienst für die neue Saison vereinbaren","Wildkraut auf Pflaster und Wegen"],"s"],
      ["September",["Rasen anlegen: guter Monat dafür","Pflanzzeit für Stauden beginnt","Gartenumbau für den Herbst"],["Winterdienst vereinbaren","Herbstpflege und Laub einplanen","Hauptinspektion der Spielplätze"],"s"],
      ["Oktober",["Bäume und Sträucher pflanzen","Ab 1. Oktober wieder starker Rückschnitt und Fällung","Laub und Grünschnitt abfahren"],["Laub und Grünschnitt, mit City-Container","Gehölzpflege und Fällungen","Winterdienst vorbereiten"],"g"],
      ["November",["Bäume und Sträucher pflanzen","Bäume fällen, Wurzelstock fräsen lassen","Laub und Grünschnitt abfahren"],["Gehölzpflege mit Hubarbeitsbühne","Winterdienst: Fendt mit 2,50-m-Räumschild steht bereit","Baumkontrolle im unbelaubten Zustand"],"g"],
      ["Dezember",["Winterdienst auch für Privathaushalte","Obst- und Ziergehölze schneiden","Gartenpläne fürs Frühjahr"],["Winterdienst","Baumkontrolle im unbelaubten Zustand","Forst- und Fällarbeiten"],"g"]
    ];
    var H={
      g:"Hecken und Gehölze stark zurückschneiden oder roden: nach § 39 Bundesnaturschutzgesetz nur vom 1. Oktober bis Ende Februar.",
      s:"Vom 1. März bis 30. September sind an Hecken und Gehölzen nur schonende Form- und Pflegeschnitte erlaubt (§ 39 Bundesnaturschutzgesetz)."
    };
    var heute=new Date().getMonth(), feld=document.getElementById('monat-inhalt');
    function fuelle(id,a){var ul=document.getElementById(id);ul.textContent='';a.forEach(function(t){var li=document.createElement('li');li.textContent=t;ul.appendChild(li);});}
    function zeige(i){
      var m=M[i];
      document.getElementById('monat-titel').textContent=m[0];
      fuelle('liste-garten',m[1]);fuelle('liste-gewerbe',m[2]);
      document.getElementById('monat-hinweis').textContent=H[m[3]];
      [].forEach.call(leiste.children,function(b,j){b.setAttribute('aria-selected',j===i?'true':'false');b.tabIndex=j===i?0:-1;});
      feld.setAttribute('aria-labelledby','monat-'+i);
    }
    M.forEach(function(m,i){
      var b=document.createElement('button');b.type='button';b.id='monat-'+i;b.className='monat'+(i===heute?' heute':'');
      b.setAttribute('role','tab');b.setAttribute('aria-controls','monat-inhalt');
      b.innerHTML='<span aria-hidden="true">'+m[0].slice(0,3)+'</span><span class="vh">'+m[0]+(i===heute?' (aktueller Monat)':'')+'</span>';
      b.addEventListener('click',function(){zeige(i);});
      b.addEventListener('keydown',function(e){
        var n=e.key==='ArrowRight'?(i+1)%12:e.key==='ArrowLeft'?(i+11)%12:e.key==='Home'?0:e.key==='End'?11:-1;
        if(n>-1){e.preventDefault();zeige(n);leiste.children[n].focus();}
      });
      leiste.appendChild(b);
    });
    zeige(heute);
  }

  /* ---------- Anfrage vorbelegen ---------- */
  var anf=document.getElementById('anfrage-form');
  function waehle(name,werte,leeren){
    if(!anf)return;
    anf.querySelectorAll('input[name="'+name+'"]').forEach(function(c){if(leeren)c.checked=false;if(werte.indexOf(c.value)>-1)c.checked=true;});
  }
  function zurAnfrage(){var z=document.getElementById('anfrage');z.scrollIntoView({behavior:wenigBewegung()?'auto':'smooth'});var h=z.querySelector('h2');h.setAttribute('tabindex','-1');h.focus({preventScroll:true});}
  document.querySelectorAll('[data-anfrage]').forEach(function(k){
    k.addEventListener('click',function(){
      var gew=k.getAttribute('data-anfrage')==='gewerbe';
      waehle('objekt',[gew?'Gewerbe':'Privatgarten'],true);
      var ta=anf.querySelector('textarea'),mt=document.getElementById('monat-titel');
      if(k.closest('.monat-karte')&&mt&&!ta.value){ta.value='Für '+mt.textContent+': ';}
      zurAnfrage();
    });
  });
  if(anf){
    var q=new URLSearchParams(location.search),th=q.get('thema'),ob=q.get('fuer');
    if(th)waehle('thema',[th],true);
    if(ob)waehle('objekt',[ob],true);
  }

  /* ---------- Formulare (Entwurf: nichts wird verschickt) ---------- */
  document.querySelectorAll('form.formular').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var k=f.querySelector('input[name=kontakt]'),fe=f.querySelector('.fehler');
      if(!k.value.trim()){fe.hidden=false;k.setAttribute('aria-invalid','true');k.focus();return;}
      fe.hidden=true;k.removeAttribute('aria-invalid');
      var d=f.querySelector('.danke');d.hidden=false;d.setAttribute('tabindex','-1');d.focus();
    });
  });

  /* ---------- Einblenden ---------- */
  var ziele=document.querySelectorAll('.zeig');
  if('IntersectionObserver' in window && !wenigBewegung()){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('da');io.unobserve(e.target);}});},{rootMargin:'0px 0px -6% 0px'});
    ziele.forEach(function(el){io.observe(el);});
  }else{ziele.forEach(function(el){el.classList.add('da');});}
})();
