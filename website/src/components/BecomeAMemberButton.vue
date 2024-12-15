<script setup lang="ts">
import { RouterLink} from 'vue-router'
</script>

<template>
  <RouterLink to="/member-registration-form" class="btn become-a-member-button" style="letter-spacing: 1.68px;font-size: 0.875rem;color: #fff;padding:0.75rem;">
    BECOME A MEMBER
  </RouterLink>
</template>

<style scoped>
.become-a-member-button {
  background-color: #2ea2cc;
}
.become-a-member-button:hover {
  background-color: #ffba00;
}
</style>