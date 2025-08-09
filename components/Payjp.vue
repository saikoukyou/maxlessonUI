<script setup>
import {useStudentChangeMonthPlanPayjpApi, useStudentChangeTicketPlanPayjpApi} from "~/apis/plan";
import {useMainStore} from "~/composables/store";
import {createDiscreteApi} from "naive-ui";
import {watch} from "vue";

const props = defineProps({
  code: {
    type: [String],
    default: ''
  },
  ptype: {
    type: [String],
    default: ''
  },
  umode: {
    type: [String],
    default: ''
  },
  flag: {
    type: [Number],
    default: 1
  },
  email: {
    type: [String],
    default: ''
  },
  other: {
    type: [Object],
    default: {}
  }
});

let payjpArea = ref();
const useStore = useMainStore();
const { $config } = useNuxtApp();
let scriptEl;
const { dialog } = createDiscreteApi(['dialog']);


const appendPayJpScriptTag = () => {
  const attrs = {
    //API公開鍵 情報を入力
    'data-key': $config.public.payjpKey,
    'id': 'payjp-script',
    'src': 'https://checkout.pay.jp/',
    'class': 'payjp-button',
    'data-partial': true,//入力後にtokenを作成し、windowを閉じる
    'data-text': 'カード情報を入力する',
    'data-submit-text': '支払い',
    'data-lang': 'ja',
    'data-on-created': 'onTokenCreated',
    'data-on-failed': 'onTokenFailed',
    'data-name-placeholder': 'YAMADA ICHIRO'
  };
  scriptEl = document.createElement('script');
  Object.keys(attrs).forEach(key => {
    const value = attrs[key];
    if (value !== undefined) {
      scriptEl.setAttribute(key, value);
    }
  });
  payjpArea.value.appendChild(scriptEl);
};
const emit = defineEmits(['showTrailWindow'])
const onTokenCreated = async () => {
  let token = document.getElementsByName('payjp-token')[0].value;

  if (props.ptype == 'ticket') {
    const {pending, data: changedata  } = await useStudentChangeTicketPlanPayjpApi(props.code,token,props.other);
    if (changedata?.value && changedata?.value?.err === false) {
      useStore.useRefreshUserInfo();
      if (changedata?.value?.registerType === 'single') {
        useStore.setActiveUrl("/payComplete");
        return navigateTo({path: "/payComplete",query:{email: props?.other?.email,flag: 1}}, { replace: true });
      } else {
        emit('showTrailWindow');
      }

    } else {
      if (changedata?.value?.registerType === 'single') {
        useStore.setActiveUrl("/payComplete");
        return navigateTo({path: "/payComplete",query:{email: props?.other.email,flag: 0}}, { replace: true });
      }
    }
    // console.log('ticket:'+JSON.stringify(changedata));
  } else {
    if (props.umode === 'add') {
      const {pending, data: changedata  } = await useStudentChangeTicketPlanPayjpApi(props.code,token,props?.other);
      if (changedata?.value && changedata?.value?.err === false) {
        await useStore.useRefreshUserInfo();
        if (changedata?.value?.registerType === 'single') {
          useStore.setActiveUrl("/payComplete");
          return navigateTo({path: "/payComplete",query:{email: props?.other?.email,flag: 1}}, { replace: true });
        } else if (props?.flag === 3) {
          dialog.warning({
            title: "プランの変更が完了しました。",
            content: "さっそくレッスンの予約を始めましょう。",
            positiveText: "レッスンを予約する",
            onPositiveClick: async () => {
              return navigateTo('/mypage/searchTeacher?learnType='+useStore?.monthly_learn_type);
            },
          });
        } else {
          const { message } = createDiscreteApi(["message"])
          message.success("支払いに成功しました");
          useStore.setActiveUrl("/mypage/searchTeacher");
          return navigateTo("/mypage/searchTeacher?learnType="+useStore?.monthly_learn_type, { replace: true });
        }

      } else {
        if (changedata?.value?.registerType === 'single') {
          useStore.setActiveUrl("/payComplete");
          return navigateTo({path: "/payComplete",query:{email: props?.other?.email,flag: 0}}, { replace: true });
        }
      }
    } else {
      const {pending, error, data: changedata  } = await useStudentChangeMonthPlanPayjpApi(props.code,token,props.flag);
      if (changedata?.value && changedata?.value?.err === false) {
        const { message } = createDiscreteApi(["message"])
        message.success("支払いに成功しました");
        useStore.useRefreshUserInfo();
        useStore.setActiveUrl("/mypage/searchTeacher");
        return navigateTo("/mypage/searchTeacher?learnType="+useStore?.monthly_learn_type, { replace: true });
      }
      // console.log('plan:'+JSON.stringify(changedata));
      // console.log('planerror:'+JSON.stringify(error));
    }

  }


  // let dataform = new FormData();

  //undefinedならテキストで undefined のまま送信
  // dataform.append('id',this.$root.user.id);
  // dataform.append('token',token);

  // axios.post('/payjp/tudokakin/', dataform).then(e => {
  //   console.log("成功");
  // }).catch((error) => {
  //   console.log("エラー");
  // });

};
const onTokenFailed = (res) => {
  // 処理
  const { message } = createDiscreteApi(["message"])
  message.error("カード情報照合失敗、再度ご記入お願いします。");
}

onMounted(() => {

  const payjpCheckoutIframeEl = document.getElementById('payjp-checkout-iframe');
  if (payjpCheckoutIframeEl) {
    payjpCheckoutIframeEl.parentElement.remove();
  }
  window.PayjpCheckout = null;
  window.onTokenCreated = null;
  window.onTokenFailed = null;

  console.log('props.code:'+props.code);
  appendPayJpScriptTag();
  window.onTokenCreated = onTokenCreated;
  window.onTokenFailed = onTokenFailed;
  let payjpCheckBox2 = document.getElementById('payjp_checkout_box');
  if (payjpCheckBox2 != null) {
    payjpCheckBox2.children[0].click();
  }
});

onBeforeUnmount(() => {
  // 在组件销毁之前执行的操作
  const payjpCheckoutIframeEl = document.getElementById('payjp-checkout-iframe');
  if (!payjpCheckoutIframeEl && payjpCheckoutIframeEl != null) {
    // console.log(payjpCheckoutIframeEl);
    payjpCheckoutIframeEl.parentElement.remove();
    payjpArea.value.removeChild(scriptEl);
    window.PayjpCheckout = null;
    window.onTokenCreated = null;
    window.onTokenFailed = null;
  }
});

</script>

<template>
  <div style="display:none;">
    <div style="display:none;" ref="payjpArea"></div>
  </div>
</template>