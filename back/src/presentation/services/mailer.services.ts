

import SibApiV3Sdk from 'sib-api-v3-sdk';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path'; 
import type { IUser } from '../../interfaces/user.interface';

/**
 * Servicio encargado del envío de correos del sistema
 */
export class MailerService { 
  private urlFront:string;

  constructor() {
    this.urlFront = process.env.URL_FRONT || 'juegopapelitos.com/login'  ;
  }

  /**
   * Envía el correo de bienvenida con credenciales
   */
  async sendUserCreatedMail(user: IUser, password: string): Promise<void> {
    const templatePath = path.join(
      process.cwd(),
      'src/infrastructure/templates/user-created-mail.html'
    );
console.log('datos utilizados en el mail',
       { host: process.env.MAIL_HOST  ,
      port: Number(process.env.MAIL_PORT) || 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,}}
    )
    let html = fs.readFileSync(templatePath, 'utf8');

    html = html
      .replace('{{name}}', user.name)
      .replace('{{email}}', user.email)
      .replace('{{password}}', password)
      .replace('{{loginUrl}}', this.urlFront)
      .replace('{{year}}', new Date().getFullYear().toString());

const resend = new Resend(process.env.MAIL_PASS);

     const result =  await resend.emails.send({
          from: "Juego Papelitos <noreply@papelitos.com>",
          to: user.email,
          subject: "Cuenta creada - Juego Papelitos 🎲",
          html: html,
        }); 

    console.log(`📧 Email enviado a ${user.email}`, result);
  }
}
