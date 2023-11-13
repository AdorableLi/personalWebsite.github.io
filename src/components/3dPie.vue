<!-- 透明3D饼图-->

<!-- 使用示例
<Pie3D :optionData="optionData" :chosenIndex="chosenIndex" @clickItem="receivePieData" /> -->

<template>
    <div class="bi-3d-pie" :style="{ width: `${width}px`, height: `${height}px` }">
        <img class="bg-img" src="/static/images/Bi-3dPie-bg.png" />
        <div class="bg" :id="id" style="height: 100%"></div>
    </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';

HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

let chart = null; // 创建3D饼图
export default {
    name: '',
    props: {
        width: {
            type: Number,
            default: 200,
        }, // 饼图宽度
        height: {
            type: Number,
            default: 200,
        }, // 饼图高度
        optionData: {
            type: Array,
            default: () => {
                return [];

                // [
                //     {
                //         name: '数据一',
                //         value: 20,
                //         sliced: true,
                //         selected: true,
                //     },
                //     {
                //         name: '数据二',
                //         value: 15,
                //     },
                //     {
                //         name: '数据三',
                //         value: 35,
                //     },
                //     {
                //         name: '数据四',
                //         value: 10,
                //     },
                //     {
                //         name: '数据五',
                //         value: 20,
                //     },
                // ];
            },
        }, // 原始数据
        id: {
            type: String,
            default: () => {
                return 'main' + Math.random();
            },
        }, // 饼图ID
        chosenIndex: {
            type: Number,
            default: 0,
        }, // 被选中的数据块index，用于选择联动
    },
    watch: {
        optionData: {
            deep: true,
            handler(newVal, oldVal) {
                if (newVal == oldVal) return;
                // this.$nextTick(() => {
                this.initData(newVal);
                this.initPie();
                // });
            },
        },
        chosenIndex: {
            deep: true,
            handler(newVal, oldVal) {
                if (newVal == oldVal) return;
                this.changePieIndex(newVal);
                chart.series[0].setData(this.dataList);
            },
        },
    },
    data: () => ({
        dataList: [],
        defaultColors: ['rgba(13, 253, 242, 0.85)', 'rgba(1, 125, 255, 0.85)', 'rgba(253, 214, 13, 0.85)', 'rgba(253, 128, 13, 0.85)', 'rgba(150, 67, 251, 0.85)'],
    }),
    mounted() {},
    methods: {
        // 初始化页面数据
        initData(arr) {
            this.dataList = arr.map(item => {
                item['y'] = item['value'];
                return item;
            });
        },
        // 初始化饼图数据
        initPie() {
            if (!this.dataList.length) return;
            let _this = this;

            chart = Highcharts.chart(this.id, {
                colors: _this.defaultColors,
                chart: {
                    type: 'pie',
                    backgroundColor: null,
                    animation: true,
                    marginTop: 20,
                    spacingTop: 0,
                    options3d: {
                        enabled: true,
                        alpha: 50,
                    },
                    spacingTop: 0,
                    spacingLeft: 0,
                    spacingRight: 0,
                },
                legend: {
                    //图例
                    enabled: false,
                    align: 'center', //程度标的目标地位
                    layout: 'horizontal',
                    verticalAlign: 'top', //垂直标的目标地位
                    padding: 2,
                    margin: 0,
                    itemStyle: {
                        cursor: 'pointer',
                        color: '#FFFFFF',
                        fontWeight: 100,
                        backgroundColor: ['#ccc'],
                    },
                    itemHoverStyle: {
                        color: '#FFFFFF',
                    },
                },
                labels: {
                    items: [
                        {
                            html: '222',
                        },
                    ],
                },
                tooltip: {
                    //提示框
                    backgroundColor: null,
                    borderColor: null,
                    color: '#fff',
                    useHTML: true,
                    itemStyle: {
                        color: '#FFFFFF',
                    },
                    formatter: function () {
                        const _text = `
                            <div style="color: #fff">
                                <div>${this.key}</div>
                                <div>${this.y}</div>
                            </div>
                        `;
                        return _text;
                    },
                },
                title: {
                    //标题
                    text: null,
                },
                credits: {
                    enabled: false, //不显示LOGO
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 50, // 饼图厚度
                        shadow: true,
                        softConnector: false,
                        slicedOffset: 20,
                        states: {
                            inactive: {
                                opacity: 0.7,
                                size: '100%',
                            },
                        },
                    },
                    series: {
                        point: {
                            events: {
                                select: function (e) {
                                    _this.changePieIndex(this.index);
                                    _this.$emit('clickItem', this.index);
                                },
                            },
                        },
                    },
                },
                series: [
                    {
                        type: 'pie',
                        name: '',
                        showInLegend: true, // 默认值
                        data: _this.dataList,
                        dataLabels: {
                            enabled: false,
                            alignTo: 'toPlotEdges',
                            y: 0,
                            connectorColor: 'rgba(133, 205, 247, 1)', //引导线
                            connectorShape: function (labelPosition, connectorPosition) {
                                var touchingSliceAt = connectorPosition.touchingSliceAt,
                                    alignment = labelPosition.alignment,
                                    left = 0,
                                    right = 0;
                                if (alignment == 'left') {
                                    left = labelPosition.x + this.dataLabel.bBox.width + 14;
                                    right = labelPosition.x + 2;
                                } else {
                                    left = labelPosition.x - this.dataLabel.bBox.width - 14;
                                    right = labelPosition.x - 2;
                                }
                                return ['M', left, labelPosition.y, 'L', right, labelPosition.y, 'L', touchingSliceAt.x, touchingSliceAt.y];
                            },
                            formatter: function () {
                                let dd = _this.dataList.filter(item => {
                                    if (item.name === this.key) {
                                        return item;
                                    }
                                });
                                return dd[0].y + '%' || '';
                            },
                            distance: 20,
                            style: {
                                color: '#FFFFFF',
                                fontSize: '12px',
                                textOutline: 'none',
                                fontWeight: '400',
                            },
                        },
                    },
                ],
            });
        },
        // 更改饼图被选中的数据块
        changePieIndex(index) {
            for (let i = 0; i < this.dataList.length; i++) {
                this.dataList[i].sliced = i == index;
                this.dataList[i].selected = i == index;
            }
        },
    },
};
</script>

<style scoped lang="scss">
.bi-3d-pie {
    width: 100%;
    position: relative;

    .bg-img {
        width: 90%;
        height: 60%;
        position: absolute;
        left: 7%;
        bottom: 2%;
    }

    .bg {
        z-index: 999;
        width: 100%;
        height: 100%;
        position: relative;
        background-size: 65% 70%;
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: 80%;
        filter: drop-shadow(0 0 5px #000);
    }
}
</style>
