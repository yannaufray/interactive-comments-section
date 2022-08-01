<template>
	<Teleport to="body">
		<Toast v-show="userStore.userChanging">
			Current user is now {{ userStore.currentUser.username }}
		</Toast>
	</Teleport>
	<div class="container">
		<div
			:class="{ current: userStore.currentUser.username === profile.name }"
			class="profile"
			v-for="profile in userStore.profiles"
			:key="profile"
		>
			<img
				@click="userStore.changeCurrentProfile(profile)"
				:src="profile.pic"
				alt=""
			/>
		</div>
	</div>
</template>

<script setup>
import Toast from './Toast.vue';
import { useUserStore } from '../stores/UserStore';
import { ref } from '@vue/reactivity';
import { onMounted, watch } from '@vue/runtime-core';
const userStore = useUserStore();

// onMounted(() => {
//   profiles.value.map((profile) => {
//     profile.pic = require(`../assets/images/avatars/image-${profile.name}.png`);
//   });
</script>

<style scoped>
.container {
	display: flex;
	gap: 1rem;
	justify-content: center;
	margin-bottom: 2rem;
}

.profile {
	cursor: pointer;
	opacity: 0.5;
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

@media screen and (min-width: 1440px) {
	.container {
		position: absolute;
		flex-direction: column;
		right: 2rem;
	}
}
</style>
