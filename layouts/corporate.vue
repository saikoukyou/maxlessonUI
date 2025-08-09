<template>
	<div class="corporate-body">
    <CorporateNavBar />
		<main>
			<slot />
		</main>
		<PageFooter />
	</div>
</template>
<style>
/* .body {
    min-width: 1000px;
    //@apply bg-gray-100 flex flex-col min-h-screen;
} */
.corporate-body {
  font-family: '微软雅黑 Light', "Microsoft YaHei", Arial, sans-serif;
//font-family: '华文中宋', Arial, sans-serif;
//font-family: 'Microsoft YaHei UI', Arial, sans-serif;
}
</style>