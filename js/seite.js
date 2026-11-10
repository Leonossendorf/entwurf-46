(function(){
  // Das Mensing-Jahr: was in welchem Monat dran ist
  var M=[
    ["Januar",["Obst- und Ziergehölze schneiden","Bäume fällen, Wurzelstock fräsen lassen","Gartenumbau fürs Frühjahr planen"],["Winterdienst: räumen und streuen","Baumkontrolle im unbelaubten Zustand","Gehölzpflege an Straßen und Wegen"],"g"],
    ["Februar",["Letzte Wochen für starken Rückschnitt und Fällung","Pflaster, Terrasse oder Zaun jetzt beauftragen","Obstgehölze schneiden"],["Winterdienst","Gehölze vor dem 1. März zurücknehmen","Baumkontrolle im unbelaubten Zustand"],"g"],
    ["März",["Beete und Boden vorbereiten","Pflaster, Terrasse und Zaun anlegen","Heckenpflege: nur noch schonend"],["Spielplätze nach dem Winter prüfen","Wildkraut auf Pflaster und Wegen, ohne Chemie","Grünflächen für die Saison vorbereiten"],"s"],
    ["April",["Fertigrasen oder Einsaat","Pflanzarbeiten im Beet","Wege und Terrassen bauen"],["Grünflächenpflege startet: mähen, Kanten, Beete","Wildkraut auf Pflaster und Wegen","Pflanzarbeiten nach DIN 18916"],"s"],
    ["Mai",["Rasen anlegen","Terrasse für den Sommer fertig machen","Gartenpflege übernehmen lassen"],["Grünflächen regelmäßig mähen","Wildkraut ohne Herbizide","Hauptinspektion der Spielplätze planen"],"s"],
    ["Juni",["Hecken in Form schneiden","Rasen und Beete pflegen","Zaun und Sichtschutz setzen"],["Grünflächenpflege","Baumkontrolle im belaubten Zustand","Wildkraut auf Pflaster und Wegen"],"s"],
    ["Juli",["Hecken in Form schneiden","Gartenpflege übernehmen lassen","Herbstpflanzung planen"],["Grünflächenpflege","Baumkontrolle im belaubten Zustand","Luftbilder per Drohne"],"s"],
    ["August",["Pflaster und Terrasse für den Herbst planen","Rasen und Beete pflegen","Heckenformschnitt"],["Grünflächenpflege","Winterdienst für die neue Saison vereinbaren","Wildkraut auf Pflaster und Wegen"],"s"],
    ["September",["Rasen anlegen: guter Monat dafür","Pflanzzeit für Stauden beginnt","Gartenumbau für den Herbst"],["Winterdienst-Verträge abschließen","Herbstpflege und Laub einplanen","Spielplatz-Hauptinspektion"],"s"],
    ["Oktober",["Bäume und Sträucher pflanzen","Ab 1. Oktober wieder starker Rückschnitt und Fällung","Laub und Grünschnitt abfahren"],["Laub und Grünschnitt, mit City-Container","Gehölzpflege und Fällungen","Winterdienst vorbereiten"],"g"],
    ["November",["Bäume und Sträucher pflanzen","Bäume fällen, Wurzelstock fräsen lassen","Laub und Grünschnitt abfahren"],["Gehölzpflege mit Hubarbeitsbühne","Winterdienst: Fendt mit 2,50-m-Räumschild steht bereit","Baumkontrolle im unbelaubten Zustand"],"g"],
    ["Dezember",["Winterdienst auch für Privathaushalte","Obst- und Ziergehölze schneiden","Gartenpläne fürs Frühjahr"],["Winterdienst","Baumkontrolle im unbelaubten Zustand","Forst- und Fällarbeiten"],"g"]
  ];
  var H={
    g:"Hecken und Gehölze stark zurückschneiden oder roden: nach § 39 Bundesnaturschutzgesetz nur vom 1. Oktober bis Ende Februar.",
    s:"Vom 1. März bis 30. September sind an Hecken und Gehölzen nur schonende Form- und Pflegeschnitte erlaubt (§ 39 Bundesnaturschutzgesetz)."
  };
  var leiste=document.querySelector('.monate'), heute=new Date().getMonth();
  function zeige(i){
    var m=M[i];
    document.getElementById('monat-titel').textContent=m[0];
    function fuelle(id,a){var ul=document.getElementById(id);ul.innerHTML='';a.forEach(function(t){var li=document.createElement('li');li.textContent=t;ul.appendChild(li);});}
    fuelle('liste-garten',m[1]);fuelle('liste-gewerbe',m[2]);
    var h=document.getElementById('monat-hinweis');h.textContent=H[m[3]];h.hidden=false;
    leiste.querySelectorAll('.monat').forEach(function(b,j){b.setAttribute('aria-selected',j===i?'true':'false');b.tabIndex=j===i?0:-1;});
    var box=document.querySelector('.monat-spalten');box.classList.remove('wechsel');void box.offsetWidth;box.classList.add('wechsel');
  }
  M.forEach(function(m,i){
    var b=document.createElement('button');b.type='button';b.className='monat'+(i===heute?' heute':'');
    b.setAttribute('role','tab');b.textContent=m[0].slice(0,3);b.setAttribute('aria-label',m[0]+(i===heute?' (jetzt)':''));
    b.addEventListener('click',function(){zeige(i);});
    b.addEventListener('keydown',function(e){var k=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(k){e.preventDefault();var n=(i+k+12)%12;zeige(n);leiste.children[n].focus();}});
    leiste.appendChild(b);
  });
  zeige(heute);

  // Chips
  document.querySelectorAll('.chips').forEach(function(g){
    var einzeln=g.hasAttribute('data-einzeln');
    g.querySelectorAll('.chip').forEach(function(c){
      c.setAttribute('aria-pressed',c.classList.contains('an')?'true':'false');
      c.addEventListener('click',function(){
        if(einzeln){var war=c.classList.contains('an');g.querySelectorAll('.chip').forEach(function(x){x.classList.remove('an');x.setAttribute('aria-pressed','false');});if(!war){c.classList.add('an');c.setAttribute('aria-pressed','true');}}
        else{c.classList.toggle('an');c.setAttribute('aria-pressed',c.classList.contains('an')?'true':'false');}
      });
    });
  });
  function waehle(name,texte,alleAus){
    var g=document.querySelector('#anfrage-form .chips[data-name="'+name+'"]');if(!g)return;
    g.querySelectorAll('.chip').forEach(function(c){
      if(alleAus){c.classList.remove('an');c.setAttribute('aria-pressed','false');}
      if(texte.indexOf(c.textContent.trim())>-1){c.classList.add('an');c.setAttribute('aria-pressed','true');}
    });
  }
  function zurAnfrage(){document.getElementById('anfrage').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
  document.querySelectorAll('[data-thema]').forEach(function(k){
    k.addEventListener('click',function(){waehle('thema',[k.getAttribute('data-thema')],true);waehle('objekt',['Privatgarten'],true);zurAnfrage();});
  });
  document.querySelectorAll('[data-anfrage]').forEach(function(k){
    k.addEventListener('click',function(){
      var gew=k.getAttribute('data-anfrage')==='gewerbe';
      var monat=document.getElementById('monat-titel').textContent;
      waehle('objekt',[gew?'Gewerbe':'Privatgarten'],true);
      var ta=document.querySelector('#anfrage-form textarea');
      if(k.closest('.monat-karte')&&!ta.value){ta.value='Für '+monat+': ';}
      zurAnfrage();
    });
  });

  // Formulare (Entwurf: nichts wird verschickt)
  document.querySelectorAll('form.formular').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var k=f.querySelector('input[name=kontakt]'),alt=f.querySelector('.fehler');if(alt)alt.remove();
      if(!k.value.trim()){var p=document.createElement('p');p.className='fehler';p.textContent='Bitte Telefon oder E-Mail angeben, damit wir antworten können.';k.insertAdjacentElement('afterend',p);k.focus();return;}
      var d=f.querySelector('.danke');d.hidden=false;f.querySelector('button[type=submit]').disabled=true;d.scrollIntoView({block:'nearest'});
    });
  });

  // Einblenden
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('da');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.abschnitt-kopf,.kachel,.lv li,.projekt,.inklusion,.monat-karte,.kar-text,.formular,.koepfe li,.zahlen').forEach(function(el){el.classList.add('zeig');io.observe(el);});
  }
  // Anruf-Leiste am Handy erst nach dem ersten Bildschirm
  var leisteA=document.querySelector('.anruf-leiste');
  window.addEventListener('scroll',function(){leisteA.classList.toggle('da',window.scrollY>window.innerHeight*.8);},{passive:true});
})();
