<template>
    <div class="netchina_contents">

      <contact></contact>
      <div style="height: 40px;"></div>

    </div>

</template>


<script setup>

import Contact from "~/pages/contact.vue";
</script>
<style lang="scss" scoped>
@media screen and (max-width: 520px) {
  .netchina_contents{
    padding: 0 5%;
  }
}
</style>