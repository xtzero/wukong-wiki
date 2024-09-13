<script setup>
import './index.scss'
import { onMounted, ref } from 'vue';
import Taro from '@tarojs/taro'

const content = ref('')
onMounted(() => {
    Taro.request({
        url: 'https://thebestxt.cc/wukong-data/dist/indexContent.txt',
        method: 'GET',
        success: res => {
            content.value = res.data.replaceAll("\n", '<view style="margin-bottom: 40rpx;"></view>')
        },
        fail: e => {
            data.value[category] = null
            console.error('获取分类数据失败', category)
            resolve(null)
        }
    })
})
</script>

<template>
    <view class="index-container">
        <view class="index-content" v-html="content"></view>
    </view>
</template>