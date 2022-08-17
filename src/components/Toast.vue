<template>
	<Transition name="fade-in-out">
		<span class="message" :class="{ alert }">
			<slot></slot>
		</span>
	</Transition>
</template>

<script>
export default {
	props: {
		alert: {
			type: Boolean,
		},
	},
};
</script>

<style scoped>
.message {
	padding: 0.8rem 1.5rem;
	background-color: var(--main-color);
	color: white;
	border-radius: 0.5rem;
	font-family: 'Rubik', sans-serif;
	position: absolute;
	bottom: 1rem;
}

/* Original transition: weird translateX jump on Chrome
 .toast-enter-from,
.toast-leave-to {
	transform: translateY(5vh);
}

.toast-enter-active,
.toast-leave-active {
	transition: transform 0.1s ease;
} */

.fade-in-out-enter-from,
.fade-in-out-leave-to {
	opacity: 0;
}

.fade-in-out-enter-active,
.fade-in-out-leave-active {
	transition: opacity 0.2s ease;
}

.alert {
	background-color: var(--accent-color);
}
</style>
