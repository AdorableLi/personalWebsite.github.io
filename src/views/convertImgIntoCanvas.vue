<template>
    <div class="container">
        <div class="">此页面除canvas拖动缩放以外的功能均待实现</div>
        <div class="scale-button">
            <button @click="zoom(-1)">+</button>
            <button @click="zoom(1)">-</button>
        </div>
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
        >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <div id="img-container" class="img-container">
            <div id="canvas-shell" class="canvas-shell">
                <canvas id="canvas"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
// import { toRaw } from 'vue';
import { countNum } from '@/utils/utils';

class Scene {
    maxOffset = { x: 0, y: 0 }; // 内容的最大偏移量
    transSet = { x: 0, y: 0 }; // 内容的偏移量
    x = 0; // 记录鼠标点击Canvas时的横坐标
    y = 0; // 记录鼠标点击Canvas时的纵坐标
    multiple = 1; // 缩放率
    outDomCoordinate = ''; // 最外层容器相对于浏览器窗口的各项数据

    constructor(
        options = {
            height: 0,
            shellName: '',
            outDomName: '',
        }
    ) {
        // 设置包裹canvas的外层div信息
        this.shell = document.getElementById(options.shellName);
        this.shell.style.width = `324px`;
        this.shell.style.height = `${options.height}px`;

        // 设置最外层容器
        this.outDom = document.getElementById(options.outDomName);

        // 绑定各类事件
        this.shell.addEventListener('mousedown', this.onMousedown);
        this.shell.addEventListener('wheel', this.onWheel);

        // 记录最外层容器相对于浏览器窗口的各项数据
        const { top, left, right, bottom } = this.outDom.getBoundingClientRect();
        this.outDomCoordinate = {
            outDomTop: top,
            outDomLeft: left,
            outDomRight: right,
            outDomBottom: bottom,
        };

        // 初始化最大偏移量
        this.handleOffset();
    }

    // 鼠标按下
    onMousedown = e => {
        if (e.button === 0) {
            this.x = e.clientX - this.transSet.x; // 图片初始位置
            this.y = e.clientY - this.transSet.y; // 图片初始位置
            window.addEventListener('mousemove', this.onMousemove);
            window.addEventListener('mouseup', this.onMouseup);
        }
    };

    // 鼠标拖动
    onMousemove = e => {
        this.transSet.x = countNum(e.clientX, this.x, 'sub', 2); // x向移动距离
        this.transSet.y = countNum(e.clientY, this.y, 'sub', 2); // y向移动距离

        this.paint();
    };

    // 鼠标抬起
    onMouseup = () => {
        window.removeEventListener('mousemove', this.onMousemove);
        window.removeEventListener('mouseup', this.onMouseup);
    };

    // 滚轮缩放
    onWheel = e => {
        const _currentMultiple = Number(this.multiple).toFixed(1);
        if (e.deltaY < 0 && _currentMultiple < 4) {
            this.multiple = countNum(this.multiple, 0.1, 'add', 1);
        } else if (e.deltaY >= 0 && _currentMultiple > 1) {
            this.multiple = countNum(this.multiple, 0.1, 'sub', 1);
            // 如果缩小则强制回正偏移，否则会造成拖拽的错误
            this.transSet = {
                x: 0,
                y: 0,
            };
        }
        this.handleOffset();
        this.handleTransform();
    };

    // 处理当前缩放率下的最大偏移量
    handleOffset = () => {
        let { width, height } = this.shell.style;
        width = width.replace(/px/g, '');
        height = height.replace(/px/g, '');
        this.maxOffset = {
            x: (width * this.multiple - 324) / 2 / this.multiple,
            y: (height * this.multiple - 576) / 2 / this.multiple,
        };
    };

    // 画图
    paint() {
        // 计算最终可偏移的偏移量
        const { transX, transY } = this.handleBorder();
        this.transSet = {
            x: transX,
            y: transY,
        };

        this.handleTransform();
    }

    // 处理边界，使图片不能拖动出边界
    handleBorder = () => {
        let transX, transY;
        // 拿到内容和最外层容器相对于浏览器窗口的距离
        const { top, left, right, bottom } = this.shell.getBoundingClientRect(),
            { outDomTop, outDomLeft, outDomRight, outDomBottom } = this.outDomCoordinate;
        // 处理y轴偏移量
        if (top < outDomTop && bottom > outDomBottom) {
            transY = this.transSet.y;
        } else if (top >= outDomTop && bottom > outDomBottom) {
            transY = Math.min(`${this.maxOffset.y}`, this.transSet.y);
        } else if (top < outDomTop && bottom <= outDomBottom) {
            transY = Math.max(`-${this.maxOffset.y}`, this.transSet.y);
        } else if (top == outDomTop && bottom == outDomBottom) {
            transY = 0;
        }
        // 处理x轴偏移量
        if (left < outDomLeft && right > outDomRight) {
            transX = this.transSet.x;
        } else if (left >= outDomLeft && right > outDomRight) {
            transX = Math.min(`${this.maxOffset.x}`, this.transSet.x);
        } else if (left < outDomLeft && right <= outDomRight) {
            transX = Math.max(`-${this.maxOffset.x}`, this.transSet.x);
        } else if (left == outDomLeft && right == outDomRight) {
            transX = 0;
        }
        return { transX, transY };
    };

    // 处理图像的偏移和缩放
    handleTransform = () => {
        this.shell.style.transform = `scale(${this.multiple}) translate(${this.transSet.x}px, ${this.transSet.y}px)`;
    };
}

let canvasContainer;

export default {
    name: 'convertImgIntoCanvas',
    components: {},
    data: () => ({
        fileList: [
            { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
            { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        ],
    }),
    computed: {},
    mounted() {
        const imgUrl =
            'https://ts1.cn.mm.bing.net/th/id/R-C.d8dfd08893b58d08d74b38ad8870a48d?rik=9KBqff6Rai035Q&riu=http%3a%2f%2fstatic.cntonan.com%2fuploadfile%2f2019%2f0214%2f20190214104244pwm1xxsdikh.jpg&ehk=MOxI2n5nY44gO%2fKsNYWAuEBvcRwSmkRVNb4dTS6Gk%2bY%3d&risl=&pid=ImgRaw&r=0';
        const imgWidth = 1125, // 图片原始宽
            imgHeight = 2436; // 图片原始高

        const { width, height, multiple } = this.handleShellWidthHeight(imgWidth, imgHeight);
        let img = {
            height,
            shellName: 'canvas-shell',
            outDomName: 'img-container',
        };
        canvasContainer = new Scene(img);

        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');

        let image = new Image(); // 创建一个<img>元素
        image.src = imgUrl; // 设置图片源地址
        image.onload = () => {
            ctx.drawImage(image, 0, 0, imgWidth, imgHeight);
        };

        canvas.width = imgWidth;
        canvas.height = imgHeight;
        canvas.style.transform = `scale(${multiple})`;
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleSuccess(res, file, fileList) {
            console.log(res, file, fileList);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },

        // 处理canvas外层的宽高以及canvas的缩放率（324，576为最外层容器固定宽高）
        handleShellWidthHeight(domWidth, domHeight) {
            let width = 324,
                multiple = countNum(324, domWidth, 'div', 6),
                height = countNum(domHeight, multiple, 'mul', 6);
            return { width, height, multiple };
        },
        zoom(type) {
            let _obj = {
                deltaY: type,
            };
            canvasContainer.onWheel(_obj);
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;

    .img-container {
        width: 324px;
        height: 576px;
        overflow: hidden;
        border: 1px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-sizing: border-box;

        .canvas-shell {
            width: 324px;
            height: 576px;
            // transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1) 0s;

            #canvas {
                transform-origin: left top;
            }
        }
    }
}
</style>
