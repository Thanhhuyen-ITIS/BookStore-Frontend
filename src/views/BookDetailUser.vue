<template>
  <div class="xl:p-48 xl:pt-4 p-2 text-black">
    <div>
      <book-detail :id_book="i" />
    </div>

    <div class="mt-7 mb-1">
      <button
        @click="Comment"
        class="mr-4 p-2"
        :class="
          isComment
            ? 'bg-white text-black shadow-sm shadow-slate-500'
            : 'bg-gray-100 text-gray-700'
        "
      >
        Comment
      </button>
      <button
        @click="Review"
        class="mr-4 p-2"
        :class="
          !isComment
            ? 'bg-white text-black shadow-sm shadow-slate-500'
            : 'bg-gray-100 text-gray-700'
        "
      >
        Đánh giá
      </button>
    </div>
    <div class="border border-gray-50 rounded-md" v-if="!isComment">
      <div class="" v-for="review in reviews" :key="review.id">
        <review-compo :reviewdetail="review" />
      </div>
    </div>
    <div v-else class="">
      <comment-compo :id_book="i" />
    </div>
  </div>
</template>

<script>
import BookDetail from "../components/bookDetail.vue";
import ReviewCompo from "@/components/reviewCompo.vue";
import commentCompo from "@/components/commentCompo.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { reviewService } from "@/services/reviewService";

export default {
  components: { BookDetail, ReviewCompo, commentCompo },
  setup() {
    const route = useRoute();
    const isComment = ref(true);
    const i = ref(route.params.id);

    const { reviews, getReviews } = reviewService();

    function Comment() {
      isComment.value = true;
    }
    function Review() {
      isComment.value = false;
    }
    onMounted(async () => {
      await getReviews(i.value);
    });
    return { reviews, i, isComment, Comment, Review };
  },
};
</script>
