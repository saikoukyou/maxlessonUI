<template>
	<NuxtLayout name="teacherout">
		<div page="teacher">
			<div class="FVimg header">
				  <div class="headerPos">
					<h1>欢迎成为<span> BizCHINA </span>的一名对外汉语老师</h1>
          <img src="../../assets/images/kv_teacher.png"/>
          <div>
						<div class="bg"></div>
						<div class="text">
							<p>日本国内<span>最大规模</span>的</p>
							<p>在线中文网校</p>
						</div>
					</div>
					<ul>
						<li><span class="circle"></span><span class="circle-check">✓</span>学生充足</li>
						<li><span class="circle"></span><span class="circle-check">✓</span>教材教辅完善</li>
						<li><span class="circle"></span><span class="circle-check">✓</span>合理的薪酬体系</li>
					</ul>

					<router-link to="/teacher/apply" class="button-link">立刻申请职位</router-link>
				</div>
			</div>

			<div class="intro">
				<div class="title">
					<div>
						<p>我们</p>
						<p>需要的</p>
					</div>
					<p>人才</p>
				</div>
				<ul>
					<li><span>1</span>普通话标准，性格开朗。</li>
					<li><span>2</span>拥有电脑，摄像头及稳定的网络连接。</li>
					<li><span>3</span>日语N1或不会日语有一年以上对外汉语教育经验</li>
					<li><span>4</span>守时，有时间观念。</li>
				</ul>
			</div>

			<div class="idea">
				<div class="bg"></div>
				<div class="content">
          <h1>我们的</h1>
					<div class="title">
						<div>
							<p>教学</p>
							<p>理念</p>
						</div>
					</div>
					<div class="text">
						<p>认真教学的老师我们需要，<br>只热衷聊天的汉语教练我们也需要。</p>
						<p>致力通过完整的辅助教材</p>
						<p>实现零基础的老师在零备课的状态下，</p>
            <p>只依托辅助教材完成一节学生满意的课程。</p>
					</div>
				</div>
			</div>

			<div class="service">
				<div class="title">
					<div>
						<p>我们</p>
						<p>提供的待遇</p>
					</div>
				</div>
				<div class="content">
					<p>1 节课 25 分钟，提供  7-16 元 元的课时费。</p>
					<p>完整的老师升级制度，随着经验增长课时费逐步增加。</p>
					<p>完善的教学辅助，保证教学质量的前提下，实现轻松授课。</p>
					<p>长期进行针对老师的疑难答疑，以及对外汉语教学培训。</p>
					<p>针对老师提供日语及日本的相关知识资料，教学疑难解惑推送。</p>
				</div>
			</div>

			<div class="apply">
				<h1 class="htitle">应聘流程简介</h1>
				<p>本招聘为公司直聘，招聘过程中不会以任何形式收取任何费用。</p>
				<ul>
					<li>提交资料</li>
					<li>资料审核</li>
					<li>试讲</li>
					<li>培训</li>
					<li>上岗</li>
				</ul>
        <router-link to="/teacher/apply" class="button-link button-link-accent">立刻申请职位</router-link>
			</div>
      <div class="bottom"><router-link to="/teacher/company"><span>公司信息</span></router-link></div>
		</div>
	</NuxtLayout>
</template>
<script setup>
definePageMeta({
	layout: false,
});
</script>