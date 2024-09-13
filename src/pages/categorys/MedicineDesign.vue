<script setup>
import './medicineDesign.scss'

import { onMounted, ref } from 'vue';
import useWukongData from '../../components/wukongData.js'
const wukongData = useWukongData()

const data = ref([])

onMounted(async () => {
    data.value = await wukongData.loadData('medicine_design')
})

</script>

<template>
    <view class="medicine-design-container">
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