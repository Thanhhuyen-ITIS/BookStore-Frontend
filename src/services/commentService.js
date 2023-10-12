import axios from "axios";
import { ref } from "vue";

const comments = ref([]);

async function getComments(id) {
  await axios.get("comments/" + id).then((response) => {
    comments.value = response.data;
  });
}

async function addComment(data, id) {
  if (!localStorage.getItem("access_token")) {
    return null;
  }
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  await axios.post("comment/" + id, data).then((response) => {
    console.log(response);
  });
}

export function commentService() {
  return { comments, getComments, addComment };
}
