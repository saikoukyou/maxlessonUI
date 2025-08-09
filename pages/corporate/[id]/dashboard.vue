<template>
  <div page="corporate">
    <div style="width: 100%;">
      <n-card title="管理画面TOP"  style="margin-bottom: 16px">
        <n-tabs type="line" animated default-value="person_invite">
          <n-tab-pane v-if="isShow" name="person_invite" tab="自己啓発" style="font-size: 20px;">
            <h2>自己啓発  合計利用中{{snum}}名</h2>
            <div v-if="defaultPlans.length">
              <span class="titleT">体験コース</span>
              <div class="grid">
                <div :nth="index+1 == defaultPlans.length ? 'last' : index" v-for="(item, index) in defaultPlans" :key="index"
                     :class="{ 'border-radius-s col gap-s': 1, ' bg-fourth': index == 0, ' bg-third ': index > 0 }">
                  <div class="col gap-s padding">
                    <span class="white">{{ index+1 }}</span>
                    <div class="row justify-center gap-l center">
                      <div v-html="item.plan_name" class="col"></div>
                      <div>
                        有効期間内{{ item.snum }}名
                      </div>
                    </div>
                    <p class="row flex-end">
                      <NuxtLink :to="'/corporate/centre/classes?plan_id='+item.monthly_plan_id">
                        <span class="font-size-xs button">名簿一覧</span>
                      </NuxtLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="payPlans.length">
              <span class="titleT">学习月套餐</span>
              <div class="grid">
                <div :nth="index+1 == payPlans.length ? 'last' : index" v-for="(item, index) in payPlans" :key="index"
                     :class="{ 'border-radius-s col gap-s': 1, ' bg-fourth': index == 0, ' bg-third ': index > 0 }">
                  <div class="col gap-s padding">
                    <span class="white">{{ index+1 }}</span>
                    <div class="row justify-center gap-l center">
                      <div v-html="item.plan_name" class="col"></div>
                      <div>
                        有効期間内{{ item.snum }}名
                      </div>
                    </div>
                    <p class="row flex-end">
                      <NuxtLink :to="'/corporate/centre/classes?plan_id='+item.monthly_plan_id">
                        <span class="button">名簿一覧</span>
                      </NuxtLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="payPlansTicket.length">
              <span class="titleT">学习券套餐</span>
              <div class="grid">
                <div :nth="index+1 == payPlansTicket.length ? 'last' : index" v-for="(item, index) in payPlansTicket" :key="index"
                     :class="{ 'border-radius-s col gap-s': 1, ' bg-fourth': index == 0, ' bg-third ': index > 0 }">
                  <div class="col gap-s padding">
                    <span class="white">{{ index+1 }}</span>
                    <div class="row justify-center gap-l center">
                      <div v-html="item.plan_name" class="col"></div>
                      <div>
                        有効期間内{{ item.snum }}名
                      </div>
                    </div>
                    <p class="row flex-end">
                      <NuxtLink :to="'/corporate/centre/classes?plan_id='+item.monthly_plan_id">
                        <span class="font-size-xs button">名簿一覧</span>
                      </NuxtLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="talkPayPlans.length">
              <span class="titleT">会话月套餐</span>
              <div class="grid">
                <div :nth="index+1 == talkPayPlans.length ? 'last' : index" v-for="(item, index) in talkPayPlans" :key="index"
                     :class="{ 'border-radius-s col gap-s': 1, ' bg-fourth': index == 0, ' bg-third ': index > 0 }">
                  <div class="col gap-s padding">
                    <span class="white">{{ index+1 }}</span>
                    <div class="row justify-center gap-l center">
                      <div v-html="item.plan_name" class="col"></div>
                      <div>
                        有効期間内{{ item.snum }}名
                      </div>
                    </div>
                    <p class="row flex-end">
                      <NuxtLink :to="'/corporate/centre/classes?plan_id='+item.monthly_plan_id">
                        <span class="font-size-xs button">名簿一覧</span>
                      </NuxtLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="talkPayPlansTicket.length">
              <span>会话券套餐1</span>
              <div class="grid">
                <div :nth="index+1 == talkPayPlansTicket.length ? 'last' : index" v-for="(item, index) in talkPayPlansTicket" :key="index"
                     :class="{ 'border-radius-s col gap-s': 1, ' bg-fourth': index == 0, ' bg-third ': index > 0 }">
                  <div class="col gap-s padding">
                    <span class="white">{{ index+1 }}</span>
                    <div class="row justify-center gap-l center">
                      <div v-html="item.plan_name" class="col"></div>
                      <div>
                        有効期間内{{ item.snum }}名
                      </div>
                    </div>
                    <p class="row flex-end">
                      <NuxtLink :to="'/corporate/centre/classes?plan_id='+item.monthly_plan_id">
                        <span class="font-size-xs button">名簿一覧</span>
                      </NuxtLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </n-tab-pane>
          <n-tab-pane v-if="businessShow" name="business_invite" tab="法人決済" style="font-size: 20px;">
            <h2>法人研修  合計利用中{{bsnum}}名</h2>
            <div v-if="businessDefaultPlans.length">
              <span class="titleT">体験コース</span>
              <div class="grid">
                <div :nth="index+1 == businessDefaultPlans.length ? 'last' : index" v-for="(item, index) in businessDefaultPlans" :key="index"
                     :class="{ 'border-radius-s col gap-s': 1, ' bg-fourth': index == 0, ' bg-third ': index > 0 }">
                  <div class="col gap-s padding">
                    <span class="white">{{ index+1 }}</span>
                    <div class="row justify-center gap-l center">
                      <div v-html="item.plan_name" class="col"></div>
                      <div>
                        有効期間内{{ item.snum }}名
                      </div>
                    </div>
                    <p class="row flex-end">
                      <NuxtLink :to="'/corporate/centre/classes?plan_id='+item.monthly_plan_id">
                        <span class="font-size-xs button">名簿一覧</span>
                      </NuxtLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="businessPayPlans.length">
              <span class="titleT">学习月套餐</span>
              <div class="grid">
                <div :nth="index+1 === businessPayPlans.length ? 'last' : index" v-for="(item, index) in businessPayPlans" :key="index"
                     :class="{ 'border-radius-s col gap-s': 1, ' bg-fourth': index == 0, ' bg-third ': index > 0 }">
                  <div class="col gap-s padding">
                    <span class="white">{{ index+1 }}</span>
                    <div class="row justify-center gap-l center">
                      <div v-html="item.plan_name" class="col"></div>
                      <div>
                        有効期間内{{ item.snum }}名
                      </div>
                    </div>
                    <p class="row flex-end">
                      <NuxtLink :to="'/corporate/centre/classes?plan_id='+item.monthly_plan_id">
                        <span class="font-size-xs button">名簿一覧</span>
                      </NuxtLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="businessPayPlansTicket.length && ticketPlanEnable">
              <span class="titleT">学习券套餐</span>
              <div class="grid">
                <div :nth="index+1 == businessPayPlansTicket.length ? 'last' : index" v-for="(item, index) in businessPayPlansTicket" :key="index"
                     :class="{ 'border-radius-s col gap-s': 1, ' bg-fourth': index == 0, ' bg-third ': index > 0 }">
                  <div class="col gap-s padding">
                    <span class="white">{{ index+1 }}</span>
                    <div class="row justify-center gap-l center">
                      <div v-html="item.plan_name" class="col"></div>
                      <div>
                        有効期間内{{ item.snum }}名
                      </div>
                    </div>
                    <p class="row flex-end">
                      <NuxtLink :to="'/corporate/centre/classes?plan_id='+item.monthly_plan_id">
                        <span class="font-size-xs button">名簿一覧</span>
                      </NuxtLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="businessTalkPayPlans.length">
              <span class="titleT">会话月套餐</span>
              <div class="grid">
                <div :nth="index+1 == businessTalkPayPlans.length ? 'last' : index" v-for="(item, index) in businessTalkPayPlans" :key="index"
                     :class="{ 'border-radius-s col gap-s': 1, ' bg-fourth': index == 0, ' bg-third ': index > 0 }">
                  <div class="col gap-s padding">
                    <span class="white">{{ index+1 }}</span>
                    <div class="row justify-center gap-l center">
                      <div v-html="item.plan_name" class="col"></div>
                      <div>
                        有効期間内{{ item.snum }}名
                      </div>
                    </div>
                    <p class="row flex-end">
                      <NuxtLink :to="'/corporate/centre/classes?plan_id='+item.monthly_plan_id">
                        <span class="font-size-xs button">名簿一覧</span>
                      </NuxtLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="businessTalkPayPlansTicket.length && ticketPlanEnable">
              <span class="titleT">会话券套餐2</span>
              <div class="grid">
                <div :nth="index+1 == businessTalkPayPlansTicket.length ? 'last' : index" v-for="(item, index) in businessTalkPayPlansTicket" :key="index"
                     :class="{ 'border-radius-s col gap-s': 1, ' bg-fourth': index == 0, ' bg-third ': index > 0 }">
                  <div class="col gap-s padding">
                    <span class="white">{{ index+1 }}</span>
                    <div class="row justify-center gap-l center">
                      <div v-html="item.plan_name" class="col"></div>
                      <div>
                        有効期間内{{ item.snum }}名
                      </div>
                    </div>
                    <p class="row flex-end">
                      <NuxtLink :to="'/corporate/centre/classes?plan_id='+item.monthly_plan_id">
                        <span class="font-size-xs button">名簿一覧</span>
                      </NuxtLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </n-tab-pane>
        </n-tabs>
      </n-card>
      <br />
      <!--		<h1 class="bold">中国に特化した　異文化ビジネス研修</h1>-->
      <!--		<div class="grid">-->
      <!--			<div :nth="index" v-for="(item, index) in list2" :key="index"-->
      <!--				:class="{ 'border-radius-s col gap-s': 1, ' bg-fourth': index == 0, ' bg-third ': index > 0 }">-->
      <!--				<div class="col gap-s padding">-->
      <!--					<span class="white">{{ item.id }}</span>-->
      <!--					<div class="row justify-center gap-l center">-->
      <!--						<div v-html="item.name" class="col"></div>-->
      <!--						<div>-->
      <!--							利用者数<br />{{ item.num }}名-->
      <!--						</div>-->
      <!--					</div>-->
      <!--					<p class="row flex-end">-->
      <!--						<span class="font-size-xs button">名簿一覧</span>-->
      <!--					</p>-->
      <!--				</div>-->
      <!--			</div>-->
      <!--		</div>-->
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import {useBusinessIndexApi} from "~/apis/corporate";
import {NCard, NTabPane, NTabs} from "naive-ui";
const list = ref([
	{
		id: '01',
		name: '各プラン ご利用状況',
		num: 0,
	},
	{
		id: '02',
		name: '3 ヶ月間<br/>36 回プラン',
		num: 3,
	},
	{
		id: '03',
		name: '5 ヶ月間<br/>40 回プラン',
		num: 10,
	},
	{
		id: '04',
		name: '6 ヶ月間<br/>36 回プラン',
		num: 18,
	},
	{
		id: '05',
		name: '12 ヶ月間<br/>40 回プラン',
		num: 3,
	},
	{
		id: '06',
		name: '全プラン<br/>総計',
		num: 9,
	},
])

const list2 = ref([
	{
		id: '01',
		name: '無料中国<br/>ビジネス入門講座',
		num: 0,
	},
	{
		id: '02',
		name: '中国ビジネス<br/>最新ニュース',
		num: 3,
	},
	{
		id: '03',
		name: '中国ビジネス<br/>パートナー研究',
		num: 10,
	},
	{
		id: '04',
		name: '現地<br/>採用者の管理',
		num: 18,
	},
	{
		id: '05',
		name: '御社<br/>オーダーメイド内容',
		num: 3,
	},
	{
		id: '06',
		name: '全プラン<br/>総計',
		num: 9,
	},
]);

let planList = ref([]);
let businessPlanList = ref([]);
let snum = ref(0);
let bsnum = ref(0);
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
let ticketPlanEnable = ref(0);
let defaultPlans = ref([]);
let businessDefaultPlans = ref([]);

const getInfo = async () => {
  let { data: data } = await useBusinessIndexApi();
  if (data?.value) {
    isShow.value = data?.value?.is_show ?? 0;
    if (isShow.value) {
      // planList.value = data?.value?.list ?? [];
      snum.value = data?.value?.snum ?? 0;
      payPlans.value = data?.value?.pay_plans ?? [];
      payPlansTicket.value = data?.value?.pay_plans_ticket ?? [];
      talkPayPlans.value = data?.value?.talk_pay_plans ?? [];
      talkPayPlansTicket.value = data?.value?.talk_pay_plans_ticket ?? [];
      defaultPlans.value = data?.value?.default_plans ?? [];
    }
    businessShow.value = data?.value?.business_is_show ?? 0;
    if (businessShow.value) {
      // businessPlanList.value = data?.value?.business_list ?? [];
      bsnum.value = data?.value?.bsnum ?? 0;
      businessPayPlans.value = data?.value?.business_pay_plans ?? [];
      businessPayPlansTicket.value = data?.value?.business_pay_plans_ticket ?? [];
      businessTalkPayPlans.value = data?.value?.business_talk_pay_plans ?? [];
      businessTalkPayPlansTicket.value = data?.value?.business_talk_pay_plans_ticket ?? [];
      ticketPlanEnable.value = data?.value?.ticket_plan_member_enable ?? 0;
      businessDefaultPlans.value = data?.value?.business_default_plan ?? [];
    }
  }
}

onMounted(() => {
  getInfo();
})

</script>
<style lang="scss">
.grid {
  width: 100%;

	p {line-height: 14px;}

	div.row {
		line-height: 22px;
		font-weight: bold;
	}

	.button {
		background-color: #fff;
		color: #000;
		border-radius: 10px;
		line-height: 14px;
		width: fit-content;
		padding: 0 5px;
	}
}
span.titleT{
  width: 100%;
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

</style>