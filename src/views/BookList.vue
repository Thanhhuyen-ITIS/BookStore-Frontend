<template>
  <p class="m-6 text-center font-bold text-2xl text-yellow-800 mb-4 mt-8">
    DANH SÁCH SẢN PHẨM
  </p>
  <div class="flex justify-center">
    <input
      type="text"
      v-model="textSearch"
      placeholder="Search"
      class="border border-slate-500 rounded-md p-1 mb-8"
    />
  </div>
  <div class="flex justify-end xl:mr-32 mb-5" v-if="isAdmin">
    <button @click="addBook" class="p-2 bg-green-800 text-white rounded-md m-1">
      Thêm sản phầm
    </button>
  </div>

  <div
    class="flex flex-wrap xl:pl-32 xl:p-4 bg-slate-50 rounded-md xl:ml-32 xl:mr-32"
    v-if="bookList"
  >
    <div
      v-for="book in bookList"
      :key="book.id"
      class="mr-6 mb-3 p-4 rounded-md shadow-sm bg-white hover:shadow-xl transition duration-600 ease-in-out w-60 h-auto flex flex-col justify-between"
    >
      <div
        @click="bookDetail($event, book.id)"
        class="hover:cursor-pointer mb-2"
      >
        <div class="flex justify-center">
          <img :src="book.picture" alt="book" class="p-2 w-40 h-56" />
        </div>

        <p class="text-yellow-950 font-bold text-lg">{{ book.title }}</p>
        <p class="">{{ book.author }}</p>
      </div>

      <div class="flex justify-end">
        <p class="text-red-600 font-bold pb-1 pt-1 mr-6">
          Giá: {{ book.cost }}đ
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { bookService } from "@/services/bookService";
import { userService } from "@/services/userService";
export default {
  setup() {
    const { getUser, user } = userService();

    const { getBooks } = bookService();
    const books = ref([]);
    const isAdmin = ref(false);

    const route = useRouter();
    const textSearch = ref("");

    const bookList = computed(() => {
      return books.value.filter((book) =>
        book.title.toLowerCase().includes(textSearch.value.toLowerCase())
      );
    });

    async function addBook() {
      await route.push({ name: "bookdetail", params: { id: -1 } });
    }
    async function deleteBook(event, id) {
      console.log(id);
    }
    async function bookDetail(event, id) {
      await route.push({ name: "bookdetailuser", params: { id: id } });
    }

    onMounted(async () => {
      await getUser();
      isAdmin.value = user.value && user.value.id_role == 1 ? true : false;
      books.value = await getBooks();
    });
    return {
      bookList,
      addBook,
      bookDetail,
      isAdmin,
      getBooks,
      textSearch,
      deleteBook,
    };
  },
};
</script>
<style scoped></style>
