(() => {
  const STORAGE_KEY = 'flypig-language';
  const titles = {
    'index.html': {en:'FlyPig AI Outreach Engine v0.1.0',zh:'FlyPig AI Outreach Engine v0.1.0｜研究型 LLM 潛在客戶工作流'},
    'test-01.html': {en:'Research Note 01 · Japan Outdoor Market',zh:'研究紀要 01｜日本戶外市場'},
    'test-02.html': {en:'Research Note 02 · Germany Industrial Water',zh:'研究紀要 02｜德國工業水質市場'},
    'test-03.html': {en:'Research Note 03 · FlyPig Dogfooding + Control',zh:'研究紀要 03｜FlyPig Dogfooding + Control'},
    'managed-service.html': {en:'FlyPig Managed Project Execution',zh:'FlyPig 專案代操作'},
    'privacy.html': {en:'Privacy Notice · FlyPig AI Outreach Engine',zh:'隱私說明｜FlyPig AI Outreach Engine'}
  };
  function norm(v){
    const s=(v||'').toLowerCase();
    if(['zh','zh-tw','zh-hant','zh-hk','zh-mo'].includes(s)) return 'zh';
    if(s==='en'||s.startsWith('en-')) return 'en';
    return null;
  }
  const q=new URLSearchParams(location.search);
  const initial=norm(q.get('lang'))||norm(localStorage.getItem(STORAGE_KEY))||norm(navigator.language||(navigator.languages||[])[0])||'en';
  function page(){return location.pathname.split('/').pop()||'index.html'}
  function setLanguage(lang,opt){
    const l=norm(lang)||'en';
    document.documentElement.dataset.language=l;
    document.documentElement.lang=l==='zh'?'zh-Hant-TW':'en';
    localStorage.setItem(STORAGE_KEY,l);
    document.querySelectorAll('[data-set-lang]').forEach(b=>{const a=b.dataset.setLang===l;b.classList.toggle('active',a);b.setAttribute('aria-pressed',a?'true':'false')});
    const t=titles[page()]&&titles[page()][l]; if(t) document.title=t;
    if(opt&&opt.url){const u=new URL(location.href);u.searchParams.set('lang',l==='zh'?'zh-TW':'en');history.replaceState({},'',u)}
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
      show('error','The intake form is ready, but the submission endpoint has not been configured yet.','表單已完成，但目前尚未設定送出端點。設定 Resend 後即可正式收件。');
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
    setLanguage(initial);
    document.querySelectorAll('[data-set-lang]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.setLang,{url:true})));
    const f=document.getElementById('managed-intake'); if(f) f.addEventListener('submit',e=>{e.preventDefault();submitManagedForm(f)});
  });
})();