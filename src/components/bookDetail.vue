<template>
  <div class="flex border border-gray-200 shadow-sm p-12 pl-32" v-if="book">
    <div class="w-1/4 mr-10">
      <img
        :src="book.picture"
        alt=""
        class="h-full w-fit p-2 shadow-sm shadow-gray-300"
      />
    </div>
    <div class="p-6">
      <div class="">
        <p class="font-medium text-3xl break-words">
          Tên sách: {{ book.title }}
        </p>
        <p>Tác giả: {{ book.author }}</p>
        <p>Ngày phát hành: {{ book.release_date }}</p>
        <p>Số Trang: {{ book.page }}</p>
      </div>

      <div class="mt-10 mb-6">
        <p class="text-emerald-900 font-bold text-lg">{{ book.cost }}đ</p>
      </div>
      <div class="mb-3">
        <label for="" class="mr-2">Số lượng</label>
        <button
          @click="decrement"
          class="px-3 py-2 rounded-l bg-gray-200 hover:bg-gray-300"
          :disabled="book.stock < 1"
        >
          -
        </button>
        <input
          type="text"
          v-model="count"
          readonly
          class="flex-1 p-2 bg-gray-100 text-center w-14"
        />
        <button
          @click="increment"
          class="px-3 py-2 rounded-r bg-gray-200 hover:bg-gray-300"
          :disabled="book.stock < 1"
        >
          +
        </button>
        <p>{{ book.stock > 0 ? "Còn lại: " + book.stock : "Hết hàng" }}</p>
      </div>
      <div>
        <button
          class="text-white p-2 shadow-sm"
          :class="
            book.stock == 0 ? 'bg-gray-500 cursor-default' : 'bg-orange-600'
          "
          @click="addToCart"
          :disabled="book.stock < 1"
        >
          Thêm giỏ hàng
        </button>
      </div>
    </div>
  </div>
  <div class="border border-gray-200 shadow-sm mt-4 p-4" v-if="book">
    <p class="text-gray-400">Mô tả</p>
    <p>{{ book.about }}</p>
  </div>
  <div class="fixed top-8 left-1/4 w-2/4 flex justify-center" v-if="isnoti">
    <p class="text-center bg-white text-black p-2 shadow-md shadow-gray-400">
      {{ noti }}
    </p>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { bookService } from "@/services/bookService";
import { cartService } from "@/services/cartService";

export default {
  props: {
    id_book: Object,
  },
  setup(props) {
    const noti = ref("Thêm giỏ hàng thành công");
    const isnoti = ref(false);
    const idBook = ref(props.id_book);
    const { getBook } = bookService();
    const book = ref();
    const { addCart } = cartService();
    const cart = ref({
      id_book: null,
      count: null,
    });

    const count = ref(1);
    function increment() {
      if (count.value < book.value.stock) count.value++; // Tăng giá trị lên 1
    }
    function decrement() {
      if (count.value > 1) {
        count.value--; // Giảm giá trị đi 1 (nếu giá trị > 0)
      }
    }
    async function addToCart() {
      cart.value.id_book = idBook.value;
      cart.value.count = count.value;
      noti.value = await addCart(cart.value);
      isnoti.value = true;
      setTimeout(() => {
        isnoti.value = false;
      }, 500);
      count.value = 1;
    }
    onMounted(async () => {
      book.value = await getBook(idBook.value);
    });
    return {
      increment,
      decrement,
      book,
      count,
      addToCart,
      noti,
      isnoti,
    };
  },
};
</script>
