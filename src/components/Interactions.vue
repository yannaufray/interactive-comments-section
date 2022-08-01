<template>
	<Transition name="fade-in">
		<div
			@click="commentStore.handleClickOnReply(comment)"
			v-if="comment.user.username !== userStore.currentUser.username"
			class="reply"
		>
			<img src="../assets/images/icon-reply.svg" alt="" />
			<span>Reply</span>
		</div>
		<div v-else class="icons-current-user">
			<div @click="appStore.displayDeleteModal(comment.id)" class="delete">
				<img src="../assets/images/icon-delete.svg" alt="" />
				<span>Delete</span>
			</div>
			<div @click="handleEdit(com)" class="edit">
				<img src="../assets/images/icon-edit.svg" alt="" />
				<span>Edit</span>
			</div>
		</div></Transition
	>
</template>

<script setup>
import { useAppStore } from '../stores/AppStore';
import { useUserStore } from '../stores/UserStore';
import { useCommentStore } from '../stores/CommentStore';

const appStore = useAppStore();
const userStore = useUserStore();
const commentStore = useCommentStore();

const props = defineProps({
	comment: Object,
});

const emit = defineEmits(['editing']);

const handleEdit = com => {
	appStore.isReplying = false;
	// Setting it to the store so that we can remove main new content from the DOM
	appStore.isEditing = true;

	emit('editing', com);
};
</script>

<style scoped>
.edit span,
.delete span {
	font-weight: 700;
}

.delete,
.reply,
.edit {
	cursor: pointer;
	align-self: flex-start;
	display: flex;
	gap: 0.5rem;
}

.delete:hover,
.reply:hover,
.edit:hover {
	opacity: 0.7;
}

.reply {
	position: absolute;
	bottom: 1rem;
	right: 1rem;
	display: block;
}

.reply img {
	margin-right: 0.5rem;
}

.icons-current-user {
	display: flex;
	gap: 1rem;
	position: absolute;
	bottom: 1rem;
	right: 1rem;
}

.edit span {
	color: var(--main-color);
}

.delete span {
	color: var(--accent-color);
}

.reply span {
	font-weight: 700;
	color: var(--main-color);
}
</style>
