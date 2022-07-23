<template>
  <div class="container">
    <div class="square"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  display: flex;
  width: 2rem;
  align-items: center;
  align-items: center;
  height: 100vh;
}

.square {
  width: 1rem;
  height: 1rem;
  background-color: hsl(238, 40%, 52%);
  border-radius: 0.3rem;
  transform: rotate(45deg);
  animation: scale 1s ease-in infinite;
}

@keyframes scale {
  0% {
    transform: scale(1) rotate(45deg);
  }
  50% {
    transform: scale(1.5) rotate(180deg);
  }
  100% {
    transform: scale(1) rotate(45deg);
  }
}
</style>
