<template>
    <div class="container">
        <!-- <h1>JavaScript读取和导出excel示例（基于js-xlsx）</h1>
		<div>
			<a href="http://blog.haoji.me/js-excel.html" _target="_blank">如何使用JavaScript实现纯前端读取和导出excel文件</a><br>
			<a href="http://demo.haoji.me/2017/02/08-js-xlsx/">在线演示</a><br>
			<a href="http://oss.sheetjs.com/js-xlsx/">官网演示</a><br>
			<a href="https://github.com/SheetJS/js-xlsx/">Github</a>
		</div>
 -->
        <h2>读取excel（仅读取第一个sheet）</h2>

        <div v-show="!areaSign">
            <div>请选择区域</div>
            <div class="button-item">
                <div class="button" v-for="item in areaSignArr" :key="item.label" @click="chooseArea(item.label)">{{ item.name }}</div>
            </div>
        </div>
        <div v-show="areaSign">
            <div class="mt-sm">
                <input type="file" id="file" style="display: none" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                <!-- <a href="javascript:selectFile()">加载本地excel文件</a> -->
                <!-- <a href="javascript:loadRemoteFile(&#39;./sample/sample.xlsx&#39;)">加载远程excel文件</a> -->
            </div>

            <!-- <div>结果输出：（下面表格可直接编辑导出）</div> -->

            <!-- 上面读取的表格您可以直接编辑，编辑后点击保存即可导出excel文件。 -->
            <!-- <div class="mt-sm" style="padding-bottom: 40px">
            <input type="button" @click="exportExcel()" value="保存" />
        </div> -->

            <!-- <div id="result" contenteditable=""></div> -->

            <div class="button-item">
                <div class="button" @click="selectFile">加载本地excel文件</div>
                <div class="button" @click="exportExcel1()">导出excel</div>
            </div>

            <div id="result" contenteditable="false"></div>
        </div>

        <!-- <h2>导出带单元格合并的excel</h2>
		<input type="button" value="导出" onclick="exportSpecialExcel()"> -->
    </div>
</template>

<script>
// import xlsx from '../../public/js/xlsx.core.min.js';
import * as XLSX from 'xlsx';
import { countNum } from '@/utils/utils';

const AREA_OBJ = {
    1: [
        2413, 3610, 3593, 3582, 3771, 3440, 3693, 3554, 3541, 3733, 3694, 3696, 3568, 3533, 3583, 3761, 3623, 3603, 3446, 3717, 3701, 3510, 3575, 3605, 3721, 3704, 3687, 3734,
        3625, 3616, 2387, 3735, 3776, 3751, 3576, 3531, 3607, 3755, 3557, 3719, 3786, 3772, 3609,
    ], // 华中 瑶
    2: [
        3516, 2439, 3515, 3523, 3539, 3642, 3514, 3558, 3538, 3549, 3537, 3518, 3581, 3517, 3507, 2421, 3692, 3572, 2422, 2415, 3536, 3580, 3528, 3634, 3742, 3521, 2391, 3713,
        3563, 3635, 3740, 3728, 3569, 3546, 3685, 3718, 3741, 3750, 3727, 3726, 3667, 3730, 3633, 3632, 3736, 3756, 3757, 3766, 3781, 3778, 3783,
    ], // 华南 桂
}; // 区域列表

export default {
    name: 'handleDAUData',
    components: {},
    data: () => ({
        resultExeclData: [], // 表格数据
        areaSign: '', // 用户选中的区域标识
        areaSignArr: [
            {
                label: 1,
                name: '华中',
            },
            {
                label: 2,
                name: '华南',
            },
        ], // 标识列表
    }),
    computed: {},
    mounted() {},
    methods: {
        initExecl() {
            let that = this;
            document.getElementById('file').addEventListener('change', function (e) {
                var files = e.target.files;
                if (files.length == 0) return;
                var f = files[0];
                if (!/\.xlsx$/g.test(f.name)) {
                    alert('仅支持读取xlsx格式！');
                    return;
                }
                that.readWorkbookFromLocalFile(f, function (workbook) {
                    that.readWorkbook(workbook);
                });
            });
            // this.loadRemoteFile('./sample/test.xlsx');
        },
        // 选择区域标识
        chooseArea(e) {
            this.areaSign = e;
            this.initExecl();
        },
        selectFile() {
            document.getElementById('file').click();
        },

        // 读取本地excel文件
        readWorkbookFromLocalFile(file, callback) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, { type: 'binary' });
                if (callback) callback(workbook);
            };
            reader.readAsBinaryString(file);
        },

        // 从网络上读取某个excel文件，url必须同域，否则报错
        readWorkbookFromRemoteFile(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function () {
                if (xhr.status == 200) {
                    var data = new Uint8Array(xhr.response);
                    var workbook = XLSX.read(data, { type: 'array' });
                    if (callback) callback(workbook);
                }
            };
            xhr.send();
        },

        // 读取 excel文件
        outputWorkbook(workbook) {
            var sheetNames = workbook.SheetNames; // 工作表名称集合
            sheetNames.forEach(name => {
                var worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
                for (var key in worksheet) {
                    // v是读取单元格的原始值
                    console.log(key, key[0] === '!' ? worksheet[key] : worksheet[key].v);
                }
            });
        },

        readWorkbook(workbook) {
            var sheetNames = workbook.SheetNames; // 工作表名称集合
            var worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
            var csv = XLSX.utils.sheet_to_csv(worksheet);
            document.getElementById('result').innerHTML = this.csv2table(csv);
        },

        // 处理所需列的对照对象
        handleColumnData(arr, idx) {
            let _result = [idx, arr[2], arr[3], arr[5], arr[7]];
            let _orderNum = countNum(arr[21], arr[27], 'add', 2);
            _result.push(Number(_orderNum));
            let _orderPrice = countNum(arr[22], arr[28], 'add', 2);
            _result.push(_orderPrice);
            if (idx === 0) {
                _result[5] = '订单总数';
                _result[6] = '销售总额';
            }
            return _result;
        },

        // 将行数据排序
        sortRows(rows) {
            const _sortMallArr = AREA_OBJ[this.areaSign];
            let _rowsObj = new Map();
            for (let i = 0; i < rows.length; i++) {
                let columns = rows[i].split(',');
                columns.unshift(i + 1); // 添加行索引
                columns = this.handleColumnData(columns, i);
                if (i == 0) {
                    _rowsObj.set('title', columns);
                } else {
                    _rowsObj.set(columns[1], columns);
                }
            }
            let _sortedArr = [_rowsObj.get('title')];
            for (let i = 0; i < Math.round(_sortMallArr.length + 1); i++) {
                _sortedArr.push(_rowsObj.get(String(_sortMallArr[i])));
            }
            return _sortedArr;
        },

        // 将csv转换成表格
        csv2table(csv) {
            let html = '<table>';
            let rows = csv.split('\n');
            rows = this.sortRows(rows);
            rows.pop(); // 最后一行没用的
            this.resultExeclData = rows;
            rows.forEach(function (row, idx) {
                if (idx == 0) {
                    // 添加列索引
                    html += '<tr>';
                    for (var i = 0; i < row.length; i++) {
                        html += '<th>' + (i == 0 ? '' : String.fromCharCode(65 + i - 1)) + '</th>';
                    }
                    html += '</tr>';
                }
                if (row) {
                    html += '<tr>';
                    row.forEach(function (column) {
                        html += '<td>' + column + '</td>';
                    });
                    html += '</tr>';
                }
            });
            html += '</table>';
            return html;
        },

        table2csv(table) {
            var csv = [];
            table.getElementsByTagName('tr').each(function () {
                var temp = [];
                document
                    .getElementsByTagName(this)
                    .getElementsByTagName('td')
                    .each(function () {
                        temp.push(document.querySelector(this).html());
                    });
                temp.shift(); // 移除第一个
                csv.push(temp.join(','));
            });
            csv.shift();
            return csv.join('\n');
        },

        // csv转sheet对象
        csv2sheet(csv) {
            var sheet = {}; // 将要生成的sheet
            csv = csv.split('\n');
            csv.forEach(function (row, i) {
                row = row.split(',');
                if (i == 0) sheet['!ref'] = 'A1:' + String.fromCharCode(65 + row.length) + csv.length;
                row.forEach(function (col, j) {
                    sheet[String.fromCharCode(65 + j) + (i + 1)] = { v: col };
                });
            });
            return sheet;
        },

        // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
        sheet2blob(sheet, sheetName) {
            sheetName = sheetName || 'sheet1';
            var workbook = {
                SheetNames: [sheetName],
                Sheets: {},
            };
            workbook.Sheets[sheetName] = sheet;
            // 生成excel的配置项
            var wopts = {
                bookType: 'xlsx', // 要生成的文件类型
                bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
                type: 'binary',
            };
            var wbout = XLSX.write(workbook, wopts);
            var blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
            // 字符串转ArrayBuffer
            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
                return buf;
            }
            return blob;
        },

        /**
         * 通用的打开下载对话框方法，没有测试过具体兼容性
         * @param url 下载地址，也可以是一个blob对象，必选
         * @param saveName 保存文件名，可选
         */
        openDownloadDialog(url, saveName) {
            if (typeof url == 'object' && url instanceof Blob) {
                url = URL.createObjectURL(url); // 创建blob地址
            }
            var aLink = document.createElement('a');
            aLink.href = url;
            aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
            var event;
            if (window.MouseEvent) event = new MouseEvent('click');
            else {
                event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            }
            aLink.dispatchEvent(event);
        },
        loadRemoteFile(url) {
            this.readWorkbookFromRemoteFile(url, function (workbook) {
                this.readWorkbook(workbook);
            });
        },

        exportExcel() {
            var csv = this.table2csv(document.getElementById('result').getElementsByTagName('table')[0]);
            var sheet = this.csv2sheet(csv);
            var blob = this.sheet2blob(sheet);
            this.openDownloadDialog(blob, '导出.xlsx');
        },

        exportExcel1() {
            let sheet = XLSX.utils.aoa_to_sheet(this.resultExeclData);
            this.openDownloadDialog(this.sheet2blob(sheet), '导出.xlsx');
        },

        exportSpecialExcel() {
            var aoa = [
                ['主要信息', null, null, '其它信息'], // 特别注意合并的地方后面预留2个null
                ['姓名', '性别', '年龄', '注册时间'],
                ['张三', '男', 18, new Date()],
                ['李四', '女', 22, new Date()],
            ];
            var sheet = XLSX.utils.aoa_to_sheet(aoa);
            sheet['!merges'] = [
                // 设置A1-C1的单元格合并
                { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
            ];
            this.openDownloadDialog(this.sheet2blob(sheet), '单元格合并示例.xlsx');
        },
    },
};
</script>

<style scoped>
table {
    border-collapse: collapse;
}
th,
td {
    border: solid 1px #6d6d6d;
    padding: 5px 10px;
}
.mt-sm {
    margin-top: 8px;
}
body {
    background: #f4f4f4;
    padding: 0;
    margin: 0;
}
.container {
    width: 1024px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    min-height: 100vh;
}

.container > div,
.container > h2 {
    width: fit-content;
}

.button-item {
    display: flex;
    flex-direction: row;
}
.button-item > div:nth-child(1) {
    margin-right: 20px;
}

.button {
    padding: 4px 10px;
    color: white;
    background: #017dff;
    cursor: pointer;
    border-radius: 5px;
    font-size: 13px;
    font-weight: bolder;
}
</style>
