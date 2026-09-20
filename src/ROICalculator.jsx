import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function ROICalculator({ t }) {
  const [citas, setCitas] = useState(300);
  const [precio, setPrecio] = useState(60);
  const [perdida, setPerdida] = useState(15);

  const dineroPerdidoMes = Math.round(citas * precio * (perdida / 100));
  
  return (
    <section className="reveal container mx-auto px-6 py-12 md:py-16">
      <div className="bg-card-dark border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Calculator size={14} /> {t.calc_tag}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.calc_title}</h2>
          <p className="text-muted mb-8 leading-relaxed">{t.calc_desc}</p>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold">{t.calc_citas}</label>
                <span className="text-primary font-bold">{citas}</span>
              </div>
              <input 
                type="range" min="50" max="2000" step="50" 
                value={citas} onChange={(e) => setCitas(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold">{t.calc_precio}</label>
                <span className="text-primary font-bold">{precio}€</span>
              </div>
              <input 
                type="range" min="20" max="150" step="5" 
                value={precio} onChange={(e) => setPrecio(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold">{t.calc_perdida}</label>
                <span className="text-primary font-bold">{perdida}%</span>
              </div>
              <input 
                type="range" min="5" max="40" step="1" 
                value={perdida} onChange={(e) => setPerdida(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 w-full">
          <div className="bg-dark border border-white/10 rounded-2xl p-8 relative overflow-hidden text-center group">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-lg font-medium text-muted mb-4">{t.calc_result_text}</h3>
              <div className="text-6xl font-bold text-white mb-2">
                {dineroPerdidoMes.toLocaleString('es-ES')}€
              </div>
              <p className="text-sm text-primary mb-8 animate-pulse">~ {(dineroPerdidoMes * 12).toLocaleString('es-ES')}€ anuales</p>
              
              <a href="#contacto" className="inline-block w-full py-4 rounded-xl bg-primary text-dark font-bold hover:bg-primary/90 transition-transform hover:scale-[1.02] active:scale-95">
                {t.calc_btn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
