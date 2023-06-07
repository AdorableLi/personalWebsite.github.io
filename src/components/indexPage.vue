<template>
    <div class="container">
        <div class="route-item" v-for="item in arr" @click="navTo(item.path)" :key="item.path">{{ item.name }}</div>
    </div>
</template>

<script>
export default {
    name: 'indexPage',
    data: () => ({
        arr: [
            {
                name: '查询可转债',
                path: 'enquireConvertibleBonds',
            },
            {
                name: '处理DAU数据',
                path: 'handleDAUData',
            },
        ],
    }),
    mounted() {},
    methods: {
        navTo(name) {
            this.$router.push({
                name,
            });
        },
    },
};
</script>

<style scoped lang="scss">
body {
    overflow: hidden;

    .container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .route-item {
            width: 150px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
        }
    }
}
</style>
