<template>
    <div class="safeEvent">
        <Pie3D :optionData="optionData" :chosenIndex="chosenIndex" @clickItem="receivePieData" />
    </div>
</template>
<script>
import Pie3D from '../components/3dPie.vue';

export default {
    name: 'show3dPie',
    components: {
        Pie3D,
    },
    data() {
        return {
            optionData: [],
            chosenIndex: 0,
        };
    },
    mounted() {
        setTimeout(() => {
            this.optionData = [
                {
                    name: '数据一',
                    value: 20,
                    sliced: true,
                    selected: true,
                },
                {
                    name: '数据二',
                    value: 15,
                },
                {
                    name: '数据三',
                    value: 35,
                },
                {
                    name: '数据四',
                    value: 10,
                },
                {
                    name: '数据五',
                    value: 20,
                },
            ];
        }, 500);
        setTimeout(() => {
            this.chosenIndex = 2;
        }, 2000);
        setTimeout(() => {
            this.chosenIndex = 4;
        }, 5000);
    },
    methods: {
        receivePieData(e) {
            console.log(e);
        },
    },
};
</script>
<style scoped>
.safeEvent {
    background: #14192d;
    height: 100vh;
    padding: 50px;
}
</style>
