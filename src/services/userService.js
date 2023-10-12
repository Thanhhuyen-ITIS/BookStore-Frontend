import axios from "axios";
import { ref } from "vue";

const error = ref();
const isPending = ref(false);
const user = ref(null);

async function signIn(data) {
  error.value = null;
  isPending.value = true;
  await axios
    .post("login", data)
    .then((response) => {
      localStorage.setItem("access_token", response.data.access_token);
    })
    .catch((e) => {
      console.log(e);
      error.value = e.response.data.detail.replace(/"/g, "");
    })
    .finally(() => {
      isPending.value = false;
    });
}
async function getUser() {
  error.value = null;
  isPending.value = true;
  if (!localStorage.getItem("access_token")) {
    isPending.value = false;
    return;
  }
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios
    .get("user/me")
    .then((response) => {
      user.value = response.data;
    })
    .catch((e) => {
      error.value = e.response.data.detail.replace(/"/g, "");
      console.log(e);
    })
    .finally(() => {
      isPending.value = false;
    });
}
export function userService() {
  return { error, isPending, signIn, user, getUser };
}
