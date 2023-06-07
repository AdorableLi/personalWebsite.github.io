<template>
    <div class="container">
        <div class="route-item" v-for="item in arr" @click="navTo(item.path)" :key="item.path">{{ item.name }}</div>

        <a class="footer" href="https://beian.miit.gov.cn/" target="_blank">苏ICP备2022025958号-1</a>
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

<style scoped>
body {
    overflow: hidden;
}
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.route-item {
    width: 150px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
}

.footer {
    position: absolute;
    bottom: 30px;
    cursor: pointer;
}
</style>
