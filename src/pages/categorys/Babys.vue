<script setup>
import './babys.scss'

import { onMounted, ref } from 'vue';
import useWukongData from '../../components/wukongData.js'
const wukongData = useWukongData()

const data = ref([])

onMounted(async () => {
    data.value = await wukongData.loadData('babys')
})

</script>

<template>
    <view class="babys-container">
        <view
            v-for="(v, k) in data"
            :key="k"
            class="awardsps-item">
            <image class="left-img" :src="`${wukongData.wukongDataUrlPrefix.value}/${v.img}`"></image>
            <view class="right">
                <view class="title">{{ v.name }}</view>
                <!-- <view class="desc">{{ v.desc }}</view> -->
            </view>
        </view>
    </view>
</template>