<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-show="userChanging" class="message">
        Current user is now {{ currentUser }}
      </div>
    </Transition>
  </Teleport>
  <div class="container">
    <div
      :class="{ current: currentUser === profile.name }"
      class="profile"
      v-for="profile in profiles"
      :key="profile"
    >
      <img
        @click="$emit('profile-changed', profile)"
        :src="profile.pic"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: { currentUser: String },
  data() {
    return {
      profiles: [
        { name: "amyrobson", pic: "" },
        { name: "maxblagun", pic: "" },
        { name: "ramsesmiron", pic: "" },
        { name: "juliusomo", pic: "" },
      ],
      pics: [],
      userChanging: false,
    };
  },
  watch: {
    currentUser() {
      // This delay will get the message syncronized with the "bump"
      setTimeout(() => {
        this.userChanging = true;
      }, 100);

      setTimeout(() => {
        this.userChanging = false;
      }, 1000);
    },
  },
  mounted() {
    this.profiles.map((profile) => {
      profile.pic = require(`../assets/images/avatars/image-${profile.name}.png`);
    });
  },
};
</script>

<style scoped>
.container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 3rem 0;
}

.profile {
  cursor: pointer;
  opacity: 0.5;
  user-select: none;
}

.current {
  opacity: 1;
  animation: current 0.1s;
}

@keyframes current {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
    transform: translateY(-0.5rem);
  }
}

.message {
  background-color: hsl(238, 40%, 52%);
  color: white;
  padding: 0.8rem 1.5rem;
  background-color: hsl(238, 40%, 52%);
  border-radius: 0.5rem;
  font-family: "Rubik", sans-serif;
  position: absolute;
  left: 1rem;
  top: 1rem;
}

@media screen and (min-width: 1440px) {
  .container {
    position: absolute;
    flex-direction: column;
    margin-top: 0;
    top: 2rem;
    right: 2rem;
  }
}
</style>
