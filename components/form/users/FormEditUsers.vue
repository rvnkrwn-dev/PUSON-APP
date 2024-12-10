<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Ubah Pengguna</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2">
      <form v-if="selectedUser" @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          <div class="grid grid-cols-3">
            <label for="name" class="block text-sm font-medium mb-2 w-full">Nama Lengkap</label>
            <input type="text" id="name"
                   v-model="fullName"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Masukan nama">
          </div>
          <div class="grid grid-cols-3">
            <label for="email" class="block text-sm font-medium mb-2 w-full">Email</label>
            <input type="email" id="email"
                   v-model="email"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Masukan email">
          </div>
          <div class="grid grid-cols-3">
            <label for="role" class="block text-sm font-medium mb-2 w-full">Role</label>
            <select id="role"
                    v-model="role"
                    class="py-3 px-4 pe-9 block col-span-2 w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <option value="null" selected>-Pilih-</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin_puskesmas">Admin Puskesmas</option>
              <option value="admin_posyandu">Admin Posyandu</option>
              <option value="user">User</option>
            </select>
          </div>
          <div class="grid grid-cols-3">
            <label for="status" class="block text-sm font-medium mb-2 w-full">Status</label>
            <select id="status"
                    v-model="status"
                    class="py-3 px-4 pe-9 block col-span-2 w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <option value="null" selected>-Pilih-</option>
              <option value="active">active</option>
              <option value="suspend">suspend</option>
              <option value="pending">pending</option>
            </select>
          </div>
          <div class="space-x-3 self-end">
            <button type="submit"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
              Simpan
            </button>
          </div>
        </div>
      </form>
      <div v-else>
        <label for="hs-combobox-basic-usage" class="block text-sm font-medium mb-2 w-full">Cari
          pengguna</label>
        <client-only>
          <div class="w-full inline-flex relative" data-hs-combo-box="">
            <div class="relative w-full">
              <input class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" role="combobox" aria-expanded="false" value="Argentina" data-hs-combo-box-input="">
              <div class="absolute top-1/2 end-3 -translate-y-1/2" data-hs-combo-box-toggle="">
                <svg class="shrink-0 size-3.5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m7 15 5 5 5-5"></path>
                  <path d="m7 9 5-5 5 5"></path>
                </svg>
              </div>
            </div>
            <div class="absolute z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto" style="display: none;" data-hs-combo-box-output="">
              <div class="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" tabindex="0" data-hs-combo-box-output-item="">
                <div class="flex justify-between items-center w-full">
                  <span data-hs-combo-box-search-text="Argentina" data-hs-combo-box-value="">Argentina</span>
                  <span class="hidden hs-combo-box-selected:block">
          <svg class="shrink-0 size-3.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
                </div>
              </div>
              <div class="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" tabindex="1" data-hs-combo-box-output-item="">
                <div class="flex justify-between items-center w-full">
                  <span data-hs-combo-box-search-text="Brazil" data-hs-combo-box-value="">Brazil</span>
                  <span class="hidden hs-combo-box-selected:block">
          <svg class="shrink-0 size-3.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
                </div>
              </div>
              <div class="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" tabindex="2" data-hs-combo-box-output-item="">
                <div class="flex justify-between items-center w-full">
                  <span data-hs-combo-box-search-text="China" data-hs-combo-box-value="">China</span>
                  <span class="hidden hs-combo-box-selected:block">
          <svg class="shrink-0 size-3.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
                </div>
              </div>
              <div class="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" tabindex="3" data-hs-combo-box-output-item="">
                <div class="flex justify-between items-center w-full">
                  <span data-hs-combo-box-search-text="USA" data-hs-combo-box-value="">USA</span>
                  <span class="hidden hs-combo-box-selected:block">
          <svg class="shrink-0 size-3.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
                </div>
              </div>
              <div class="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" tabindex="3" data-hs-combo-box-output-item="">
                <div class="flex justify-between items-center w-full">
                  <span data-hs-combo-box-search-text="Italy" data-hs-combo-box-value="">Italy</span>
                  <span class="hidden hs-combo-box-selected:block">
          <svg class="shrink-0 size-3.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
                </div>
              </div>
              <div class="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" tabindex="3" data-hs-combo-box-output-item="">
                <div class="flex justify-between items-center w-full">
                  <span data-hs-combo-box-search-text="France" data-hs-combo-box-value="">France</span>
                  <span class="hidden hs-combo-box-selected:block">
          <svg class="shrink-0 size-3.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
                </div>
              </div>
            </div>
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {$toast} = useNuxtApp();

const usersData = ref()
const selectedUser = ref(null)
const fullName = ref(null)
const email = ref(null)
const role = ref(null)
const status = ref(null)

const users = computed(() => usersData.value || [])

const fetchUsers = async () => {
  try {
    const response: any = await useFetchApi(`/api/auth/users?page=1&pagesize=10`);
    usersData.value = response?.data?.users;
  } catch (e) {
    console.error(e);
  }
}

const handleSubmit = async () => {
  try {
    await useFetchApi('/api/auth/users', {
      method: 'POST',
      body: {
        full_name: fullName.value,
        email: email.value,
        role: role.value,
        status: status.value
      }
    })

    $toast('Berhasil menambahkan pengguna baru.', 'success');
  } catch (error) {
    $toast('Gagal menambahkan pengguna baru.', 'success');
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style lang="css" scoped>
</style>