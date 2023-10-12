<template>
  <div class="p-5 border shadow-md rounded-md">
    <div class="flex items-center mt-2 mb-2" v-if="review">
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
      <p class="text-gray-500 mr-3">{{ review.username }}</p>
      <div class="mr-2" v-for="id in 5" :key="id">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-4 w-4"
          :class="id <= review.star ? 'text-yellow-500' : 'text-slate-500'"
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
      <!-- <p class="">Comment</p> -->
      <p class="break-words overflow-auto h-16 p-1 mr-3 rounded-md bg-slate-50">
        {{ review.comment }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    reviewdetail: Object,
  },

  setup(props) {
    const review = ref(props.reviewdetail);

    return { review };
  },
};
</script>
