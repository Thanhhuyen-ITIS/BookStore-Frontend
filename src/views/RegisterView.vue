<template>
  <div class="mx-auto max-w-md p-1 my-auto mt-8">
    <form
      @submit.prevent="Submit"
      class="flex flex-col p-7 w-auto shadow-sm bg-orange-50 rounded-md shadow-gray-300 text-black"
    >
      <p class="text-center font-bold text-2xl m-6">Đăng Ký Tài Khoản</p>
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
        />
      </div>
      <div class="flex flex-col">
        <label for="email">Email</label>

        <input
          class="border rounded-md border-orange-700 border-opacity-40 mb-3 bg-slate-100"
          type="email"
          name="email"
          id="email"
          v-model="data.email"
          placeholder="example@gmail.com"
          required
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
        />
      </div>
      <div class="flex flex-col">
        <label for="repassword">Nhắc lại mật khẩu</label>
        <input
          class="border rounded-md border-orange-700 border-opacity-40 mb-3 bg-slate-100"
          type="password"
          name="repassword"
          id="repassword"
          v-model="repassword"
          placeholder="Nhập lại mật khẩu"
          required
        />
      </div>

      <button
        class="m-6 p-2 bg-amber-600 text-white rounded-md hover:bg-orange-700 focus:shadow-zinc-500"
      >
        Đăng ký
      </button>
      <div class="flex justify-center">
        <label class="mr-2">Bạn đã có tài khoản?</label>
        <router-link :to="{ name: 'login', params: {} }" class="font-bold"
          >Đăng Nhập</router-link
        >
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
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  setup() {
    const noti = ref("Tạo tài khoản thành công");
    const isnoti = ref(false);
    const data = reactive({
      username: "",
      email: "",
      password: "",
    });
    const errdata = reactive({
      errusername: "",
      erremail: "",
      errpassword: "",
    });
    const err = ref("");
    const repassword = ref("");

    const router = useRouter();
    async function Submit() {
      if (
        !data.email ||
        !data.password ||
        !data.username ||
        !repassword.value
      ) {
        err.value = "Vui lòng điền các ô bắt buộc";
      } else if (data.password != repassword.value) {
        err.value = "Mật khẩu nhập lại không trùng khớp";
      } else {
        err.value = "";
        await axios
          .post("http://127.0.0.1:8000/user/create", data)
          .then(() => {})
          .catch((error) => {
            err.value = error.response.data.detail;
          });

        if (!err.value) {
          isnoti.value = true;
          setTimeout(() => {
            isnoti.value = false;
            router.push({ name: "home", params: {} });
          }, 700);
        }
      }
    }
    return { data, Submit, repassword, err, errdata, noti, isnoti };
  },
};
</script>

<style scoped>
form div input {
  padding: 6px;
}
</style>
