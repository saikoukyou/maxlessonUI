<template>

    <div style="height: 90px; width: 100%;"></div>
    
    
    <section class="contentsHeader">
      <h2 title="HELP"><img src="~/assets/SVG/titleBefore.svg" alt="" class="titleBefore"> よくある質問</h2>
    </section>
    
    <section class="contentsWrap searchTeacher">
    
      
      <div style="height: 30px;"></div>
    
    
      <div class="help">
    
      <ul class="select_help">
        <li :class="selected_index == index ? 'selected bold' : ''" @click="changeHelp(index)" v-for="(faq,index) in faq_list">{{faq.name}}</li>
        
        <li></li>
        <NuxtLink to="/contact"><li style="border-bottom: 1px solid #f2b705;">お問い合わせ</li></NuxtLink>
      </ul>
    
      <div class="select_helpContents">
        <h3>{{faq_list[selected_index].name}}</h3>
        <div v-for="(faq,index) in targetFaq" :key="index">
          <div v-if="faq.id === parseInt(helpRoute)">
          <div class="title fs18"><img src="~/assets/SVG/iconQuestion.svg" alt="" class="iconQuestion">
            
          <div v-html="faq.question" style="display: inline-block;"></div>
    
      </div>
    
    
    <div class="greenBorder" style="min-height: 50vh;">
    
          <div v-html="faq.answer"></div>
    
      </div>
    
        <!-- <div v-html="faq_list[selected_index].faqs[selected_index].answer">
            
          </div> -->
        </div>
        </div>
      </div>
    
    </div>
    
    </section>
    
    <div style="height: 8vh;"></div>
    
        
      </template>
    
    
    <script setup>
    import {useHomeFaqListDataApi} from "~/apis/faqs";
    
    let selected_index = ref(0);
    const {pending, data: faq_infos  } = await useHomeFaqListDataApi();
    console.log(faq_infos.value);
    let faq_list = faq_infos?.value.list ?? [];
    console.log(faq_list);
    console.log(faq_list.id);
    
    
    for (let i = 0; i < faq_list.length; i++) {
      const faqs = faq_list[i].faqs;
      
      // faqs内の全ての要素にアクセスするループ
      for (let j = 0; j < faqs.length; j++) {
        console.log(faqs[j].id);
      const faqNum = faqs[j].id;
      }
    }
    
    const route = useRoute()
    const helpRoute = route.params.id; // URLのパラメータから取得したID
    console.log(helpRoute);
    const helpRouteGroup = route.params.group; // URLのパラメータから取得したgroupID
    
    // const targetId = route.params.id;
    const targetFaq = faq_list[helpRouteGroup].faqs;
    console.log(targetFaq);
    
    // const findTarget = targetFaq.find(targetFaq.id === targetId);
    // if (findTarget) {
    //   console.log(findTarget.answer);
    // }
    
    // const findTarget = targetFaq.find(faq => faq.id === targetId);
    // console.log(findTarget);
    
    // let selectedAnswers = ref(() => {
    //   const targetId = route.params.id; // route.params.id の値を取得
    
    //   const targetFaq = faq_list[helpRouteGroup].faqs;
    //   console.log(targetFaq);
    
    //   return targetFaq;
    
    
    // });
    
    
    let faq_param = faq_list[0].faqs[1].id ?? [];
    console.log(faq_param);
    
    function changeHelp(index) {
      selected_index.value = index;
      console.log(selected_index.value);
    
      // 質問のIdを取得し、選択されたカテゴリーと一致する場合に answer を表示
    for (let i = 0; i < faq_list.length; i++) {
      const faqs = faq_list[i].faqs;
      
      for (let j = 0; j < faqs.length; j++) {
        const faqNum = faqs[j].id;
        
        // 選択されたカテゴリーと一致する場合に answer を表示
        if (i === selected_index.value) {
          console.log(faqs[j].answer);
        }
      }
    }
    }
    
    
    
    </script>
    
    <style scoped>
    swiper-container::part(button-next),
    swiper-container::part(button-prev) {
      color: #fff;
    }
    </style>