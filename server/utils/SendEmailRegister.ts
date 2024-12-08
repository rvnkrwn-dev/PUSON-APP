import nodemailer from "nodemailer";
import {configOptionsMailer} from "~/server/config/mailer";

const config = useRuntimeConfig()

export async function SendEmailRegister(toEmail : string, fullName : string) {
    // Buat transporter
    let transporter = nodemailer.createTransport(configOptionsMailer);

    // Pesan email
    const mailOptions = {
        from: `${config.APP_NAME ?? ""} <${config.MAIL_FROM_EMAIL ?? ""}>`, // Ganti dengan pengirim email Anda
        to: toEmail, // Email penerima
        subject: "Pendaftaran Berhasil", // Subjek email
        html: `
            <h1>Selamat Datang, ${fullName}!</h1>
            <p>Terima kasih telah mendaftar di aplikasi kami.</p>
            <p>Anda sekarang dapat login dan menikmati layanan kami.</p>
            <p>Salam hangat,</p>
            <p>Tim YourApp</p>
        `
    };

    try {
        // Kirim email
        const info = await transporter.sendMail(mailOptions as any);
        console.log("Email terkirim: %s", info.messageId);
    } catch (error) {
        console.error("Gagal mengirim email:", error);
    }
}