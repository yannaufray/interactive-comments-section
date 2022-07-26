<template>
  <!-- <div v-if="!loaded">
    <TheLoader />
  </div> -->
  <div class="comments">
    <Profiles
      @profile-changed="changeCurrentProfile"
      :currentUser="currentUser"
    />
    <Comments @loaded="loaded = true" :currentUser="currentUser" :pic="pic" />
  </div>
</template>

<script>
import Comments from "../components/Comments.vue";
import Profiles from "../components/Profiles.vue";
import TheLoader from "../components/TheLoader.vue";

export default {
  name: "Home",
  components: { Comments, Profiles, TheLoader },
  data() {
    return {
      loaded: false,
      currentUser: "juliusomo",
      pic: "",
    };
  },
  mounted() {
    this.pic = require(`../assets/images/avatars/image-${this.currentUser}.png`);
  },
  methods: {
    changeCurrentProfile: function (profile) {
      this.currentUser = profile.name;
      this.pic = require(`../assets/images/avatars/image-${this.currentUser}.png`);
    },
  },
};
</script>

<style>
.comments {
  max-width: 900px;
}

.replies {
  border-left: 0.2rem solid hsl(223, 19%, 93%);
  margin-left: 1rem;
}

.btn-send,
.btn-update {
  padding: 0.8rem 1.5rem;
  background-color: hsl(238, 40%, 52%);
  border-radius: 0.5rem;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  border: none;
  cursor: pointer;
  opacity: 1;
}

.btn-send:hover,
.btn-update:hover {
  opacity: 0.7;
}
</style>
