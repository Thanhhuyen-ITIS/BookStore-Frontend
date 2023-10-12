<template>
  <div class="flex flex-col items-center p-6 m-2">
    <p class="font-extrabold text-xl text-orange-900 mb-8">
      Danh sách Sản phầm
    </p>
    <div>
      <input
        type="text"
        v-model="textSearch"
        placeholder="Search"
        class="border border-slate-500 rounded-md p-1 mb-4"
      />
    </div>
    <div class="flex justify-end w-full">
      <button
        class="p-2 m-2 bg-green-700 text-white rounded-md xl:mr-28"
        @click="addBook"
      >
        Sách mới
      </button>
    </div>

    <table class="p-1 rounded-md border border-slate-400 xl:w-11/12">
      <thead class="table-header-group">
        <tr class="table-row">
          <th class="text-center">ID</th>
          <th class="text-center">Hình ảnh</th>
          <th class="text-center w-48">Tên sách</th>
          <th class="text-center w-36">Tác giả</th>

          <th class="text-center">Ngày xuất bản</th>
          <th class="text-center">Số trang</th>
          <th class="text-center">Giá</th>
          <th class="text-center">Sô lượt bán</th>
          <th class="text-centet">Còn lại</th>
          <th class="text-center">Thao tác</th>
          <th class="text-center"></th>
        </tr>
      </thead>
      <tbody class="table-row-group">
        <tr v-for="book in bookList" :key="book.id" class="table-row">
          <td class="text-center">{{ book.id }}</td>
          <td class="content-center">
            <div class="flex justify-center p-3">
              <img :src="book.picture" alt="" class="w-40 h-56" />
            </div>
          </td>
          <td class="text-center break-words">{{ book.title }}</td>
          <td class="text-center break-words">{{ book.author }}</td>

          <td class="text-center">{{ book.release_date }}</td>
          <td class="text-center">{{ book.page }}</td>
          <td class="text-center">{{ book.cost }}</td>
          <td class="text-center">{{ book.quatity_sold }}</td>
          <td class="text-center">{{ book.stock }}</td>

          <td class="text-center">
            <button class="bg-lime-600 text-white rounded-md p-2">
              <router-link
                :to="{ name: 'bookdetail', params: { id: book.id } }"
                class=""
                >View</router-link
              >
            </button>
            <button
              class="p-2 m-3 bg-red-700 text-white rounded-md"
              @click="onDeleteBook($event, book.id)"
            >
              Delete
            </button>
          </td>
          <td class="text-center w-6"></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="fixed top-8 left-1/4 w-2/4 flex justify-center" v-if="isnoti">
    <p class="text-center bg-white text-black p-2 shadow-md shadow-gray-400">
      {{ noti }}
    </p>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { bookService } from "@/services/bookService";
import { userService } from "@/services/userService";
import { categoryService } from "@/services/categoryService";
import { useRouter } from "vue-router";

export default {
  setup() {
    const noti = ref("Xóa sách thành công");
    const isnoti = ref(false);
    const { user, getUser } = userService();
    const { getBooks, deleteBook } = bookService();
    const books = ref([]);
    const { categories, getCategories } = categoryService();
    const isAdmin = ref(false);
    const textSearch = ref("");

    const router = useRouter();

    const bookList = computed(() => {
      return books.value.filter((book) =>
        book.title.toLowerCase().includes(textSearch.value.toLowerCase())
      );
    });

    function addBook() {
      router.push({ name: "bookdetail", params: { id: -1 } });
    }
    async function onDeleteBook(event, id) {
      const confirm = window.confirm("Bạn có muốn xóa sách này không?");
      if (!confirm) return;
      await deleteBook(id);
      books.value = await getBooks();
      isnoti.value = true;
      setTimeout(() => {
        isnoti.value = false;
      }, 500);
    }
    onMounted(async () => {
      await getCategories();
      books.value = await getBooks();
      await getUser();
      if (user.value) {
        isAdmin.value = user.value && user.value.id_role == 1 ? true : false;
      }
    });
    return {
      bookList,
      categories,
      textSearch,
      addBook,
      onDeleteBook,
      noti,
      isnoti,
    };
  },
};
</script>

<style scope>
th,
td {
  margin: 5px;
  padding: 6px;
  border: 1px solid;
  border-color: rgb(148 163 184);
}
.table-row:hover {
  background: #f4f3f2;
}
.table-header-group {
  font-size: medium;
  color: rgb(166, 162, 160);
  background: #edece8;
}
</style>
