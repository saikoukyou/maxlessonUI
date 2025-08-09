<template>
	<NuxtLayout name="teacherout">
		<div page="teacher">

      <div class="fakeBg">
      <div class="companyBlock">
        <div class="companySize">
        <h1>公司简介</h1>

        <span class="des">
          BizCHINA是一家在线教育企业。我们专注于通过在线教育的方式，面相日本客户提供中文的语言培训及中国商业文化的培训。
        BizCHINA的宗旨是帮助客户更全面更深入的了解中国，助力客户中国业务的展开，协助培养客户公司的中国通。
        商标声明： “BizCHINA”商标、标识、图形、组合商标为合法注册，受法律保护，未经本公司或权利人书面许可，任何单位及个人不得以任何方式或理由采取包括但不限于使用、复制、修改、传播、抄录等方式侵权，侵权必究，特此郑重声明！
        </span>
        </div>
      </div>
      </div>

      <div class="companySize" style="text-align: center;">
      <ul class="leftBlock">
        <li>联系我们</li>
        <li>
          邮箱：info@netchina.email<br>
          电话：0535-6801668</li>
      </ul>
<!--      <ul class="rightBlock">-->
<!--        <li>关注我们</li>-->
<!--        <li><img src="../../assets/images/qrcode.png" width="100"/><span>微信公众号</span></li>-->
<!--        <li><img src="../../assets/images/qrcode.png" width="100"/><span>小红书</span></li>-->
<!--      </ul>-->
      </div>

      <div class="bottom"><router-link to="/teacher/company"><span>公司信息</span></router-link></div>
		</div>
	</NuxtLayout>
</template>
<script setup>

definePageMeta({
	layout: false,
});
import Footer from "./apply/footer.vue"
</script>

<style scoped>
  .fakeBg{
    background: url("../../assets/images/FVnetchina_r.jpg");
    background-repeat: repeat-x;
    background-size: contain;
  }
  .companyBlock{
    margin: auto;
    background-image: url("../../assets/images/FVnetchina.jpg");
    background-size: 1140px;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 500px;
  }
  .companyBlock h1{
    padding-top: 60px;
    font-size: 30px;
    margin-bottom: 20px;
  }
  .companyBlock .des{
    width: 600px;
    display: block;
    line-height: 30px;
  }
  .leftBlock{
    text-align: center;
    width: 48%;
    display: inline-block;
    vertical-align: top;
    margin: 40px auto;
  }
  .leftBlock li:nth-child(1){
    background-color: #FFFCF5;
    height: 40px;
    line-height: 40px;
    border-radius: 8px;
    font-size: 14px;
    width: 80%;
    margin: 0 auto 20px auto;
  }
  .rightBlock li:nth-child(1){
    background-color: #FFFCF5;
    height: 40px;
    line-height: 40px;
    border-radius: 8px;
    font-size: 14px;
    width: 80%;
    margin: 0 auto 20px auto;
  }




  .leftBlock li:nth-child(2){
    font-size: 20px;
    vertical-align: center;
    line-height: 36px;
    letter-spacing: 0.1em;
  }
  .rightBlock{
    text-align: center;
    width: 48%;
    display: inline-block;
    vertical-align: top;
    margin-top: 40px;
  }
  .rightBlock li:nth-child(2){
    width: 35%;
    display: inline-block;
    border-right: 1px solid #f4f4f4;
  }
  .rightBlock li:nth-child(3){
    width: 35%;
    display: inline-block;
  }

  .rightBlock li img{margin: auto;}

  .rightBlock li span{
    text-align: center;
    font-size: 14px;
    margin-top: 0;
  }

  .companySize{
    width: 1060px;
    margin: 0 auto 20px auto;
    clear: both;
  }
  @media screen and (max-width: 520px) {
    .companyBlock{
      background-size: 100%;
      background-position: bottom;
      background-image: none;
    }
    .companySize {
      width: 90%;
    }

    .companyBlock h1 {
      font-size: 24px;
      padding-top: 40px;
    }

    .companyBlock .des {
      width: 100%;
      font-size: 14px;
      line-height: 26px;
    }

    .leftBlock,
    .rightBlock {
      width: 100%;
      display: block;
      margin: 20px auto;
    }

    .leftBlock li:nth-child(1),
    .rightBlock li:nth-child(1) {
      width: 100%;
    }

    .leftBlock li:nth-child(2) {
      font-size: 16px;
      line-height: 28px;
    }

    .rightBlock li:nth-child(2),
    .rightBlock li:nth-child(3) {
      width: 45%;
      display: inline-block;
      vertical-align: top;
      margin-bottom: 10px;
    }

    .rightBlock li:nth-child(2) {
      border-right: none;
    }

    .rightBlock li img {
      width: 80px;
    }

    .rightBlock li span {
      display: block;
      margin-top: 5px;
      font-size: 12px;
    }

    .bottom {
      text-align: center;
      margin: 30px 0;
    }
  }

</style>