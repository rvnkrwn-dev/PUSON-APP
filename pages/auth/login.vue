<template>
  <div class="w-full min-h-screen flex items-center justify-center md:block px-6 py-10 md:py-[172px]">
    <div class="bg-white sm:border sm:border-gray-200 rounded-xl sm:shadow-sm w-[500px] md:max-w-[500px] mx-auto">
      <div class="p-4 sm:p-10">
        <div class="text-center">
          <AppLogo/>
          <h1 class="block text-2xl font-bold text-gray-800 mt-4">Masuk</h1>
        </div>

        <div class="mt-5">
          <form @submit.prevent="handleSubmit">
            <div class="grid gap-y-4">
              <!-- Form Group -->
              <div>
                <label for="email" class="block text-sm mb-2">Email</label>
                <div class="relative">
                  <input v-model="email" type="email" id="email" name="email" placeholder="Masukan Email"
                         class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                         required aria-describedby="email-error">
                  <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg class="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                         aria-hidden="true">
                      <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                  </div>
                </div>
                <p class="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we
                  can get back to you</p>
              </div>
              <!-- End Form Group -->


              <!-- Form Group -->
              <div>
                <div class="flex justify-between items-center">
                  <label for="password" class="block text-sm mb-2">Kata Sandi</label>
                  <NuxtLink to="/auth/forget-password" class="text-sm text-blue-600">Lupa kata sandi?</NuxtLink>
                </div>
                <div class="relative">
                  <input v-model="password" id="password" type="password"
                         class="py-3 ps-4 pe-10 block w-full border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                         placeholder="Ulangi Kata Sandi">
                  <button type="button" data-hs-toggle-password='{
        "target": "#password"
      }'
                          class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600">
                    <svg class="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path class="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                      <path class="hs-password-active:hidden"
                            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                      <path class="hs-password-active:hidden"
                            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                      <line class="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                      <path class="hidden hs-password-active:block"
                            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle class="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
              </div>
              <!-- End Form Group -->

              <!-- Checkbox -->
              <div class="flex items-center">
                <div class="flex">
                  <input v-model="isRemember" id="remember-me" name="remember-me" type="checkbox"
                         class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500">
                </div>
                <div class="ms-3">
                  <label for="remember-me" class="text-sm">Ingat saya</label>
                </div>
              </div>
              <!-- End Checkbox -->

              <button type="submit"
                      :disabled="isLoading || !isRemember"
                      class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                {{ isLoading ? "Loading..." : "Daftar" }}
              </button>
            </div>
          </form>
          <!-- End Form -->
          <p class="mt-2 text-sm text-gray-600 text-center">
            Belum punya akun?
            <a href="/auth/register"
               class="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium">Daftar
              disini</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLogo from "~/components/AppLogo.vue"; // Impor komponen AppLogo untuk digunakan di template

// Menyediakan akses ke nuxtApp untuk mengambil instance nuxt dan memanfaatkan toast untuk notifikasi
const {$toast} = useNuxtApp();

// Mendeklarasikan state dengan tipe data yang sesuai untuk form login
const email = ref<string | null>(null); // email untuk form login
const password = ref<string | null>(null); // password untuk form login
const ipAddress = ref<string | null>(null); // ipAddress untuk mencatat alamat IP pengguna
const isRemember = ref<boolean>(false); // flag untuk mengingat pengguna (not used dalam kode ini)
const isLoading = ref<boolean>(false); // flag untuk menandakan proses loading

// Mendefinisikan tipe data untuk response IP address
interface ResponseIpAddress {
  ip: string; // properti ip pada response
}

// Fungsi untuk mengambil alamat IP pengguna dengan menggunakan API eksternal
const getIpAddressUser = async () => {
  try {
    isLoading.value = true; // Menandakan loading dimulai sebelum request
    // Melakukan request ke API untuk mendapatkan alamat IP pengguna
    const response: ResponseIpAddress = await $fetch<ResponseIpAddress>("https://api.ipify.org?format=json");
    ipAddress.value = response.ip; // Menyimpan hasil IP address ke state
  } catch (e) {
    console.error(e); // Menangani error jika request gagal
  } finally {
    isLoading.value = false; // Menandakan loading selesai, baik berhasil maupun gagal
  }
}

// Fungsi untuk menangani submit form login
const handleSubmit = async () => {
  try {
    isLoading.value = true; // Menandakan proses loading saat pengiriman form
    // Melakukan request POST ke endpoint API login dengan data form
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value, // Mengirimkan email dari form
        password: password.value, // Mengirimkan password dari form
        ip_address: ipAddress.value, // Mengirimkan alamat IP pengguna
      }
    });

    return navigateTo('/'); // Setelah login berhasil, arahkan ke halaman utama
  } catch (error: any) {
    console.log(error); // Menangani error jika login gagal
    $toast('Email atau kata sandi tidak cocok.', 'error'); // Menampilkan pesan kesalahan menggunakan toast
  } finally {
    isLoading.value = false; // Menandakan proses loading selesai, baik berhasil maupun gagal
  }
}

// Menjalankan fungsi getIpAddressUser ketika komponen dipasang (mounted)
onMounted(() => {
  getIpAddressUser(); // Mendapatkan IP address pengguna saat halaman dimuat
});
</script>

<style scoped>

</style>