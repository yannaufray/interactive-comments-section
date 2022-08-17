<template>
	<router-view />
</template>

<style>
#app {
	font-family: 'Rubik', sans-serif;
}

* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	margin: 0;
	padding: 0;

	--main-color: hsl(238, 40%, 52%);
	--main-color-pale: hsl(228, 33%, 97%);
	--accent-color: hsl(358, 79%, 66%);
}

body {
	background-color: var(--main-color-pale);
	display: flex;
	justify-content: center;
}

.pic,
.replying-to,
.you,
.profile,
.likes-number,
.btn-plus,
.btn-minus,
.delete,
.reply,
.edit {
	user-select: none;
}

/* Transitions */

.appears-enter-from,
.appears-leave-to {
	opacity: 0;
	/* transform: scale(0.95) translateY(30px); */
	transform: scale(0.95);
}

.appears-enter-active,
.appears-leave-active {
	transition: all 0.3s ease;
}

.appears-move {
	transition: transform 0.3s ease-out;
}

.fade-in-enter-from {
	opacity: 0;
}

.fade-in-enter-active {
	transition: opacity 0.5s ease;
}
</style>
