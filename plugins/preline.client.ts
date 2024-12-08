import Dropzone from 'dropzone'; // Impor Dropzone
import _ from 'lodash'; // Impor Lodash
import "preline/preline"; // Impor Preline
import { type IStaticMethods } from "preline/preline"; // Impor tipe IStaticMethods dari Preline

declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}

// Pastikan Dropzone dimasukkan ke dalam window (global scope) jika dibutuhkan oleh Preline
if (typeof window !== 'undefined') {
    window.Dropzone = Dropzone; // Menambahkan Dropzone ke window secara eksplisit
}

if (typeof window !== 'undefined') {
    window._ = _; // Menambahkan Lodash ke window secara eksplisit
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("page:finish", () => {
        if (window.HSStaticMethods) {
            try {
                // Inisialisasi Preline
                window.HSStaticMethods.autoInit();
            } catch (error) {
                console.error("Gagal menginisialisasi Preline:", error);
            }
        } else {
            console.warn("HSStaticMethods belum tersedia.");
        }
    });
});
