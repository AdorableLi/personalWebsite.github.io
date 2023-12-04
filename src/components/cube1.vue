<!-- 采用高度变形法，会有性能问题 -->
<template>
    <div class="cube-shell">
        <div class="num" :style="{ top: `calc(100px - ${cubeObj.percentage}px)` }" v-show="cubeObj.percentage">
            <div>{{ cubeObj.number }}</div>
            <p>{{ cubeObj.unit }}</p>
        </div>

        <div class="container" :style="cssVars">
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

        <div class="title">
            {{ cubeObj.title }}
            <!-- <Tooltip v-if="el.tooltip" placement="bottom-start">
                <i class="iconfont icon-wenhao" style="color: white; font-size: 12px; margin-left: 4px"></i>
                <div slot="content">{{ el.tooltip }}</div>
            </Tooltip> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'cube',
    data: () => ({}),
    props: {
        defaultNum: {
            type: Number,
            default: 100,
        }, // 立方体的基准值
        cubeObj: {
            type: Object,
            default: {
                unit: '人', // 单位
                color: 'transparent', // 立方体颜色
                number: 0, // 人数
                percentage: 0, // 数据的百分比（决定了立方体的高度）
                title: '', // 字段名
                introduce: '', // 字段名介绍
            },
        },
    },
    computed: {
        cssVars() {
            let { color, percentage } = this.cubeObj;
            return {
                '--top': `${50 + (100 - percentage) * 1.05}px`, // 别动这个计算，炼丹就对了
                '--status': percentage ? 'running' : 'paused',
                '--percentageNum': `${percentage / 100}`,
                // '--percentageNum': percentage ? `${percentage / 100}` : 0.001,
                '--color': color,
                // '--percentage': `${percentage}px`, // 外层大立方体的长宽
                // '--percentageTran': `${percentage * 0.5}px`, // 外层大立方体的偏移距离
                // '--percentageTranNegative': `-${percentage * 0.5}px`, // 外层大立方体的偏移距离（负）
                // '--percentageSmall': `${percentage * 0.74}px`, // 内层小立方体的长宽
                // '--percentageSmallTran': `${percentage * 0.74 * 0.5}px`, // 内层小立方体的偏移距离
                // '--percentageSmallTranNegative': `-${percentage * 0.74 * 0.5}px`, // 内层小立方体的偏移距离（负）
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
.cube-shell {
    width: 200px;
    height: 250px;

    .num {
        font-size: 28px;
        font-weight: bold;
        color: white;
        position: relative;

        div {
            display: inline;
        }

        p {
            font-size: 14px;
            display: inline;
        }
    }

    .title {
        position: relative;
        top: 185px;
        font-size: 14px;
        color: white;
    }

    .container {
        perspective: 2200px;
        perspective-origin: center -1000px;
        position: absolute;
        top: var(--top);
        left: 64px;

        .cube {
            /* 设置子元素位于3D空间中 */
            transform-style: preserve-3d;
            transform: rotateY(-46deg) scaleY(var(--percentageNum));

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
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            position: absolute;

            > div:not(.cube2) {
                width: 100px;
                height: 100px;
                background: rgba($color: var(--color), $alpha: 0.2);
            }

            > .front {
                animation: front1 2.5s ease var(--status);
                border: 1px solid rgba($color: var(--color), $alpha: 0.9);
                transform: translateZ(50px);
            }

            // > .left {
            //     animation: left1 2.5s ease var(--status);
            //     transform: translateX(var(--percentageTranNegative)) rotateY(-90deg);
            // }

            > .right {
                animation: right1 2.5s ease var(--status);
                transform: translateX(50px) rotateY(90deg);
                border: 1px solid rgba($color: var(--color), $alpha: 0.9);
            }

            // > .back {
            //     animation: back1 2.5s ease var(--status);
            //     transform: translateZ(var(--percentageTranNegative));
            // }

            > .up {
                animation: up1 2.5s ease var(--status);
                transform: translateY(-50px) rotateX(90deg);
                border: 1px solid rgba($color: var(--color), $alpha: 0.9);
            }

            // > .down {
            //     transform: translateY(var(--percentageTran)) rotateX(-90deg);
            // }
        }

        .cube2 {
            transform: rotateY(0deg);
            position: relative;
            top: 16px;
            left: 13px;
            // bottom: -15px;

            div {
                width: 74px;
                height: 74px;
                border: unset;
            }

            > .front {
                animation: front2 2.5s ease var(--status);
                transform: translateZ(37px);
                background: linear-gradient(to top, rgba($color: var(--color), $alpha: 0.65) 0, transparent 100%);
            }

            // > .left {
            //     animation: left2 2.5s ease var(--status);
            //     transform: translateX(var(--percentageSmallTranNegative)) rotateY(-90deg);
            // }

            > .right {
                animation: right2 2.5s ease var(--status);
                transform: translateX(37px) rotateY(90deg);
                background: linear-gradient(to top, rgba($color: var(--color), $alpha: 0.65) 0, transparent 100%);
            }

            // > .back {
            //     animation: back2 2.5s ease var(--status);
            //     transform: translateZ(var(--percentageSmallTranNegative));
            // }

            > .up {
                animation: up2 2.5s ease var(--status);
                background: rgba(var(--color), $alpha: 0.65);
                transform: translateY(-37px) rotateX(90deg);
            }

            // > .down {
            //     transform: translateY(37px) rotateX(-90deg);
            // }
        }
    }
}
// 大正方体动画
@keyframes front1 {
    0% {
        height: 0;
        transform: translateZ(50px) translateY(100px);
    }

    100% {
        height: 100px;
        transform: translateZ(50px) translateY(0);
    }
}
// @keyframes left1 {
//     0% {
//         height: 0;
//         transform: translateX(var(--percentageTranNegative)) translateY(100px) rotateY(-90deg);
//     }

//     100% {
//         height: var(--percentage);
//         transform: translateX(var(--percentageTranNegative)) translateY(0) rotateY(-90deg);
//     }
// }
@keyframes right1 {
    0% {
        height: 0;
        transform: translateX(50px) translateY(100px) rotateY(90deg);
    }

    100% {
        height: 100px;
        transform: translateX(50px) translateY(0) rotateY(90deg);
    }
}
// @keyframes back1 {
//     0% {
//         height: 0;
//         transform: translateZ(var(--percentageTranNegative)) translateY(100px);
//     }

//     100% {
//         height: var(--percentage);
//         transform: translateZ(var(--percentageTranNegative)) translateY(0);
//     }
// }
@keyframes up1 {
    0% {
        transform: translateY(-50px) translateY(100px) rotateX(90deg);
    }

    100% {
        transform: translateY(-50px) translateY(0) rotateX(90deg);
    }
}

// 小正方体动画
@keyframes front2 {
    0% {
        height: 0;
        transform: translateZ(37px) translateY(100px);
    }

    100% {
        height: 74px;
        transform: translateZ(37px) translateY(0);
    }
}
// @keyframes left2 {
//     0% {
//         height: 0;
//         transform: translateX(var(--percentageSmallTranNegative)) translateY(100px) rotateY(-90deg);
//     }

//     100% {
//         height: 74px;
//         transform: translateX(var(--percentageSmallTranNegative)) translateY(0) rotateY(-90deg);
//     }
// }
@keyframes right2 {
    0% {
        height: 0;
        transform: translateX(37px) translateY(100px) rotateY(90deg);
    }

    100% {
        height: 74px;
        transform: translateX(37px) translateY(0) rotateY(90deg);
    }
}
// @keyframes back2 {
//     0% {
//         height: 0;
//         transform: translateZ(var(--percentageSmallTranNegative)) translateY(100px);
//     }

//     100% {
//         height: var(--percentageSmall);
//         transform: translateZ(var(--percentageSmallTranNegative)) translateY(0);
//     }
// }
@keyframes up2 {
    0% {
        transform: translateY(-37px) translateY(100px) rotateX(90deg);
    }

    100% {
        transform: translateY(-37px) translateY(0) rotateX(90deg);
    }
}
</style>
