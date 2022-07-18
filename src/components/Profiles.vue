<template>
  <Teleport to="body">
    <span v-show="userChanging" class="message"
      >Current user is now {{ currentUser }}</span
    >
  </Teleport>
  <div class="container">
    <div class="profile" v-for="profile in profiles" :key="profile">
      <img
        :class="{ 'not-current': currentUser !== profile.name }"
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
      this.userChanging = true;
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
}

.not-current {
  opacity: 0.5;
}

.message {
  color: hsl(238, 40%, 52%);
  font-family: "Rubik", sans-serif;
  font-weight: 700;
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
