<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Tambah Puskesmas</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2 overflow-y-auto">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          <div class="grid grid-cols-3">
            <label for="name" class="block text-sm font-medium mb-2 w-full">Nama Lengkap</label>
            <input type="text" id="name"
                   v-model="name"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Masukan nama">
          </div>
          <div class="grid grid-cols-3">
            <label for="phone" class="block text-sm font-medium mb-2 w-full">Nomer telepon</label>
            <input type="text" id="phone"
                   v-model="phone"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Masukan nomer telepon">
          </div>
          <div class="grid grid-cols-3">
            <label for="address" class="block text-sm font-medium mb-2 w-full">Alamat</label>
            <textarea id="address"
                   v-model="address"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Masukan alamat" />
          </div>
          <div class="space-x-3 self-end">
            <button type="submit"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const {$toast} = useNuxtApp();

const name = ref(null)
const address = ref(null)
const phone = ref(null)


const handleSubmit = async () => {
  try {
    await useFetchApi('/api/auth/puskesmas', {
      method: 'POST',
      body: {
        name: name.value,
        address: address.value,
        phone: phone.value,
      }
    })

    $toast('Berhasil menambahkan puskesmas baru.', 'success');
  } catch (error) {
    $toast('Gagal menambahkan puskesmas baru.', 'success');
  }
}
</script>

<style lang="css" scoped>
</style>