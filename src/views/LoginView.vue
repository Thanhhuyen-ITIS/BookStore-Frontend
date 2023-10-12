<template>
  <div class="mx-auto max-w-md p-1 mt-8">
    <form
      @submit.prevent="Submit"
      class="flex flex-col p-7 w-auto shadow-lg bg-orange-50 rounded-md text-black"
    >
      <p class="text-center font-bold text-2xl m-6">Đăng Nhập</p>
      <p class="text-center text-md text-red-700">{{ err }}</p>
      <div class="input-form flex flex-col">
        <label for="username">Username</label>

        <input
          class="border rounded-md border-orange-700 border-opacity-40 mb-3 bg-slate-100"
          type="text"
          name="username"
          id="username"
          v-model="data.username"
          placeholder="Username"
          required
          :disabled="isPending"
        />
      </div>
      <div class="flex flex-col">
        <label for="password">Mật khẩu</label>

        <input
          class="border rounded-md border-orange-700 border-opacity-40 mb-3 bg-slate-100"
          type="password"
          name="password"
          id="password"
          v-model="data.password"
          placeholder="Mật khẩu"
          required
          :disabled="isPending"
        />
      </div>
      <button
        class="m-6 p-2 bg-amber-600 text-white rounded-md hover:bg-orange-700 focus:shadow-zinc-500"
      >
        Đăng nhập
      </button>
      <div class="flex justify-center">
        <p class="mr-2 flex">Bạn chưa có tài khoản?</p>
        <router-link :to="{ name: 'register', params: {} }" class="font-bold"
          >Đăng Ký</router-link
        >
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
import { reactive, ref } from "vue";
import { userService } from "@/services/userService";
import { useRouter } from "vue-router";

export default {
  setup() {
    const noti = ref("Đăng nhập thành công");
    const isnoti = ref(false);
    const { isPending, error, signIn } = userService();
    const data = reactive({
      username: "",
      password: "",
    });
    const err = ref("");
    const route = useRouter();
    async function Submit() {
      if (!data.username) {
        err.value = "Vui lòng nhập username";
      } else if (!data.password) {
        err.value = "Vui lòng nhập password";
      } else {
        err.value = "";

        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("password", data.password);
        await signIn(formData);
        if (!error.value) {
          isnoti.value = true;
          setTimeout(() => {
            isnoti.value = false;
            route.push({ name: "home", params: {} });
          }, 500);
        } else {
          err.value = error.value;
        }
      }
    }
    return { data, Submit, err, isPending, noti, isnoti };
  },
};
</script>
<style scoped>
form div input {
  padding: 6px;
}
</style>
