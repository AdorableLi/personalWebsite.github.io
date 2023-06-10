<template>
    <div class="show-cube">
        <cube :percentage="percentage" :color="'0, 255, 243'"></cube>
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
        percentage: 0,
    }),
    computed: {},
    mounted() {
        setTimeout(() => {
            this.percentage = 40;
        }, 1000);
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
