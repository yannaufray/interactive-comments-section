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
  left: 1rem;
  top: 1rem;
}

.toast-enter-from,
.toast-leave-to {
  transform: translateY(-3rem);
}

.toast-enter-active {
  transition: transform 0.1s ease-out;
}
</style>
