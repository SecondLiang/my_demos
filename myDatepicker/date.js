

(function () {
    var datepicker = {};
    var selfDatepickerWarp;
    var ipt;
    var s_month;
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    // 取日期
    datepicker.getMonthData = function (year, month) {
        if (!year || !month) {
            year = new Date().getFullYear();
            month = new Date().getMonth() + 1;
        }
        var monthData = [];
        // 获取year年month月的第一天
        var firstDay = new Date(year, month - 1, 1);
        // 获取第一天是周几
        var weekNum = firstDay.getDay();
        if (weekNum === 0) {
            weekNum = 7;
        }
        var lastMonthCount = weekNum - 1;  //当日前面有几个上月的日期
        // 获取year年month月的最后一天
        var lastDay = new Date(year, month, 0);
        //获取year年month月总计有多少天
        var countDay = lastDay.getDate();
        // 获取上月的最后一天
        var prevMonthLastDay = new Date(year, month - 2, 0).getDate();

        // 要知：1、上个月的日期有几天 => 通过这个月第一天是星期几 - 1来得出
        //      2、上个月的最后一天是几号
        //      3、这个月总共有几天 => 本月最后一天(下个月的第0天) => getDate()
        // 一般一个月有4-6个星期，按照最长6个月来算
        for (var i = 0; i < 7 * 6; i++) {
            // 求一个对比值，这值如果在上个月的日期里，它是负的，否则为正
            var date = i - lastMonthCount + 1;
            // 设置默认的日期和月
            var showDate = date;
            var showMonth = month;
            // 如果为负数
            if (date <= 0) {
                // 上个月的最后一天递减，并且月份是当月-1
                showDate = (date + prevMonthLastDay) + '';  //不是本月的日期做个标记,把date值的类型隐性转成string类型
                showMonth = month - 1;
            } else if (date > countDay) {
                // 如果为正数，并且大于本月最后一天，那么就是下个月的日期了，日期值是它们的差值（从1开始），月份为本月+1
                showDate = (date - countDay) + ''; //不是本月的日期做个标记
                showMonth = month + 1;
            }
            monthData.push({
                date: showDate
            })
        }
        return {
            year: year,
            month: showMonth,
            monthData: monthData
        };
    }
    // 渲染
    datepicker.randerDom = function () {
        function format(num) {
            if (num < 10) {
                s_month = '0' + month;
            } else {
                s_month = month;
            }
        }
        format(month);
        // console.log(this); //this => datepicker
        var monthObj = this.getMonthData(year, month);
        var str = `<div class="self-datepicker-head">
            <a href="javascript:void(0)" class="self-datepicker-btn self-datepicker-preve">&lt;</a>
            <a href="javascript:void(0)" class="self-datepicker-btn self-datepicker-next">&gt;</a>
            <span class="self-datepicker-show">${year}-${s_month}</span>
        </div>
        <div class="self-datepicker-body">
            <table>
                <thead>
                    <tr>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                        <th>日</th>
                    </tr>
                </thead>
                <tbody>`;
        var today = new Date().getDate();
        // console.log(today);
        monthObj.monthData.forEach(function (item, index, arr) {
            index += 1;
            if (index % 7 == 1) {
                str += `<tr>\n`;
            }
            if (typeof (item.date) == 'number') {
                if (item.date == today && monthObj.year == new Date().getFullYear() && (monthObj.month - 1) == (new Date().getMonth() + 1)) {
                    str += `<td date-date='${item.date}' class='self-datepicker-hideDate self-datepicker-today'>${item.date}</td>\n`;
                } else {
                    str += `<td date-date='${item.date}' class='self-datepicker-showDate'>${item.date}</td>\n`;
                }
            } else {
                str += `<td date-date='${item.date}' class='self-datepicker-hideDate'>${item.date}</td>\n`;

            }

            if (index % 7 == 0) {
                str += `</tr>\n`;
            }
            if (index == arr.length) {
                str += `</tbody>
                    </table>
                </div>`;
            }
        })
        selfDatepickerWarp = document.getElementsByClassName('self-datepicker-warp')[0];
        selfDatepickerWarp.innerHTML = str;
    }
    // 事件处理函数方法
    datepicker.bindEvent = function () {

        var selfDatepickerHead = document.getElementsByClassName('self-datepicker-head')[0];
        var seleDatepickerBody = document.getElementsByClassName('self-datepicker-body')[0];
        // console.log(selfDatepickerHead);
        var self = this;
        selfDatepickerHead.onclick = function (e) {
            // 兼容ie
            var e = e || window.event;
            var target = e.target || e.srcElement;
            // console.log(target.tagName.toLowerCase());
            if (target.tagName.toLowerCase() == 'a') {
                if (target.className == 'self-datepicker-btn self-datepicker-preve') {
                    month--;
                    if (month < 1) {
                        month = 12;
                        year--;
                    }
                    self.randerDom();
                    self.bindEvent();
                } else if (target.className == 'self-datepicker-btn self-datepicker-next') {
                    month++;
                    if (month > 12) {
                        month = 1;
                        year++;
                    }
                    self.randerDom();
                    self.bindEvent();
                }
            }else{
                selfDatepickerWarp.style.display = 'none';
                ipt.value = '';
            }
        }
        var td,
            s_td;
        function format(num) {

            if (num < 10) {
                s_td = '0' + td;
            } else {
                s_td = td;
            }
        }
        seleDatepickerBody.onclick = function (e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.tagName.toLowerCase() == 'td') {
                td = target.innerText;
                format(td);
                ipt.value = year + '-' + s_month + '-' + s_td;
                selfDatepickerWarp.style.display = 'none';
            }
        }
    }
    // 初始化 入口 方法
    datepicker.init = function (className) {
        ipt = document.getElementsByClassName(className)[0];
        // 设置日历的位置
        var left = ipt.offsetLeft;
        var top = ipt.offsetTop;
        var width = ipt.offsetWidth;
        var height = ipt.offsetHeight;
        selfDatepickerWarp = document.createElement('div');
        selfDatepickerWarp.className = 'self-datepicker-warp';
        document.body.appendChild(selfDatepickerWarp);
        
        selfDatepickerWarp.style.width = width + 'px';
        selfDatepickerWarp.style.left = left + 'px';
        selfDatepickerWarp.style.top = top + height + 'px';

        ipt.onfocus = function () {
            selfDatepickerWarp.style.display = 'block';
        }
        this.randerDom();
        this.bindEvent();
    }

    window.datepicker = datepicker;
})()