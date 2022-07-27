<template>
  <Transition name="toast">
    <span class="message">
      <slot></slot>
    </span>
  </Transition>
</template>

<script>
export default {};
</script>

<style scoped>
.message {
  padding: 0.8rem 1.5rem;
  background-color: hsl(238, 40%, 52%);
  color: white;
  border-radius: 0.5rem;
  font-family: "Rubik", sans-serif;
  position: absolute;
  bottom: 1rem;
}

.toast-enter-from {
  transform: translateY(3vh);
}

.toast-enter-active {
  transition: transform 0.1s ease-out;
}

.toast-leave-to {
  opacity: 0;
}

.toast-leave-active {
  transition: opacity 0.15s ease-in;
}
</style>
