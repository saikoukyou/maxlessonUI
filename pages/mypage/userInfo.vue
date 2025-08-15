<template>
    <div class="netchina_contents">
      <ul class="userInfoMenu">
        <nuxt-link to="/mypage/userInfo"><li class="selected">基本情報</li></nuxt-link>
        <nuxt-link to="/mypage/userMail"><li class="">メール受信管理</li></nuxt-link>
        <nuxt-link to="/mypage/userFavorite"><li class="">お気に入り講師</li></nuxt-link>
        <nuxt-link to="/mypage/userProxy"><li class="">代講設定</li></nuxt-link>
        <nuxt-link to="/mypage/userProcedure"><li class="">各種お手続き</li></nuxt-link>
      </ul>
      <div class="userInfoContents">
        <n-form  ref="formRef" :model="form" :rules="rules" size="small">
            <div class="userInfoColumnGrid">
            <div class="personTitleImg">
              <img v-if="form.face_image" class="userImg" :src="form.face_image" />
              <div class="fakeBtn">
              <n-button :style="uploadBtnStyle" class="uploadBtn" @click="uploadAble = true"></n-button>
                <Cropper v-if="uploadAble" @setImg="setImg"></Cropper>
              </div>
              <dt>お客様ID</dt>
              <dd v-if="uinfo">{{uinfo.showId}}</dd>
            </div>
              <div class="personTitle">
                <div class="myFlex">
              <n-form-item :show-label="false" path="last_name" class="halfDrop">
                <label>姓</label>
                <n-input type="text" v-model:value="form.last_name" clearable placeholder=""></n-input>
              </n-form-item>
              <n-form-item :show-label="false" path="first_name" class="halfDrop_r">
                <label>名</label>
                <n-input type="text" v-model:value="form.first_name" clearable placeholder=""></n-input>
              </n-form-item>
                </div>
              <n-form-item :show-label="false" path="marketing_email">
                <label>性別</label>
                <n-radio-group v-model:value="form.sex" name="marketing_email" class="sexgroup">
                  <n-space>
                    <n-radio :key="2" :value="2">
                      女性
                    </n-radio>
                    <n-radio :key="1" :value="1">
                      男性
                    </n-radio>
                    <n-radio :key="3" :value="3">
                      その他
                    </n-radio>
                  </n-space>
                </n-radio-group>
              </n-form-item>

              <n-form-item  class="w-160" style="display: block;">
                <label>誕生日</label>
<!--                <n-date-picker v-model:formatted-value="form.birthday_y"-->
<!--                               :default-value="[Date.now(), Date.now() + 86400000]"-->
<!--                                 :is-date-disabled="disablePreviousDate"-->
<!--                               type="year"-->
<!--                               placeholder="年" />-->

                <div class="myFlex birthdayBlock">
                <n-select name="birthday_y" id="birthday_y" v-model:value="form.birthday_y" :options="yearOption" clearable placeholder="年">
                </n-select>
                <n-select name="birthday_m" id="birthday_m" v-model:value="form.birthday_m" :options="monthOptions" clearable placeholder="月">
                </n-select>
                <n-select name="birthday_d" id="birthday_d" v-model:value="form.birthday_d" :options="dayOptions" clearable placeholder="日">
                </n-select>
                </div>
<!--                <n-date-picker v-model:formatted-value="form.birthday_m" type="month" placeholder="月" />-->
<!--                <n-date-picker v-model:formatted-value="form.birthday_d" type="day" placeholder="日" />-->
              </n-form-item>

            </div>
          </div>

          <div class="userInfoColumn">
            <div class="blockL">受講設定</div>
            <div class="blockR">
              <div class="softDiv">
              <p class="softTitle">優先的に使うソフト名</p>
                  <n-form-item :show-label="false" path="default_software">
                    <n-select
                        name="default_software"
                        id="default_software"
                        v-model:value="form.default_software"
                        :options="[
                          { label: 'WeChat', value: 'wechat' },
                          { label: 'Web教室', value: 'web' },
                          { label: 'Teams', value: 'teams' },
                        ]"
                        placeholder=""
                        @update:value="changeSoftware"
                    />
                    </n-form-item><!--{{uinfo.default_software}}-->
              </div>
              <span v-if="form.default_software == 'wechat'">
              <n-form-item :show-label="false" path="wechat">
                <label>WeChat</label>
                  <n-input type="text" v-model:value="form.wechat" clearable placeholder=""></n-input>
                </n-form-item>
                <n-form-item show-label="false" style="margin-top: -20px;">
                  <span style="margin-right: 10px; width: 198px;">WeChat QRコードの<br>アップロード</span>
                  <uploader v-model="form.wechat_img"/>
                </n-form-item>
                  <!-- 觸發按鈕 -->
                  <a href="#popup" class="qrway">ご自身のQRコード確認方法</a>

                  <!-- 彈出層 -->
                  <div id="popup" class="popup-overlay">
                      <a href="#" class="popup-background"></a> <!-- 點擊灰色區域關閉 -->
                      <div class="popup-content">
                          <img src="../../assets/images/qrway.png" alt="Desktop QR Code" class="popup-image pc-image">
                          <img src="../../assets/images/qrway_m.png" alt="Mobile QR Code" class="popup-image mobile-image">
                      </div>
                  </div>

              </span>
              <span v-else-if="form.default_software == 'teams'">
                <n-form-item :show-label="false" path="teams_id">
                <label>メール（Teams）</label>
                <n-input type="text" v-model:value="form.teams_id" clearable placeholder=""></n-input>
              </n-form-item>
              </span>
            </div>

          </div>

          <p class="userBorder"></p>

        <div class="userInfoColumn">

          <div class="blockL">メール設定</div>
          <div class="blockR">
          <n-form-item :show-label="false" path="email">
            <label for="email">メールアドレス</label>
            <n-input id="email" type="text" v-model:value="form.email" clearable placeholder=""></n-input><br>
          </n-form-item>
          <n-form-item :show-label="false" path="password">
            <label for="password">パスワード</label>
            <n-input id="password" type="password"  clearable placeholder="*******" disabled></n-input>
            <p class="resetPw"><n-button class="pwBtn" @click="changePassword">パスワード再設定</n-button></p>
          </n-form-item>
          </div>

        </div>
        <p class="userBorder"></p>

          <div v-if="uinfo && uinfo.is_corporate_member == 1" >
        <div class="blockL">会社情報</div>
        <div class="blockR">
          <ul class="companyInfo">
            <li>会社名</li>
            <li class="cname">{{uinfo.corporate_name}}</li>
            <li>部署名</li>
            <li class="cdepart">{{uinfo.department}}部</li>
            <li>役職</li>
            <li class="cjob">{{uinfo.job}}</li>
          </ul>
        </div>
            <p class="userBorder"></p>
          </div>


        <div class="blockL">レベル</div>

        <div class="blockR">

          <n-form-item :show-label="false" path="chinese_level">
            <label class="chinese_level" for="">自己申告中国語レベル</label>
            <n-select name="chineseLevel" id="chineseLevel" v-model:value="form.chinese_level" :options="chineseLevelOptions" placeholder="">
            </n-select>
          </n-form-item>

            <label class="hsktitle" for="">HSK受験記録</label>

          <div class="hskclass" v-for="(hsk, hindex) in form.hsk_info" :key="hindex">
            <n-select v-model:value="hsk.year" :options="yearOption" clearable placeholder="年"></n-select>
            <n-select v-model:value="hsk.month" :options="monthOptions" clearable placeholder="月"></n-select>
            <n-select name="hsklevel" id="hsklevel" v-model:value="hsk.hsk" :options="hskOptions" clearable placeholder=""></n-select>
            <n-input type="text" v-model:value="hsk.score" clearable placeholder="点"></n-input>

            <!-- 按鈕根據 isDeletable 顯示不同的文字和功能 -->
            <n-button
                attr-type="button"
                v-if="hsk.isDeletable"
                @click="deleteItem(hindex)"
            >
              記録を削除
            </n-button>
            <n-button
                attr-type="button"
                v-else
                @click="addItem"
            >
              記録を追加
            </n-button>
          </div>

            <n-form-item :show-label="false" path="course_ids_arr" class="optionBlock">
              <label for="">特に習いたい分野</label>
              <ul class="addOption">
                <li v-for="(courseitem, courseindex) in courseOption" :key="courseindex">
                  <input type="checkbox" :value="courseindex" v-model="form.course_ids_arr" :id="'label' + courseindex" />
                  <label :for="'label' + courseindex">{{ courseitem }}</label>
                </li>
              </ul>

<!--              <n-select name="courseIds" id="courseIds" v-model:value="form.course_ids" :options="courseOption" placeholder="">-->
<!--              </n-select>-->
            </n-form-item>
        </div>

        <div class="userInfoButtonArea">
          <n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
            <span style="display: inline-block">送信</span>
          </n-button>
        </div>
        </n-form>
      </div>


    </div>

<ResetPassword v-if="showUpdatePasswd" @changePasswordEvent="closePassword"></ResetPassword>
</template>


<script setup>

import {useStudentInfoDataApi, useUpdateStudentInfoDataApi} from "~/apis/student";
import {
  createDiscreteApi,
  NButton,
  NDatePicker,
  NForm,
  NFormItem,
  NInput,
  NRadio,
  NRadioGroup,
  NSelect
} from "naive-ui";

//  definePageMeta({
//     middleware: 'auth',
//     layout: 'mypage'
// });
 //加载效果
 const loading = ref(false)
 const formRef = ref(null)
 let hskOptions = [{label: 'HSK １級',value: '1'},{label: 'HSK ２級',value: '2'},{label: 'HSK ３級',value: '3'},{label: 'HSK ４級',value: '4'},{label: 'HSK ５級',value: '5'},{label: 'HSK ６級',value: '6'}];
 let monthOptions = [
   {label: '1',value: '1'},
   {label: '2',value: '2'},
   {label: '3',value: '3'},
   {label: '4',value: '4'},
   {label: '5',value: '5'},
   {label: '6',value: '6'},
   {label: '7',value: '7'},
   {label: '8',value: '8'},
   {label: '9',value: '9'},
   {label: '10',value: '10'},
   {label: '11',value: '11'},
   {label: '12',value: '12'},
 ];
let dayOptions = [
  {label: '1',value: '1'},
  {label: '2',value: '2'},
  {label: '3',value: '3'},
  {label: '4',value: '4'},
  {label: '5',value: '5'},
  {label: '6',value: '6'},
  {label: '7',value: '7'},
  {label: '8',value: '8'},
  {label: '9',value: '9'},
  {label: '10',value: '10'},
  {label: '11',value: '11'},
  {label: '12',value: '12'},
  {label: '13',value: '13'},
  {label: '14',value: '14'},
  {label: '15',value: '15'},
  {label: '16',value: '16'},
  {label: '17',value: '17'},
  {label: '18',value: '18'},
  {label: '19',value: '19'},
  {label: '20',value: '20'},
  {label: '21',value: '21'},
  {label: '22',value: '22'},
  {label: '23',value: '23'},
  {label: '24',value: '24'},
  {label: '25',value: '25'},
  {label: '26',value: '26'},
  {label: '27',value: '27'},
  {label: '28',value: '28'},
  {label: '29',value: '29'},
  {label: '30',value: '30'},
  {label: '31',value: '31'},
];
const yearOption = ref([]);
const form = reactive({
  first_name: "",
  last_name: "",
  sex: "1",
  birthday_y: null,
  birthday_m: null,
  birthday_d: null,
  email: "",
  // password:"",
  wechat:"",
  chinese_level:'',
  course_ids_arr:[],
  course_ids:'',
  hsk_info:"",
  default_software:"teams",
  wechat_img:"",
  face_image:"",
  teams_id:""
})

const rules = reactive({
    email: [{
      required: true,
      type: "email",
      max: 250,
      message: "正しいメールを入力してください",
      trigger: "blur"
    }],
    // password: [{
    //   required: false,
    //   min: 4,
    //   max: 16,
    //   message: "4～32ビットのパスワードを入力してください",
    //   trigger: "blur"
    // }],
    wechat: [{
      required: false,
      min: 4,
      max: 32,
      message: "4～32ビットのWeChatを入力してください",
      trigger: "blur",
    }],
    chinese_level: [{
      required: true,
      type: 'number',
      message: "自己申告中国語レベルを入力してください",
      trigger: "blur"
    }],
    course_ids_arr: [{
      required: true,
      type: 'array',
      message: "特に習いたい分野を入力してください",
      trigger: "blur"
    }],
    wechat_img: [{
      required: false,
      type: 'string',
      max: 2000,
      message: "请重新上传图片",
      trigger: "blur"
    }],
  teams_id: [{
      required: false,
      min: 4,
      max: 100,
      message: "4～100ビットのteams_idを入力してください",
      trigger: "blur"
    }],
});
let chineseOptions = ref([]);
let courseOption = ref([]);
// let selectedCourse = ref([]);
let chineseLevelOptions = ref([]);
let uinfo = ref(null);
const useStore = useMainStore();
const uploadAble = ref(false);
let showUpdatePasswd = ref(false);

onMounted(async () => {
  const {pending, data: info  } = await useStudentInfoDataApi();
  if (info?.value) {
    useStore.setStudentInfo(info?.value);
    uinfo.value = info?.value;
    chineseOptions.value = info?.value?.map?.chinese_level ?? [];
    courseOption.value = info?.value?.map?.course_ids_tag ?? [];
    form.email = info?.value.email;
    form.wechat = info?.value.wechat;
    form.teams_id = info?.value.teams_id;
    form.chinese_level = info?.value.chinese_level ?? '';
    form.hsk_info = info?.value.hsk_info;
    form.default_software = info?.value.default_software ?? 'teams';
    form.wechat_img = info?.value.wechat_img ?? '';
    form.first_name = info?.value.first_name ?? '';
    form.last_name = info?.value.last_name ?? '';
    form.sex = info?.value.sex ?? '';
    form.birthday_y = info?.value.birthday_y ?? '';
    form.birthday_m = info?.value.birthday_m ?? '';
    form.birthday_d = info?.value.birthday_d ?? '';
    form.face_image = info?.value.face_image ?? '';
    form.course_ids_arr = info?.value.course_ids ? info?.value.course_ids.split(',') : [];
    form.course_ids = info?.value.course_ids ? info?.value.course_ids : '';
    // console.log('chineseOptions:'+JSON.stringify(chineseOptions));
    yearOption.value = info?.value.yearOption ?? [];
    chineseLevelOptions.value = Object.keys(chineseOptions.value).map(
        key => ({
          label: chineseOptions.value[key],
          value: parseInt(key)
        })
    );
    // courseOption.value = Object.keys(courseOption.value).map(
    //     key => ({
    //       label: courseOption.value[key],
    //       value: parseInt(key)
    //     })
    // );
    changeSoftware();
  }
});

 // console.log('studentinfo:'+JSON.stringify(info));

 // let chineseOptions = ref([]);
 // console.log('chinese_level:'+JSON.stringify(info.value.map.chinese_level));
 // console.log('chineseLevelOptions:'+JSON.stringify(chineseLevelOptions));

function changeSoftware() {
  if (form.default_software === 'teams') {
    rules.wechat = [{
      required: false,
      min: 4,
      max: 32,
      message: "4～32ビットのWeChatを入力してください",
      trigger: "blur",
    }];
    rules.teams_id = [{
      required: true,
      min: 4,
      max: 100,
      message: "4～100ビットのteams_idを入力してください",
    }];
  } else {
    rules.wechat = [{
      required: true,
      min: 4,
      max: 32,
      message: "4～32ビットのWeChatを入力してください",
      trigger: "blur",
    }];
    rules.teams_id = [{
      required: false,
      min: 4,
      max: 100,
      message: "4～100ビットのteams_idを入力してください",
    }];
  }
}

function disablePreviousDate (ts) {
  return ts > Date.now()
}



const addItem = () => {
  // 检查是否存在未完成的记录
  const incompleteRecord = form.hsk_info.some(hsk => {
    return !hsk.year || !hsk.month || !hsk.hsk || !hsk.score;
  });

  if (incompleteRecord) {
    const { message } = createDiscreteApi(["message"]);
    message.error("尚未入力の箇所があります。全て記入した後、新しい記録を追加してください。");
    return; // 阻止继续添加
  }

  // 如果存在记录，将最后一条的 isDeletable 设置为 true
  if (form.hsk_info.length > 0) {
    form.hsk_info[form.hsk_info.length - 1].isDeletable = true;
  }

  // 添加新的记录，默认 isDeletable 为 false
  form.hsk_info.push({ year: "", month: "", hsk: "", score: "", isDeletable: false });
};

const deleteItem = (index) => {
  // 删除指定索引的记录
  form.hsk_info.splice(index, 1);

  // 如果删除后有剩余记录，将最后一条记录的 isDeletable 设置为 false
  if (form.hsk_info.length > 0 && index === form.hsk_info.length) {
    form.hsk_info[form.hsk_info.length - 1].isDeletable = false;
  }
};

const uploadBtnStyle = ref({
  width: '80px',
  height: '80px',
  borderRadius: '40px',
  backgroundImage: 'url("../../assets/images/userfile.png")',
  backgroundSize: '80px',
  padding: '0',
  margin: '10px auto 4px auto',
});

const setImg = (val) => {
  form.face_image = val;
  uploadAble.value = false;
  uploadBtnStyle.value = {
    width: '80px',
    height: '80px',
    borderRadius: '40px',
    backgroundColor: 'transparent',
    backgroundImage: 'none',  // 设置背景图片为 none
    padding: '0',
    margin: '10px auto 4px auto',
  };  // 保存图片后将按钮样式更新
};

 const onSubmit = () => {
   formRef.value.validate(async (errors) => {

     if (errors) return;
     form.course_ids = form.course_ids_arr.join(',');

     loading.value = true

     let {
       data,
       error
     } = await useUpdateStudentInfoDataApi(form)

     loading.value = false

     if (error.value) return;

     const { message } = createDiscreteApi(["message"])
     if (data?.value && data.value.err == false) {
       message.success("送信成功")
       location.reload();
     } else {
       let return_errors = data.value.errors;
       if (return_errors) {
         console.log('return_errors:'+JSON.stringify(return_errors));
         Object.keys(return_errors).forEach(key=>{
           message.error(return_errors[key][0]);
         })
         return;
       }
       console.log('err:'+data.value.err);
       return message.error(data?.value.err_msg || 'サービス側エラー');
     }

   })
 }

 useEnterEvent(() => onSubmit())

function changePassword() {
  showUpdatePasswd.value = true;
}

function closePassword() {
  showUpdatePasswd.value = false;
}
</script>

<style lang="scss" scoped>
.n-input:not(.n-input--autosize) {
  width: 51%;
}
.personTitleImg .n-button{
  background: none;
}
#chineseLevel{
  width: 51%;
}
.hskclass{
  position: relative;
}
.hskclass .n-select {
  width: 18%;
  display: inline-block;
  margin-right: 6px;
  margin-top: 10px;
}
.hskclass .n-input{
  width: 16%;
  display: inline-block;
  margin-right: 6px;
  position: absolute;
  top: 10px;
}
.hskclass .n-button--medium-type{
  height: 56px;
  width:100px;
  border-radius: 4px;
  position: absolute;
  top: 9px;
  right: 28px;
}

.n-select {width: 33%;}

dt{font-size: 14px;}
dd{font-size: 16px; margin-top: -8px;}
.n-form{background-color: #FFFFFF;}

.blockL{
  color: #6F6F6F; text-align: center; font-size: 16px;vertical-align: top;
  width: 27%;display: inline-block;padding-top: 10px;
}
.blockR{width: 70%; display: inline-block; position: relative; }

.userImg{
  position: absolute; left: 95px; top: 28px;
  width: 80px; height: 80px;
  border-radius: 80px;
}

label{margin-right: 20px; min-width: 138px;}

#default_software{width: 318px;}

.n-input{min-width: fit-content;}

.userInfoButtonArea{padding-bottom: 40px;}

.blockR .companyInfo li:nth-child(odd){
  display: inline-block;
  min-width: 120px;
  height: 40px;
  padding-top: 10px;
}
.blockR .companyInfo li:nth-child(even){
  display: inline-block;
  width: 70%;
}
.blockR .companyInfo{margin-bottom: 10px; color: #424242;}

.n-form-item-feedback-wrapper{width: 20%;}

.n-form-item-blank .n-input__input{
  background-color: aquamarine;
}

.hskclass span{
  width: fit-content;
  min-width: 30px;
}

.hsktitle{
  display: block;
  font-size: 15px;
  color: #424242;
}

::v-deep .n-input-wrapper{
  width: 100px;
  margin: 0 4px;
}

.personTitleImg{
  padding: 2%;
  background-color: #FFF9EC;
  text-align: center;
  width: 270px;
  display: inline-block;
  position: absolute;
  height: 310px;
}
.personTitle{
  display: inline-block;
  background-color: #FFF9EC;
  width: 540px;
  margin-left: 270px;
  top: 40px;
  padding: 3% 10% 2% 0;
  height: 310px;
}
.personTitle label{min-width: 60px;}
.personTitle .n-select{margin-right: 2%;}

.uploadBtn{
  width: 80px; height: 80px; border-radius: 40px;
  background-image: url("../../assets/images/userfile.png");
  background-size: 80px;
  padding: 0;
  margin: 10px auto 4px auto;
}

::v-deep #uploadFileInput{
  width: 200px;
  font-size: 15px;
}

::v-deep .cropper-content{
  margin: auto;
  text-align: center;
  width: 240px;
}

::v-deep .optionBlock .n-form-item-blank{ display: block; margin-top: 30px;}
.optionBlock label{ width: 100%; display: block; clear: both;}
.addOption{width: 97%;display: block; font-size: 12px;}

.birthdayBlock{
  width: 50%;
}

#birthday_y,#birthday_m,#birthday_d{
  background-color: white;
  display: inline-grid;
  width: 30%;
}
.addOption li{
  font-size: 14px;
  background-size: 22px;
}
.addOption label{
  margin-right: 0;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  height: 100%; /* 确保 `label` 元素占据整个可点击区域 */
}

.fakeBtn{
  background-image: url("../../assets/images/userfile.png");
  background-size: 80px;
  background-repeat: no-repeat;
  background-position: 78px 10px;
}
#hsklevel{
  width: 22%;
}

.resetPw{
  font-size: 9px;
  color: #FA8373;
  display: block;
  position: absolute;
  height: 20px;
  line-height: 16px;
  top: 30px;
  text-decoration: underline;
}

label[for]{
  cursor: auto;
}
.softTitle{
  margin-right: 18px;
}
.softDiv{
  display: flex;
}
.pwBtn{
  font-size: 11px;
  height: 20px;
  border: 0;
}
.qrway{
  margin-top:-46px; margin-bottom: 30px; display: block;
  position: relative; font-size: 11px; text-decoration: underline; color: darkorange;
}

/* 彈出層默認隱藏 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* 顯示彈出層 */
.popup-overlay:target {
  display: flex;
}

/* 點擊灰色區域背景 */
.popup-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  cursor: pointer;
}

/* 彈出層內容 */
.popup-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.popup-image {
  width: 1000px;
  height: auto;
  border-radius: 5px;
}

/* 默認顯示 PC 版圖片，隱藏手機版圖片 */
.pc-image {
  display: block;
}
.mobile-image {
  display: none;
}

@media screen and (max-width: 520px) {
  .popup-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 2;
    max-height: 80vh; /* 限制彈窗的高度為視窗高度的 80% */
    overflow-y: auto; /* 垂直方向啟用滾動條 */
  }
  .pwBtn{
    padding: 16px;
  }
  .popup-image {
    max-width: 100%; /* 確保圖片寬度不超過彈窗寬度 */
    height: auto; /* 維持圖片的比例 */
  }
  .pc-image {
    display: none;
  }
  .mobile-image {
    display: block;
  }
  .qrway{
    display: block;
    margin: auto;
  }
  .userImg{
    position: relative;
    margin: auto;
    left: auto;
    top: auto;
    z-index: 99;
  }
  .fakeBtn{
    background-position:center 10px;
    position: relative;
    margin-top: -25.2%;
    display: none;
  }
  .personTitleImg{
    position: relative;
    width: 100%;
    height: auto;
  }
  .personTitle{
    margin-left: 0;
    width: 100%;
    padding-left: 20px;
  }
  .n-input{
    width: 100%;
    text-align: left;
  }
  .n-input:not(.n-input--autosize){
    width: 100%;
  }
  .blockL{
    width: 100%;
    display: block;
    margin-bottom: 20px;
    padding-top: 0;
  }
  .blockR{
    width: 80%;
  }
  label{
    text-align: left;
    margin-left: 0;
  }
  .userInfoColumnGrid{
    padding: 20px;
  }
  .sexgroup label{
    display: ruby-text;
    margin-top: 20px;
  }
  #birthday_y,#birthday_m,#birthday_d{
    display: block;
  }
  .personTitle .n-select{
    width: 100%;
    display: inline-block !important;
    position: relative;
  }
  .n-form-item{
    width: 100%;
  }
  .addOption{
    display: flex;
  }
  .hskclass{
    margin-left: auto;
    left: auto;
    position: relative;
    text-align: left;
  }
  .hskclass .n-select{
    width: 48%;
    margin-bottom: 1%;
  }
  .hskclass .n-input{
    position: relative;
    margin-bottom: 4%;
    display: inline-block;
    width: 48%;
    vertical-align: top;
  }
  #hsklevel{
    width: 48% !important;
    display: inline-block;
  }
  .hskclass .n-button--medium-type{
    width: 100%;
    position: relative;
    top: auto;
    right: auto;
    margin-top: 2%;
  }
  #chineseLevel{
    width: 100%;
  }
  .chinese_level{
    width: 100%;
  }
  ::v-deep(.n-form-item-blank){
    display: block;
    text-align: left;
  }
  .personTitle{
    height: auto;
    margin: auto;
    display: block;
    padding: 0 6%;
  }
  .halfDrop{
    width: 48%;
    margin-right: 4%;
  }
  .halfDrop_r{
    width: 48%;
  }
  .myFlex{
    display: flex;
  }
  #birthday_y{
    width: 40%;
    margin-right: 2%;
  }
  #birthday_m{
    width: 30%;
    margin-right: 2%;
  }
  #birthday_d{
    width: 30%;
  }
  .birthdayBlock{
    width: 100%;
  }
  .cname ,.cdepart ,.cjob{
    font-size: 18px;
    background-color: #F4F4F4;
    width: 100%;
    padding: 10px;
    border-radius: 4px;
  }
  .blockR .companyInfo li:nth-child(even){
    display: inline-block;
    width: 100%;
    margin-top: 10px;
  }
  .blockR .companyInfo li:nth-child(odd){
    height: auto;
  }
  .softDiv{
    display: block;
    text-align: left;
  }
  .softTitle{
    width: 100%;
    display: block;
  }
  #default_software{
    width: 100%;
    display: block;
  }
  .resetPw{
    position: relative;
    top: 0;
    margin: auto;
    text-align: center;
  }
}
</style>