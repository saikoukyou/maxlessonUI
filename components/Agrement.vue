<template>
    <div class="agrement-only" v-html="props.desc"></div>
</template>

<script setup>
import { NEmpty } from "naive-ui"

const props = defineProps({
    desc: {
        type: String,
        default: ""
    }
})
</script>

<style lang="scss">
.agrement-only {
  h1 {
    text-align: center;
    font-size:30px;
    margin-bottom: 60px;
  }
  h2 {
    font-size: 20px;
    margin-top: 20px;
    text-align: center;
  }
  .contract-section {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .section-title {
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .contract-content {
    margin-left: 20px;
    margin:20px 0;
  }
  .signature {
    margin-top: 40px;
  }
  .signature-line {
    margin-top: 40px;
    text-align: center;
  }
  .signature-line span {
    display: inline-block;
    width: 30%;
    border-top: 1px solid black;
    margin-top: 10px;
  }
  table {
    width:100%;
    margin:30px auto;
  }
  table td {
    border: 1px solid black;
    text-align: center;
    padding: 10px;
    font-size: 15px;
  }
}
</style>
