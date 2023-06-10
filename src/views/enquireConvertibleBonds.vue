<template>
    <div class="container">{{ text }}</div>
</template>

<script>
export default {
    name: 'enquireConvertibleBonds',
    data: () => ({
        text: '',
        url: 'https://eq.10jqka.com.cn/mobileuserinfo/app/purchaseIcloud/data/newBondList.json',
    }),
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.queryData(this.url).then(resp => {
                let res = JSON.parse(resp);
                if (res.length) {
                    let names = '';
                    res.forEach(el => {
                        names = `${names}${el.name} `;
                    });
                    this.text = `今天有${res.length}只，分别是${names}`;
                } else {
                    this.text = '今天没有，滚回去打工';
                }
            });
        },
        queryData(url) {
            //  #   1.1 创建一个Promise实例
            var p = new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState != 4) return;
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        // # 1.2 处理正常的情况
                        resolve(xhr.responseText);
                    } else {
                        // # 1.3 处理异常情况
                        reject('服务器错误');
                    }
                };
                xhr.open('get', url);
                xhr.send(null);
            });
            return p;
        },
    },
};
</script>

<style scoped>
body {
    overflow: hidden;
}

.container {
    width: 100vw;
    height: 100vh;
    line-height: 100vh;
    text-align: center;
}
</style>
