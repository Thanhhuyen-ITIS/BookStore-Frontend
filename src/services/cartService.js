import axios from "axios";
import { ref } from "vue";

const ispending = ref(false);
const carts = ref([]);
const cart = ref();

async function getCarts() {
  ispending.value = true;
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios
    .get("my_cart")
    .then((response) => {
      carts.value = response.data;
    })
    .finally(() => {
      ispending.value = false;
    });
  return carts.value;
}

async function getCart(id) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.get("my_cart/" + id).then((response) => {
    cart.value = response.data;
  });
  return cart.value;
}
async function addCart(data) {
  if (!localStorage.getItem("access_token")) {
    return "Vui lòng đăng nhập để mua hàng";
  }

  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.post("add_cart", data).then((response) => {
    response;
  });
  return "Thêm vào giỏ hàng thàng công";
}

async function deleteCart(id) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.delete("delete_cart/" + id).then((response) => {
    response;
  });
}

async function updateCart(id, data) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.put("update_cart/" + id, data).then((response) => {
    cart.value = response.data;
  });
  return cart.value;
}

export function cartService() {
  return { getCart, getCarts, addCart, deleteCart, updateCart };
}
