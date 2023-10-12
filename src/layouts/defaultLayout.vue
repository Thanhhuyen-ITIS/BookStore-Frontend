<template>
  <nav-header :default="true" />
  <slot />
</template>

<script>
import NavHeader from "@/components/navHeader.vue";
export default {
  components: { NavHeader },
};
</script>
