<template>
    <div class="container">
        <div class="">此页面除canvas拖动缩放以外的功能均待实现</div>
        <div class="scale-button">
            <button @click="zoom('add')">+</button>
            <button @click="zoom('sub')">-</button>
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
                <!-- <canvas id="canvas" :style="`transform: scale(${multiple})`"></canvas> -->
                <canvas id="canvas"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
// import { toRaw } from 'vue';
import { countNum } from '@/utils/utils';

class Scene {
    moveSet = { x: 0, y: 0 }; // 相对于容器的偏移量
    transSet = { x: 0, y: 0 }; // 容器的缩放量
    x = 0; // 记录鼠标点击Canvas时的横坐标
    y = 0; // 记录鼠标点击Canvas时的纵坐标
    img = '';
    multiple = 1; // 缩放率

    constructor(
        id,
        options = {
            imgUrl: '',
            width: 0,
            height: 0,
            shellName: '',
            outDomName: '',
        }
    ) {
        // 设置canvas的相关信息
        this.canvas = document.getElementById(id);
        this.options = options;
        this.width = options.width;
        this.height = options.height;
        this.canvas.width = options.width;
        this.canvas.height = options.height;
        this.ctx = this.canvas.getContext('2d');

        // 设置包裹canvas的外层div信息
        this.shell = document.getElementById(options.shellName);
        this.setShellData(options.width, options.height);

        // 设置最外层容器
        this.outDom = document.getElementById(options.outDomName);

        // 绑定各类事件
        this.onMousedown = this.onMousedown.bind(this);
        this.onMousemove = this.onMousemove.bind(this);
        this.onMouseup = this.onMouseup.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.canvas.addEventListener('mousedown', this.onMousedown);
        this.canvas.addEventListener('wheel', this.onWheel);
    }

    // 鼠标按下
    onMousedown(e) {
        if (e.button === 0) {
            this.x = e.clientX - this.transSet.x; // 图片初始位置
            this.y = e.clientY - this.transSet.y; // 图片初始位置

            window.addEventListener('mousemove', this.onMousemove);
            window.addEventListener('mouseup', this.onMouseup);
        }
    }

    // 鼠标拖动
    onMousemove(e) {
        this.moveSet.x = countNum(e.clientX, this.x, 'sub', 2); // x向移动距离
        this.moveSet.y = countNum(e.clientY, this.y, 'sub', 2); // y向移动距离

        this.paint();
    }

    // 鼠标抬起
    onMouseup() {
        window.removeEventListener('mousemove', this.onMousemove);
        window.removeEventListener('mouseup', this.onMouseup);
    }

    // 滚轮缩放
    onWheel(e) {
        if (e.deltaY < 0) {
            this.multiple = countNum(this.multiple, 0.1, 'add', 1);
        } else if (e.deltaY >= 0 && Number(this.multiple).toFixed(1) > 0.1) {
            this.multiple = countNum(this.multiple, 0.1, 'sub', 1);
        }
        this.canvas.style.transform = `scale(${this.multiple})`;
    }

    // 设置外层div的宽高
    setShellData(width, height) {
        this.shell.style.width = `${width}px`;
        this.shell.style.height = `${height}px`;
    }

    // 重绘
    draw() {
        if (!this.img) {
            let img = new Image(); // 创建一个<img>元素
            img.src = this.options.imgUrl; // 设置图片源地址
            img.onload = () => {
                this.img = img;
                this.ctx.drawImage(img, 0, 0);
            };
        } else {
            this.ctx.drawImage(this.img, 0, 0);
        }
    }

    // 清除
    clear() {
        this.canvas.width = this.width;
    }

    // 画图
    paint() {
        this.clear();
        const { transX, transY } = this.handleBorder(this.canvas, this.outDom, this.moveSet.x, this.moveSet.y, this.multiple);
        // 缓存偏移量，方便下次移动时计算
        this.transSet.x = transX;
        this.transSet.y = transY;
        this.shell.style.transform = `translate(${transX}px, ${transY}px)`;
        this.draw();
    }

    // 处理边界，使图片不能拖动出边界
    handleBorder = (innerDOM, outerDOM, moveX, moveY, multiple) => {
        let { clientWidth: innerWidth, clientHeight: innerHeight } = innerDOM,
            { clientWidth: outerWidth, clientHeight: outerHeight } = outerDOM,
            transX,
            transY;
        // 图片大于容器时，拖动的边不能超过容器的边
        if (innerWidth * multiple > outerWidth || innerHeight * multiple > outerHeight) {
            if (innerWidth * multiple > outerWidth && innerWidth * multiple > outerHeight) {
                transX = Math.min(Math.max(moveX, outerWidth - (innerWidth * (multiple + 1)) / 2), (innerWidth * (multiple - 1)) / 2);
                transY = Math.min(Math.max(moveY, outerHeight - (innerHeight * (multiple + 1)) / 2), (innerHeight * (multiple - 1)) / 2);
            } else if (innerWidth * multiple > outerWidth && !(innerWidth * multiple > outerHeight)) {
                transX = Math.min(Math.max(moveX, outerWidth - (innerWidth * (multiple + 1)) / 2), (innerWidth * (multiple - 1)) / 2);
                transY = Math.max(Math.min(moveY, outerHeight - (innerHeight * (multiple + 1)) / 2), (innerHeight * (multiple - 1)) / 2);
            } else if (!(innerWidth * multiple > outerWidth) && innerWidth * multiple > outerHeight) {
                transX = Math.max(Math.min(moveX, outerWidth - (innerWidth * (multiple + 1)) / 2), (innerWidth * (multiple - 1)) / 2);
                transY = Math.min(Math.max(moveY, outerHeight - (innerHeight * (multiple + 1)) / 2), (innerHeight * (multiple - 1)) / 2);
            }
        } else {
            // 图片小于容器时，图片不能拖出边框
            transX = Math.max(Math.min(moveX, outerWidth - (innerWidth * (multiple + 1)) / 2), (innerWidth * (multiple - 1)) / 2);
            transY = Math.max(Math.min(moveY, outerHeight - (innerHeight * (multiple + 1)) / 2), (innerHeight * (multiple - 1)) / 2);
        }
        return { transX, transY };
    };
}

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
        const imgUrl = 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100';

        let img = {
            imgUrl,
            width: 466,
            height: 466,
            shellName: 'canvas-shell',
            outDomName: 'img-container',
        };
        let scene = new Scene('canvas', img);
        scene.draw();
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
    },
};
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;

    .img-container {
        width: 300px;
        height: 500px;
        overflow: hidden;
        border: 1px solid black;

        .canvas-shell {
            // width: 300px;
            // height: 700px;
            // overflow: hidden;

            #canvas {
                // transition: transform 0.3s cubic-bezier(0, 0, 0.25, 1) 0s;
                transition: all 0.3s cubic-bezier(0, 0, 0.25, 1) 0s;
            }
        }
    }
}
</style>
