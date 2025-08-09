<template>
    <div class="teacher-body">
        <TeacherNavBar />
        <main>
            <slot />
        </main>
<!--        <PageFooter />-->
    </div>
</template>
<style>
/* .body {
    min-width: 1000px;
    //@apply bg-gray-100 flex flex-col min-h-screen;
} */
.teacher-body {
  font-family: '微软雅黑', "Microsoft YaHei", Arial, sans-serif;
  //font-family: '微软雅黑 Light', Arial, sans-serif;
  //font-family: 'Microsoft YaHei UI', Arial, sans-serif;
}
</style>
