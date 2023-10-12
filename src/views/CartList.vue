<template>
  <div class="pb-32" v-if="!isOrder">
    <div class="">
      <p class="m-6 text-center font-bold text-2xl text-yellow-800">
        DANH SÁCH GIỎ HÀNG
      </p>
    </div>
    <div
      v-for="cart in carts"
      :key="cart.id"
      class="border border-gray-300 border-opacity-40 rounded-md shadow-md p-2 xl:mr-40 m- xl:ml-40 mb-2"
    >
      <card-compo
        :idCartDetail="cart.id"
        @onAddToOrder="addToOrder($event)"
        @onRemoveFromOrder="removeFromOrder($event)"
      />
    </div>

    <div
      class="fixed text-black bg-slate-100 shadow-zinc-300 flex justify-between p-3 items-center w-full bottom-0"
    >
      <p class="font-extrabold text-xl text-green-900">
        Tổng tiền: {{ total }}
      </p>
      <button
        class="m-2 p-2 rounded-md text-white"
        :disabled="orders.length == 0"
        :class="orders.length == 0 ? 'bg-slate-500' : 'bg-orange-600'"
        @click="onOrder"
      >
        Đặt mua
      </button>
    </div>
  </div>
  <div v-if="isOrder">
    <bill-compo
      :myBooksOrder="booksOrder"
      :myOrders="orders"
      :total="total"
      @onCancel="cancel"
    />
  </div>
</template>
<script>
import CardCompo from "@/components/cardCompo.vue";
import { onMounted, ref } from "vue";
import BillCompo from "@/components/billCompo.vue";
import { userService } from "@/services/userService";
import { cartService } from "@/services/cartService";

export default {
  components: { CardCompo, BillCompo },

  setup() {
    const { user, getUser } = userService();
    const total = ref(0);
    const isOrder = ref(false);
    const { getCarts } = cartService();
    const carts = ref();

    const booksOrder = ref([]);
    const orders = ref([]);
    function addToOrder(data) {
      const { cart, book } = data;
      orders.value.push(cart.value);
      booksOrder.value.push(book.value);
      total.value = total.value + cart.value.count * book.value.cost;
    }
    function removeFromOrder(data) {
      const { cart, book } = data;
      for (let i = 0; i < orders.value.length; ++i) {
        if (orders.value[i].id == cart.value.id) {
          orders.value.splice(i, 1);
          booksOrder.value.slice(i, 1);
          total.value = total.value - cart.value.count * book.value.cost;
          break;
        }
      }
    }
    function onOrder() {
      isOrder.value = true;
    }
    function cancel() {
      booksOrder.value = [];
      orders.value = [];
      isOrder.value = false;
      total.value = 0;
    }

    onMounted(async () => {
      await getUser();
      if (user.value) {
        carts.value = await getCarts();
        carts.value.reverse();
      }
    });
    return {
      carts,
      addToOrder,
      removeFromOrder,
      total,
      isOrder,
      onOrder,
      orders,
      booksOrder,
      cancel,
    };
  },
};
</script>
