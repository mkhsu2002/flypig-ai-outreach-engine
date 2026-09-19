(() => {
  // Preserve explicit legacy language links without changing language by browser preference.
  const legacyLanguage = new URLSearchParams(location.search).get('lang');
  if (legacyLanguage) {
    const code = /^zh(?:-(?:tw|hant|hk|mo))?$/i.test(legacyLanguage) ? 'zh-Hant'
      : /^en(?:-[a-z]+)?$/i.test(legacyLanguage) ? 'en' : null;
    const alternate = code && document.querySelector('link[hreflang="' + code + '"]');
    if (alternate) {
      const target = new URL(alternate.href);
      target.search = location.search;
      target.searchParams.delete('lang');
      target.hash = location.hash;
      location.replace(target.href);
      return;
    }
  }
  async function submitManagedForm(form){
    const status=document.getElementById('form-status');
    const button=form.querySelector('button[type="submit"]');
    const endpoint=(window.FLYPIG_SITE_CONFIG&&window.FLYPIG_SITE_CONFIG.managedServiceEndpoint)||'';
    function show(type,en,zh){
      status.className='form-status show '+type;
      status.innerHTML='<span data-lang="en">'+en+'</span><span data-lang="zh">'+zh+'</span>';
    }
    if(!endpoint){
      show('error','The form is temporarily unavailable. Please contact info@flypigai.ca.','表單暫時無法使用，請聯絡 info@flypigai.ca。');
      return;
    }
    button.disabled=true;
    show('','Submitting…','正在送出…');
    try{
      const data=Object.fromEntries(new FormData(form).entries());
      if(data.confirm_company_website){throw new Error('bot')}
      data.source='flypig-managed-service';
      data.submitted_at=new Date().toISOString();
      const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      if(!res.ok) throw new Error('request');
      form.reset();
      show('success','Thank you. FlyPig will review the brief and contact you using the information provided.','謝謝，你的專案需求已送出。FlyPig 會先檢視內容，再依你提供的聯絡資訊主動與你聯繫。');
    }catch(e){
      show('error','Submission failed. Please try again later.','送出失敗，請稍後再試。');
    }finally{button.disabled=false}
  }
  document.addEventListener('DOMContentLoaded',()=>{
    const f=document.getElementById('managed-intake'); if(f) f.addEventListener('submit',e=>{e.preventDefault();submitManagedForm(f)});
  });
})();
