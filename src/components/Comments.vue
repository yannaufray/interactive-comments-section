<template>
	<Teleport to="body">
		<Modal v-if="appStore.modalVisible" />
	</Teleport>

	<TransitionGroup name="appears" appear>
		<div v-for="comment in commentStore.comments" :key="comment.id">
			<Comment :comment="comment" />
		</div>
	</TransitionGroup>

	<Transition name="fade-in" appear>
		<NewComment v-if="!appStore.isReplying && !appStore.isEditing" />
	</Transition>
</template>

<script setup>
import { ref } from '@vue/runtime-core';

import Comment from './Comment.vue';
import NewComment from './NewComment.vue';
import Modal from './Modal.vue';

import { useCommentStore } from '../stores/CommentStore';
import { useAppStore } from '../stores/AppStore';

const commentStore = useCommentStore();
const appStore = useAppStore();
</script>
