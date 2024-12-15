import { ref, onMounted, onUnmounted } from 'vue'

export function useUpdateScreenWidth() {

  const screenWidth = ref(0);

  function updateScreenWidth() {
    screenWidth.value = window.innerWidth;
  }

  onMounted(() => {
    updateScreenWidth();
    window.addEventListener("resize", updateScreenWidth);
  });

  onUnmounted( () => {
    window.removeEventListener("resize", updateScreenWidth);
  });

  return { screenWidth };
}
