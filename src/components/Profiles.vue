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
  position: absolute;
  top: 2rem;
  right: 2rem;
}

.profile {
  margin-bottom: 1rem;
  cursor: pointer;
}

.not-current {
  opacity: 0.7;
}
</style>
