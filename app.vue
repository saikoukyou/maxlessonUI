<template>
  <NConfigProvider inline-theme-disabled :theme-overrides="themeOverrides">
    <nuxtLayout>
      <NuxtPage />
    </nuxtLayout>
  </NConfigProvider>
</template>


<script setup>
import { NConfigProvider } from 'naive-ui'
const themeOverrides = {
  common: {
    primaryColor: '#f79650'
  },
  Button: {
    textColor: '#f79650'
  },
  Select: {
    menuBoxShadow:
        '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)',
    peers: {
      InternalSelection: {
        border: '1px solid #f79650',
        borderFocus: 'none',
        borderHover: 'none',
        borderActive: 'none'
        // textColor: '#f79650'
      }
    }
  },
  Input: {
    border: '1px solid #f79650',
    borderFocus: 'none',
    borderHover: 'none',
    borderActive: 'none'
  }

}
// console.log('\n' + ' %c 别光Clone,留个Star' + ' ' + ' %c https://github.com/webyang-male/nuxt3-edu' + '\n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');
</script>