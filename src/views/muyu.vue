<template>
    <div class="muyu">
        <div class="count">{{ count }}</div>
        <img :class="['zhuti', { 'img-active': clickEvent }]" @click="clickMuyu()" src="../assets/muyu.png" />
        <div :class="['prompt', { 'tips-active': clickEvent }]">功德+1</div>

        <audio controls ref="audio" class="aud">
            <source src="https://clemmensen.top/static/muyu.mp3" />
        </audio>
    </div>
</template>

<script setup>
import { throttle } from '@/utils/utils';
import { ref } from 'vue';

const count = ref(0);
const audio = ref(null);
const time = ref(500);
const clickEvent = ref(false);

function playMuyu() {
    audio.value.play();
}

function clickMuyu() {
    if (clickEvent.value) return;
    count.value++;
    clickEvent.value = true;
    setTimeout(() => {
        clickEvent.value = false;
    }, time.value);
    playMuyu();
}
</script>

<style lang="scss" scoped>
.muyu {
    width: 100vw;
    margin-top: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    .count {
        font-size: 30px;
        font-weight: bolder;
        margin-bottom: 30px;
    }

    .zhuti {
        width: 150px;
        height: 90px;
        user-select: none;
        cursor: url('../assets/chuizi.ico'), auto;
    }
    .img-active {
        animation: muyuScale 500ms;
    }

    .prompt {
        position: absolute;
        top: 18vh;
        right: 40vw;
        user-select: none;
        opacity: 0;
    }
    .tips-active {
        animation: textMove 1000ms;
    }

    .aud {
        width: 0;
        height: 0;
    }
}
@keyframes muyuScale {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.95);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes textMove {
    from {
        top: 18vh;
        opacity: 1;
    }
    to {
        top: 12vh;
        opacity: 0;
    }
}
</style>
