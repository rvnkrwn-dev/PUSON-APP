<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Tambah Pengguna</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2 overflow-y-auto">
      <form>
        <div class="space-y-4 flex flex-col">
          <div class="grid grid-cols-3">
            <label for="name" class="block text-sm font-medium mb-2 w-full">Nama Lengkap</label>
            <input type="text" id="name"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Masukan nama">
          </div>
          <div class="grid grid-cols-3">
            <label for="email" class="block text-sm font-medium mb-2 w-full">Email</label>
            <input type="email" id="email"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Masukan email">
          </div>
          <div class="grid grid-cols-3">
            <label for="role" class="block text-sm font-medium mb-2 w-full">Role</label>
            <select id="role"
                    class="py-3 px-4 pe-9 block col-span-2 w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <option selected>-Pilih-</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin_puskesmas">Admin Puskesmas</option>
              <option value="admin_posyandu">Admin Posyandu</option>
              <option value="user">User</option>
            </select>
          </div>
          <div class="grid grid-cols-3">
            <label for="status" class="block text-sm font-medium mb-2 w-full">Status</label>
            <select id="status"
                    class="py-3 px-4 pe-9 block col-span-2 w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <option selected>-Pilih-</option>
              <option value="active">active</option>
              <option value="suspend">suspend</option>
              <option value="pending">pending</option>
            </select>
          </div>
          <div class="space-x-3 self-end">
            <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-500 text-red-500 hover:border-red-400 hover:text-red-400 focus:outline-none focus:border-red-400 focus:text-red-400 disabled:opacity-50 disabled:pointer-events-none">
              Batal
            </button>
            <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="css" scoped>
</style>