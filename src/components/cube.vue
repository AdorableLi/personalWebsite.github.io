<template>
    <!-- <div class="container" :style="hasFetched ? cssVars : cssVarsDefault"> -->
    <div class="container" :style="cssVars" v-if="hasFetched">
        <div class="cube cube1">
            <div class="front"></div>
            <div class="right"></div>
            <div class="up"></div>

            <div class="cube cube2">
                <div class="front"></div>
                <div class="right"></div>
                <div class="up"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cube',
    data: () => ({
        cssVarsDefault: {
            '--status': 'paused',
            '--default': '100px', // 立方体面的基准长宽
            '--color': '0, 255, 243',
            '--percentage': '100px', // 外层大立方体的长宽
            '--percentageTran': '50px', // 外层大立方体的偏移距离
            '--percentageTranNegative': '-50px', // 外层大立方体的偏移距离（负）
            '--percentageSmall': '74px', // 内层小立方体的长宽
            '--percentageSmallTran': '37px', // 内层小立方体的偏移距离
            '--percentageSmallTranNegative': '-37px', // 内层小立方体的偏移距离（负）
        }, // 立方体默认css
        hasFetched: true, // 是否加载完成
    }),
    props: {
        color: {
            type: String,
            default: 'transparent',
        }, // 立方体颜色
        defaultNum: {
            type: Number,
            default: 100,
        }, // 立方体的基准值
        percentage: {
            type: Number,
            default: 0,
        }, // 数据的百分比（决定了立方体的高度）
    },
    computed: {
        cssVars() {
            const { color, defaultNum, percentage } = this;
            this.hasFetched = true;
            return {
                '--status': 'running',
                '--default': `${defaultNum}px`, // 立方体面的基准长宽
                '--color': color,
                '--percentage': `${percentage}px`, // 外层大立方体的长宽
                '--percentageTran': `${percentage * 0.5}px`, // 外层大立方体的偏移距离
                '--percentageTranNegative': `-${percentage * 0.5}px`, // 外层大立方体的偏移距离（负）
                '--percentageSmall': `${percentage * 0.74}px`, // 内层小立方体的长宽
                '--percentageSmallTran': `${percentage * 0.74 * 0.5}px`, // 内层小立方体的偏移距离
                '--percentageSmallTranNegative': `-${percentage * 0.74 * 0.5}px`, // 内层小立方体的偏移距离（负）
            };
        },
    },
    mounted() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}

.container {
    perspective: 2200px;
    perspective-origin: center -1000px;
    position: absolute;
    top: 50px;
    left: 50px;
    transform: rotate3d();

    .cube {
        /* 设置子元素位于3D空间中 */
        transform-style: preserve-3d;
        transform: rotateY(-46deg);

        > div:not(.cube2) {
            position: absolute;
            top: 0;
            left: 0;
            text-align: center;
            font-size: 30px;
            color: var(--color);
        }
    }

    .cube1 {
        width: var(--percentage);
        height: var(--percentage);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: absolute;

        > div:not(.cube2) {
            width: var(--percentage);
            height: var(--percentage);
            line-height: var(--percentage);
            background: rgba($color: var(--color), $alpha: 0.2);
        }

        > .front {
            animation: front1 2s ease var(--status);
            border: 1px solid rgba($color: var(--color), $alpha: 0.9);
            transform: translateZ(var(--percentageTran));
        }

        > .left {
            animation: left1 2s ease var(--status);
            transform: translateX(var(--percentageTranNegative)) rotateY(-90deg);
        }

        > .right {
            animation: right1 2s ease var(--status);
            transform: translateX(var(--percentageTran)) rotateY(90deg);
            border: 1px solid rgba($color: var(--color), $alpha: 0.9);
        }

        > .back {
            animation: back1 2s ease var(--status);
            transform: translateZ(var(--percentageTranNegative));
        }

        > .up {
            animation: up1 2s ease var(--status);
            transform: translateY(var(--percentageTranNegative)) rotateX(90deg);
            border: 1px solid rgba($color: var(--color), $alpha: 0.9);
        }

        > .down {
            transform: translateY(var(--percentageTran)) rotateX(-90deg);
        }
    }

    .cube2 {
        width: var(--percentageSmall);
        height: var(--percentageSmall);
        // transform-style: preserve-3d;
        transform: rotateY(0deg);
        position: relative;

        div {
            width: var(--percentageSmall);
            height: var(--percentageSmall);
            line-height: var(--percentageSmall);
            border: unset;
        }

        > .front {
            animation: front2 2s ease var(--status);
            transform: translateZ(var(--percentageSmallTran));
            background: linear-gradient(to top, rgba($color: var(--color), $alpha: 0.65) 0, transparent 100%);
        }

        > .left {
            animation: left2 2s ease var(--status);
            transform: translateX(var(--percentageSmallTranNegative)) rotateY(-90deg);
        }

        > .right {
            animation: right2 2s ease var(--status);
            transform: translateX(var(--percentageSmallTran)) rotateY(90deg);
            background: linear-gradient(to top, rgba($color: var(--color), $alpha: 0.65) 0, transparent 100%);
        }

        > .back {
            animation: back2 2s ease var(--status);
            transform: translateZ(var(--percentageSmallTranNegative));
        }

        > .up {
            animation: up2 2s ease var(--status);
            background: rgba(var(--color), $alpha: 0.65);
            transform: translateY(var(--percentageSmallTranNegative)) rotateX(90deg);
        }

        > .down {
            transform: translateY(var(--percentageSmallTran)) rotateX(-90deg);
        }
    }
}
// 大正方体动画
@keyframes front1 {
    0% {
        height: 0;
        transform: translateZ(var(--percentageTran)) translateY(100px);
    }

    100% {
        height: var(--percentage);
        transform: translateZ(var(--percentageTran)) translateY(0);
    }
}
@keyframes left1 {
    0% {
        height: 0;
        transform: translateX(var(--percentageTranNegative)) translateY(100px) rotateY(-90deg);
    }

    100% {
        height: var(--percentage);
        transform: translateX(var(--percentageTranNegative)) translateY(0) rotateY(-90deg);
    }
}
@keyframes right1 {
    0% {
        height: 0;
        transform: translateX(var(--percentageTran)) translateY(100px) rotateY(90deg);
    }

    100% {
        height: var(--percentage);
        transform: translateX(var(--percentageTran)) translateY(0) rotateY(90deg);
    }
}
@keyframes back1 {
    0% {
        height: 0;
        transform: translateZ(var(--percentageTranNegative)) translateY(100px);
    }

    100% {
        height: var(--percentage);
        transform: translateZ(var(--percentageTranNegative)) translateY(0);
    }
}
@keyframes up1 {
    0% {
        transform: translateY(var(--percentageTranNegative)) translateY(100px) rotateX(90deg);
    }

    100% {
        transform: translateY(var(--percentageTranNegative)) translateY(0) rotateX(90deg);
    }
}

// 小正方体动画
@keyframes front2 {
    0% {
        height: 0;
        transform: translateZ(var(--percentageSmallTran)) translateY(100px);
    }

    100% {
        height: var(--percentageSmall);
        transform: translateZ(var(--percentageSmallTran)) translateY(0);
    }
}
@keyframes left2 {
    0% {
        height: 0;
        transform: translateX(var(--percentageSmallTranNegative)) translateY(100px) rotateY(-90deg);
    }

    100% {
        height: var(--percentageSmall);
        transform: translateX(var(--percentageSmallTranNegative)) translateY(0) rotateY(-90deg);
    }
}
@keyframes right2 {
    0% {
        height: 0;
        transform: translateX(var(--percentageSmallTran)) translateY(100px) rotateY(90deg);
    }

    100% {
        height: var(--percentageSmall);
        transform: translateX(var(--percentageSmallTran)) translateY(0) rotateY(90deg);
    }
}
@keyframes back2 {
    0% {
        height: 0;
        transform: translateZ(var(--percentageSmallTranNegative)) translateY(100px);
    }

    100% {
        height: var(--percentageSmall);
        transform: translateZ(var(--percentageSmallTranNegative)) translateY(0);
    }
}
@keyframes up2 {
    0% {
        transform: translateY(var(--percentageSmallTranNegative)) translateY(100px) rotateX(90deg);
    }

    100% {
        transform: translateY(var(--percentageSmallTranNegative)) translateY(0) rotateX(90deg);
    }
}
</style>
