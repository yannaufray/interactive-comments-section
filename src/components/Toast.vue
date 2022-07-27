<template>
  <Transition name="toast">
    <span class="message" :class="alert ? wobble : ''">
      <slot></slot>
    </span>
  </Transition>
</template>

<script>
export default {
  props: {
    alert: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.message {
  padding: 0.8rem 1.5rem;
  background-color: var(--main-color);
  color: white;
  border-radius: 0.5rem;
  font-family: "Rubik", sans-serif;
  position: absolute;
  bottom: 1rem;
}

.toast-enter-from,
.toast-leave-to {
  transform: translateY(5vh);
}

.toast-enter-active,
.toast-leave-active {
  transition: transform 0.1s ease;
}
</style>
