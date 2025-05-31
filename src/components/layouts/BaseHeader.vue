<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

import { useElementPlusTheme } from 'use-element-plus-theme'
import { repository } from '~/../package.json'
import { toggleDark } from '~/composables'

import { generateElementColors } from './index'

// const layoutThemeColor = useStorage('layout-theme-color', '#243db9') // 默认主题色
// const { changeTheme } = useElementPlusTheme(layoutThemeColor.value) // 初始化主题色

// function changeTheme(color: string) {
//   const style = document.createElement('style')
//   style.innerHTML = `
//     :root {
//       --ep-color-primary: ${color};
//     }
//   `
//   document.head.appendChild(style)
// }

function changeThemeColor(color: string) {
  // console.log(color)
  // layoutThemeColor.value = color // 保存主题色
  // changeTheme(color) // 修改 Element Plus 组件主题色

  // 定义你的主题颜色
  const customTheme = {
    primary: color, // 主色改为蓝色
    success: '#42B883', // 成功色改为绿色
    warning: '#FFB020', // 警告色改为橙色
    danger: '#FF4D4F', // 危险色改为红色
    error: '#ffaa00', // 错误色改为红色
    info: '#aabbcc', // 信息色改为蓝色
    link: '#1890FF', // 链接色改为蓝色
    text: {
      primary: '#1A1A1A', // 主要文本改为深灰
      regular: '#666666', // 常规文本改为中灰
    },
    border: {
      base: '#E0E0E0', // 基础边框改为浅灰
    },
    bg: {
      base: '#F8F8F8', // 背景色改为浅灰白
    },
  }

  // 生成 CSS 变量
  const cssVariables = generateElementColors(customTheme)

  // 动态插入到 <head> 的 <style> 中
  const style = document.createElement('style')
  style.textContent = cssVariables
  document.head.appendChild(style)

  console.log('Element Plus 主题颜色已覆盖！')
}
</script>

<template>
  <div style="color: #ff0000;" @click="changeThemeColor('#ff0000')">
    切换主题
  </div>
  <div style="color: #ffaa00;" @click="changeThemeColor('#ffaa00')">
    切换主题
  </div>
  <div style="color: #ff00ff;" @click="changeThemeColor('#ff00ff')">
    切换主题
  </div>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
    <el-menu-item index="/">
      <div class="flex items-center justify-center gap-2">
        <div class="text-xl" i-ep-element-plus />
        <span>Element Plus</span>
      </div>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        Workspace
      </template>
      <el-menu-item index="2-1">
        item one
      </el-menu-item>
      <el-menu-item index="2-2">
        item two
      </el-menu-item>
      <el-menu-item index="2-3">
        item three
      </el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>
          item four
        </template>
        <el-menu-item index="2-4-1">
          item one
        </el-menu-item>
        <el-menu-item index="2-4-2">
          item two
        </el-menu-item>
        <el-menu-item index="2-4-3">
          item three
        </el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>
      Info
    </el-menu-item>
    <el-menu-item index="4">
      Orders
    </el-menu-item>

    <el-menu-item h="full" @click="toggleDark()">
      <button
        class="w-full cursor-pointer border-none bg-transparent"
        style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>

    <el-menu-item h="full">
      <a class="size-full flex items-center justify-center" :href="repository.url" target="_blank">
        <div i-ri-github-fill />
      </a>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss">
.el-menu-demo {
  &.ep-menu--horizontal > .ep-menu-item:nth-child(1) {
    margin-right: auto;
  }
}
</style>
