<script setup lang="ts">
import { RouterLink} from 'vue-router'
</script>

<template>
  <RouterLink to="/login" class="btn login-button" style="letter-spacing: 1.68px;font-size: 0.875rem;color: #fff;padding:0.75rem;">
    LOGIN
  </RouterLink>
</template>

<style scoped>
.login-button {
  background-color: #2ea2cc;
}
.login-button:hover {
  background-color: #ffba00;
}
</style>