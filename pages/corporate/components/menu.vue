<template>
	<div class="menu">
		<div class="info">
			<p><b v-if="corporate">{{corporate.corporate_name}}　
        <span class="f14">様</span></b></p>
			<p class="tipW">ご担当者</p>
			<p><b v-if="corporate">{{corporate.person_name}}<span class="f14">様</span></b></p>
		</div>

		<ul class="links">
			<li v-for="item in links">
				<router-link :to="'/corporate/centre/' + item.key">
          <n-icon :size="30">
					<CalendarOutline v-if="item.icon == 'CalendarOutline'" />
					<StatsChartOutline v-if="item.icon == 'StatsChartOutline'" />
					<ListCircleOutline v-if="item.icon == 'ListCircleOutline'" />
					<AccessibilityOutline v-if="item.icon == 'AccessibilityOutline'" />
					<RibbonOutline v-if="item.icon == 'RibbonOutline'" />
					<InformationOutline v-if="item.icon == 'InformationOutline'" />
          </n-icon>
					<span>{{ item.text }}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script setup>
import { ref } from "vue"
import { CalendarOutline, GitNetwork, StatsChartOutline, ListCircleOutline, AccessibilityOutline, RibbonOutline, InformationOutline, DiamondOutline, FileTrayOutline, PersonOutline, StarOutline } from '@vicons/ionicons5'
import {NIcon} from "naive-ui";
const links = ref([
	{ key: "dashboard", text: "管理画面TOP", icon: "StatsChartOutline" },
	{ key: "classes", text: "受講状況の確認", icon: "CalendarOutline" },
	{ key: "participant-list", text: "受講者の名簿一覧", icon: "ListCircleOutline" },
	{ key: "add", text: "受講者の新規追加", icon: "AccessibilityOutline" },
  { key: "invite", text: "貴社專用募集サイト", icon: "AccessibilityOutline" },
  { key: "plans", text: "プラン一覧", icon: "ListCircleOutline" },
	{ key: "invoice", text: "請求書 & 領収書", icon: "RibbonOutline" },
	{ key: "info", text: "アカウント情報", icon: "InformationOutline" },
  { key: "videos", text: "動画研修管理", icon: "InformationOutline" },
])
const useStore = useMainStore();
const corporate = useStore.corporateInfo;

</script>

<style scoped>
  .info{
    text-align: left;
    margin-left: 5%;
  }
  .info p{
    text-align: left !important;
  }
  .menu .info p b{
    font-size: 16px;
  }
  .tipW{
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    margin-top: 16px;
  }
  .f14{
    font-size: 14px;
    margin-left: 4px;
  }

</style>