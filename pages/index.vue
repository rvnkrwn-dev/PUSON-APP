<template>
  <!-- Breadcrumb -->
  <div
      class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden">
    <div class="flex items-center py-2">
      <!-- Navigation Toggle -->
      <button type="button"
              class="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
        <span class="sr-only">Toggle Navigation</span>
        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M15 3v18"/>
          <path d="m8 9 3 3-3 3"/>
        </svg>
      </button>
      <!-- End Navigation Toggle -->

      <!-- Breadcrumb -->
      <ol class="ms-3 flex items-center whitespace-nowrap">
        <li class="flex items-center text-sm text-gray-800">
          Aplikasi
          <svg class="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 " width="16"
               height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round"/>
          </svg>
        </li>
        <li class="text-sm font-semibold text-gray-800 truncate" aria-current="page">
          Dashboard
        </li>
      </ol>
      <!-- End Breadcrumb -->
    </div>
  </div>
  <!-- End Breadcrumb -->

  <div class="w-full lg:ps-64">
    <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <!--   Cards Stats   -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <!-- Card -->
        <div class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Total Puskesmas
              </p>
              <div class="hs-tooltip">
                <div class="hs-tooltip-toggle">
                  <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  <span
                      class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                      role="tooltip">
                    Total Puskesmas Aktif
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                2000
              </h3>
            </div>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Total Posyandu
              </p>
              <div class="hs-tooltip">
                <div class="hs-tooltip-toggle">
                  <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  <span
                      class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                      role="tooltip">
                    Total Posyandu Aktif
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                2000
              </h3>
            </div>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Total Anak
              </p>
              <div class="hs-tooltip">
                <div class="hs-tooltip-toggle">
                  <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  <span
                      class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                      role="tooltip">
                    Total Anak Aktif
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                2000
              </h3>
            </div>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Total Pengguna
              </p>
              <div class="hs-tooltip">
                <div class="hs-tooltip-toggle">
                  <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  <span
                      class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                      role="tooltip">
                    Total Pengguna Aktif
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                2000
              </h3>
            </div>
          </div>
        </div>
        <!-- End Card -->
      </div>

      <!--   Card Graph   -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <!-- Card -->
        <div
            class="p-4 md:col-span-2 md:p-5 min-h-[410px] flex flex-col bg-white border shadow-sm rounded-xl">
          <!-- Header -->
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-sm text-gray-500">
                Anak
              </h2>
              <p class="text-xl sm:text-2xl font-medium text-gray-800">
                100
              </p>
            </div>

            <div>
              <span
                  class="py-[5px] px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-md bg-red-100 text-red-800">
                <svg class="inline-block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                     stroke-linejoin="round">
                  <path d="M12 5v14"/>
                  <path d="m19 12-7 7-7-7"/>
                </svg>
                2%
              </span>
            </div>
          </div>
          <!-- End Header -->

          <div id="hs-single-area-chart" class="h-full w-full">
            <ChartAreaChart
                :series="chartData"
                :categories="categories"
                :color="chartColors"
            />
          </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div
            class="p-4 col-span-1 md:p-5 min-h-[410px] flex flex-col bg-white border shadow-sm rounded-xl">
          <!-- Header -->
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-sm text-gray-500">
                Anak
              </h2>
              <p class="text-xl sm:text-2xl font-medium text-gray-800">
                100
              </p>
            </div>

            <div>
              <span
                  class="py-[5px] px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-md bg-red-100 text-red-800">
                <svg class="inline-block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                     stroke-linejoin="round">
                  <path d="M12 5v14"/>
                  <path d="m19 12-7 7-7-7"/>
                </svg>
                2%
              </span>
            </div>
          </div>
          <!-- End Header -->

          <div id="hs-single-area-chart" class="h-full w-full flex flex-col justify-center items-center">
            <ChartDonutChart
                :series="chartDataDonut"
                :labels="chartLabels"
                :colors="chartColors"
            />
            <!-- Legend Indicator -->
            <div class="flex justify-center sm:justify-end items-center gap-x-4 mt-3 sm:mt-6">
              <div class="inline-flex items-center">
                <span class="size-2.5 inline-block bg-blue-600 rounded-sm me-2"></span>
                <span class="text-[13px] text-gray-600 dark:text-neutral-400">Income</span>
              </div>
              <div class="inline-flex items-center">
                <span class="size-2.5 inline-block bg-cyan-500 rounded-sm me-2"></span>
                <span class="text-[13px] text-gray-600 dark:text-neutral-400">Outcome</span>
              </div>
            </div>
          </div>
        </div>
        <!-- End Card -->
      </div>

      <div
          class="p-4 md:p-5 h-fit max-h-[410px] flex flex-col bg-white border shadow-sm rounded-xl">
        <!-- Header -->
        <div class="flex justify-between items-center p-2">
          <h2 class="text-xl font-medium text-gray-800">
            Aktivitas Terbaru
          </h2>
        </div>
        <!-- End Header -->

        <div id="recently-activities" class="h-full w-full">
          <DatatablesDataTables/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Data untuk grafik area
const chartData = ref([
  {
    name: 'Pendapatan',
    data: [30, 40, 45, 50, 49, 60, 70], // Data untuk grafik
  },
  {
    name: 'Pengeluaran',
    data: [20, 25, 35, 45, 40, 60, 65], // Data untuk grafik
  },
]);

const chartDataDonut = ref([47, 23]);

// Labels untuk setiap bagian donut (misalnya kategori produk atau wilayah)
const chartLabels = ref(['Produk A', 'Produk B']);

// Kategori sumbu X (misalnya minggu atau bulan)
const categories = ref([
  'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'
]);

// Warna untuk setiap garis pada grafik
const chartColors = ref(['#2563EB', '#22d3ee']); // Warna garis yang berbeda
</script>

<style scoped>

</style>