import nodemailer from 'nodemailer';
import SibApiV3Sdk from 'sib-api-v3-sdk';
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


const client = SibApiV3Sdk.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.MAIL_PASS!; // Tu API KEY
     const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();


  const email = {
      sender: {
        email: process.env.BREVO_SENDER_EMAIL || process.env.MAIL_USER,
        name: 'Juego Papelitos 🎲',
      },
      to: [{ email: user.email, name: user.name }],
      subject: '🎉 Tu cuenta en Juego Papelitos ha sido creada',
      htmlContent: html,
    };

    // 5. Envío real
    const result = await apiInstance.sendTransacEmail(email);

    console.log(`📧 Email enviado a ${user.email}`, result);
  }
}
