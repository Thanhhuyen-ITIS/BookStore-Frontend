<template>
  <p class="m-6 text-center font-bold text-2xl text-yellow-800">
    DANH SÁCH ĐƠN HÀNG
  </p>
  <div class="m-3 xl:ml-24 xl:mr-24 p-4 rounded-sm shadow-sm" v-if="orders">
    <div class="mt-4" :class="isReview ? 'opacity-20' : 'opacity-100'">
      <div>
        <div>
          <order-compo
            v-for="(order, index) in orders"
            :key="index"
            :idOrder="order.id"
            @onReview="review($event, order.id)"
          />
        </div>
      </div>
    </div>
    <div>
      <review-create
        :id_order="idOrder"
        v-if="isReview"
        @onCancelReview="cancelReview"
      />
    </div>
  </div>
</template>
<script>
import OrderCompo from "@/components/orderCompo.vue";
import ReviewCreate from "@/components/reviewCreate.vue";
import { orderService } from "@/services/orderService";
import { onMounted, ref } from "vue";
import { userService } from "@/services/userService";

export default {
  components: {
    OrderCompo,
    ReviewCreate,
  },
  setup() {
    const { getOrders, getOrdersAdmin } = orderService();
    const orders = ref();
    const { user, getUser } = userService();

    const isAdmin = ref(false);
    const idBookReview = ref();
    const idOrder = ref();
    const isReview = ref(false);
    function review(event, id) {
      isReview.value = true;
      idOrder.value = id;
    }
    function cancelReview() {
      isReview.value = false;
    }
    onMounted(async () => {
      await getUser();
      if (user.value) {
        isAdmin.value = user.value.id_role == 1;
        if (isAdmin.value) {
          orders.value = await getOrdersAdmin();
        } else {
          orders.value = await getOrders();
        }
        orders.value.reverse();
      }
    });
    return {
      orders,
      review,
      idBookReview,
      isReview,
      cancelReview,
      idOrder,
    };
  },
};
</script>
