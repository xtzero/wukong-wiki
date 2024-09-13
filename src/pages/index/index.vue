<script setup>
import './index.scss'
import { computed, onMounted, ref } from 'vue'

import LogoPng from '../../assets/img/logo_wukong.png'
import MoreIcon from '../../assets/img/more.png'
import RightArrowIcon from '../../assets/img/right-arrow.png'

import useWukongData from '../../components/wukongData.js'
const wukongData = useWukongData()

import Index from '../categorys/Index.vue'
import AwardsPs from '../categorys/AwardsPs.vue'
import Namebook from '../categorys/Namebook.vue'
import Rubys from '../categorys/Rubys.vue'
import Weapons from '../categorys/Weapons.vue'
import Armors from '../categorys/Armors.vue'
import Babys from '../categorys/Babys.vue'
import Changes from '../categorys/Changes.vue'
import Sprites from '../categorys/Sprites.vue'
import Wine from '../categorys/Wine.vue'
import Importants from '../categorys/Importants.vue'
import Magics from '../categorys/Magics.vue'
import MedicineDesign from '../categorys/MedicineDesign.vue'
import Seeds from '../categorys/Seeeds.vue'
import Metals from '../categorys/Metals.vue'
const currentCategory = ref('index')
const componentMap = {
  index: Index,
  award_ps: AwardsPs,
  namebook: Namebook,
  rubys: Rubys,
  weapons: Weapons,
  armors: Armors,
  babys: Babys,
  changes: Changes,
  sprites: Sprites,
  wine: Wine,
  importants: Importants,
  magics: Magics,
  medicine_design: MedicineDesign,
  seeds: Seeds,
  metals: Metals
}
const contentComponent = computed(() => {
  const findComponent = componentMap[currentCategory.value]
  return findComponent ? findComponent : Index
})

const menuButtonRect = ref({top: 0})

const currentCategoryText = computed(() => {
  const findCategory = wukongData.categorys.value.find(v => v.key === currentCategory.value)
  return findCategory && findCategory.label ? findCategory.label : ""
})

const showCategorys = ref(false)

const handleMoreClick = () => {
  console.log('showCategorys.value', showCategorys.value)
  showCategorys.value = !showCategorys.value
}

const onCategoryClick = v => {
  currentCategory.value = v
  showCategorys.value = false
}
onMounted(() => {
  menuButtonRect.value = wx.getMenuButtonBoundingClientRect()
  console.log(menuButtonRect.value)
})
</script>

<template>
  <view class="index-container">
    <view
      class="title-row"
      :style="{paddingTop: `${menuButtonRect.top}px`}">
      <image class="more-icon" :src="MoreIcon" :onTap="handleMoreClick"></image>
      <image
        class="title"
        :src="LogoPng"
        mode="aspectFit">
      </image>
      <!-- <text
        :style="{
          right: `${menuButtonRect.width + 60}px`,
          top: `${menuButtonRect.top + menuButtonRect.height / 4}px`
        }"
        class="nav-text">
        {{ currentCategoryText }}
      </text> -->
    </view>
    <view
      :style="{top: `${menuButtonRect.top + menuButtonRect.height + 15}px`}"
      :class="['list', showCategorys ? '' : 'list-hide']">
      <view
        v-for="(v, k) in wukongData.categorys.value"
        :class="['list-item', currentCategory == v.key ? 'active' : '']"
        :key="k"
        :onTap="e => onCategoryClick(v.key)">
        <view class="list-title">
          {{ v.label }}
        </view>
        <image class="list-arrow" :src="RightArrowIcon"></image>
      </view>
    </view>
    <component
      :style="{top: `${menuButtonRect.top + menuButtonRect.height + 30}px`}"
      class="content-container"
      :is="contentComponent"></component>
  </view>
</template>