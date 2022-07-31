<template>
	<Teleport to="body">
		<Modal v-if="appStore.modalVisible" />
	</Teleport>

	<transition-group name="appears" appear>
		<div v-for="comment in commentStore.comments" :key="comment.id">
			<Comment :comment="comment" />
		</div>
	</transition-group>

	<Transition name="fade-in" appear>
		<NewComment v-if="!appStore.isReplying && !appStore.isEditing" />
	</Transition>
</template>

<script setup>
import Comment from './Comment.vue';
import NewComment from './NewComment.vue';
import Modal from './Modal.vue';

import { useUserStore } from '../stores/UserStore';
import { useCommentStore } from '../stores/CommentStore';
import { useAppStore } from '../stores/AppStore';

import { ref } from '@vue/runtime-core';
const commentStore = useCommentStore();
const appStore = useAppStore();

let idToBeDeleted = ref(null);

// watch: {
//   comment(oldVal, newVal) {
//     if (newVal.length) {
//       this.$emit(loaded);
//     }
//   },
// },

// function displayDeleteModal(id) {
//   modalVisible.value = true;
//   idToBeDeleted.value = id;
// }
</script>
