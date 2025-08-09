<template>

    <n-card title="受講者の新規追加" style="margin-bottom: 16px">
      <n-tabs type="line" animated default-value="person_invite" @update:value="changeTab">

        <n-tab-pane v-if="pshow" name="person_invite" tab="自己啓発" style="font-size: 20px;">
          <div class="form bg-white-yellow padding padding-x-xl bold border-radius col gap font-size-s">
            <div class="row items-center gap linkBlock">
              {{registerLink}}
            </div>
            <div>
              <nuxt-link class="siteLink" to="/corporate/center/invite-pay">専用サイト表示内容の修正</nuxt-link>
            </div>
          </div>
        </n-tab-pane>

        <n-tab-pane v-if="bshow" name="business_invite" tab="法人決済" style="font-size: 20px;">
          <span class="wayTitle">方法1：</span>
          <div class="form bg-white-yellow padding padding-x-xl bold border-radius col gap font-size-s">
            <div class="row items-center gap linkBlock">
              {{businessRegisterLink}}
            </div>
            <div>
              <nuxt-link class="siteLink" to="/corporate/center/invite-free">専用サイト表示内容の修正</nuxt-link>
            </div>
          </div>

          <div class="way2">
            <span class="wayTitle">方法2：</span>
            <div class="form bg-white-yellow padding padding-x-xl bold border-radius col gap font-size-s">
              <n-form  ref="formRef" :model="formVal" :rules="rules" size="large">
                <div class="row items-center gap">
                  <n-form-item path="last_name">
                    <label>氏名（姓）</label>
                    <n-input type="text" name="last_name" v-model:value="formVal.last_name" placeholder="氏名（姓）" />
                  </n-form-item>
                </div>
                <div class="row items-center gap">
                  <n-form-item path="first_name"  class="w-200">
                    <label>氏名（名）</label>
                    <n-input type="text" name="first_name" v-model:value="formVal.first_name" placeholder="氏名（名）" />
                  </n-form-item>
                </div>
                <div class="row items-center gap">
                  <n-form-item path="email"  class="w-200">
                    <label>受講者メ-ルアドレス</label>
                    <n-input type="text" v-model:value="formVal.email" placeholder="受講者メ-ルアドレス" />
                  </n-form-item>
                </div>
                <div class="row items-center gap">
                  <n-form-item path="confirm_email"  class="w-200">
                    <label>受講者メ-ルアドレス(確認)</label>
                    <n-input type="text" v-model:value="formVal.confirm_email" placeholder="受講者メ-ルアドレス(確認)" />
                  </n-form-item>
                </div>
                <div class="row items-center gap">
                  <n-form-item path="plan"  class="w-200">
                    <label>受講プラン</label>
                    <n-select v-model:value="formVal.plan_id" :options="plansOptions" placeholder="受講プラン" />
                  </n-form-item>
                </div>
                <div class="row items-center gap">
                  <div class="row items-center gap">
                    <n-form-item class="w-200">
                      <label>利用開始日</label>
                      <n-date-picker v-model:formatted-value="formVal.business_start_date" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" @update:value="businessDateChange" placeholder="利用開始日" />
                    </n-form-item>
                  </div>
                </div>
                <div class="row justify-center" style="margin-top: 20px;">
                  <div class="button-submit" @click="onSubmit">招待する</div>
                </div>
              </n-form>
            </div>
          </div>

          <n-card title="招待中で未登録の受講者">
            <h1 class="bold">招待中で未登録の受講者</h1>
            <p class="font-size-s">※日付やプランを修正して招待したい場合、いったん「招待をやめる」をクリックした上、再度に新規追加をしてください。</p>

            <n-form  ref="formRefbm" :model="formValbm" :rules="rulesbm" size="large">
              <div class="row items-center gap">
                <n-form-item class="w-200">
                  <label>メールアドレス</label>
                  <n-input type="text" style="width:200px;" v-model:value="formValbm.email" placeholder="メールアドレスを入力してください" />
                </n-form-item>
              </div>
              <div class="row justify-center" style="margin-top: 20px;">
                <div class="button-submit" @click="onSearchBusinessInvite">検索</div>
              </div>
            </n-form>

            <div class="list">
              <div class="tr bold">
                <span class="th">番号</span>
                <span class="th">受講者</span>
                <span class="th">プラン名</span>
                <span class="th">利用開始日</span>
                <span class="th">支払い区分</span>
                <span class="th">操作</span>
              </div>
              <div class="tr item" v-for="(uitem,uindex) in unList">
                <div class="td bold">
                  {{uindex+1}}
                  <PersonOutline class="svg" />
                </div>
                <div class="td">
                  <p><b>{{uitem.name}}</b></p>
                </div>
                <div class="td">
                  <p>{{uitem.monthly_plan_name}}</p>
                </div>
                <div class="td">
                  <p>{{uitem.start_date}}</p>
                </div>
                <div class="td">
                  <p>
            <span v-for="(pitem) in paytypes">
            <span v-if="pitem.value === uitem.corporate_member_payment_method">{{pitem.label}}</span>
            </span>
                  </p>
                </div>
                <div class="td">
                  <p class="bordered">
                    <span @click="reInvite(uitem.id)">再度招待</span>
                  </p>
                  <p class="bordered">
                    <span @click="deleteInvite(uitem.id)">招待をやめる</span>
                  </p>
                </div>
              </div>
            </div>
            <n-pagination size="large" style="margin-top:10px;" :item-count="alltotal" :page="page" :page-size="pagelimit"
                          :on-update:page="handlePageChange" />
          </n-card>

        </n-tab-pane>
        <n-tab-pane v-if="videoShow == 1" name="video_invite" tab="動画" style="font-size: 20px;">
          <n-tabs type="line" animated>
            <n-tab-pane name="business_invite" tab="動画研修追加">
              <div class="form bg-white-yellow padding padding-x-xl bold border-radius col gap font-size-s">
                <n-form  ref="formRefsv" :model="formValsv" :rules="rulessv" size="large">
                  <div class="row items-center gap">
                    <div class="row items-center gap">
                      <n-form-item class="w-200">
                        <label>メールアドレス</label>
                        <n-input type="text" class="input" v-model:value="formValsv.email" placeholder="メールアドレスを入力してください" />
                      </n-form-item>
                    </div>
                  </div>
<!--                  <div class="row items-center gap">-->
<!--                    <div class="row items-center gap">-->
<!--                      <n-form-item class="w-200">-->
<!--                        <label>招待状态</label>-->
<!--                        <n-select v-model:value="formValsv.status" :options="statusOption" placeholder="请选择状态" />-->
<!--                      </n-form-item>-->
<!--                    </div>-->
<!--                  </div>-->
                  <div class="row justify-center" style="margin-top: 20px;">
                    <div class="button-submit" @click="onSubmitSettingSearch">检索</div>
                  </div>
                </n-form>
                <div>
                  <div>
                    <n-table :bordered="false" :single-line="false">
                      <thead>
                      <tr>
                        <th>招待日時</th>
                        <th>受講者名</th>
                        <th>メールアドレス</th>
                        <th>プラン</th>
                        <th>動画プラン</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(student) in allStudent">
                        <td>{{student.created_at}}</td>
                        <td>{{student.last_name}}{{student.first_name}}</td>
                        <td>{{student.email}}</td>
                        <td>{{student.plan_name}}</td>
                        <td>
                          <n-select v-model:value="student.has_video_plan" :options="videoPlanOption" @update:value="changeVideoPlan(student.id,student.has_video_plan)" placeholder="动画プラン" />
                        </td>
                      </tr>
                      </tbody>
                    </n-table>
                  </div>
                  <n-pagination size="large" style="margin-top:10px;" :item-count="videototal" :page="vpage" :page-size="vpagelimit"
                                :on-update:page="handlePageChangeVideo" />
                </div>

              </div>
            </n-tab-pane>
            <n-tab-pane name="old_invite" tab="メンバーを招待">
              <div class="form bg-white-yellow padding padding-x-xl bold border-radius col gap font-size-s">
                <n-form  ref="formRefv" :model="formValv" :rules="rulesv" size="large">
                  <div class="row items-center gap">
                    <n-form-item path="last_name"  class="w-200">
                      <label>氏名（姓）</label>
                      <n-input type="text" name="last_name" v-model:value="formValv.last_name" placeholder="氏名（姓）" />
                    </n-form-item>
                  </div>
                  <div class="row items-center gap">
                    <n-form-item path="first_name"  class="w-200">
                      <label>氏名（名）</label>
                      <n-input type="text" name="first_name" v-model:value="formValv.first_name" placeholder="氏名（名）" />
                    </n-form-item>
                  </div>
                  <div class="row items-center gap">
                    <n-form-item path="email"  class="w-200">
                      <label>受講者メ-ルアドレス</label>
                      <n-input type="text" v-model:value="formValv.email" placeholder="受講者メ-ルアドレス" />
                    </n-form-item>
                  </div>
                  <div class="row items-center gap">
                    <n-form-item path="confirm_email"  class="w-200">
                      <label>受講者メ-ルアドレス(確認)</label>
                      <n-input type="text" v-model:value="formValv.confirm_email" placeholder="受講者メ-ルアドレス(確認)" />
                    </n-form-item>
                  </div>
                  <div class="row items-center gap">
                    <n-form-item class="w-200">
                      <label>利用開始日</label>
                      <n-date-picker v-model:formatted-value="formValv.start_date" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" @update:value="dateChange" placeholder="利用開始日" />
                    </n-form-item>
                  </div>
                  <div class="row items-center gap">
                    <n-form-item path="paytype"  class="w-200">
                      <label>支払い区分</label>
                      <n-radio-group v-model:value="formValv.corporate_member_payment_method" name="corporate_member_payment_method">
                        <n-space>
                          <n-radio v-for="item in paytypes" :key="item.value" :value="item.value">
                            {{ item.label }}
                          </n-radio>
                        </n-space>
                      </n-radio-group>
                    </n-form-item>
                  </div>

                  <div class="row justify-center" style="margin-top: 20px;">
                    <div class="button-submit" @click="onSubmitVideo">招待する</div>
                  </div>
                </n-form>
              </div>

            </n-tab-pane>
          </n-tabs>
        </n-tab-pane>
      </n-tabs>
    </n-card>


</template>
<script setup>
import { ref } from "vue"
import { PersonOutline } from '@vicons/ionicons5'
import {
  useBusinessMemberSettingsApi, useChangeVideoPlanApi, useComplteListApi,
  useInviteDeleteApi,
  useMemberInviteApi,
  useMemberInviteCompleteApi, useMemberUnListApi, useMemberVideoInviteCompleteApi,
  useReInviteApi
} from "~/apis/corporate";
import {
  NForm,
  NFormItem,
  NSelect,
  NDatePicker,
  NRadioGroup,
  NRadio,
  NSpace,
  NInput,
  createDiscreteApi,
  NCard,
  NTabs,
  NTabPane,
  NTable,
  NPagination
} from "naive-ui";
import {usePage} from "~/composables/usePage";

const paytypes = [
	{ value: 0, label: '法人支払い' },
	{ value: 1, label: '社員支払い' },
];
const formVal = reactive({
  id: 0,
  first_name: null,
  last_name: null,
  email: null,
  confirm_email: null,
  plan_id: null,
  // start_date_int: null,
  business_start_date: null,
  // corporate_member_payment_method: 0,
});
const formValv = reactive({
  first_name: null,
  last_name: null,
  email: null,
  confirm_email: null,
  start_date: null,
  type: 1,
  plan_id: 0,
  corporate_member_payment_method: 0
});
const formValsv = reactive({
  id: 0,
  email: '',
  status: '',
});
const formValbm = reactive({
  id: 0,
  email: '',
});
const formRef = ref(null);
const formRefbm = ref(null);
const rules = computed(() => {
  let r = {
    first_name: [{
      required: true,
      message: "名前を入力してください",
      trigger: "blur",
      max: 32
    }],
    last_name: [{
      required: true,
      message: "苗字を入力してください",
      trigger: "blur",
      max: 32
    }],
    email: [{
      type: 'email',
      required: true,
      message: "正しいメールアドレスを入力してください",
      trigger: "blur",
      min: 4,
      max: 30,
    }],
    confirm_email: [{
      type: 'email',
      required: true,
      message: "正しいメールアドレスを入力してください",
      trigger: "blur",
      min: 4,
      max: 30,
    },
      {
        validator: validateEmailSame,
        message: '入力されたメールアドレスが一致しません',
        trigger: ['blur']
      }],
    plan_id: [{
      required: true,
      message: "プランを選択してください",
      trigger: "blur",
    }],
    business_start_date: [{
      type: 'number',
      required: true,
      message: "请选择日期",
      trigger: "blur",
    }],
  }

  return r
});
const formRefv = ref(null);
const rulesv = computed(() => {
  let r = {
    first_name: [{
      required: true,
      message: "名前を入力してください",
      trigger: "blur",
      max: 32
    }],
    last_name: [{
      required: true,
      message: "苗字を入力してください",
      trigger: "blur",
      max: 32
    }],
    email: [{
      type: 'email',
      required: true,
      message: "正しいメールアドレスを入力してください",
      trigger: "blur",
      min: 4,
      max: 30,
    }],
    confirm_email: [{
      type: 'email',
      required: true,
      message: "正しいメールアドレスを入力してください",
      trigger: "blur",
      min: 4,
      max: 30,
    },
      {
        validator: validateVideoEmailSame,
        message: '入力されたメールアドレスが一致しません',
        trigger: ['blur']
      }],
    start_date: [{
      required: true,
      message: "请输入开始日期",
      trigger: "blur",
      max: 32
    }],
  }

  return r
});

const rulessv = computed(() => {
  let r = {
    email: [{
      type: 'email',
      required: true,
      message: "正しいメールアドレスを入力してください",
      trigger: "blur",
      min: 4,
      max: 30,
    }],
  }

  return r
});

const rulesbm = computed(() => {
  let r = {
    email: [{
      type: 'email',
      required: true,
      message: "正しいメールアドレスを入力してください",
      trigger: "blur",
      min: 4,
      max: 30,
    }],
  }

  return r
});

let memberOptions = ref([]);
let plansOptions = ref([]);
let mlist = ref([]);
let plist = ref([]);
const loading = ref(false);
let unList = ref([]);
let setting = ref([]);
let pshow = ref(0);
let bshow = ref(0);
let pplans = ref([]);
let bplans = ref([]);
let registerLink = ref('');
let businessRegisterLink = ref('');
let setDateType = ref(0);
let setDateType2 = ref(0);
let isShowPlan = ref(0);
let businessIsShowPlan = ref(0);
// let businessActiveFields = ref([]);
let statusOption = ref([]);
let videoShow = ref(0);
let allStudent = ref([]);
let videoPlanOption = ref([]);
let selectedVideoPlanId = ref(0);
let page = ref(0);
let pagelimit = ref(10);
let alltotal = ref(0);
let vpage = ref(0);
let vpagelimit = ref(10);
let videototal = ref(0);


const getList = async () => {
  const { data:info } = await useMemberInviteApi();
  if (info?.value) {
    mlist.value = info?.value?.list?.data ?? [];
    plist.value = info?.value.plans ?? [];
    unList.value = info?.value?.list?.data ?? [];
    alltotal.value = info?.value?.list?.total ?? 0;
    setting.value = info?.value?.setting ?? [];
    pshow.value = setting?.value?.is_show ?? 0;
    bshow.value = setting?.value?.business_is_show ?? 0;
    pplans.value = info?.value.person_plans ?? [];
    bplans.value = info?.value.business_plans ?? [];
    registerLink.value = info?.value?.setting?.register_link ?? '';
    businessRegisterLink.value = info?.value?.setting?.business_register_link ?? '';
    isShowPlan.value = info?.value?.setting?.is_show_plan ?? 0;
    businessIsShowPlan.value = info?.value?.setting?.business_is_show_plan ?? 0;
    videoShow.value = info?.value?.setting?.video_plan_enable ?? 0;

    memberOptions.value = Object.keys(mlist.value).map(
        key => ({
          label: mlist.value[key].name,
          value: mlist.value[key].id
        })
    );
    plansOptions.value = Object.keys(plist.value).map(
        key => ({
          label: plist.value[key],
          value: key
        })
    );
    let slist = info?.value.status ?? [];
    statusOption.value = Object.keys(slist).map(
        key => ({
          label: slist[key],
          value: key
        })
    );

  }
}

onMounted(() => {
  getList();
})

function dateChange(value,strValue) {
  formValv.start_date = strValue;
}
function businessDateChange(value,strValue) {
  formVal.business_start_date = strValue;
}

const onSubmit = () => {
  formRef.value.validate(async (errors) => {

    if (errors) return;

    loading.value = true

    const {data, error  } = await useMemberInviteCompleteApi(formVal);

    loading.value = false

    if (error.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data?.value && data?.value.err === false) {
      message.success("招待成功")
    } else {
      let return_errors = data.value.errors;
      if (return_errors) {
        Object.keys(return_errors).forEach(key=>{
          message.error(return_errors[key][0]);
        })
        return;
      }
      return message.error(data?.value.err_msg || 'サービス側エラー');
    }

  })
}

const onSubmitVideo = () => {
  formRefv.value.validate(async (errors) => {

    if (errors) return;

    loading.value = true

    const {data, error  } = await useMemberVideoInviteCompleteApi(formValv);

    loading.value = false

    if (error.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data?.value && data?.value.err === false) {
      message.success("招待成功")
    } else {
      let return_errors = data.value.errors;
      if (return_errors) {
        Object.keys(return_errors).forEach(key=>{
          message.error(return_errors[key][0]);
        })
        return;
      }
      return message.error(data?.value.err_msg || 'サービス側エラー');
    }

  })
}

const onSearchBusinessInvite = async () => {

  formRefbm.value.validate(async (errors) => {

    if (errors) return;

    loading.value = true

    let res2 = await usePage(() => {
      return useMemberUnListApi({
        email:formValbm.email,
        get_count:true,
        page:page.value})
    });

    loading.value = false

    const { message } = createDiscreteApi(["message"]);
    if (res2) {
      unList.value = res2?.rows?.value ?? [];
      alltotal.value = res2?.total?.value ?? 0;
    } else {
      let return_errors = data.value.errors;
      if (return_errors) {
        Object.keys(return_errors).forEach(key=>{
          message.error(return_errors[key][0]);
        })
        return;
      }
      return message.error(data?.value.err_msg || 'サービス側エラー');
    }

  })

}
const onSubmitSettingSearch = async () => {

  const { message } = createDiscreteApi(["message"]);

  loading.value = true;
  let vres = await usePage(() => {
    return useComplteListApi({
      email:formValsv.email,
      get_count:true,
      page:vpage.value})
  });
  if (vres) {
    allStudent.value = vres?.rows?.value ?? [];
    videototal.value = vres?.total?.value ?? 0;
    formValv.plan_id = selectedVideoPlanId.value = vres?.data?.value?.video ?? 0;
    videoPlanOption.value = Object.keys(vres?.data?.value?.video_plans ?? []).map(
        key => ({
          label: vres?.data?.value?.video_plans[key],
          value: parseInt(key)
        })
    );
  }
  loading.value = false;
}

const changeTab = (value) => {
  if (value == 'video_invite') {
    onSubmitSettingSearch();
  }
}

const changeVideoPlan = async (student_id,add_plan) => {
  loading.value = true;
  const {data, error  } = await useChangeVideoPlanApi({'student_id':student_id,'video_plan_id':selectedVideoPlanId.value,'add_plan':add_plan});
  if (data?.value && data?.value?.err === false) {
    const { message } = createDiscreteApi(["message"])
    message.success(data?.value?.err_msg)
  }
  loading.value = false;
}
async function reInvite(id) {
  const {data:info} = await useReInviteApi(id);
  if (info?.value && info?.value?.err === false) {
    const { message } = createDiscreteApi(["message"])
    message.success("招待成功")
  }
}

async function deleteInvite(id) {
  const {data:info} = await useInviteDeleteApi(id);
  if (info?.value && info?.value?.err === false) {
    const { message } = createDiscreteApi(["message"])
    message.success("删除成功")
    getList();
  }
}

function validateEmailSame(rule, value) {
  return value === formVal.email;
}

function validateVideoEmailSame(rule, value) {
  return value === formValv.email;
}

function handlePageChange(p) {
  page.value = p;
  onSearchBusinessInvite();
}

function handlePageChangeVideo(p) {
  vpage.value = p;
  onSubmitSettingSearch();
}

</script>
<style lang="scss" scoped>
.steps {
	>div {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 10px;
		border-left: 1px solid #ffffff;
		padding-left: 10px;

		h5 {
			color: white;
		}

		p {
			line-height: 20px;
			text-align: center;
		}
	}
}

.form .row {
	.input {
		width: 200px;
    border: 1px solid var(--input-border-color);
	}
  .n-select {
    width: 200px;
    //border: 1px solid var(--input-border-color);
  }
  .n-input {
    width: 200px;
  }

	p {
		width: 100px;
	}
}

.form .radio {
	.radio-item {
		border: 1px solid var(--input-border-color);
		padding: 10px;
	}
}

.list {
	font-size: 12px;
	display: flex;
	flex-direction: column;
	gap: 10px;

	p {
		line-height: 18px;
	}

	.item {
		height: 50px;
	}

	.tr {
		display: grid;
		grid-template-columns: 1fr 2fr 3fr 3fr 2fr 2fr;

		.td {
			padding: 10px;
			background-color: var(--color-yellow-light);
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 5px;
			position: relative;
			overflow: hidden;

			svg {
				color: #fff;
				position: absolute;
				bottom: -10px;
				width: 50px;
			}
		}

		.td:nth-of-type(1),
		.td:nth-of-type(2) {
			background-color: var(--color-third);
		}

		.bordered {
			// border: 1px solid var(--border-color-black);
			border-radius: 10px;
			width: fit-content;
			padding: 0 10px;
			display: flex;
			gap: 10px;
			font-size: 10px;
			background: var(--color-third);
		}
	}
}
.way2{
  margin-bottom: 20px;
}
.wayTitle{
  display: block;
  margin: 10px 0 2px 0;
  font-size: 16px;
}
.button-submit{
  cursor: pointer;
}
</style>