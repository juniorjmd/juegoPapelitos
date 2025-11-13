import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path'; 
import type { IUser } from '../../interfaces/user.interface';

/**
 * Servicio encargado del envío de correos del sistema
 */
export class MailerService {
  private transporter;
  private urlFront:string;

  constructor() {
    this.urlFront = process.env.URL_FRONT || 'juegopapelitos.com/login'  
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.MAIL_PORT) || 467,
      secure: true, // true = puerto 465, false = 587 
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }, 
    });
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

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Juego Papelitos 🎲" <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: '🎉 Tu cuenta en Juego Papelitos ha sido creada',
      html,
    };

    const res = await  this.transporter.sendMail(mailOptions);
    console.log(`📧 Correo enviado a ${user.email}` , res);
  }
}
