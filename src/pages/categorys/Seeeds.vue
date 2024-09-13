<script setup>
import './seeds.scss'

import { onMounted, ref } from 'vue';
import useWukongData from '../../components/wukongData.js'
const wukongData = useWukongData()

const data = ref([])

onMounted(async () => {
    data.value = await wukongData.loadData('seeds')
})

</script>

<template>
    <view class="seeds-container">
        <view
            v-for="(v, k) in data"
            :key="k"
            class="awardsps-item">
            <image class="left-img" :src="`${wukongData.wukongDataUrlPrefix.value}/${v.img}`"></image>
            <view class="right">
                <view class="title">{{ v.name }}</view>
            </view>
        </view>
    </view>
</template>