<template>
  <div v-if="book && cart">
    <p v-if="book.stock < cart.count" class="text-center mt-2 text-red-500">
      {{ message }}
    </p>
    <div class="flex justify-around">
      <div class="flex">
        <img
          :src="book.picture"
          alt=""
          class="mr-7 m-4 w-40 h-56 cursor-pointer"
          @click="goBookDetail"
        />
        <div class="flex flex-col justify-center">
          <p class="font-bold text-amber-900 text-lg">
            Tên sách: {{ book.title }}
          </p>
          <p>Tác giả: {{ book.author }}</p>
          <p>Số trang: {{ book.page }}</p>
        </div>
      </div>
      <p class="font-bold flex items-center">{{ book.cost }} đ</p>
      <div class="flex items-center justify-around" :disabled="isChoose">
        <button
          @click="decrement"
          class="px-3 py-2 rounded-l bg-gray-200 hover:bg-gray-300"
          :disabled="isChoose"
        >
          -
        </button>
        <input
          type="text"
          v-model="cart.count"
          readonly
          class="flex-1 p-2 bg-gray-100 text-center w-10"
        />
        <button
          @click="increment"
          class="px-3 py-2 rounded-r bg-gray-200 hover:bg-gray-300"
          :disabled="isChoose"
        >
          +
        </button>
      </div>
      <div class="flex flex-col justify-around">
        <div class="flex justify-end">
          <button
            @click="toggleThisBook"
            class="p-2 rounded-md hover:shadow-sm text-white bg-emerald-900 mr-4"
            :class="
              isChoose || book.stock < cart.count ? 'bg-gray-300' : 'bg-red-500'
            "
            :disabled="book.stock < cart.count"
          >
            {{ isChoose ? "Bỏ chọn" : "Chọn" }}
          </button>
          <button
            class="p-2 rounded hover:shadow-sm text-white bg-zinc-700 mr-4"
            @click="onDeleteCart"
          >
            Xóa
          </button>
        </div>
        <p>Thanh toán: {{ cart.count * book.cost }}đ</p>
      </div>
    </div>
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
import { useRouter } from "vue-router";

export default {
  emits: ["onRemoveFromOrder", "onAddToOrder"],
  props: {
    idCartDetail: Number,
  },
  setup(props, context) {
    const router = useRouter();

    const message = ref("Số hàng còn lại không đủ. Vui lòng thay đổi");
    const noti = ref("Đã xóa khỏi giỏ hàng");
    const isnoti = ref(false);
    const isChoose = ref(false);
    const idcart = ref(props.idCartDetail);
    const { getBook } = bookService();
    const book = ref();
    const { getCart, updateCart, deleteCart } = cartService();
    const cart = ref();

    async function increment() {
      cart.value.count++; // Tăng giá trị lên 1
      await updateCart(idcart.value, { count: cart.value.count });
    }
    async function decrement() {
      if (this.cart.count > 1) {
        cart.value.count--; // Giảm giá trị đi 1 (nếu giá trị > 0)
        await updateCart(idcart.value, { count: cart.value.count });
      }
    }

    function toggleThisBook() {
      if (isChoose.value) {
        isChoose.value = !isChoose.value;
        context.emit("onRemoveFromOrder", { cart, book });
      } else {
        isChoose.value = !isChoose.value;
        context.emit("onAddToOrder", { cart, book });
      }
    }
    async function onDeleteCart() {
      const confirm = window.confirm("Bạn có muốn xóa sách này không?");
      if (!confirm) return;
      await deleteCart(cart.value.id);
      cart.value = null;
      book.value = null;
      isnoti.value = true;
      setTimeout(() => {
        isnoti.value = false;
      }, 500);
    }

    function goBookDetail() {
      router.push({
        name: "bookdetailuser",
        params: { id: cart.value.id_book },
      });
    }

    onMounted(async () => {
      cart.value = await getCart(idcart.value);
      if (cart.value) {
        book.value = await getBook(cart.value.id_book);
      }
    });
    return {
      book,
      cart,
      increment,
      decrement,
      toggleThisBook,
      isChoose,
      onDeleteCart,
      noti,
      isnoti,
      message,
      goBookDetail,
    };
  },
};
</script>
