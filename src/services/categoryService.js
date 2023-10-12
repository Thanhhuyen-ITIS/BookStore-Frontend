import axios from "axios";
import { ref } from "vue";

const categories = ref([]);
async function getCategories() {
  await axios.get("categories").then((res) => {
    categories.value = res.data;
  });
}

export function categoryService() {
  return { categories, getCategories };
}
