import React, { useEffect, useState } from 'react';
import { 
  Bot, Calculator, CalendarCheck, TrendingUp, Bell, Target, Settings, Zap, BarChart, Headset,
  EyeOff, PhoneOff, Hourglass, ChevronRight, CheckCircle2, Globe, Star
} from 'lucide-react';
import Chatbot from './Chatbot';
import { translations } from './translations';

function App() {
  const [lang, setLang] = useState('ca');
  const t = translations[lang];

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // SEO & GEO Dynamic Updates
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.seo_title;
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.seo_desc);

    // Inject JSON-LD Schema (Local Business / Software)
    let script = document.getElementById('seo-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'seo-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Sintel IA Consulting",
      "image": "https://sinteliaconsulting.com/hero.jpg",
      "description": t.seo_desc,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Barcelona",
        "addressRegion": "Cataluña",
        "addressCountry": "ES"
      },
      "url": "https://sinteliaconsulting.com",
      "telephone": "",
      "priceRange": "$$",
      "sameAs": []
    });
  }, [lang, t]);

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-primary/30">
      <header className="container mx-auto px-6 py-6 flex justify-between items-center border-b border-card-dark">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex shrink-0 items-center justify-center">
            <Bot size={20} className="text-dark" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">Sintel IA</span>
            <span className="text-xs text-muted/80 hidden md:block tracking-wide">{t.header_slogan}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'ca' ? 'es' : 'ca')}
            className="flex items-center gap-2 text-sm font-bold text-muted hover:text-white transition-colors"
          >
            <Globe size={16} /> {lang === 'ca' ? 'ES' : 'CA'}
          </button>
          <a href="mailto:ymoyasbd@gmail.com" className="px-5 py-2.5 rounded-full bg-card-dark border border-primary/20 hover:border-primary/50 text-sm font-medium transition-colors">
            {t.contact}
          </a>
        </div>
      </header>

      <section className="reveal container mx-auto px-6 py-12 md:py-16 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card-dark border border-primary/20 text-primary text-sm font-medium mb-8">
          <Zap size={14} /> {t.hero_tag}
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          {t.hero_title_1} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t.hero_title_2}</span>
        </h1>
        <p className="text-xl text-muted mb-10 max-w-2xl mx-auto">{t.hero_desc}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-3.5 rounded-full bg-primary text-dark font-semibold hover:bg-primary/90 transition-colors w-full sm:w-auto shadow-[0_0_20px_rgba(26,224,197,0.3)]">
            {t.hero_btn_1}
          </button>
          <a href="#casos-de-exito" className="inline-block px-8 py-3.5 rounded-full bg-card-dark border border-white/10 hover:border-white/30 font-medium transition-colors w-full sm:w-auto text-center">
            {t.hero_btn_2}
          </a>
        </div>
        <div className="mt-20 relative max-w-5xl mx-auto">
           <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
           <img src="/hero.jpg" alt="Sintel IA Dashboard" className="relative rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full object-cover" />
        </div>
      </section>

      <section className="reveal container mx-auto px-6 py-10 md:py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.reto_title}</h2>
          <p className="text-muted max-w-2xl mx-auto">{t.reto_desc}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.reto_items.map((item, i) => (
            <div key={i} className={`reveal delay-${(i % 3 + 1) * 100} bg-card-dark border border-white/5 rounded-2xl p-8 hover:border-primary/30 transition-colors`}>
              <div className="w-14 h-14 rounded-full bg-dark flex items-center justify-center text-primary mb-6 border border-primary/20">
                {i === 0 ? <EyeOff size={32}/> : i === 1 ? <PhoneOff size={32}/> : <Hourglass size={32}/>}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal bg-card-dark/30 py-12 md:py-16 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-primary font-medium mb-2">2. {t.sol_tag}</h2>
            <h3 className="text-3xl md:text-4xl font-bold">{t.sol_title}</h3>
            <p className="text-muted mt-4">{t.sol_desc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.sol_items.map((item, i) => (
              <div key={i} className={`reveal delay-${(i % 3 + 1) * 100} bg-dark rounded-2xl p-8 border border-white/5 hover:border-secondary/30 transition-all relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-colors"></div>
                <div className="text-secondary mb-6">
                  {i === 0 ? <Bot size={28}/> : i === 1 ? <Calculator size={28}/> : <CalendarCheck size={28}/>}
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal container mx-auto px-6 py-12 md:py-16">
         <div className="text-center mb-16">
            <h2 className="text-primary font-medium mb-2">3. {t.val_tag}</h2>
            <h3 className="text-3xl md:text-4xl font-bold">{t.val_title}</h3>
            <p className="text-muted mt-4 max-w-2xl mx-auto">{t.val_desc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {t.val_items.map((item, i) => (
              <div key={i} className={`reveal delay-${(i % 3 + 1) * 100} flex gap-5 p-6 rounded-2xl bg-card-dark border border-white/5`}>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-dark flex items-center justify-center text-primary border border-primary/20">
                  {i === 0 ? <Target size={24}/> : i === 1 ? <Bell size={24}/> : <TrendingUp size={24}/>}
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-lg">{item.title}</h4>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
      </section>

      <section id="casos-de-exito" className="container mx-auto px-6 py-12 md:py-16 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-primary font-medium mb-2">4. {t.casos_tag}</h2>
          <h3 className="text-3xl md:text-4xl font-bold">{t.casos_title}</h3>
          <p className="text-muted mt-4 max-w-2xl mx-auto">{t.casos_desc}</p>
        </div>
        <article className="reveal max-w-5xl mx-auto bg-card-dark border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-dark relative p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></div>
            <div className="relative w-full aspect-[4/3] rounded-xl border border-white/10 bg-card-dark/50 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
               <img src="/traffic-mockup.jpg" alt="Traffic Centre Mèdic" className="absolute inset-0 w-full h-full object-cover opacity-60" onError={(e) => e.target.style.display = 'none'} />
               <div className="z-10 text-center p-6 bg-dark/80 backdrop-blur-sm rounded-2xl border border-white/5">
                 <Bot size={40} className="text-primary mx-auto mb-3" />
                 <span className="font-bold text-lg block">Traffic Centre Mèdic</span>
                 <span className="text-sm text-muted">Sabadell, Barcelona</span>
               </div>
            </div>
          </div>
          <div className="md:w-1/2 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 tracking-wide uppercase">
              {t.caso_badge}
            </div>
            <h4 className="text-2xl font-bold mb-4">{t.caso_title}</h4>
            <p className="text-muted mb-6 leading-relaxed text-sm">
              <strong>{t.caso_reto_tag}:</strong> {t.caso_reto_desc}
            </p>
            <div className="space-y-4 mb-8">
              {t.caso_items.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-white block">{item.title}</strong>
                    <span className="text-sm text-muted">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-dark rounded-xl border border-white/5">
              <div>
                <div className="text-2xl font-bold text-primary">+35%</div>
                <div className="text-xs text-muted mt-1">{t.caso_stat1}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">-40%</div>
                <div className="text-xs text-muted mt-1">{t.caso_stat2}</div>
              </div>
            </div>
            <a href="https://traffic-centre-medic.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors group">
              {t.caso_link}
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </article>
      </section>

      {/* Testimonials */}
      <section className="reveal container mx-auto px-6 py-12 md:py-16">
        <div className="text-center mb-16">
          <h2 className="text-primary font-medium mb-2">5. {t.reviews_tag}</h2>
          <h3 className="text-3xl md:text-4xl font-bold">{t.reviews_title}</h3>
          <p className="text-muted mt-4 max-w-2xl mx-auto">{t.reviews_desc}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {t.reviews_items.map((review, i) => (
            <div key={i} className={`reveal delay-${(i % 3 + 1) * 100} bg-card-dark border border-white/5 p-8 rounded-2xl flex flex-col`}>
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} size={18} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted leading-relaxed mb-8 flex-1 italic">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-dark border border-white/10 flex items-center justify-center font-bold text-lg text-primary">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{review.name}</h4>
                  <span className="text-xs text-muted">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal bg-card-dark py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-primary font-medium mb-2">6. {t.about_tag}</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">{t.about_title}</h3>
              <p className="text-muted mb-6 leading-relaxed">{t.about_desc}</p>
              <div className="bg-dark border border-white/10 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">🚀</span> 
                  <h4 className="font-bold text-lg">{t.about_box_title}</h4>
                </div>
                <p className="text-sm text-muted">{t.about_box_desc}</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-xl mb-6">{t.about_adv}</h4>
              {t.about_items.map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-xl bg-dark border border-white/5 hover:border-primary/20 transition-colors">
                  <div className="text-primary mt-1">
                    {i === 0 ? <Settings size={20}/> : i === 1 ? <Zap size={20}/> : i === 2 ? <BarChart size={20}/> : <Headset size={20}/>}
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">{item.title}</h5>
                    <p className="text-sm text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">{t.footer_title}</h2>
          <a href="mailto:ymoyasbd@gmail.com" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-dark font-semibold hover:bg-primary/90 transition-colors mb-12">
            {t.footer_btn} <TrendingUp size={18} />
          </a>
          <div className="text-muted text-sm flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <Bot size={16} /> <span className="font-bold text-white">Sintel IA</span>
            </div>
            <span className="hidden md:inline">•</span>
            <a href="mailto:ymoyasbd@gmail.com" className="hover:text-white transition-colors">comercial@sinteliaconsulting.com</a>
            <span className="hidden md:inline">•</span>
            <a href="https://wa.me/34614056307" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
               <PhoneOff size={14} className="hidden" /> {/* just using a placeholder, wait, I can use a generic phone icon or text */}
               +34 614 056 307
            </a>
            <span className="hidden md:inline">•</span>
            <span>© {new Date().getFullYear()} {t.footer_rights}</span>
          </div>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
}

export default App;
