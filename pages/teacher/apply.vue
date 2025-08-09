<template>
	<NuxtLayout name="teacherout">
		<div page="teacher-apply">
			<Header title="欢迎您申请对外汉语兼职讲师的职位" title2="请填写以下基本信息。完成后您会看到添加微信的二维码，请添加微信确认在线面试时间。" />

      <div class="apply col gap">
        <n-form  ref="formRef" :model="form" :rules="rules" :label-width="150" size="large">
          <n-grid :cols="24" :x-gap="24" class="responsive-grid">
            <n-form-item-gi :span="12" label="真实姓名" path="name_cn">
              <n-input class="SignInput" clearable v-model:value="form.name_cn" placeholder="真实姓名" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="性别" path="sex">
              <n-radio-group v-model:value="form.sex" name="sex">
                <n-space>
                  <n-radio v-for="(sitem,sindex) in sexOptions" :key="sindex" :value="Number(sindex)">
                    {{ sitem }}
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="年龄" path="age">
              <n-select v-model:value="form.age" :options="ageOptions" placeholder="请选择年龄段" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="毕业院校" path="alma_mater">
              <n-input class="SignInput" clearable v-model:value="form.alma_mater" placeholder="毕业院校" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="专业" path="major">
              <n-input class="SignInput" clearable v-model:value="form.major" placeholder="专业" />
            </n-form-item-gi>
            <div class="row">
              <div class="item"><label for="">技能选择</label></div>
            </div>
<!--            <n-form-item-gi :span="12" label="英语水平" path="english_grade">-->
<!--              <n-select v-model:value="form.english_grade" :options="englishOptions" placeholder="请选择" />-->
<!--            </n-form-item-gi>-->
<!--            <n-form-item-gi :span="12" label="韩语水平" path="korea_grade">-->
<!--              <n-select v-model:value="form.korea_grade" :options="koreaOptions" placeholder="请选择" />-->
<!--            </n-form-item-gi>-->
            <n-form-item-gi :span="12" label="对外汉语教学经验" path="teaching_experience">
              <n-select v-model:value="form.teaching_experience" :options="teachingOptions" placeholder="请选择" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="日语水平" path="japanese_grade">
              <n-select v-model:value="form.japanese_grade" :options="japaneseOptions" placeholder="请选择" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="其他外语" path="other_language">
              <n-select v-model:value="form.other_language" multiple :options="otherOptions" placeholder="请选择" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="邮箱" path="email">
              <n-input class="SignInput" clearable v-model:value="form.email" placeholder="邮箱" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="手机号码" path="tel">
              <n-input class="SignInput" clearable v-model:value="form.tel" placeholder="手机号码" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="微信号" path="wechat">
              <n-input class="SignInput" clearable v-model:value="form.wechat" placeholder="微信号" />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="自我介绍" path="intro_1">
              <n-input id="intro_1" name="intro_1" type="textarea" class="SignInput" v-model:value="form.intro_1" :autosize="{minRows: 8,maxRows: 12,}" clearable placeholder=""></n-input><br>
            </n-form-item-gi>
          </n-grid>
          <div style="text-align: center;">
            <n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
              <span>提交</span>
            </n-button>
          </div>
        </n-form>
      </div>
      <div class="bottom"><router-link to="/teacher/company"><span>公司信息</span></router-link></div>
		</div>
	</NuxtLayout>
</template>
<script setup>
import {useApplyDefaultInfoData, useApplyInfoData} from "~/apis/teacher";

definePageMeta({
	layout: false,
});
import Header from "./apply/header.vue"
import Footer from "./apply/footer.vue"
import { ref } from 'vue'
import {createDiscreteApi, NButton, NForm, NFormItem, NInput, NRadio, NRadioGroup, NSelect, NSpace, NGrid, NFormItemGi} from "naive-ui";
const form = ref({
  name_cn: '',
  sex: 2,
	age: '20',
  alma_mater: '',
  major: '',
  japanese_grade: '',
  // english_grade: '',
  // korea_grade: '',
  teaching_experience: '',
  email: '',
  tel: '',
  intro_1: '',
  proxy_id: '',
  learn_type: 0,
  other_language:[],
  wechat:''
});
let init = {
  language: 'zh_CN',
  height: 500,
  width: '100%',
  menubar: true,
  apiKey: '3dsqlo0vozq4j2g8q60stol6gc40z501uflwvezftrd28one',
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount',
    'image'
  ],
  toolbar: 'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat help | link image',
};


let sexOptions = ref([]);
let ageOptions = ref([]);
// let englishOptions = ref([]);
let japaneseOptions = ref([]);
let otherOptions = ref([]);
// let koreaOptions = ref([]);
let teachingOptions = ref([]);
let loading = ref(false);
let formRef = ref(null);
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
      message: "请输入真实姓名",
      trigger: "blur",
      max:32
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
    japanese_grade: [{
      required: true,
      message: "请输入日语水平",
      trigger: "blur",
      max:20
    }],
    // english_grade: [{
    //   required: false,
    //   message: "请输入英语水平",
    //   trigger: "blur",
    //   max:20
    // }],
    // korea_grade: [{
    //   required: false,
    //   message: "请输入韩语水平",
    //   trigger: "blur",
    //   max:20
    // }],
    teaching_experience: [{
      required: false,
      message: "请输入对外汉语教学经验",
      trigger: "blur",
      max:20
    }],
    tel: [{
      required: true,
      message: "请输入小于13个字符的手机号码",
      trigger: "blur",
      max:13
    }],
    wechat: [{
      required: true,
      message: "请输入小于32个字符的微信号",
      trigger: "blur",
      max:32
    }],
    email: [{
      type: 'email',
      required: true,
      message: "请输入正确的登录邮箱",
      trigger: "blur",
      max:100
    }],
  }
  return r
});
let route = useRoute();
if (route != null && route?.query?.proxy_id !== undefined) {
  form.value.proxy_id = route.query.proxy_id;
}

const { data:applyInfo } = await useApplyDefaultInfoData();
if (applyInfo.value != null) {
  sexOptions.value = applyInfo?.value.sex;
  ageOptions.value = Object.keys(applyInfo?.value.age).map(
      key => ({
        label: applyInfo?.value.age[key],
        value: key
      })
  );
  // englishOptions.value = Object.keys(applyInfo?.value.english_grade).map(
  //     key => ({
  //       label: applyInfo?.value.english_grade[key],
  //       value: key
  //     })
  // );
  japaneseOptions.value = Object.keys(applyInfo?.value.japanese_grade).map(
      key => ({
        label: applyInfo?.value.japanese_grade[key],
        value: key
      })
  );
  otherOptions.value = Object.keys(applyInfo?.value.other_language).map(
      key => ({
        label: applyInfo?.value.other_language[key],
        value: key
      })
  );
  // koreaOptions.value = Object.keys(applyInfo?.value.korea_grade).map(
  //     key => ({
  //       label: applyInfo?.value.korea_grade[key],
  //       value: key
  //     })
  // );
  teachingOptions.value = Object.keys(applyInfo?.value.teaching_experience).map(
      key => ({
        label: applyInfo?.value.teaching_experience[key],
        value: key
      })
  );
}

const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    // console.log('form:'+JSON.stringify(form));
    // console.log('errors:'+JSON.stringify(errors));
    if (errors) return;

    loading.value = true

    form.value.other_language = form.value.other_language.join(',');
    const {data, error  } = await useApplyInfoData(form.value);

    loading.value = false

    // if (error.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data?.value && data?.value?.err === false) {
      message.success("保存成功")
      navigateTo('/teacher/apply-success?email='+form.value.email+'&name='+form.value.name_cn+'&wechat_img='+data.value.wechat_img);
    } else {
      form.value.other_language = form.value.other_language.split(',');
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
// 选择某个技能
// function toggleSkill(skillValue, optionValue) {
// 	// console.log(skillValue, optionValue)
// 	const skillIndex = form.value.skills.findIndex(item => item.key == skillValue)
// 	const skill = form.value.skills[skillIndex].value
// 	const existIndex = skill.findIndex(item => item == optionValue)
// 	if (existIndex == -1) {
// 		form.value.skills[skillIndex].value.push(optionValue)
// 	} else {
// 		form.value.skills[skillIndex].value.splice(existIndex, 1)
// 	}
// }
</script>
<style scoped>
.Submit{
  margin-top: 10px;
}
@media screen and (max-width: 520px) {
  .responsive-grid {
    display: block !important;
  }
  .Submit{
    width: 100%;
    margin-top: 0;
  }
}
</style>