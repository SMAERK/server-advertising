import axios from 'axios';
import { removeCharacter } from '../utils/format';

export const chatgptResponse = async (fullname:string, descriptions:string, entity:string) => {
    const apiKey = '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';
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    try {
        const response = await axios.post(endpoint, {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `crear un contenido publicitario con las siguiente palabras:   nombre de la empresa ${fullname} , el tipo de publico es  ${entity}, que contenga esta información :${descriptions}, añade las solicitudes, todo hazlo en formato jsonm siguiendo esta estructura
          {
            "title": "titulo",
            "fullname": "nombre ", 
            "descriptions": "descripcion...",
            "solicitudes": [""]
          } sin utilizar campos que no te he dado`
                }], 
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        const formatText = response.data.choices[0].message.content.replace('\n','')
        return { status: true, data: formatText, data2: {fullname,descriptions,entity} };

    } catch (error: any) {
        console.error('Error al obtener la respuesta de ChatGPT:', error);
        return { status: false, message: error.message };
    }
}
