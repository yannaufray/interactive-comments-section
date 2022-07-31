<template>
	<Transition name="appears" mode="out-in">
		<div v-if="!isEditing" class="full-comment">
			<div class="content">
				<div class="infos">
					<img :src="pic" alt="" class="pic" />
					<h3 class="username">{{ comment.user.username }}</h3>

					<Transition name="fade-in">
						<span
							v-if="comment.user.username === userStore.currentUser.username"
							class="you"
							>you</span
						>
					</Transition>

					<span class="date">{{ commentStore.formattedDate(comment) }}</span>
				</div>

				<div class="text">
					<span v-if="comment.userAnswered" class="replying-to"
						>@{{ comment.userAnswered }}</span
					>
					{{ comment.content }}
				</div>
			</div>

			<Likes :comment="comment" />

			<Interactions
				@editing="isEditing = !isEditing"
				:comment="comment"
				:isEditing="isEditing"
			/>
		</div>

		<div v-else>
			<CommentEdited
				@edited="editComment"
				@cancel-edit="handleCancelEdit"
				:comment="comment"
				:pic="pic"
			/>
		</div>
	</Transition>

	<Transition name="fade-in">
		<NewComment
			v-if="
				appStore.isReplying && comment.id === commentStore.answeredCommentId
			"
		/>
	</Transition>

	<!-- Replies if any (recursive component) -->
	<div v-if="comment.replies && comment.replies.length" class="replies">
		<transition-group name="appears" appear>
			<div v-for="comment in comment.replies" :key="comment.id">
				<Comment :comment="comment" />
			</div>
		</transition-group>
	</div>
</template>

<script setup>
import NewComment from './NewComment.vue';
import Likes from './Likes.vue';
import Interactions from './Interactions.vue';
import CommentEdited from './CommentEdited.vue';
import { ref } from '@vue/reactivity';

import { useAppStore } from '../stores/AppStore';
import { useUserStore } from '../stores/UserStore';
import { useCommentStore } from '../stores/CommentStore';

const props = defineProps({
	comment: Object,
});

const editComment = editedComment => {
	props.comment.content = editedComment;
	// Setting it to current comment
	isEditing.value = false;
	// Setting it back to false
	appStore.isEditing = false;
};

const handleCancelEdit = () => {
	isEditing.value = false;
	appStore.isEditing = false;
};

const appStore = useAppStore();
const userStore = useUserStore();
const commentStore = useCommentStore();
let isEditing = ref(false);

const pic = ref(
	require(`../assets/images/avatars/image-${props.comment.user.username}.png`)
);
</script>

<style scoped>
.full-comment {
	background-color: white;
	margin: 0 1rem 1rem;
	padding: 1rem;
	border-radius: 0.3rem;
	position: relative;

	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.content {
	display: flex;
	flex-direction: column;
}

.infos {
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
}

.infos img,
.you {
	margin-right: 1rem;
}

.infos img {
	width: 2rem;
}

.infos .username {
	font-weight: 700;
	margin-right: 0.5rem;
}

.infos .date {
	color: hsl(211, 10%, 45%);
	font-weight: 500;
}

.text {
	color: hsl(211, 10%, 45%);
	margin-bottom: 1rem;
	font-weight: 500;
}

.replying-to {
	font-weight: 700;
	color: var(--main-color);
}

.pic,
.replying-to {
	user-select: none;
}

.you {
	padding: 0.1rem 0.4rem;
	color: white;
	font-weight: 700;
	background-color: var(--main-color);
	border-radius: 0.3rem;
	user-select: none;
}

@media screen and (min-width: 700px) {
	.full-comment {
		flex-direction: row-reverse;
		justify-content: flex-end;
	}

	.reply {
		top: 1rem;
		bottom: initial;
	}

	.icons-current-user {
		top: 1rem;
		bottom: initial;
	}
}
</style>
