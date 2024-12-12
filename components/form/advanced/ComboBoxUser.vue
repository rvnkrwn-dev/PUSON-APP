<template>
  <div class="relative space-y-3">
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
        <svg
            class="shrink-0 size-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </div>
      <input
          class="py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          type="text"
          role="combobox"
          aria-expanded="false"
          placeholder="Type a name"
          v-model="searchText"
          @input="onSearch"
      />
    </div>

    <!-- SearchBox Dropdown -->
    <div v-if="dropdownVisible" class="absolute w-full z-50 bg-white border border-gray-200 rounded-lg">
      <div class="max-h-72 rounded-b-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        <div v-for="user in filteredUsers" :key="user.id" @click="handleSelectUser(user)" class="py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer">
          <div class="flex items-center w-full">
            <div class="flex items-center justify-center rounded-full bg-gray-200 size-6 overflow-hidden me-2.5">
              <img class="shrink-0" :src="user.url_profile" :alt="user.full_name" />
            </div>
            <div class="flex justify-between w-full">
              <span>{{ user.full_name }}</span>
              <span>{{ user.email }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End SearchBox Dropdown -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface User {
  id: number;
  full_name: string;
  url_profile: string;
}

const emits = defineEmits(['selectedUser']);

const searchText = ref('');
const dropdownVisible = ref(false);
const users = ref<User[]>([]);
const selectedUser = ref(null)

const filteredUsers = computed(() =>
    users.value.filter((user) =>
        user.full_name.toLowerCase().includes(searchText.value.toLowerCase())
    )
);

const onSearch = async () => {
  // Menampilkan dropdown saat ada teks pencarian
  dropdownVisible.value = searchText.value.length > 0;

  console.log(dropdownVisible.value);

  // Mengambil data pengguna berdasarkan query pencarian
  if (searchText.value.length > 0) {
    try {
      const response = await useFetchApi(`/api/auth/users/search?q=${searchText.value}`);
      users.value = response.data.users;
    } catch (error) {
      console.error('Error fetching users:', error);
      users.value = []; // Set daftar pengguna menjadi kosong jika terjadi error
    }
  } else {
    users.value = []; // Jika tidak ada teks pencarian, kosongkan daftar pengguna
  }
};

const handleSelectUser = (user: User) => {
  searchText.value = user.full_name; // Set teks pencarian dengan nama pengguna yang dipilih
  selectedUser.value = user;
  dropdownVisible.value = false; // Sembunyikan dropdown setelah pemilihan
  emits("selectedUser", user);
};

</script>

<style scoped>
/* Custom styles for SearchBox component */
</style>
