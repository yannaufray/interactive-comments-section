<template>
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
    };
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
  margin-top: 1rem;
}

.profile {
  cursor: pointer;
}

.not-current {
  opacity: 0.7;
}

/* @media screen and (min-width: 700px) {
  .container {
    bottom: 2rem;
    right: 2rem;
  }
} */

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
