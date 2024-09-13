import { onMounted, ref } from 'vue'
import Taro from '@tarojs/taro'


export default function() {
    const categorys = ref([])
    const data = ref({})
    const wukongDataUrlPrefix = ref("https://thebestxt.cc/wukong-data/dist")
    // const wukongDataUrlPrefix = ref("http://localhost:5173/wukong-data/dist")
    
    onMounted(async () => {
        categorys.value = [
            {
                key: 'index',
                label: '首页'
            },
            ...await loadCategory()
        ]
        if (categorys.value.length == 0) return
    })

    const loadCategory = () => (new Promise((resolve, reject) => {
        Taro.request({
            url: `${wukongDataUrlPrefix.value}/categorys.json`,
            method: 'GET',
            success: res => {
                resolve(res.data)
            },
            fail: e => {
                resolve([])
            }
        })
    }))

    const loadData = category => (new Promise((resolve, reject) => {
        if (data.value[category]) {
            resolve(data.value[category])
        } else {
            Taro.request({
                url: `${wukongDataUrlPrefix.value}/${category}.json`,
                method: 'GET',
                success: res => {
                    data.value[category] = res.data
                    // console.log('获取分类数据成功', category, res.data)
                    resolve(res.data)
                },
                fail: e => {
                    data.value[category] = null
                    console.error('获取分类数据失败', category)
                    resolve(null)
                }
            })
        }
    }))
    
    return {
        categorys,
        data,
        wukongDataUrlPrefix,
        loadData
    }
}