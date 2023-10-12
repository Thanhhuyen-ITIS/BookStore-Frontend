<template>
  <nav-header :default="false" />
  <slot />
</template>

<script>
import NavHeader from "@/components/navHeader.vue";
export default {
  components: { NavHeader },
};
</script>
