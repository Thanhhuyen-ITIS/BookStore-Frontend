<template>
  <div
    class="fixed top-1/3 left-1/3 bg-white p-8 rounded-md shadow-inner border border-slate-400"
  >
    <div>
      <form>
        <p class="">Đánh giá</p>
        <div class="flex items-center mt-2 mb-4">
          <div
            class="mr-2"
            v-for="id in 5"
            :key="id"
            @click="setStar(event, id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
              :class="id <= star ? 'text-yellow-500' : 'text-slate-500'"
            >
              <path
                fill-rule="evenodd"
                d="M10 1a1 1 0 0 1 .95.684l1.823 5.61a1 1 0 0 0 .532.553l5.908.144a1 1 0 0 1 .554 1.715l-4.78 3.481a1 1 0 0 0-.307.347l-1.797 5.603a1 1 0 0 1-1.938 0l-1.797-5.603a1 1 0 0 0-.307-.347L1.14 9.692a1 1 0 0 1 .554-1.715l5.908-.144a1 1 0 0 0 .532-.553L9.05 1.684A1 1 0 0 1 10 1zm0 2.12L7.466 6.267a1 1 0 0 0-.296.98l1.19 3.707a1 1 0 0 1-.272.98L4.997 14.81l3.902-2.847a1 1 0 0 1 1.227 0L15 14.81l-2.092-6.876a1 1 0 0 1-.272-.98l1.19-3.707a1 1 0 0 0-.296-.98L10 3.12z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div>
          <p class="">Comment</p>
          <textarea
            type="text"
            id="comment"
            v-model="comment"
            class="whitespace-pre-wrap break-words overflow-auto resize-y h-20 w-80 border border-amber-800 border-opacity-30 p-1 mr-3 rounded-md"
          />
        </div>
        <div>
          <button
            @click="cancelReview"
            class="p-2 m-2 rounded-md bg-gray-400 text-white"
          >
            Hủy
          </button>
          <button
            class="p-2 m-2 rounded-md bg-orange-800 text-white"
            @click.prevent="Submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="fixed top-8 left-1/4 w-2/4 flex justify-center" v-if="isnoti">
    <p class="text-center bg-white text-black p-2 shadow-md shadow-gray-400">
      {{ noti }}
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import { reviewService } from "@/services/reviewService";
export default {
  emits: ["onCancelReview"],
  props: {
    id_order: Number,
  },
  setup(props, context) {
    const noti = ref("Đánh giá thành cồng");
    const isnoti = ref(false);
    const star = ref(0);
    const comment = ref();

    const idOrder = ref(props.id_order);
    const { addReview } = reviewService();
    function setStar(event, id) {
      star.value = id;
    }
    function cancelReview() {
      context.emit("onCancelReview");
    }

    async function Submit() {
      await addReview(
        { star: star.value, comment: comment.value },
        idOrder.value
      );
      isnoti.value = true;
      setTimeout(() => {
        isnoti.value = false;
        context.emit("onCancelReview");
      }, 800);
    }
    return { setStar, star, comment, Submit, cancelReview, noti, isnoti };
  },
};
</script>

<style>
. {
  margin: 1px;
  padding: 1px;
}
</style>
