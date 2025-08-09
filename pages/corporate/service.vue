<template>
	<NuxtLayout name="corporate">
		<div>
			<div class="bg-third padding-xl col gap-xl justify-center font-size-xl">
				<h1>LOG IN</h1>
				<h1 class="font-size-xxl">研修サ-ビス内容</h1>
			</div>
		</div>
	</NuxtLayout>
</template>
<script setup>

definePageMeta({
  layout: false,
  middleware: ["only-visitor-corporate"]
})
</script>