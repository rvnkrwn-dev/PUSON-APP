import nodemailer from "nodemailer";
import { configOptionsMailer } from "~/server/config/mailer";

const config = useRuntimeConfig();

export async function SendEmailCreateAccount(toEmail: string, fullName: string, plainPassword: string) {
    // Buat transporter
    let transporter = nodemailer.createTransport(configOptionsMailer);

    // Pesan email
    const mailOptions = {
        from: `${config.APP_NAME ?? ""} <${config.MAIL_FROM_EMAIL ?? ""}>`, // Ganti dengan pengirim email Anda
        to: toEmail, // Email penerima
        subject: "Akun Anda Telah Dibuat", // Subjek email
        html: `
            <h1>Selamat Datang, ${fullName}!</h1>
            <p>Akun Anda telah berhasil dibuat di aplikasi kami.</p>
            <p>Berikut adalah detail akun Anda:</p>
            <p>Email: ${toEmail}</p>
            <p>Password: ${plainPassword}</p>
            <p>Silakan login dan ubah kata sandi Anda setelah login.</p>
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
