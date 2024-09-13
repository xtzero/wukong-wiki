<script setup>
import './wine.scss'

import { computed, onMounted, ref } from 'vue';
import useWukongData from '../../components/wukongData.js'
const wukongData = useWukongData()

const menuButtonRect = ref({top: 0})

const data = ref({
    gourds: [],
    wine: [],
    in_wine: []
})
const nav = ref([
    { key: 'gourds', label: '葫芦' },
    { key: 'wine', label: '酒' },
    { key: 'in_wine', label: '泡酒物' },
])
const currentNav = ref('')
const currentNavIndex = computed(() => {
    const index = nav.value.findIndex(v => v.key == currentNav.value)
    return index === -1 ? 0 : index
})
const onNavClick = v => {
    console.log('onNavClick.v', v)
    currentNav.value = v
    const newList = data.value[v].map(vv => {
        return {
            ...vv,
            img: `${wukongData.wukongDataUrlPrefix.value}/${vv.img}`
        }
    })
    console.log('newList', newList)
    
    if (newList) {
        list.value = newList
    }
}

const list = ref([])

const detail = ref({
    show: false,
    name: '',
    img: '',
    originUrl: '',
    content: ''
})

const processContent = v => {
    return [
        v.level,
        v.desc
    ].join("\n\n").replaceAll("\n", '<view style="margin-bottom: 40rpx;"></view>')
}

const onItemClick = v => {
    detail.value = {
        show: true,
        ...v
    }
}

const handleDialogClose = () => {
    detail.value.show = false
}

const processOriginUrl = url => {
    return '整理自游民星空'
}
onMounted(async () => {
    menuButtonRect.value = wx.getMenuButtonBoundingClientRect()
    data.value = {
        gourds: await wukongData.loadData('gourds'),
        wine: await wukongData.loadData('wine'),
        in_wine: await wukongData.loadData('in_wine'),
    }
    list.value = data.value.gourds.map(v => ({
        ...v,
        img: `${wukongData.wukongDataUrlPrefix.value}/${v.img}`
    }))
    nav.value.find(v => v.key == 'gourds').count = data.value.gourds.length
    nav.value.find(v => v.key == 'wine').count = data.value.wine.length
    nav.value.find(v => v.key == 'in_wine').count = data.value.in_wine.length
})

</script>

<template>
    <view class="wine-container">
        <view
            :style="{paddingTop: `${menuButtonRect.top + menuButtonRect.height + 35}px`}"
            class="nav">
            <view
                v-for="(v, k) in nav"
                :key="k"
                class="nav-item"
                :onTap="e => onNavClick(v.key)">
                {{ v.label }} {{ v.count }}
            </view>
        </view>
        <view
            :style="{top: `${menuButtonRect.top + menuButtonRect.height + 60}px`}"
            class="nav-floatbar">
            <view
                :style="{left: `${currentNavIndex * 33}%`}"
                class="nav-floatbar-inner">
                <view class="nav-floatbar-inner-point"></view>
            </view>
        </view>
        <view
            class="namebook-list">
            <view
                v-for="(v, k) in list"
                :key="k"
                class="namebook-item"
                :onTap="e => onItemClick(v)">
                <image
                    class="namebook-item-image"
                    :src="v.img"
                    mode="aspectFit">
                </image>
                <view class="item-name">{{ v.name }}</view>
            </view>
        </view>
        <view class="dialog" v-show="detail.show">
            <view class="dialog-inner">
                <view class="close-btn" :onTap="handleDialogClose">×</view>
                <view class="title">{{ detail.name }}</view>
                <image class="dialog-img" mode="aspectFit" :src="detail.img"></image>
                <view class="content" v-html="processContent(detail)"></view>
                <view class="originUrl">{{ processOriginUrl(detail.originUrl) }}</view>
            </view>
        </view>
    </view>
</template>