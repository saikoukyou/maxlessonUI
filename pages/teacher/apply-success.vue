<template>
	<NuxtLayout name="teacherout">
		<div page="teacher-apply">
			<Header title="您已经成功提交申请。" title2="请仔细阅读以下内容。" />

			<div class="result">
				<p>1，以下内容会通过邮件的方式发到您的邮箱： {{email}}{{name}}</p>
				<p>2，请添加 HR 的微信，商定面试及试讲的时间。</p>
				<p>3，HR 的微信二维码</p>
        <div style="text-align: center;">
          <img :src="wechat_img" style="height:100px;width:100px;display: block;margin-left: auto;margin-right: auto;"/>
        </div>
				<p>４，如有其他疑问请致电 0535-68101668</p>
			</div>
		</div>
    <div class="bottom"><router-link to="/teacher/company"><span>公司信息</span></router-link></div>
	</NuxtLayout>
</template>
<script setup>
definePageMeta({
	layout: false,
});
import Header from "./apply/header.vue"
import Footer from "./apply/footer.vue"
const route = useRoute()
// console.log('route222:'+JSON.stringify(route.query));
const email = route.query.email;
const name = route.query.name;
const wechat_img = route.query.wechat_img;
</script>