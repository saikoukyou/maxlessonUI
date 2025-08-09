<template>
	<NuxtLayout name="corporatein">
		<div page="corporate">
			<Menu class="menu"></Menu>
			<div class="main">
				<NuxtPage />
			</div>
		</div>
	</NuxtLayout>
</template>
<script setup>
import Menu from "./components/menu.vue"
import {onMounted} from "vue";

const useStore = useMainStore();

definePageMeta({
	layout: false,
	middleware: ["corporate-auth"]
});

onMounted(() => {
  useStore.useRefreshCorporateInfo();
})
</script>
<style lang="scss">

[page="corporate"] {}
</style>