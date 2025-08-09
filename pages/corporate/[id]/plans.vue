<template>
<div class="mypageTemplate">
  <n-card title="自己啓発">
  <div v-if="isShow">
    <div class="blockList" v-if="defaultPlans.length">
      <span class="titleT">体験コース</span>
        <div class="PricelistChild_add" v-for="(plan) in defaultPlans">
          <div class="courseBlock">
            <span class="courseTitle lColorbg">{{plan.plan_name}}</span>
            <ul class="courseContent">
              <li><span class="orip">月額{{plan.final_amount}}円</span><span class="oriptax"> 税込</span></li>
              <li>月額<span class="amount">{{plan.paypal_amount}}</span>円<span class="littleTax">税込</span></li>
              <li>1レッスン {{plan.lesson_price}}円</li>
            </ul>
          </div>
          <div>
          </div>
        </div>
    </div>

    <div class="blockList" v-if="pay_plans.length">
      <span class="titleT">学习月套餐</span>
        <div class="PricelistChild_add" v-for="(plan) in pay_plans">
          <div class="courseBlock">
            <span class="courseTitle lColorbg">{{plan.plan_name}}</span>
            <ul class="courseContent">
              <li><span class="orip">月額{{plan.final_amount}}円</span><span class="oriptax"> 税込</span></li>
              <li>月額<span class="amount">{{plan.paypal_amount}}</span>円<span class="littleTax">税込</span></li>
              <li>1レッスン {{plan.lesson_price}}円</li>
            </ul>
          </div>
          <div>
          </div>
        </div>
    </div>

    <div class="blockList" v-if="payPlansTicket.length">
      <span class="titleT">学习券套餐</span>
        <div class="PricelistChild_add" v-for="(plan) in payPlansTicket">
          <div class="courseBlock">
            <span class="courseTitle lColorbg">{{plan.plan_name}}</span>
            <ul class="courseContent">
              <li><span class="orip">月額{{plan.final_amount}}円</span><span class="oriptax"> 税込</span></li>
              <li>月額<span class="amount">{{plan.paypal_amount}}</span>円<span class="littleTax">税込</span></li>
              <li>1レッスン {{plan.lesson_price}}円</li>
            </ul>
          </div>
          <div>
          </div>
        </div>
    </div>

    <div class="blockList" v-if="talkPayPlans.length">
      <span class="titleT">会话月套餐</span>
        <div class="PricelistChild_add" v-for="(plan) in talkPayPlans">
          <div class="courseBlock">
            <span class="courseTitle sColorbg">{{plan.plan_name}}</span>
            <ul class="courseContent">
              <li><span class="orip">月額{{plan.final_amount}}円</span><span class="oriptax"> 税込</span></li>
              <li>月額<span class="amount">{{plan.paypal_amount}}</span>円<span class="littleTax">税込</span></li>
              <li>1レッスン {{plan.lesson_price}}円</li>
            </ul>
          </div>
          <div>
          </div>
        </div>
    </div>

    <div class="blockList" v-if="talkPayPlansTicket.length">
      <span class="titleT">会话券套餐</span>
        <div class="PricelistChild_add" v-for="(plan) in talkPayPlansTicket">
          <div class="courseBlock">
            <span class="courseTitle sColorbg">{{plan.plan_name}}</span>
            <ul class="courseContent">
              <li><span class="orip">月額{{plan.final_amount}}円</span><span class="oriptax"> 税込</span></li>
              <li>月額<span class="amount">{{plan.paypal_amount}}</span>円<span class="littleTax">税込</span></li>
              <li>1レッスン {{plan.lesson_price}}円</li>
            </ul>
          </div>
          <div>
          </div>
        </div>
    </div>

  </div>
  </n-card>

  <n-card title="法人套餐">
  <div v-if="businessShow">
    <div style="display: flex;margin:10px;">
      <span class="tagH" v-for="(tag) in tags">{{tag}}</span>
    </div>

    <div class="blockList" v-if="businessDefaultPlans.length">
      <span class="titleT">体験コース</span>
        <div class="PricelistChild_add" v-for="(bplan) in businessDefaultPlans">
          <div class="courseBlock">
            <span class="courseTitle lColorbg">{{bplan.plan_name}}</span>
            <ul class="courseContent">
              <li><span class="orip">月額{{bplan.final_amount}}円</span><span class="oriptax"> 税込</span></li>
              <li>月額<span class="amount">{{bplan.paypal_amount}}</span>円<span class="littleTax">税込</span></li>
              <li>1レッスン {{bplan.lesson_price}}円</li>
            </ul>
          </div>
          <div>
          </div>
        </div>
    </div>

    <div class="blockList" v-if="businessPayPlans.length">
      <span class="titleT">学习月套餐</span>
        <div class="PricelistChild_add" v-for="(bplan) in businessPayPlans">
          <div class="courseBlock">
            <span class="courseTitle lColorbg">{{bplan.plan_name}}</span>
            <ul class="courseContent">
              <li><span class="orip">月額{{bplan.final_amount}}円</span><span class="oriptax"> 税込</span></li>
              <li>月額<span class="amount">{{bplan.paypal_amount}}</span>円<span class="littleTax">税込</span></li>
              <li>1レッスン {{bplan.lesson_price}}円</li>
            </ul>
          </div>
          <div>
          </div>
        </div>
    </div>

    <div class="blockList" v-if="businessPayPlansTicket.length">
      <span class="titleT">学习券套餐</span>
        <div class="PricelistChild_add" v-for="(bplan) in businessPayPlansTicket">
          <div class="courseBlock">
            <span class="courseTitle sColorbg">{{bplan.plan_name}}</span>
            <ul class="courseContent">
              <li><span class="orip">月額{{bplan.final_amount}}円</span><span class="oriptax"> 税込</span></li>
              <li>月額<span class="amount">{{bplan.paypal_amount}}</span>円<span class="littleTax">税込</span></li>
              <li>1レッスン {{bplan.lesson_price}}円</li>
            </ul>
          </div>
          <div>
          </div>
        </div>
    </div>

    <div class="blockList" v-if="businessTalkPayPlans.length">
      <span class="titleT">会话月套餐</span>
        <div class="PricelistChild_add" v-for="(bplan) in businessTalkPayPlans">
          <div class="courseBlock">
            <span class="courseTitle sColorbg">{{bplan.plan_name}}</span>
            <ul class="courseContent">
              <li><span class="orip">月額{{bplan.final_amount}}円</span><span class="oriptax"> 税込</span></li>
              <li>月額<span class="amount">{{bplan.paypal_amount}}</span>円<span class="littleTax">税込</span></li>
              <li>1レッスン {{bplan.lesson_price}}円</li>
            </ul>
          </div>
          <div>
          </div>
        </div>
    </div>

    <div class="blockList" v-if="businessTalkPayPlansTicket.length">
      <span class="titleT">会话券套餐</span>
      <div class="PricelistWrap">
        <div class="PricelistChild_add" v-for="(bplan) in businessTalkPayPlansTicket">
          <div style="margin-bottom: -25px;text-align: center;">
            <h4>{{bplan.plan_name}}</h4>
          </div>
          <div class="ticket-plan-main" style="padding-top:30px;">
            <div class="ticket-plan-sub-l">
              <div class="font-size-26 font-weight-700">{{bplan.buy_issued_lesson_num}}</div>
              <div class="font-size-12 font-weight-700 margin-top-10">
                <span v-if="bplan.type == 1">ポイント</span>
                <span v-else>レッスン</span>
              </div>
            </div>
            <div class="ticket-plan-sub-r">
              <div class="font-size-18 font-weight-700">{{bplan.validity_term}}日間有効</div>
              <div class="ticket-plan-sub-r-child">
                <div class="ticket-plan-sub-r-child-l">{{bplan.paypal_amount}}</div>
                <div class="ticket-plan-sub-r-child-r">
                  <span class="font-size-11 font-weight-700">税込</span><br>
                  <span>円</span>
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>

  </div>
  </n-card>

</div>

    </template>

<script setup>

  import {
    useStudentChangeMonthPlanPayjpApi,
    useStudentChangeTicketPlanPayjpApi, useStudentPaypalPayApi,
    useStudentPlanListDataApi
  } from "~/apis/plan";
  import {createDiscreteApi} from "naive-ui";
  import {ref} from "vue";
  import {useBusinessPlansApi} from "~/apis/corporate";
  import {NCard} from "naive-ui";


  const pay_plans = ref([]);
  const business_pay_plans = ref([]);
  const tags = ref([]);
  let isShow = ref(0);
  let businessShow = ref(0);
  let payPlans = ref([]);
  let payPlansTicket = ref([]);
  let talkPayPlans = ref([]);
  let talkPayPlansTicket = ref([]);
  let businessPayPlans = ref([]);
  let businessPayPlansTicket = ref([]);
  let businessTalkPayPlans = ref([]);
  let businessTalkPayPlansTicket = ref([]);
  let defaultPlans = ref([]);
  let businessDefaultPlans = ref([]);
  let ticketPlanEnable = ref(0);

  const getPlans = async () => {
    const {pending, data: planinfo  } = await useBusinessPlansApi();
    if (planinfo?.value) {
      isShow.value = planinfo?.value?.is_show ?? 0;
      if (isShow.value) {
        pay_plans.value = planinfo?.value?.pay_plans ?? [];
        payPlansTicket.value = planinfo?.value?.pay_plans_ticket ?? [];
        talkPayPlans.value = planinfo?.value?.talk_pay_plans ?? [];
        talkPayPlansTicket.value = planinfo?.value?.talk_pay_plans_ticket ?? [];
        defaultPlans.value = planinfo?.value?.default_plan ?? [];
      }
      businessShow.value = planinfo?.value?.business_is_show ?? 0;
      if (businessShow.value) {
        tags.value = planinfo?.value?.business_tags ?? [];
        businessPayPlans.value = planinfo?.value?.business_pay_plans ?? [];
        businessTalkPayPlans.value = planinfo?.value?.business_talk_pay_plans ?? [];
        businessDefaultPlans.value = planinfo?.value?.business_default_plan ?? [];
        ticketPlanEnable.value = data?.value?.ticket_plan_member_enable ?? 0;
        if (ticketPlanEnable.value === 1) {
          businessPayPlansTicket.value = planinfo?.value?.business_pay_plans_ticket ?? [];
          businessTalkPayPlansTicket.value = planinfo?.value?.business_talk_pay_plans_ticket ?? [];
        }
      }

    }
  }
  getPlans();
  </script>

<style scoped>

  .courseBlock{
    border: 1px solid #F4F4F4;
    margin-bottom: 20px;
    display: inline-block;
    width: 48%;
    border-radius: 10px;
  }
  .courseContent{
    margin: 10px auto;
    transform: scale(0.9);
  }
  .blockList{
    display: inline-block;
    width: 50%;
    vertical-align: top;
  }
  .blockList span.titleT{
    width: 98%;
    font-weight: bold;
    font-size: 16px;
    padding-top: 2px;
    text-align: center;
    display: block;
    height: 30px;
    margin: 4px auto 16px auto;
    background-color: #F4F6FB;
    border-radius: 6px;
  }
  .tagH{
    width: 25%;
    text-align: center;
  }
</style>