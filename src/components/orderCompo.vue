<template>
  <div class="p-3 shadow-sm rounded-sm border-t-2" v-if="book">
    <p class="font-bold">Tên khách hàng: {{ order.name }}</p>
    <p>Địa chỉ: {{ order.address }}</p>
    <p>Ngày đặt hàng: {{ order.order_date }}</p>
  </div>
  <div class="flex justify-around rounded-md shadow-sm p-3 mb-6" v-if="book">
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
    <p class="font-bold flex items-center">x{{ order.quantity }}</p>
    <div class="flex">
      <select
        :disabled="!isAdmin"
        @change="setStatus"
        v-model="order.id_status"
        class="font-bold text-black text-lg"
      >
        <option
          v-for="stt in status"
          :key="stt.id"
          :value="stt.id"
          :selected="stt.id === order.id_status"
          v-show="
            stt.id == order.id_status || stt.id == mapStatus[order.id_status]
          "
        >
          {{ stt.status }}
        </option>
      </select>
    </div>

    <div class="flex flex-col justify-around">
      <div v-if="!isAdmin">
        <div v-if="order.id_status == 1 || order.id_status == 5">
          <button
            :disabled="order.id_status == 5"
            class="p-2 m-2 rounded-md text-white"
            :class="order.id_status == 1 ? 'bg-red-600' : 'bg-gray-600'"
            @click="cancel"
          >
            {{ order.id_status == 1 ? "Hủy" : "Đã Hủy" }}
          </button>
        </div>
        <div class="flex justify-around" v-else>
          <button
            class="p-2 m-3 text-white rounded-md"
            :class="
              order.id_status == 7 ? 'bg-amber-800' : 'bg-slate-500 opacity-50'
            "
            :disabled="order.id_status != 7"
            @click="setStatus"
          >
            Đã nhận
          </button>
          <button
            class="p-2 m-3 rounded-md text-white"
            :class="
              order.id_status == 3 ? 'bg-amber-800' : 'bg-slate-500 opacity-50'
            "
            :disabled="order.id_status != 3"
            @click="review"
          >
            Đánh giá
          </button>
        </div>
      </div>

      <p
        class="font-bold"
        :class="
          order.id_status == 3 || order.id_status == 4
            ? 'text-green-800'
            : 'text-gray-950'
        "
      >
        {{
          order.id_status == 3 || order.id_status == 4
            ? "Đã Thanh toán"
            : "Thanh toán"
        }}: {{ order.quantity * book.cost }}đ
      </p>
    </div>
  </div>
  <div class="fixed top-8 left-1/4 w-2/4 flex justify-center" v-if="isnoti">
    <p class="text-center bg-white text-black p-2 shadow-md shadow-gray-400">
      {{ noti }}
    </p>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { userService } from "@/services/userService";
import { orderService } from "@/services/orderService";
import { bookService } from "@/services/bookService";
import { useRouter } from "vue-router";

export default {
  emits: ["onReview", "onAddToOrder"],
  props: {
    idOrder: Number,
  },
  setup(props, context) {
    const router = useRouter();
    const noti = ref("Cập nhật thành công");
    const isnoti = ref(false);
    const { user, getUser } = userService();
    const { getOrder, getOrderAdmin, updateOrder, updateMyOrder } =
      orderService();
    const order = ref();
    const { getBook } = bookService();
    const book = ref();
    const isAdmin = ref(false);
    const id = ref(props.idOrder);
    const mapStatus = [0, 2, 7, 6, 0, 0, 0, 6];
    const status = reactive([
      {
        id: 1,
        status: "Chờ duyệt",
      },
      {
        id: 2,
        status: "Đã duyệt",
      },
      {
        id: 3,
        status: "Đã nhận",
      },
      {
        id: 4,
        status: "Đã đánh giá",
      },
      {
        id: 5,
        status: "Đã hủy",
      },
      {
        id: 6,
        status: "Trả hàng",
      },

      {
        id: 7,
        status: "Đang giao hàng",
      },
    ]);

    function review() {
      context.emit("onReview", id.value);
    }

    async function setStatus() {
      if (isAdmin.value) {
        order.value = await updateOrder(
          { id_status: order.value.id_status },
          id.value
        );
      } else {
        order.value = await updateMyOrder({ id_status: 3 }, id.value);
      }
      isnoti.value = true;
      setTimeout(() => {
        isnoti.value = false;
      }, 500);
    }

    async function cancel() {
      order.value = await updateMyOrder({ id_status: 5 }, id.value);
      isnoti.value = true;
      setTimeout(() => {
        isnoti.value = false;
      }, 500);
    }

    function goBookDetail() {
      router.push({
        name: "bookdetailuser",
        params: { id: order.value.id_book },
      });
    }

    onMounted(async () => {
      await getUser();
      if (user.value) {
        isAdmin.value = user.value.id_role == 1;
        if (isAdmin.value) {
          order.value = await getOrderAdmin(id.value);
        } else order.value = await getOrder(id.value);

        book.value = await getBook(order.value.id_book);
      }
    });
    return {
      book,
      isAdmin,
      order,
      status,
      review,
      setStatus,
      id,
      cancel,
      noti,
      isnoti,
      mapStatus,
      goBookDetail,
    };
  },
};
</script>
