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

<script setup>
import { ref } from "@vue/reactivity";
import Comments from "../components/Comments.vue";
import Profiles from "../components/Profiles.vue";
import TheLoader from "../components/TheLoader.vue";
import { onMounted } from "@vue/runtime-core";
import { useCommentStore } from "../stores/CommentStore";
import { useUserStore } from "../stores/UserStore";
const commentStore = useCommentStore();
const userStore = useUserStore();

let loaded = ref(false);
let currentUser = ref(userStore.currentUser.username);

let pic = ref(userStore.pic);
</script>

<style>
.comments {
  max-width: 900px;
  margin-top: 2rem;
}

.replies {
  border-left: 0.2rem solid hsl(223, 19%, 93%);
  margin-left: 1rem;
}

.btn-send,
.btn-update {
  padding: 0.8rem 1.5rem;
  background-color: var(--main-color);
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
