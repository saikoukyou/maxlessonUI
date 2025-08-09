<template>
	<div v-if="score != null" style="display: flex; align-items: center;">
		<img src="@/assets/SVG/starOne.svg" alt="" height="28" v-for="item in wholeStarCount" :key="item">
		<img src="@/assets/SVG/starHalf.svg" alt="" height="24" v-for="item in halfStarCount" :key="item">
		<img src="@/assets/SVG/starNone.svg" alt="" height="24" v-for="item in noneStarCount" :key="item">
		<span class="grey" style="margin-left: 5px;">{{ score }}</span>
	</div>
</template>
<script setup>
import { computed, defineProps } from "vue"

const props = defineProps({
	score: {
		default: null,
		type: Number,
	}
})

const wholeStarCount = computed(() => {
	if (!props.score) {
		return 0
	}
	return Math.floor(props.score / 1)
})

const noneStarCount = computed(() => {
	if (!props.score) {
		return 5
	}

	return 5 - halfStarCount.value - wholeStarCount.value;
})

const halfStarCount = computed(() => {
	if (!props.score) {
		return 0
	}
	return props.score % 1 ? 1 : 0
})
</script>