import axios from "axios";
import { ref } from "vue";

const reviews = ref([]);

async function getReviews(id) {
  await axios.get("reviews/" + id).then((response) => {
    reviews.value = response.data;
  });
  return reviews.value;
}

async function addReview(data, id) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.post("create_review/" + id, data).then((response) => {
    response;
  });
}

export function reviewService() {
  return { reviews, getReviews, addReview };
}
