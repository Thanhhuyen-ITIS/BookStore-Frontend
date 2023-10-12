<template>
  <div class="container flex justify-between p-5 bg-orange-50 w-full">
    <div class="row">
      <router-link :to="{ name: 'home', params: {} }">
        <span class="font-extrabold text-2xl p-1 lg:ml-12">BOOKSHOP</span>
      </router-link>
    </div>
    <div v-if="isDefault.default.value">
      <ul class="flex justify-between p-2">
        <li class="mr-5 font-semibold text-xl">
          <router-link :to="{ name: 'home', params: {} }"
            >Trang chủ</router-link
          >
        </li>
        <li class="mr-5 font-semibold text-xl" v-if="isAdmin">
          <router-link :to="{ name: 'bookmanager', params: {} }"
            >Quản lý sách</router-link
          >
        </li>
        <li class="mr-5 font-semibold text-xl">
          <router-link :to="{ name: 'carts', params: {} }"
            >Giỏ hàng</router-link
          >
        </li>
        <li class="mr-5 font-semibold text-xl">
          <router-link :to="{ name: 'orders', params: {} }"
            >Đơn hàng</router-link
          >
        </li>
      </ul>
    </div>
    <div class="flex flex-end font-semibold" v-if="isDefault.default.value">
      <router-link :to="{ name: 'login', params: {} }" v-if="!user">
        <button
          class="p-2 ml-5 text-white border border-gray-200 rounded bg-lime-600 hover:shadow-sm hover:shadow-amber-400"
        >
          Đăng nhập
        </button>
      </router-link>

      <router-link :to="{ name: 'register', params: {} }" v-if="!user">
        <button
          class="p-2 ml-5 text-white border rounded bg-amber-600 hover:shadow-sm hover:shadow-amber-400"
        >
          Đăng ký
        </button>
      </router-link>
      <button
        class="p-2 ml-5 text-white border rounded bg-amber-600 hover:shadow-sm hover:shadow-amber-400"
        v-else
        @click="SignOut"
      >
        Đăng xuất
      </button>
    </div>
  </div>
  <div class="fixed top-8 left-1/4 w-2/4 flex justify-center" v-if="isnoti">
    <p class="text-center bg-white text-black p-2 shadow-md shadow-gray-400">
      {{ noti }}
    </p>
  </div>
</template>

<script>
import { userService } from "@/services/userService";
import { toRefs, ref, onMounted } from "vue";

export default {
  props: {
    default: Boolean,
  },

  setup(props) {
    const noti = ref("Đăng xuất thành công");
    const isnoti = ref(false);
    const { user, getUser } = userService();
    const isAdmin = ref(false);
    const isDefault = toRefs(props);

    function SignOut() {
      isnoti.value = true;
      setTimeout(() => {
        isnoti.value = false;
      }, 600);
      localStorage.removeItem("access_token");
      user.value = null;
    }
    onMounted(async () => {
      await getUser();
      isAdmin.value = user.value && user.value.id_role === 1 ? true : false;
      console.log(isAdmin);
    });
    return { isDefault, user, isAdmin, SignOut, noti, isnoti };
  },
};
</script>

<style scoped></style>
