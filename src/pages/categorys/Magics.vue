<script setup>
import './magics.scss'

import { computed, onMounted, ref } from 'vue';
import useWukongData from '../../components/wukongData.js'
const wukongData = useWukongData()

const menuButtonRect = ref({top: 0})

const data = ref([])

const detail = ref({
    show: false,
    name: '',
    img: '',
    originUrl: '',
    content: ''
})

const processContent = v => {
    let contentArr = [`${v.name}`, v.desc, `${v.text}`]
    if (v.skill && v.skill.length > 0) {
        contentArr.push("·加点强化\n" + v.skill.map(vv => `- ${vv.name}\n${vv.desc}\n\n`).join("\n"))
    }
    if (v.eggs) {
        contentArr.push(`·彩蛋\n` + v.eggs.join("\n"))
    }
    if (v.from) {
        contentArr.push(`·典故出处\n${v.from.join("\n")}`)
    }
    return contentArr.join("\n\n").replaceAll("\n", '<view style="margin-bottom: 40rpx;"></view>')
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
    return '图片和游戏内资料整理自B站黑神话：悟空WIKI。'
}
onMounted(async () => {
    menuButtonRect.value = wx.getMenuButtonBoundingClientRect()
    data.value = (await wukongData.loadData('magics')).map(v => ({
        ...v,
        img: `${wukongData.wukongDataUrlPrefix.value}/${v.img}`
    }))
})

</script>

<template>
    <view class="magics-container">
        <view
            class="rubys-list">
            <view
                v-for="(v, k) in data"
                :key="k"
                class="rubys-item"
                :onTap="e => onItemClick(v)">
                <view class="ruby-left">
                    <image
                        class="ruby-item-image"
                        :src="v.img"
                        mode="aspectFit">
                    </image>
                </view>
                <view class="ruby-right">
                    <view class="ruby-name">
                        <text class="name">
                            {{ v.name.split('-').at(1) }}
                        </text>
                    </view>
                    <view class="ruby-text">{{ v.name.split('-').at(0) }}</view>
                    <view class="ruby-text">{{ v.text }}</view>
                </view>
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