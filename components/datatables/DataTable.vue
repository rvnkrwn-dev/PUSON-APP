<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center">
      <h2 class="text-xl font-medium text-gray-800 w-full">{{ title }}</h2>
      <div class="relative w-full max-w-xs">
        <label for="hs-table-search" class="sr-only">Search</label>
        <input
            type="text"
            name="hs-table-search"
            id="hs-table-search"
            class="py-2 px-3 ps-9 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Search for items"
        />
        <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
          <svg class="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
      </div>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2 overflow-y-auto">
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="border rounded-lg shadow overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                  <!-- Generate dynamic columns based on props.fields -->
                  <th
                      v-for="(field,i) in fields"
                      :key="i"
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    {{ field.label }}
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                <!-- Render rows dynamically based on props.data -->
                <tr v-for="(row, index) in data" :key="index">
                  <td
                      v-for="field in fields"
                      :key="field.key"
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                  >
                    {{ row[field.key] }}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav class="flex items-center gap-x-1" aria-label="Pagination">
      <button
          type="button"
          class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Previous"
          :disabled="currentPage === 1"
          @click="changePage(prevPage, currentPage -1)"
      >
        <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span class="sr-only">Previous</span>
      </button>

      <div class="flex items-center gap-x-1">
        <span
            class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          {{ currentPage }}
        </span>
        <span class="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm">of</span>
        <span class="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm">{{ totalPages }}</span>
      </div>

      <button
          type="button"
          class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Next"
          @click="changePage(nextPage, currentPage + 1)"
          :disabled="currentPage === totalPages"
      >
        <span class="sr-only">Next</span>
        <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
    <!-- End Pagination -->
  </div>
</template>

<script setup lang="ts">
// Define the props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  fields: {
    type: Array as () => Array<{ label: string; key: string }>,
    required: true,
  },
  data: {
    type: Array as () => Array<Record<string, any>>,
    required: true,
  },
  perPage: {
    type: Number,
    default: 10,
  },
  totalPages: {
    type: Number,
    required: true, // Prop totalPages diterima dari komponen induk
  },
  currentPage: {
    type: Number,
    default: 1
  },
  prevPage: {
    type: String,
    default: null,
  },
  nextPage: {
    type: String,
    default: null,
  }
});

const emits = defineEmits(['fetchData'])

const changePage = (url: string, currentPage: number) => {
  const payload = {url, currentPage};
  emits('fetchData', payload)
}
</script>


<style lang="css" scoped>
</style>