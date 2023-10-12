<template>
  <div class="border border-gray-200 shadow-sm p-3">
    <p class="font-bold text-gray-500 text-lg mb-3">Comment</p>

    <div>
      <input
        placeholder="Comment"
        type="text"
        v-model="data.comment"
        class="border border-gray-300 p-1 w-1/2 bg-gray-50 rounded-sm mr-4"
      />
      <button
        :disabled="!data.comment"
        @click="add"
        class="shadow-sm shadow-slate-500 p-2"
        :class="
          data.comment ? 'bg-lime-500 text-gray-50' : 'bg-gray-400 text-gray-50'
        "
      >
        Gửi nhận xét
      </button>
    </div>
    <div v-if="comments" class="m-4 mt-7">
      <div v-for="comment in comments" :key="comment.id" class="mt-5">
        <div class="flex mb-1">
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 18.7023C18 15.6706 14.5 15 12 15C9.5 15 6 15.6706 6 18.7023M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z"
              stroke="#C8C8C8"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="ml-3 text-gray-400">{{ comment.username }}</p>
        </div>
        <p>{{ comment.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { commentService } from "@/services/commentService";
import { onMounted, ref } from "vue";

export default {
  props: {
    id_book: Number,
  },
  setup(props) {
    const idBook = ref(props.id_book);
    const data = ref({
      comment: null,
    });
    const { comments, getComments, addComment } = commentService();

    async function add() {
      await addComment(data.value, idBook.value);
      data.value.comment = null;
      await getComments(idBook.value);
    }

    onMounted(async () => {
      await getComments(idBook.value);
    });
    return { comments, add, data };
  },
};
</script>
