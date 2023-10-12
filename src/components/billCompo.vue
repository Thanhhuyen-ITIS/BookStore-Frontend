<template>
  <div
    class="xl:mr-60 xl:ml-60 p-2 xl:m-5 border border-amber-300 rounded-md shadow-sm shadow-orange-200"
  >
    <form @submit.prevent="Submit" class="p-4 m-4">
      <p class="font-extrabold text-2xl text-orange-900 text-center p-5">
        Thông tin đặt hàng
      </p>
      <div>
        <div class="flex flex-col">
          <div class="mt-4">
            <label for="name" class="mr-4 h-80">Tên Khách Hàng</label>
            <input
              type="text"
              id="name"
              required
              class="border border-gray-500 p-1 border-opacity-25 rounded-sm"
              v-model="order.name"
            />
          </div>
          <div class="mt-4">
            <label for="address" class="mr-4">Địa chỉ</label>
            <input
              type="text"
              name="address"
              id="address"
              required
              class="border border-gray-500 p-1 border-opacity-25 rounded-sm"
              v-model="order.address"
            />
          </div>
        </div>

        <table class="table-auto p-1 m-1 mb-6">
          <thead>
            <tr>
              <th>Tên sách</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, id) in orders" :key="id" class="">
              <td>{{ booksOrder[id].title }}</td>
              <td>{{ booksOrder[id].cost }}</td>
              <td>{{ order.count }}</td>
              <td>{{ order.total_price }}</td>
            </tr>
            <tr class="font-bold text-base">
              <td>Thành tiền</td>
              <td></td>
              <td></td>
              <td>{{ totalOrders }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-center">
        <button
          @submit="Submit"
          class="p-2 m-2 bg-orange-700 rounded-md text-white"
        >
          Xác nhận
        </button>
        <button
          class="p-2 m-2 bg-gray-400 rounded-md text-white"
          @click="cancel"
        >
          Hủy
        </button>
      </div>
    </form>
  </div>
  <div class="fixed top-8 left-1/4 w-2/4 flex justify-center" v-if="isnoti">
    <p class="text-center bg-white text-black p-2 shadow-md shadow-gray-400">
      {{ noti }}
    </p>
  </div>
</template>
<script>
import { ref } from "vue";
import { orderService } from "@/services/orderService";
import { cartService } from "@/services/cartService";
import { useRouter } from "vue-router";

export default {
  emits: ["onCancel"],
  props: {
    myOrders: [],
    myBooksOrder: [],
    count: Number,
    total: Number,
  },
  setup(props, context) {
    const noti = ref("Đặt hàng thành công");
    const isnoti = ref(false);
    const router = useRouter();
    const orders = ref(props.myOrders);
    const booksOrder = ref(props.myBooksOrder);

    const { deleteCart } = cartService();

    const totalOrders = ref(props.total);
    const { createOrders } = orderService();
    function cancel() {
      context.emit("onCancel");
    }
    const order = ref({
      name: "",
      address: "",
    });
    async function Submit() {
      const data = ref([]);

      for (let i = 0; i < orders.value.length; ++i) {
        const tmp = {
          name: order.value.name,
          address: order.value.address,
          id_book: orders.value[i].id_book,
          quantity: orders.value[i].count,
        };
        data.value.push(tmp);
      }

      console.log(data.value);
      await createOrders(data.value);
      isnoti.value = true;
      setTimeout(() => {
        isnoti.value = false;
      }, 900);

      for (let i = 0; i < orders.value.length; ++i) {
        await deleteCart(orders.value[i].id);
      }

      router.push({ name: "orders", params: {} });
    }
    return {
      orders,
      booksOrder,
      totalOrders,
      cancel,
      Submit,
      order,
      noti,
      isnoti,
    };
  },
};
</script>

<style scoped>
th,
td {
  padding: 10px;
}
tr {
  border-bottom: 1px solid rgba(211, 209, 209, 0.632);
}
label {
  font-weight: bold;
}
</style>
