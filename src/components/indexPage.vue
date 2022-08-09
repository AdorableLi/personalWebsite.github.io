<template>
    <div class="container">
        <div class="container-bg"></div>
        <div class="letter">
            <div class="title">这是标题</div>
            <div class="article">
                <div>阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的</div>
                <div>阿萨德尽快理发师健康的</div>
                <div>阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的</div>
                <div>阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的</div>
                <div>阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的</div>
                <div>阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的</div>
                <div>阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的</div>
                <div>阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的</div>
                <div>阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的</div>
                <div>阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的阿萨德尽快发哈手机壳理发师健康的</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
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
    overflow: hidden;
}
.container-bg {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right, rgb(90, 90, 235) 50%, rgb(247, 245, 218) 50%);
    background-size: 27px 100%;
    transform: scale(2.2) rotate(-50deg);
    position: relative;
    z-index: -1;
    overflow: hidden;
}
.letter {
    width: calc(100vw - 70px);
    height: calc(100vh - 120px);
    background: url('/public/yamase.png') no-repeat 100%;
    position: absolute;
    padding: 40px 20px;
    overflow-y: scroll;
    text-align: left;
}
.title {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
}
.article > div {
    font-size: 18px;
    text-indent: 2em;
    margin-bottom: 10px;
}
</style>
