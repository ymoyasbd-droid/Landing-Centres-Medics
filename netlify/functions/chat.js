import { GoogleGenAI } from '@google/genai';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { history, message } = JSON.parse(event.body);
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: 'Lo siento, el administrador aún no ha configurado la conexión con el cerebro de IA.' })
      };
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `Eres un consultor de tecnología experto de Sintel IA Consulting.
Ayudas a pymes y centros médicos a entender los beneficios de automatizar sus procesos con IA (como chatbots y calculadoras interactivas).
Mantén siempre un tono estrictamente profesional, corporativo, formal y educado (trata de usted). Evita los coloquialismos. Sé resolutivo y conciso (máximo 2-3 frases).
IMPORTANTE SOBRE EL IDIOMA: Tu idioma principal y por defecto es el Catalán. Responde SIEMPRE en Catalán, a menos que el usuario se dirija a ti en Español, en cuyo caso debes responder fluidamente en Español.
Tu objetivo final es conseguir que el usuario deje su nombre, email y teléfono para una consultoría gratuita.
Si en algún momento el usuario te proporciona su nombre, correo y/o teléfono, agradéceselo y DESPUÉS en una nueva línea al final de tu respuesta EXACTAMENTE incluye este bloque JSON (sustituyendo con los datos que te ha dado):
___LEAD_DATA___: {"nombre": "...", "email": "...", "telefono": "..."}`;

    const formattedHistory = history.map(msg => {
       return {
         role: msg.role === 'model' ? 'model' : 'user',
         parts: [{ text: msg.content }]
       }
    });

    formattedHistory.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedHistory,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    let replyText = response.text || 'Lo siento, hubo un problema procesando tu mensaje.';
    let lead = null;

    const leadRegex = /___LEAD_DATA___:\s*(\{.*\})/;
    const match = replyText.match(leadRegex);
    if (match) {
      try {
        lead = JSON.parse(match[1]);
        replyText = replyText.replace(leadRegex, '').trim(); 
      } catch (e) {
        console.error('Failed to parse lead data', e);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: replyText, lead })
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: 'He sufrido un cortocircuito. Vuelve a intentarlo en unos minutos.' })
    };
  }
};
