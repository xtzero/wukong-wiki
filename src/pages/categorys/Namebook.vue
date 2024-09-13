<script setup>
import './namebook.scss'

import { computed, onMounted, ref } from 'vue';
import useWukongData from '../../components/wukongData.js'
const wukongData = useWukongData()

const menuButtonRect = ref({top: 0})

const data = ref({
    namebook_boss: [],
    namebook_character: [],
    namebook_king: [],
    namebook_small: [],
})
const nav = ref([
    { key: 'namebook_character', label: '人物', count: 0 },
    { key: 'namebook_small', label: '小妖', count: 0 },
    { key: 'namebook_boss', label: '头目', count: 0 },
    { key: 'namebook_king', label: '妖王', count: 0 },
])
const currentNav = ref('namebook_character')
const currentNavIndex = computed(() => {
    const index = nav.value.findIndex(v => v.key == currentNav.value)
    return index === -1 ? 0 : index
})
const onNavClick = v => {
    console.log('onNavClick.v', v)
    currentNav.value = v
    const newList = data.value[v].map(vv => {
        let _img = ''
        if (v == 'namebook_king') {
            _img = `${wukongData.wukongDataUrlPrefix.value}/${vv.img}`
        } else {
            _img = `${wukongData.wukongDataUrlPrefix.value}/${currentNav.value}/${vv.img}`
        }
        return {
            ...vv,
            img: _img
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
    return v.replaceAll("\n", '<view style="margin-bottom: 40rpx;"></view>')
}

const onItemClick = v => {
    detail.value = {
        show: true,
        name: v.name,
        img: v.img,
        originUrl: v.originUrl,
        content: v.content
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
    data.value = {
        namebook_boss: await wukongData.loadData('namebook_boss'),
        namebook_character: await wukongData.loadData('namebook_character'),
        namebook_king: await wukongData.loadData('namebook_king'),
        namebook_small: await wukongData.loadData('namebook_small'),
    }
    list.value = data.value.namebook_character.map(v => ({
        ...v,
        img: `${wukongData.wukongDataUrlPrefix.value}/${currentNav.value}/${v.img}`
    }))
    nav.value.find(v => v.key == 'namebook_boss').count = data.value.namebook_boss.length
    nav.value.find(v => v.key == 'namebook_character').count = data.value.namebook_character.length
    nav.value.find(v => v.key == 'namebook_king').count = data.value.namebook_king.length
    nav.value.find(v => v.key == 'namebook_small').count = data.value.namebook_small.length
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
            </view>
        </view>
        <view class="dialog" v-show="detail.show">
            <view class="dialog-inner">
                <view class="close-btn" :onTap="handleDialogClose">×</view>
                <view class="title">{{ detail.name }}</view>
                <image class="dialog-img" mode="aspectFit" :src="detail.img"></image>
                <view class="content" v-html="processContent(detail.content)"></view>
                <view class="originUrl">{{ processOriginUrl(detail.originUrl) }}</view>
            </view>
        </view>
    </view>
</template>