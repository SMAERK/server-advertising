
import { Request, Response } from "express";
import { chatgptResponse } from '../api/chat';
import { removeCharacter } from "../utils/format";

export async function ChatGPT(req: Request, res: Response) {

  let { fullname, descriptions, entity } = req.body // Modificar lo que dice input por todos los datos del documento 
  console.log(req.body);
  
  try {
    const response = await chatgptResponse(fullname,descriptions,entity)
    
    return res.send(removeCharacter(response.data || ""));

  } catch (error: any) {
    console.error('Error al obtener la respuesta de ChatGPT:', error);
    return res.send({ status: false, message: error.message });
  }
}


