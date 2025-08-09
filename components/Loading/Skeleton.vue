<!-- 骨架屏加载组件 -->
<template>
    <n-card v-for="i in count" :key="i" class="mb-5">
        <n-skeleton text style="width:30%" />
        <n-skeleton text :repeat="2" />
        <n-skeleton text style="width: 45%" />
        <n-skeleton text style="width: 60%" />
    </n-card>
</template>
<script setup>
import { defineProps } from "vue"
import { NCard, NSkeleton } from 'naive-ui'
defineProps({
    count: {
        default: 4,
        type: Number
    }
})
</script>