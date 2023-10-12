import axios from "axios";
import { ref } from "vue";

const orders = ref([]);
const order = ref(null);
const isPending = ref();

async function getOrdersAdmin() {
  isPending.value = true;
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.get("orders").then((response) => {
    orders.value = response.data;
  });
  isPending.value = false;
  return orders.value;
}

async function getOrders() {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.get("my_orders").then((response) => {
    orders.value = response.data;
  });
  return orders.value;
}

async function getOrder(id) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.get("my_order/" + id).then((response) => {
    order.value = response.data;
  });
  return order.value;
}

async function getOrderAdmin(id) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.get("order/" + id).then((response) => {
    order.value = response.data;
  });

  return order.value;
}

async function createOrder(data) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.post("create_order", data).then((response) => {
    response;
  });
}

async function createOrders(data) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.post("create_orders", data).then((response) => {
    response;
  });
}

async function updateMyOrder(data, id) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.put("update_my_order/" + id, data).then((response) => {
    order.value = response.data;
  });
  return order.value;
}

async function updateOrder(data, id) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.put("update_order/" + id, data).then((response) => {
    order.value = response.data;
  });
  return order.value;
}

export function orderService() {
  return {
    getOrder,
    getOrders,
    updateOrder,
    updateMyOrder,
    createOrder,
    createOrders,
    getOrderAdmin,
    getOrdersAdmin,
    isPending,
  };
}
