<script setup>
import './awardsps.scss'

import { onMounted, ref } from 'vue';
import useWukongData from '../../components/wukongData.js'
const wukongData = useWukongData()

const data = ref([])

onMounted(async () => {
    data.value = await wukongData.loadData('award_ps')
})

</script>

<template>
    <view class="awardsps-container">
        <view
            v-for="(v, k) in data"
            :key="k"
            class="awardsps-item">
            <image class="left-img" :src="`https://thebestxt.cc/wukong/${v.img}`"></image>
            <view class="right">
                <view class="title">{{ v.title }}</view>
                <view class="desc">{{ v.desc }}</view>
            </view>
        </view>
    </view>
</template>