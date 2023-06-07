// 计算加减乘除并且获得指定位数的小数（解决浮点数问题，使用时需要将数据转为Number类型）
export function countNum(aaa, bbb, op, fixed) {
    let new_num = String(operation(Number(aaa), Number(bbb), op).toFixed(fixed + 1)),
        result = Number(new_num.slice(0, new_num.length - 1));
    return result;
}

export function isInteger(obj) {
    return Math.floor(obj) === obj;
}

export function toInteger(floatNum) {
    var ret = { times: 1, num: 0 };
    //是整数
    if (isInteger(floatNum)) {
        ret.num = floatNum;
        return ret;
    }
    var strfi = floatNum + '';
    //查找小数点的下标
    var dotPos = strfi.indexOf('.');
    //获取小数的位数
    var len = strfi.substr(dotPos + 1).length;
    //Math.pow(10,len)指定10的len次幂。
    var time = Math.pow(10, len);
    //将浮点数转化为整数
    var intNum = parseInt(floatNum * time + 0.5, 10);
    ret.times = time;
    ret.num = intNum;
    return ret;
}

export function operation(aaa, bbb, op) {
    var o1 = toInteger(aaa);
    var o2 = toInteger(bbb);
    var n1 = o1.num;
    var n2 = o2.num;
    var t1 = o1.times;
    var t2 = o2.times;
    var max = t1 > t2 ? t1 : t2;
    var result = null;
    switch (op) {
        case 'add':
            if (t1 === t2) {
                result = n1 + n2;
            } else if (t1 > t2) {
                result = n1 + n2 * (t1 / t2);
            } else {
                result = n1 * (t2 / t1) + n2;
            }
            return result / max;
            break;
        case 'sub':
            if (t1 === t2) {
                result = n1 - n2;
            } else if (t1 > t2) {
                result = n1 - n2 * (t1 / t2);
            } else {
                result = n1 * (t2 / t1) - n2;
            }
            return result / max;
            break;
        case 'mul':
            result = (n1 * n2) / (t1 * t2);
            return result;
            break;
        case 'div':
            result = n1 / n2 / (t1 / t2);
            return result;
            break;
    }
}
