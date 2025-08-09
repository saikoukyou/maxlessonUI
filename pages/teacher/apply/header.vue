<template>
	<header>
		<div class="bg"></div>
		<div class="content">
			<h1 class="htitle">
				{{ title }}
			</h1>
			<p>{{ title2 }}</p>
		</div>
	</header>
</template>
<script>
export default {
	props: {
		title: null,
		title2: null,
	}
}
</script>