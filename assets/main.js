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

  // Course card button pre-fills the form (format + course option)
  var form=document.getElementById('lead-form');
  document.querySelectorAll('a[data-option]').forEach(function(a){
    a.addEventListener('click',function(){
      var fmt=document.querySelector('input[name=format][value="'+a.dataset.format+'"]'); if(fmt) fmt.checked=true;
      var sel=document.getElementById('f-course'), opt=a.dataset.option;
      if(opt){for(var i=0;i<sel.options.length;i++){if(sel.options[i].text===opt){sel.selectedIndex=i;}}}
      else {var msg=document.getElementById('f-msg'); if(!msg.value) msg.value=form.dataset.msgClassic||'';}
    });
  });

  // Formulář: jen klientská validace + poděkování (bez backendu)
  var err=document.getElementById('form-error'), thanks=document.getElementById('thanks');
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
