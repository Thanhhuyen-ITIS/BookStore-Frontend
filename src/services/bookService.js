import axios from "axios";
import { ref } from "vue";

const error = ref();
const isPending = ref();
const books = ref([]);
const book = ref({
  id: null,
  title: "",
  author: "",
  about: "",
  id_category: 1,
  release_date: null,
  picture: "",
  page: null,
  stock: null,
  cost: null,
});

async function getBooks() {
  error.value = "";
  isPending.value = true;
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios
    .get("book")
    .then((response) => {
      books.value = response.data;
    })
    .catch((e) => {
      console.log(e);
      error.value = e.response.data.detail.replace(/"/g, "");
    })
    .finally(() => {
      isPending.value = false;
    });
  return books.value;
}

async function getBook(id) {
  error.value = "";
  isPending.value = true;
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios
    .get("book/" + id)
    .then((response) => {
      book.value = response.data;
    })
    .catch((e) => {
      error.value = e.response.data.detail.replace(/"/g, "");
    })
    .finally(() => {
      isPending.value = false;
    });
  return book.value;
}

async function addBook(data) {
  error.value = "";
  isPending.value = true;
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios
    .post("book/create", data)
    .then((response) => {
      response;
    })
    .catch((e) => {
      error.value = e.response.data.detail.replace(/"/g, "");
    })
    .finally(() => {
      isPending.value = false;
    });
}

async function updateBook(data, id) {
  error.value = "";
  isPending.value = true;
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios
    .put("book/update/" + id, data)
    .then((response) => {
      book.value = response.data;
    })
    .catch((e) => {
      error.value = e.response.data.detail.replace(/"/g, "");
    })
    .finally(() => {
      isPending.value = false;
    });
  return book.value;
}

async function deleteBook(id) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.delete("book/delete/" + id).then((response) => {
    response;
  });
}

export function bookService() {
  return {
    getBooks,
    error,
    isPending,
    addBook,
    updateBook,
    deleteBook,
    getBook,
  };
}
