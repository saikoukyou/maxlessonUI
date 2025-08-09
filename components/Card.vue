<script setup>
import {useMainStore} from "~/composables/store";
import {createDiscreteApi} from "naive-ui";
import {useStudentUpdateCardApi} from "~/apis/student";

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
});

let payjpArea2 = ref();
const useStore = useMainStore();
const { $config } = useNuxtApp()
let scriptEl;

onMounted(async () => {
  if (process.client) {
    const payjpCheckoutIframeEl = document.getElementById('payjp-checkout-iframe');
    if (payjpCheckoutIframeEl) {
      payjpCheckoutIframeEl.parentElement.remove();
    }
    window.PayjpCheckout = null;
    window.onTokenCreated = null;
    window.onTokenFailed = null;

    appendPayJpScriptTag();
    window.onTokenCreated = onTokenCreated;
    window.onTokenFailed = onTokenFailed;
  }
})

const appendPayJpScriptTag = () => {
  const attrs = {
    //API公開鍵 情報を入力
    'data-key': $config.public.payjpKey,
    'id': 'payjp-script',
    'src': 'https://checkout.pay.jp/',
    'class': 'payjp-button',
    'data-partial': true,//入力後にtokenを作成し、windowを閉じる
    'data-text': '新しいカードに変更する',
    'data-submit-text': '登録',
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
  payjpArea2.value.appendChild(scriptEl);
};
const emit = defineEmits(['showTrailWindow'])
const onTokenCreated = async () => {
  let token = document.getElementsByName('payjp-token')[0].value;
  const {pending, data: info  } = await useStudentUpdateCardApi({'payjp-token' : token});
  if (info?.value && info?.value.err === false) {
    useStore.useRefreshUserInfo();
    const { message } = createDiscreteApi(["message"])
    message.success(info?.value.err_msg);
    return navigateTo("/mypage/userProcedure", { replace: true });
  }
};
const onTokenFailed = (res) => {
  // 処理
  const { message } = createDiscreteApi(["message"])
  message.error("カード情報照合失敗、再度ご記入お願いします。");
}

onBeforeUnmount(() => {
  // 在组件销毁之前执行的操作
  const payjpCheckoutIframeEl = document.getElementById('payjp-checkout-iframe');
  if (!payjpCheckoutIframeEl && payjpCheckoutIframeEl != null) {
    // console.log(payjpCheckoutIframeEl);
    payjpCheckoutIframeEl.parentElement.remove();
    payjpArea2.value.removeChild(scriptEl);
    window.PayjpCheckout = null;
    window.onTokenCreated = null;
    window.onTokenFailed = null;
  }
});

</script>

<template>
  <div>
    <div ref="payjpArea2"></div>
  </div>
</template>