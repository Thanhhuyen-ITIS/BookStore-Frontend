<template>
  <div
    class="flex justify-center items-center text-black"
    v-if="isAdmin && book"
  >
    <form @submit.prevent="Submit">
      <p class="text-center text-black font-bold text-2xl p-1 mt-3">
        {{ i == -1 ? "Thêm sách" : "Chỉnh sửa thông tin sách" }}
      </p>
      <div class="flex p-1 justify-between">
        <div>
          <div class="flex">
            <div class="flex flex-col">
              <label for="title">Tên Sách*</label>
              <input
                type="text"
                id="title"
                required
                v-model="book.title"
                class="p-1 mr-3 rounded-md"
                :disabled="!isEdit"
              />
            </div>
            <div class="flex flex-col">
              <label for="author">Tác giả</label>
              <input
                type="text"
                id="author"
                required
                v-model="book.author"
                class="p-1 mr-3 rounded-md"
                :disabled="!isEdit"
              />
            </div>
          </div>
          <div class="flex flex-col">
            <label for="about">Mô tả</label>
            <textarea
              type="text"
              id="about"
              v-model="book.about"
              :disabled="!isEdit"
              class="whitespace-pre-wrap break-words overflow-auto resize-y h-20 border border-amber-800 border-opacity-30 p-1 mr-3 rounded-md"
            />
          </div>
          <div>
            <div class="flex flex-col">
              <label for="release_date">Ngày phát hành</label>
              <input
                type="date"
                id="release_date"
                v-model="book.release_date"
                class="p-1 mr-3 rounded-md"
                :disabled="!isEdit"
              />
            </div>
            <div class="flex flex-col">
              <label for="page">Số trang</label>
              <input
                type="number"
                id="page"
                v-model="book.page"
                :disabled="!isEdit"
                class="p-1 mr-3 rounded-md"
              />
            </div>
          </div>
          <div class="flex">
            <div class="flex flex-col">
              <label for="cost">Giá*</label>
              <input
                type="number"
                id="cost"
                v-model="book.cost"
                class="p-1 mr-3 rounded-md"
                :disabled="!isEdit"
                required
              />
            </div>
            <div class="flex flex-col">
              <label for="stock">Số lượng còn lại*</label>
              <input
                type="number"
                id="stock"
                v-model="book.stock"
                class="p-1 mr-3 rounded-md"
                :disabled="!isEdit"
              />
            </div>
          </div>
          <div class="flex flex-col">
            <label for="category">Thể loại*</label>
            <select
              name="category"
              id="category"
              class="p-1 mr-3 rounded-md border border-amber-800 border-opacity-50"
              :disabled="!isEdit"
              v-model="book.id_category"
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                :selected="category.id === book.id_category"
                class="p-1"
              >
                {{ category.category }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center m-3">
          <div>
            <input
              type="file"
              @change="handleFileUpload"
              class="border-none"
              id="picture"
              :disabled="!isEdit"
              required
            />
          </div>
          <div
            class="flex justify-center w-60 h-80 border border-amber-800 border-opacity-50 rounded-md m-2"
          >
            <img
              :src="book.picture"
              alt="Uploaded Image"
              v-if="book.picture"
              class="mx-auto my-auto"
              required
            />
          </div>
        </div>
      </div>
      <div>
        <span class="text-center text-red-600 ml-5" v-if="err">{{ err }}</span>
      </div>
      <div class="flex justify-end">
        <button
          class="p-2 bg-yellow-800 text-white rounded-md"
          @click.prevent="statusFooter == 'Edit' ? changeStatus() : Submit()"
        >
          {{ statusFooter }}
        </button>
      </div>
    </form>
    <div class="fixed top-8 left-1/4 w-2/4 flex justify-center" v-if="isnoti">
      <p class="text-center bg-white text-black p-2 shadow-md shadow-gray-400">
        {{ noti }}
      </p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
//import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { categoryService } from "@/services/categoryService";
import { userService } from "@/services/userService";
import { bookService } from "@/services/bookService";

export default {
  setup() {
    const noti = ref("Thao tác thành công");
    const isnoti = ref(false);
    const { user, getUser } = userService();
    const { addBook, error, updateBook } = bookService();
    const { getBook } = bookService();
    const book = ref();
    const isAdmin = ref(false);
    const { categories, getCategories } = categoryService();

    const router = useRouter();
    const route = useRoute();
    const fileImage = ref();
    const urlImage = ref();
    const message = ref("");
    const err = ref("");
    const i = ref(route.params.id);
    //Edit/save/add
    const statusFooter = ref(i.value == -1 ? "Add" : "Edit");
    const isEdit = ref(i.value == -1 ? true : false);
    function changeStatus() {
      statusFooter.value = "Save";
      isEdit.value = true;
    }

    function handleFileUpload(event) {
      fileImage.value = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        urlImage.value = e.target.result;
        book.value.picture = urlImage.value;
      };

      reader.readAsDataURL(fileImage.value);
    }

    async function Submit() {
      err.value = null;
      if (!book.value.title || !book.value.picture || !book.value.cost) {
        err.value = "Vui lòng điền đầy đủ thông tin bắt buộc";
        return;
      }
      if (statusFooter.value == "Add") {
        await addBook(book.value);
      } else {
        await updateBook(book.value, i.value);
      }
      if (!error.value) {
        isnoti.value = true;
        setTimeout(() => {
          isnoti.value = false;
          router.push({ name: "bookmanager", params: {} });
        }, 500);
      } else {
        err.value = error.value;
      }
    }

    onMounted(async () => {
      await getUser();
      await getCategories();
      isAdmin.value = user.value && user.value.id_role === 1 ? true : false;
      if (i.value != -1) {
        book.value = await getBook(i.value);
      } else {
        book.value = {
          title: "",
          author: "",
          about: "",
          id_category: 1,
          release_date: null,
          picture: "",
          page: null,
          stock: 0,
          cost: null,
        };
      }
    });

    return {
      book,
      categories,
      fileImage,
      urlImage,
      handleFileUpload,
      Submit,
      err,
      message,
      i,
      statusFooter,
      isEdit,
      changeStatus,
      isAdmin,
      noti,
      isnoti,
    };
  },
};
</script>

<style scope>
label {
  padding: 4px;
  margin-top: 10px;
}
input {
  border: rgba(226, 181, 165, 0.623) solid 2px;
  padding: 4px;
  border-radius: 2px;
}
</style>
