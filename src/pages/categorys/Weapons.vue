<script setup>
import './weapons.scss'

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
    return [
        v.level,
        `「${v.descr}」`,
        v.effect ? "·属性\n" + v.effect.join("\n") : "",
        v.from ? "·获取方式\n" + v.from.join("\n\n") : ""
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
    return '图片和游戏内资料整理自游民星空。'
}
onMounted(async () => {
    menuButtonRect.value = wx.getMenuButtonBoundingClientRect()
    data.value = (await wukongData.loadData('weapons')).map(v => ({
        ...v,
        img: `${wukongData.wukongDataUrlPrefix.value}/${v.img}`
    }))
})

</script>

<template>
    <view class="rubys-container">
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
                            {{ v.name }}
                        </text>
                        <text class="level">
                            - {{ v.level }}
                        </text>
                    </view>
                    <view class="ruby-text">{{ v.descr }}</view>
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