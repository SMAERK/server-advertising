import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import pdf from 'html-pdf'
import { Request, Response } from 'express';
import { ChatGPT } from './chat';
import os, { type } from 'os';
import { removeCharacter } from '../utils/format';
import { chatgptResponse } from '../api/chat';
import moment from 'moment';



export async function savepetitionPDF (req: Request, res: Response) {
   
  const { fullname, descriptions, entity } = req.body
  console.log(req.body);
  
  
  
    try {
        const respoData = await chatgptResponse(fullname,descriptions,entity)

        const jsonRespo = JSON.parse(removeCharacter(respoData.data || ""))
        
        const {titulo,nombres,descripcions,solicitudes} = jsonRespo

          let localTemplate = path.join(
            __dirname,
            '../templates/pdfTemplate.html'
          )
        const localPDFFile = path.join(os.tmpdir(), 'DerechoDePeticion.pdf');
        function getFileExtension1(filename: string) {
          return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)![0] : undefined
        }
        const imageAsBase64logodn = fs.readFileSync(path.join(__dirname, `../templates/img/logomar.png`), 'base64');
   
          const response = {
            typeimagednc: getFileExtension1(path.join(__dirname, `../templates/img/logomar.png`)),
            imageenc: imageAsBase64logodn,
            titulo : titulo,
            nombre: fullname,
            descripcion: descriptions,
            solicitudes: solicitudes,
            entidad: respoData.data2?.entity,
            fecha: moment().format('DD/MM/YYYY')
            };

          const source = fs.readFileSync(localTemplate, "utf8");
          const html = handlebars.compile(source)(response);
          pdf
            .create(html, {
              format: "Letter",
              orientation: "portrait",
              border: {
                top: "0.5cm",
                left: "0.2cm",
                right: "0.4cm",
              },
              renderDelay: 1000,
              header : {
                height: "2cm"
              },
              footer: {
                height: "3cm",
                contents: {
                  default:
                    '<p style="text-align: center; color: rgb(139, 139, 139);font-size: 50%;">{{pages}}/{{page}}</p>',
                },
              },
            })
            .toFile(localPDFFile,  async (err: any, pdfGenerate: any) => {

              if (err){
                console.log(err);
                return res.send("PDF creation error");
              }
      
      
      
              const pdfGenerate2 = await fs.readFileSync(localPDFFile);
      
              
              res.contentType("application/pdf");
              return res.send(pdfGenerate2);
      
            }
            
            );
        } catch (e) {
          console.log(e);
          res.status(400).json({ status: false, error: e });
        }
}



