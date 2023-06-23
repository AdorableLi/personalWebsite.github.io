<template>
    <div id="container" class="container">
        <div id="shell" class="shell">
            <canvas id="canvas"></canvas>
        </div>
    </div>
</template>

<script>
import { countNum } from '@/utils/utils';

class Scene {
    x = 0; // 鼠标按下时图片相对浏览器的位置
    y = 0; // 鼠标按下时图片相对浏览器的位置
    delat = 1.1; // 每次放大/缩小的倍数

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
        this.ctx = this.canvas.getContext('2d');
        this.options = options;
        this.canvas.width = options.width;
        this.canvas.height = options.height;

        // 设置包裹canvas的外层div信息
        this.oBox = document.getElementById(options.containerName);

        // 设置最外层容器
        this.oDiv = document.getElementById(options.shellName);

        this.handleShellWidthHeight();

        // 绑定各类事件
        this.oDiv.addEventListener('mousedown', this.mouseDown);
        this.oDiv.addEventListener('wheel', this.zoom);
    }

    // 处理canvas外层的宽高以及canvas的缩放率（324，576为最外层容器固定宽高）
    handleShellWidthHeight = () => {
        let _width = 0,
            _height = 0,
            _multiple = 1;
        _width = 324;
        _multiple = countNum(324, this.options.width, 'div', 6);
        _height = countNum(this.options.height, _multiple, 'mul', 6);
        this.canvas.style.transform = `scale(${_multiple})`;
        this.oDiv.style.width = `${_width}px`;
        this.oDiv.style.height = `${_height}px`;
    };

    // 鼠标按下 获取位置并添加事件监听
    mouseDown = e => {
        let transf = this.getTransform(this.oDiv);
        this.x = e.clientX - transf.transX; // 图片初始位置
        this.y = e.clientY - transf.transY; // 图片初始位置
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
    };

    // 鼠标拖动
    mouseMove = e => {
        // console.log(e);
        let multiple = this.getTransform(this.oDiv).multiple;
        let moveX = e.clientX - this.x; // x向移动距离
        let moveY = e.clientY - this.y; // y向移动距离

        let newTransf = this.limitBorder(this.oDiv, this.oBox, moveX, moveY, multiple);
        // console.log(newTransf);
        this.oDiv.style.transform = `matrix(${multiple}, 0, 0, ${multiple}, ${newTransf.transX}, ${newTransf.transY})`;
    };

    // 鼠标抬起
    mouseUp = () => {
        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('mouseup', this.mouseUp);
    };

    // 鼠标滚轮缩放
    zoom = e => {
        let transf = this.getTransform(this.oDiv);
        if (e.deltaY < 0) {
            transf.multiple *= this.delat; // 放大DELTA倍
        } else if (e.deltaY >= 0 && Number(transf.multiple).toFixed(1) > 1) {
            transf.multiple /= this.delat; // 缩小DELTA倍
        }
        let newTransf = this.limitBorder(this.oDiv, this.oBox, transf.transX, transf.transY, transf.multiple);
        this.oDiv.style.transform = `matrix(${transf.multiple}, 0, 0, ${transf.multiple}, ${newTransf.transX}, ${newTransf.transY})`;
    };

    // 获取dom属性值并取对应值
    getTransform = DOM => {
        let arr = getComputedStyle(DOM).transform.split(',');
        return {
            transX: isNaN(+arr[arr.length - 2]) ? 0 : +arr[arr.length - 2], // 获取translateX
            transY: isNaN(+arr[arr.length - 1].split(')')[0]) ? 0 : +arr[arr.length - 1].split(')')[0], // 获取translateX
            multiple: +arr[3], // 获取图片缩放比例
        };
    };

    /**
     * @description 获取边框限制的transform的x, y偏移量
     * @param {*} innerDOM 内盒子DOM
     * @param {*} outerDOM 边框盒子DOM
     * @param {*} moveX 盒子的x移动距离
     * @param {*} moveY 盒子的y移动距离
     * @param {*} multiple 内盒子的缩放率
     */
    limitBorder = (innerDOM, outerDOM, moveX, moveY, multiple) => {
        let { clientWidth: innerWidth, clientHeight: innerHeight, offsetLeft: innerLeft, offsetTop: innerTop } = innerDOM;
        let { clientWidth: outerWidth, clientHeight: outerHeight } = outerDOM;
        let transX;
        let transY;
        console.log(innerDOM.getBoundingClientRect());
        // console.log(innerWidth, innerHeight, innerLeft, innerTop, outerWidth, outerHeight, moveX, moveY, multiple);
        // 放大的图片超出box时 图片最多拖动到与边框对齐
        // console.log(innerWidth * multiple, outerWidth, innerWidth * multiple, outerHeight);
        if (innerWidth * multiple >= outerWidth || innerHeight * multiple >= outerHeight) {
            // console.log(innerWidth * multiple >= outerWidth, innerWidth * multiple >= outerHeight);
            if (innerWidth * multiple >= outerWidth && innerWidth * multiple >= outerHeight) {
                console.log(111);
                transX = Math.min(Math.max(moveX, outerWidth - (innerWidth * (multiple + 1)) / 2), (innerWidth * (multiple - 1)) / 2);
                transY = Math.min(Math.max(moveY, outerHeight - (innerHeight * (multiple + 1)) / 2), (innerHeight * (multiple - 1)) / 2);
            } else if (innerWidth * multiple >= outerWidth && !(innerWidth * multiple >= outerHeight)) {
                // console.log(222);
                transX = Math.min(Math.max(moveX, outerWidth - (innerWidth * (multiple + 1)) / 2), (innerWidth * (multiple - 1)) / 2);
                transY = Math.max(Math.min(moveY, outerHeight - (innerHeight * (multiple + 1)) / 2), (innerHeight * (multiple - 1)) / 2);
            } else if (!(innerWidth * multiple >= outerWidth) && innerWidth * multiple >= outerHeight) {
                console.log(333);
                transX = Math.max(Math.min(moveX, outerWidth - (innerWidth * (multiple + 1)) / 2), (innerWidth * (multiple - 1)) / 2);
                transY = Math.min(Math.max(moveY, outerHeight - (innerHeight * (multiple + 1)) / 2), (innerHeight * (multiple - 1)) / 2);
            } else {
                console.log(444);
                transX = Math.max(Math.min(moveX, outerWidth - (innerWidth * (multiple + 1)) / 2), (innerWidth * (multiple - 1)) / 2);
                transY = Math.max(Math.min(moveY, outerHeight - (innerHeight * (multiple + 1)) / 2), (innerHeight * (multiple - 1)) / 2);
            }
        } else {
            // 图片小于box大小时 图片不能拖出边框
            console.log(555);
            transX = Math.max(Math.min(moveX, outerWidth - (innerWidth * (multiple + 1)) / 2), (innerWidth * (multiple - 1)) / 2);
            transY = Math.max(Math.min(moveY, outerHeight - (innerHeight * (multiple + 1)) / 2), (innerHeight * (multiple - 1)) / 2);
        }
        return { transX, transY };
    };

    // 重绘
    draw() {
        if (!this.img) {
            let img = new Image(); // 创建一个<img>元素
            img.src = this.options.imgUrl; // 设置图片源地址
            img.onload = () => {
                this.img = img;
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            };
        } else {
            this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

export default {
    name: 'convertImgIntoCanvas',
    data: () => ({}),
    mounted() {
        // const imgUrl = 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100';
        const imgUrl =
            'https://ts1.cn.mm.bing.net/th/id/R-C.d8dfd08893b58d08d74b38ad8870a48d?rik=9KBqff6Rai035Q&riu=http%3a%2f%2fstatic.cntonan.com%2fuploadfile%2f2019%2f0214%2f20190214104244pwm1xxsdikh.jpg&ehk=MOxI2n5nY44gO%2fKsNYWAuEBvcRwSmkRVNb4dTS6Gk%2bY%3d&risl=&pid=ImgRaw&r=0';

        let img = {
            imgUrl,
            // width: 766,
            // height: 766,
            width: 1125,
            height: 2436,
            shellName: 'shell',
            containerName: 'container',
        };
        let scene = new Scene('canvas', img);
        scene.draw();
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    margin: 50px auto;
    width: 324px;
    height: 576px;
    border: 1px solid black;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    .shell {
        transform: translate(0, 0);
        transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1) 0s;

        #canvas {
            transform-origin: left top;
        }
    }
}
</style>
