<template>
    <div class="show-cube">
        <cube :cubeObj="cubeObj"></cube>
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
        cubeObj: {
            unit: '人', // 单位
            color: 'transparent', // 立方体颜色
            number: 0, // 人数
            percentage: 0, // 数据的百分比（决定了立方体的高度）
            title: '', // 字段名
            introduce: '', // 字段名介绍
        },
    }),
    computed: {},
    mounted() {
        setTimeout(() => {
            this.cubeObj = {
                unit: '人', // 单位
                color: '0, 255, 243', // 立方体颜色
                number: 77, // 人数
                percentage: 40, // 数据的百分比（决定了立方体的高度）
                title: '字段名', // 字段名
                introduce: '字段名介绍', // 字段名介绍
            };
        }, 2000);
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
.show-cube {
    width: 100vw;
    height: 100vh;
    background: #1b2a4d;
}
</style>
