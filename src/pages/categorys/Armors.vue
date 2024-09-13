<script setup>
import './armors.scss'

import { computed, onMounted, ref } from 'vue';
import useWukongData from '../../components/wukongData.js'
const wukongData = useWukongData()

const menuButtonRect = ref({top: 0})

const data = ref({
    head: [],
    body: [],
    arm: [],
    leg: [],
})
const nav = ref([
    { key: 'head', label: '头冠' },
    { key: 'body', label: '衣甲' },
    { key: 'arm', label: '臂甲' },
    { key: 'leg', label: '腿甲' },
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
        v.type,
        v.content
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
    if (url.indexOf('gamersky') > -1) {
        return '整理自游民星空'
    }
    if (url.indexOf('bwiki') > -1) {
        return '整理自B站黑神话：悟空WIKI'
    }
    return ""
}
onMounted(async () => {
    menuButtonRect.value = wx.getMenuButtonBoundingClientRect()
    const armorsData = await wukongData.loadData('armors')
    data.value = {
        head: armorsData.filter(v => v.type == '头冠' && v.name),
        body: armorsData.filter(v => v.type == '衣甲' && v.name),
        arm: armorsData.filter(v => v.type == '臂甲' && v.name),
        leg: armorsData.filter(v => v.type == '腿甲' && v.name),
    }
    list.value = data.value.head.map(v => ({
        ...v,
        img: `${wukongData.wukongDataUrlPrefix.value}/${v.img}`
    }))
    nav.value.find(v => v.key == 'head').count = data.value.head.length
    nav.value.find(v => v.key == 'body').count = data.value.body.length
    nav.value.find(v => v.key == 'arm').count = data.value.arm.length
    nav.value.find(v => v.key == 'leg').count = data.value.leg.length
})

</script>

<template>
    <view class="namebook-container">
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
                :style="{left: `${currentNavIndex * 25}%`}"
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