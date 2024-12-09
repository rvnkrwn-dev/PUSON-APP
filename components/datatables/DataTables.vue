<template>
  <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="p-1.5 min-w-full inline-block align-middle">
        <div class="border rounded-lg shadow overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">ID</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Tipe</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Waktu dan Tanggal</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Perangkat</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">IP Address</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Lokasi</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Deskripsi</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">001</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Login</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">2024-12-09 10:00:00</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Mobile</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">192.168.1.1</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">New York, USA</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">User logged in from mobile device.</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">002</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Upload File</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">2024-12-09 10:15:30</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Web</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">203.0.113.5</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Jakarta, ID</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Document uploaded: report.pdf</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">003</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Purchase</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">2024-12-09 11:00:00</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Desktop</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">198.51.100.1</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">London, UK</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Purchase initiated for Laptop XYZ (Pending payment)</td>
            </tr>
            </tbody>

          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>