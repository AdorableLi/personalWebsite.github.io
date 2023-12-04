<template>
    <div class="show-cube">
        <!-- <cube :cubeObj="cubeObj"></cube> -->
        <div v-for="item in cubeArr" :key="item.id">
            <cube :cubeObj="item"></cube>
        </div>
    </div>
</template>

<script>
import cube from '@/components/cube';

export default {
    name: 'showCube',
    components: {
        cube,
    },
    data: () => ({
        // cubeObj: {
        //     unit: '人', // 单位
        //     color: 'transparent', // 立方体颜色
        //     number: 0, // 人数
        //     percentage: 0, // 数据的百分比（决定了立方体的高度）
        //     title: '', // 字段名
        //     introduce: '', // 字段名介绍
        // },
        cubeObj: {},
        cubeArr: [],
    }),
    computed: {},
    mounted() {
        setTimeout(() => {
            // this.cubeObj = {
            //     unit: '人', // 单位
            //     color: '0, 255, 243', // 立方体颜色
            //     number: 77, // 人数
            //     percentage: 40, // 数据的百分比（决定了立方体的高度）
            //     title: '字段名1', // 字段名
            //     introduce: '字段名介绍', // 字段名介绍
            // };
            this.cubeArr = [
                {
                    id: 1,
                    unit: '人', // 单位
                    color: '0, 255, 243', // 立方体颜色
                    number: 77, // 人数
                    percentage: 40, // 数据的百分比（决定了立方体的高度）
                    title: '字段名1', // 字段名
                    introduce: '字段名介绍111', // 字段名介绍
                },
                {
                    id: 2,
                    unit: '人', // 单位
                    color: '33, 147, 255', // 立方体颜色
                    number: 100, // 人数
                    percentage: 70, // 数据的百分比（决定了立方体的高度）
                    title: '字段名2', // 字段名
                    introduce: '字段名介绍222', // 字段名介绍
                },
                {
                    id: 3,
                    unit: '人', // 单位
                    color: '254, 224, 102', // 立方体颜色
                    number: 0, // 人数
                    percentage: 0, // 数据的百分比（决定了立方体的高度）
                    title: '字段名3', // 字段名
                    introduce: '字段名介绍333', // 字段名介绍
                },
            ];
        }, 500);
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
.show-cube {
    width: 100vw;
    height: 100vh;
    background: #1b2a4d;
    display: flex;
    flex-direction: row;

    > div {
        width: 200px;
        position: relative;
    }
}
</style>
