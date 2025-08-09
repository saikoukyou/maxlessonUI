<template>
	<div class="info padding-xl border-radius-s shadow-light-yellow col gap-xl">
		<LoadingSkeleton v-if="!teacher" />

    <div v-if="teacher">
      <n-form  ref="formRef" :model="form" :rules="rules" size="large">
      <div class="bg-light-yellow border-radius-s gap-xl col">
        <div class="padding-xl col gap-xl">
          <div class="row gap-l baseinfo ">
            <div class="avatar rounded border border-color-third bg-white">
              <img :src="form.face_img5" alt="" />
            </div>
            <div class="col gap-xl flex">
              <div class="row gap-xl" style="width:100%;">
                <div class="row gap-l flex">
                  <n-form-item :show-label="false">
                    <label>お客様 ID</label>
                    <span>{{ form.id }}</span>
                  </n-form-item>
                </div>
                <div class="row gap-l flex">
                  <n-form-item :show-label="false" path="sex">
                    <label>性别</label>
                    <n-radio-group v-model:value="form.sex" name="sex">
                      <n-space>
                        <n-radio v-for="(sitem,sindex) in sexRadios" :key="sindex" :value="Number(sindex)">
                          {{ sitem }}
                        </n-radio>
                      </n-space>
                    </n-radio-group>
                  </n-form-item>
                </div>
                <div class="row gap-l flex">
                  <n-form-item :show-label="false" path="age"  class="w-200">
                    <label>年龄</label>
                    <n-select v-model:value="form.age" :options="ageOptions" placeholder="请选择年龄段" />
                  </n-form-item>
                </div>
              </div>

              <div class="row gap-xl" style="width:100%;">
                <div class="row gap-l flex items-baseline">
                  <n-form-item :show-label="false" path="name_cn">
                    <label>姓名(中文)</label>
                    <n-input class="SignInput" clearable v-model:value="form.name_cn" :disabled="infoDisabled" placeholder="张梦玲(中文)" />
                  </n-form-item>
                  <n-form-item :show-label="false" path="name_pinyin">
                    <label> 姓名(拼音)</label>
                    <n-input class="SignInput" clearable v-model:value="form.name_pinyin" :disabled="infoDisabled" placeholder="Zhang Mengling(拼音)" />
                  </n-form-item>
                  <n-form-item :show-label="false" path="name_kanji">
                    <label>姓名(日语)</label>
                    <n-input class="SignInput" clearable v-model:value="form.name_kanji" :disabled="infoDisabled" placeholder="張夢玲(日语)" />
                  </n-form-item>
                  <n-form-item :show-label="false" path="name_kana">
                    <label>姓名(片假名)</label>
                    <n-input class="SignInput" clearable v-model:value="form.name_kana" :disabled="infoDisabled" placeholder="チョウ ムレイ(片假名)" />
                  </n-form-item>
                </div>
              </div>
            </div>
          </div>

          <div class="row photos gap-xl">
            <div class="photo row items-center gap">
              <n-form-item :show-label="false" path="face_img5">
                <label>证件照<span class="labelSpec">800*800以上</span><span class="labelSpec">证件照需要白底</span></label>
                <span v-if="ushow">
                  <img class="face-img" v-if="infoDisabled" :src="form.face_img5" alt="" />
                  <uploader v-else v-model="form.face_img5"/>
                </span>
              </n-form-item>
            </div>
            <div class="photo row items-center gap">
              <n-form-item :show-label="false" path="face_img2">
                <label>生活照<span class="labelSpec">800*800以上</span></label>
                <span v-if="ushow">
                  <img v-if="infoDisabled" class="face-img" :src="form.face_img2" alt="" />
                  <uploader v-else v-model="form.face_img2"/>
                </span>
              </n-form-item>
            </div>
            <div class="photo row items-center gap">
              <n-form-item :show-label="false" path="face_img3">
                <label>生活照<span class="labelSpec">800*800以上</span></label>
                  <span v-if="ushow">
                    <img v-if="infoDisabled" class="face-img" :src="form.face_img3" alt="" />
                  <uploader v-else v-model="form.face_img3"/>
                  </span>
              </n-form-item>
            </div>
          </div>
        </div>

        <div class="border border-color-third padding-xl border-radius-s app-contact row gap-xl">
          <div class="col gap">
            <p class="row gap">
              <n-form-item :show-label="false" path="wechat">
                <label>WeChatID</label>
                <n-input clearable v-model:value="form.wechat" :disabled="infoDisabled" placeholder="WeChatID" />
              </n-form-item>
            </p>
            <p class="row gap">
              <n-form-item :show-label="false" path="teams_id">
                <label>TeamsID</label>
                <n-input clearable v-model:value="form.teams_id" placeholder="TeamsID" />
              </n-form-item>
            </p>
          </div>

          <div class="bg-grey padding row items-center justify-center" style="width:250px; margin-left:50px;">
            <n-form-item label="上传微信二维码，方便学生添加好友" path="wechat_img">
              <span v-if="ushow">
                <img v-if="infoDisabled" class="face-img" :src="form.wechat_img" alt="" />
                <uploader v-else v-model="form.wechat_img"/>
              </span>
            </n-form-item>

          </div>
        </div>
      </div>

      <div class="col gap-xl border-bottom other">
        以下信息 会日语的老师。请务必用日语进行填写。
        <div class="row gap">
          <div class="flex row">
            <n-form-item :show-label="false" path="blood_type">
              <label>血型</label>
              <n-input class="SignInput" clearable v-model:value="form.blood_type" :disabled="infoDisabled" placeholder="血型" />
            </n-form-item>
          </div>
          <div class="flex row">
            <n-form-item :show-label="false" path="dialect">
              <label>会讲的方言</label>
              <n-input class="SignInput" clearable v-model:value="form.dialect" :disabled="infoDisabled" placeholder="方言" />
            </n-form-item>
          </div>
          <div class="flex"></div>
        </div>
        <div class="row gap">
          <div class="flex row">
            <n-form-item :show-label="false" path="alma_mater">
              <label>毕业院校</label>
              <n-input class="SignInput" clearable v-model:value="form.alma_mater" :disabled="infoDisabled" placeholder="毕业院校" />
            </n-form-item>
          </div>
          <div class="flex row">
            <n-form-item :show-label="false" path="major">
              <label>专业</label>
              <n-input class="SignInput" clearable v-model:value="form.major" :disabled="infoDisabled" placeholder="专业" />
            </n-form-item>
          </div>
          <div class="flex"></div>
        </div>
        <div class="row gap">
          <div class="flex row">
            <n-form-item :show-label="false" path="birthplace">
              <label>出生地</label>
              <n-input class="SignInput" clearable v-model:value="form.province_bir" :disabled="infoDisabled" placeholder="省" />
              <n-input class="SignInput" clearable v-model:value="form.birthplace" :disabled="infoDisabled" placeholder="市" />
            </n-form-item>
          </div>
          <div class="flex row">
            <n-form-item :show-label="false" path="current_address">
              <label>现住地</label>
              <n-input class="SignInput" clearable v-model:value="form.province_addr" :disabled="infoDisabled" placeholder="省" />
              <n-input class="SignInput" clearable v-model:value="form.current_address" :disabled="infoDisabled" placeholder="市" />
            </n-form-item>
          </div>
          <div class="flex"></div>
        </div>
        <div class="row gap">
          <div class="flex row">
            <n-form-item :show-label="false" path="japanese_grade" class="w-200">
              <label>日语水平</label>
              <n-select v-model:value="form.japanese_grade" :options="japaneseOptions" :disabled="infoDisabled" />
            </n-form-item>
          </div>
          <div class="flex row">
            <n-form-item :show-label="false" path="english_grade" class="w-200">
              <label>英语水平</label>
              <n-select v-model:value="form.english_grade" :options="englishOptions" :disabled="infoDisabled" />
            </n-form-item>
          </div>
          <div class="flex row">
            <n-form-item :show-label="false" path="korea_grade" class="w-200">
              <label>韩语水平</label>
              <n-select v-model:value="form.korea_grade" :options="koreaOptions" :disabled="infoDisabled" />
            </n-form-item>
          </div>
        </div>
      </div>

      <div class="col gap-xl border-bottom contact" style="padding-bottom: 30px;padding-top: 30px;">
        <div class="row gap items-center">
          <n-form-item :show-label="false" path="tel">
            <label>手机号码</label>
            <n-input clearable v-model:value="form.tel" placeholder="手机号码" />
          </n-form-item>
        </div>
        <div class="row gap items-center">
          <n-form-item :show-label="false" path="email">
            <label>登录邮箱</label>
            <n-input clearable v-model:value="form.email" placeholder="登录邮箱" />
          </n-form-item>
        </div>
        <div class="row gap items-center">
          <n-form-item :show-label="false" path="password">
            <label>密码</label>
            <n-input type="password" clearable v-model:value="form.password" placeholder="密码" show-password-on="click" />
          </n-form-item>
        </div>
      </div>

      <div class="col gap border-bottom contact" style="padding-bottom: 30px;padding-top: 30px;">
        <div class="row gap items-center">
          <label>自我介绍</label>
        </div>
        <div>
          <div v-if="infoDisabled">
            <div v-html="form.intro_1"></div>
          </div>
          <div v-else>
            <n-form-item :show-label="false" path="intro_1">
              <n-input id="intro_1" name="intro_1" type="textarea" v-model:value="form.intro_1" :rows="3" :autosize="{minRows: 8,maxRows: 12}" clearable placeholder=""></n-input><br>
            </n-form-item>
          </div>
        </div>
      </div>

<!--      <div class="col gap contact" style="padding-bottom: 30px;padding-top: 30px;">-->
<!--        <div class="row gap items-center">-->
<!--          <n-form-item :show-label="false" path="exclamation_video">-->
<!--            <label>自我视频</label>-->
<!--            <uploader v-if="ushow" v-model="form.exclamation_video" :data="{type:'mp3'}"/>-->
<!--          </n-form-item>-->
<!--        </div>-->
<!--        <div class="row">-->
<!--          <div class="bg-grey" style="width:600px; height:360px;">-->
<!--            <video v-if="ushow" ref="videoPlayer" :src="form.exclamation_video" style="width:100%;height:100%;" controls></video>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

        <div style="text-align: center;">
          <n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
            <span style="padding-top: 8px; display: inline-block">下一步</span>
          </n-button>
        </div>

      </n-form>
    </div>

	</div>
</template>
<script async setup>
import {ref, inject, watch, onMounted} from "vue"
import {useTeacherAccount, useTeacherUpdateInfoData} from "~/apis/teacher";
import {createDiscreteApi, NButton, NForm, NFormItem, NInput, NRadioGroup, NRadio, NSelect, NUpload, NModal, NSpace} from "naive-ui";

const props = defineProps({
  nkey: {
    type: [String],
    default: ''
  }
});

const form = reactive({
  id:"",
  sex:"",
  age:"",
  name_kanji:"",
  name_cn:"",
  name_kana:"",
  face_img5:"",
  face_img2:"",
  face_img3:"",
  wechat:"",
  teams_id:"",
  wechat_img:"",
  blood_type:"",
  dialect:"",
  alma_mater:"",
  major:"",
  province_bir:"",
  birthplace:"",
  province_addr:"",
  current_address:"",
  japanese_grade:"",
  english_grade:"",
  korea_grade:"",
  tel:"",
  email:"",
  password:"",
  intro_1:"",
  exclamation_video:"",
})
const formRef = ref(null)
const maps = ref([]);
const ageOptions = ref([]);
const englishOptions = ref([]);
const japaneseOptions = ref([]);
const koreaOptions = ref([]);
const error = ref(null);
const loading = ref(false);
const ushow = ref(false);
let sexRadios = ref([]);
let infoDisabled = ref(false);

const rules = computed(() => {
  let r = {
    // sex: [{
    //   required: true,
    //   message: "请选择性别",
    //   trigger: "blur"
    // }],
    age: [{
      required: true,
      message: "请选择年龄段",
      trigger: "blur"
    }],
    name_cn: [{
      required: true,
      message: "请输入姓名（中文）",
      trigger: "blur",
      max:32
    }],
    name_pinyin: [{
      required: true,
      message: "请输入姓名（拼音）",
      trigger: "blur",
      max:32
    }],
    name_kanji: [{
      required: true,
      message: "请输入姓名(日语)",
      trigger: "blur",
      max:32
    }],
    name_kana: [{
      required: false,
      message: "请输入姓名(片假名)",
      trigger: "blur",
      max:32
    }],
    face_img5: [{
      required: false,
      message: "请上传图片",
      trigger: "blur",
      max:2048
    }],
    face_img2: [{
      required: false,
      message: "请上传图片",
      trigger: "blur",
      max:2048
    }],
    face_img3: [{
      required: false,
      message: "请上传图片",
      trigger: "blur",
      max:2048
    }],
    teams_id: [{
      required: !infoDisabled.value,
      message: "请填写teams",
      trigger: "blur",
      min:4,
      max:32
    }],
    wechat: [{
      required: !infoDisabled.value,
      message: "请填写微信",
      trigger: "blur",
      max:32
    }],
    wechat_img: [{
      required: !infoDisabled.value,
      message: "请上传微信二维码",
      trigger: "blur",
      max:2048
    }],
    blood_type: [{
      required: false,
      message: "请输入小于两位的血型",
      trigger: "blur",
      max:2
    }],
    dialect: [{
      required: false,
      message: "请输入小于16位方言",
      trigger: "blur",
      max:16
    }],
    alma_mater: [{
      required: false,
      message: "请输入小于100个字符的毕业院校",
      trigger: "blur",
      max:100
    }],
    major: [{
      required: false,
      message: "请输入小于100个字符的专业",
      trigger: "blur",
      max:50
    }],
    province_bir: [{
      required: false,
      message: "请输入小于32个字符的省",
      trigger: "blur",
      max:32
    }],
    birthplace: [{
      required: false,
      message: "请输入小于16个字符的市",
      trigger: "blur",
      max:16
    }],
    province_addr: [{
      required: false,
      message: "请输入小于32个字符的省",
      trigger: "blur",
      max:32
    }],
    current_address: [{
      required: false,
      message: "请输入小于16个字符的市",
      trigger: "blur",
      max:16
    }],
    japanese_grade: [{
      required: false,
      message: "请输入日语水平",
      trigger: "blur",
      max:20
    }],
    english_grade: [{
      required: false,
      message: "请输入英语水平",
      trigger: "blur",
      max:20
    }],
    korea_grade: [{
      required: false,
      message: "请输入韩语水平",
      trigger: "blur",
      max:20
    }],
    tel: [{
      required: false,
      message: "请输入小于13个字符的手机号码",
      trigger: "blur",
      max:13
    }],
    email: [{
      type: 'email',
      required: true,
      message: "正しいログイン用メールアドレスを入力してください",
      trigger: "blur",
      max:100
    }],
    password: [{
      required: false,
      message: "6～18文字のパスワードを入力してください",
      trigger: "blur",
      min:6,
      max:18
    }],
  }
  return r
})
let teacher = ref({});
const useStore = useMainStore();

onMounted(async () => {
  let { data } = await useTeacherAccount();
  if (data.value != null && data.value !== undefined) {
    teacher.value = data.value;
  }
  if (teacher?.value) {
    // console.log('teacher.value:'+JSON.stringify(teacher?.value));
    infoDisabled.value = teacher?.value.apply_status === 8 ? true : false;
    if (teacher?.value?.apply_status === 5) {//填写补充信息
      const { message } = createDiscreteApi(["message"]);
      message.success("恭喜老师合格。您现在需要先完善个人信息。培训结束后，会在线签署合同。之后您就可以开课");
    }
    console.log("infoDisabled.value:"+infoDisabled.value);
    form.id = teacher?.value.id ?? "";
    form.sex = teacher?.value.sex ?? "";
    form.age = teacher?.value.age ?? "";
    form.name_kanji = teacher?.value.name_kanji ?? "";
    form.name_cn = teacher?.value.name_cn ?? "";
    form.name_kana = teacher?.value.name_kana ?? "";
    form.name_pinyin = teacher?.value.name_pinyin ?? "";
    form.face_img5 = teacher?.value.face_img5 ?? "";
    form.face_img2 = teacher?.value.face_img2 ?? "";
    form.face_img3 = teacher?.value.face_img3 ?? "";
    form.teams_id = teacher?.value.teams_id ?? "";
    form.wechat = teacher?.value.wechat ?? "";
    form.wechat_img = teacher?.value.wechat_img ?? "";
    form.blood_type = teacher?.value.blood_type ?? "";
    form.dialect = teacher?.value.dialect ?? "";
    form.alma_mater = teacher?.value.alma_mater ?? "";
    form.major = teacher?.value.major ?? "";
    form.province_bir = teacher?.value.province_bir ?? "";
    form.birthplace = teacher?.value.birthplace ?? "";
    form.province_addr = teacher?.value.province_addr ?? "";
    form.current_address = teacher?.value.current_address ?? "";
    form.japanese_grade = teacher?.value.japanese_grade ?? "";
    form.english_grade = teacher?.value.english_grade ?? "";
    form.korea_grade = teacher?.value.korea_grade ?? "";
    form.tel = teacher?.value.tel ?? "";
    form.email = teacher?.value.email ?? "";
    form.password = teacher?.value.passwd ?? "";
    form.intro_1 = teacher?.value.intro_1 ?? "";
    form.exclamation_video = teacher?.value.exclamation_video ?? "";
    ushow.value = true;
  }

  maps.value = teacher?.value?.maps ?? [];

  if (maps.value !== undefined && maps.value != null && maps.value.length !== 0) {
    sexRadios.value = maps.value.sex;
    ageOptions.value = Object.keys(maps.value.age).map(
        key => ({
          label: maps.value.age[key],
          value: key
        })
    );

    englishOptions.value = Object.keys(maps.value.english_grade).map(
        key => ({
          label: maps.value.english_grade[key],
          value: key
        })
    );
    japaneseOptions.value = Object.keys(maps.value.japanese_grade).map(
        key => ({
          label: maps.value.japanese_grade[key],
          value: key
        })
    );

    koreaOptions.value = Object.keys(maps.value.korea_grade).map(
        key => ({
          label: maps.value.korea_grade[key],
          value: key
        })
    );
  }

})

const emit = defineEmits(['changeTab']);

const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;
    loading.value = true

    const {data, error  } = await useTeacherUpdateInfoData(form);

    loading.value = false

    if (error.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data.value != null && data?.value.err === false) {
      useStore.useRefreshTeacherInfo();
      emit('changeTab',props.nkey);
      message.success("保存成功");
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

useEnterEvent(() => onSubmit())

watch(teacher, function (value) {
	if (value) {
		// form.value.email = value.email
		// form.intro = value.intro_1
	}
})
</script>
<style lang="scss" scoped>
.baseinfo label,
.contact label,
.app-contact label,
.other label {
	width: 100px;
}

.other{
  padding-bottom: 30px;padding-top: 30px;
}

.other,
.contact {
	padding-left: 30px;
	padding-right: 30px;
}
.w-200{
  width: 200px;
}
.face-img {
  width: 96px;
  height: 96px;
}
.labelSpec{
  display: block; font-size: 12px; margin-right: 10px;color: #666666;
}
.tiptext{
  position:absolute;
  color: #666666;
  font-size: 12px;
  margin: 68px 0 0 76px;
}
.tiptext2{
  position:absolute;
  color: #666666;
  font-size: 12px;
  margin: 68px 0 0 76px;
}
.Submit{
  margin-top: 20px;
}
.border-bottom{
  border-bottom: 1px solid #DDDDDD;
}
.avatar{
  border-width: 3px; width: 70px; height:70px; margin-right:50px;
}
@media screen and (max-width: 520px) {
  .other,.contact{
    padding: 30px;
    text-align: left;
  }
  .other .row{
    display: block;
  }
  .w-200{
    width: 100%;
  }
  .app-contact .row{
    display: block;
  }
  .info .row{
    display: block;
  }
  .info .padding-xl{
    padding: 20px;
    border: 0;
  }
  .avatar{
    border-width: 3px; width: 80px; height:80px;
    margin: auto;
  }
  .n-form-item .n-form-item-blank{
    display: block;
  }
  .other{
    margin-top: 30px;
  }
  .padding-xl{
    padding: 0;
  }
}
</style>