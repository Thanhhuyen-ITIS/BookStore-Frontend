<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";

import { PUBLIC_LAYOUT } from "@/constants/index.js";
export default {
  setup() {
    const route = useRoute();
    return {
      layout: computed(() => (route.meta.layout || PUBLIC_LAYOUT) + "-layout"),
    };
  },
};
</script>
