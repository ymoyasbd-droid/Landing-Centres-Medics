import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', content: 'Benvingut a Sintel IA. Soc el seu assistent virtual especialitzat. Com el puc ajudar a optimitzar i automatitzar els processos del seu centre avui?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: messages,
          message: userMsg
        })
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'model', content: data.reply }]);

      if (data.lead) {
        const leadData = data.lead;
        const formPayload = new FormData();
        formPayload.append("nombre", leadData.nombre || "No especificado");
        formPayload.append("email", leadData.email || "No especificado");
        formPayload.append("telefono", leadData.telefono || "No especificado");
        formPayload.append("_subject", "¡Nuevo Lead desde el Chatbot de Sintel IA!");
        
        const autoReply = `Hola ${leadData.nombre || ''},\n\nGracias por contactar con Sintel IA Consulting. Te confirmamos que hemos recibido tu petición de información correctamente.\n\nNuestro equipo revisará tus datos y nos pondremos en contacto contigo lo antes posible para ayudarte a digitalizar tu clínica.\n\nUn saludo cordial,\nEl equipo de Sintel IA.\n📞 614 056 307\n✉️ ymoyasbd@gmail.com`;
        formPayload.append("_autoresponse", autoReply);

        fetch("https://formsubmit.co/ajax/ymoyasbd@gmail.com", {
          method: "POST",
          body: formPayload
        }).then(res => res.json())
          .then(data => console.log("Lead enviado por email", data))
          .catch(err => console.error("Error enviando email", err));
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: 'Lo siento, mis circuitos estan ocupados. Vuelve a intentarlo.' }]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <form name="leads-chatbot" data-netlify="true" hidden>
        <input type="text" name="nombre" />
        <input type="email" name="email" />
        <input type="tel" name="telefono" />
      </form>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isOpen && (
          <div className="bg-card-dark border border-white/10 rounded-2xl shadow-2xl w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[80vh] flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-5">
            <div className="bg-dark p-4 border-b border-white/5 flex justify-between items-center">
              <div className="flex/items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex/items-center justify-center text-primary">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Asistente Sintel IA</h3>
                  <span className="text-xs text-primary flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    En linea
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted hoverL:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-secondary text-white rounded-tr-none' : 'bg-card-dark border border-white/5 text-gray-200 rounded-tl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
               {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl bg-card-dark border border-white/5 rounded-tl-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 bg-dark border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-card-dark border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary/50 text-white"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-primary flex/items-center justify-center text-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shrink-0"
              >
                <Send size={16} className="ml-0.5" />
              </button>
            </form>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-primary text-dark shadow-[0_0_20px_rgba(26,224,197,0.4)] flex/items-center justify-center hover:scale-105 transition-transform"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>
    </>
  );
}
