// 返回滚动条滚动距离对象
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            X: window.pageXOffset,
            Y: window.pageYOffset
        }
    } else {
        return {
            X: document.body.scrollLeft + document.documentElement.scrollLeft,
            Y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}
//获取视口宽高
function getViewportOffset() {
    if (0 && window.innerWidth) {
        return {
            // w3c 标准方法
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        if (document.compatMode == "Backcompat") {
            return {
                //在混杂模式下，所有浏览器都适用
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        } else {
            return {
                //IE8及其以下
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
    }
}

//封装一个取元素样式的函数
//传两个参数，ele：元素对象，prop：元素的对象样式属性
function getStyle(ele, prop) {
    if (window.getComputedStyle) {
        //window.getComputedStyle(a,b) 第二个参数是ele这个元素的伪元素（::after,::before,::first-letter,::first-line）
        return window.getComputedStyle(ele, null)[prop];
    } else {
        return ele.currentStyle[prop];
    }
}

//封装一个兼容性好的绑定事件函数的方法
function addEvent(ele, type, handle) {
    if (ele.addEventListener) {
        ele.addEventListener(type, handle, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, function() {
            handle.call(ele);
        });
    } else {
        ele['on' + type] = handle;
    }
}

//封装一个解除事件函数的方法
function removeEvent(ele, type, handle) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, handle, false);
    } else if (ele.detachEvent) {
        ele.detachEvent('on' + type, function() {
            handle.call(ele);
        });
    } else {
        ele['on' + type] = null;
    }
}

//封装一个阻止冒泡的函数
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

//封装一个阻止默认事件的函数
function cancelHandle(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

//封装一个拖拽的方法
function drag(ele) {
    var disX,
        disY;
    addEvent(ele, 'mousedown', function(e) {
        var event = e || window.event;
        disX = event.pageX - parseInt(getStyle(ele, 'left'));
        disY = event.pageY - parseInt(getStyle(ele, 'top'));
        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        stopBubble(event); //阻止冒泡   
        cancelHandle(event); //阻止默认事件
    });

    function mouseMove(e) {
        var event = e || window.event;
        ele.style.left = event.pageX - disX + 'px';
        ele.style.top = event.pageY - disY + 'px';
    }

    function mouseUp() {
        removeEvent(document, 'mousemove', mouseMove); //解除绑定的事件函数
        removeEvent(document, 'mouseup', mouseUp); //解除绑定的事件函数
    }
}
//多值链式运动
function startMove(obj,objAttr,callback ){
            var speed,
                icur;
            obj.timer = setInterval(function(){
                var flag = true; 
                for (var attr in objAttr) {
                    //判断属性是哪个
                    if(attr == 'opacity'){
                        icur = parseFloat(getStyle(obj,'opacity')) * 100;
                    }else{
                        icur = parseInt(getStyle(obj, attr));
                    }
                    speed = (objAttr[attr] - icur) / 7;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    //先让每一个属性走
                    if(attr == 'opacity'){
                        console.log(1);
                        obj.style.opacity = (icur + speed) / 100;
                    }else{
                        obj.style[attr] = icur + speed + 'px';
                    }
                    //如果元素属性值和目标值不相等，那么就不让停，flag就是false
                    if(icur != objAttr[attr]){
                        flag = false;
                    }
                }
                //一旦元素属性值和目标值相等，就停掉计时器
                if(flag){
                    clearInterval(obj.timer);
                    typeof callback == 'function' ? callback() : '';
                }
            },30);
        }