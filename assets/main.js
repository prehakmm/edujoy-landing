(function(){
  document.documentElement.classList.add('js');
  // Tabs Online / Prezenčně
  var tabs=document.querySelectorAll('.tab');
  function show(name){
    tabs.forEach(function(t){var on=t.dataset.tab===name;t.classList.toggle('is-active',on);t.setAttribute('aria-selected',on);});
    document.querySelectorAll('.panel').forEach(function(p){p.classList.toggle('is-active',p.id==='panel-'+name);});
  }
  show('online');
  tabs.forEach(function(t){t.addEventListener('click',function(){show(t.dataset.tab);});});
  document.querySelectorAll('a[data-tab]').forEach(function(a){a.addEventListener('click',function(){show(a.dataset.tab);});});

  // "Chci tento kurz" předvyplní formulář
  document.querySelectorAll('a[data-course]').forEach(function(a){
    a.addEventListener('click',function(){
      var fmt=document.querySelector('input[name=format][value="'+a.dataset.format+'"]'); if(fmt) fmt.checked=true;
      var base=a.dataset.course.replace(/ \((online|prezenčně)\)$/,'').replace(/^Klasický kurz A2 \/ B1 \/ B2 \/ C1$/,'');
      var sel=document.getElementById('f-course');
      if(base){for(var i=0;i<sel.options.length;i++){if(sel.options[i].text===base){sel.selectedIndex=i;}}}
      else {var msg=document.getElementById('f-msg'); if(!msg.value) msg.value='Mám zájem o klasický kurz, úroveň: ';}
    });
  });

  // Formulář: jen klientská validace + poděkování (bez backendu)
  var form=document.getElementById('lead-form'), err=document.getElementById('form-error'), thanks=document.getElementById('thanks');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var ok=true;
    form.querySelectorAll('[required]').forEach(function(el){
      var valid = el.type==='radio' ? !!form.querySelector('input[name="'+el.name+'"]:checked') : (el.type==='checkbox' ? el.checked : el.checkValidity() && el.value.trim()!=='');
      var target = el.type==='radio' ? el.closest('.choice') : el;
      if(target && target.classList) target.classList.toggle('is-invalid',!valid);
      if(!valid) ok=false;
    });
    err.hidden=ok;
    if(!ok) return;
    // TODO: odeslat data na backend (fetch(form.action,{method:'POST',body:new FormData(form)})) – action URL zatím chybí.
    form.hidden=true; thanks.hidden=false; thanks.focus();
  });
})();
