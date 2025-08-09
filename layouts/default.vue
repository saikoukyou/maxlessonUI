<template>
    <div class="body">
        <NavBar />
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
</style>
