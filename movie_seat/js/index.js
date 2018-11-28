var selectSeat = {
    selected : 0,
    init : function(){
        this.marquee();
    },
    //拉选框
    marquee : function(){
        var self = this;
        $('.seat_box ul').on('mousedown',function(e){
            var e = e || window.event;
            e.stopPropagation();
            var X = e.clientX - $(this).offset().left;
            var Y = e.clientY - $(this).offset().top;
            // console.log(X,Y)
            $('.seat_box').on('mousemove',function(e){
                var e = e || window.event;
                e.stopPropagation()
                var l = e.clientX - $('.seat_box').offset().left;
                var t = e.clientY - $('.seat_box').offset().top;
                var width = 0;
                var height = 0;
                if ((l - X) < 0 && (t - Y) > 0){
                    width = Math.abs(l - X);
                    height = Math.abs(t - Y);
                    $('.select').css({ 'width': width + 'px', 'height': height + 'px', 'left': l, 'top': Y });
                    self.checkSeat(l,Y,width,height);
                } else if ((l - X) > 0 && (t - Y) < 0){
                    width = Math.abs(l - X);
                    height = Math.abs(t - Y);
                    $('.select').css({ 'width': width + 'px', 'height': height + 'px', 'left': X, 'top': t });
                    self.checkSeat(X, t, width, height);
                } else if ((l - X) < 0 && (t - Y) < 0) {
                    width = Math.abs(l - X);
                    height = Math.abs(t - Y);
                    $('.select').css({ 'width': width + 'px', 'height': height + 'px', 'left': l, 'top': t });
                    self.checkSeat(l, t, width, height);
                }else{
                    width = l - X;
                    height = t - Y;
                    $('.select').css({ 'width': width + 'px', 'height': height + 'px', 'left': X, 'top': Y });
                    self.checkSeat(X, Y, width, height);
                }
            })
            $('.seat_box').on('mouseup',function(){
                $(this).off('mousemove');
                $(this).off('mouseup');
                // console.log(1)
            })
            //鼠标离开seat_box元素，取消mousemove和mouseup事件
            $('.seat_box').on('mouseenter', function () {
                // console.log("leave")
                $(this).off('mousemove');
                $(this).off('mouseup');
            })
        })
    },
    //通过选框筛选
    checkSeat : function(left,top,width,height){
        var self = this;
        var l = 0;
        var t = 0;
        var count = 0;
        for(var i = 0;i < $('.seats').length;i++){
            l = $('.seats')[i].offsetLeft;
            t = $('.seats')[i].offsetTop; 
            // console.log(l)
            //去掉上次选中的座位
            if ($('.seats')[i].classList.contains('seatsed')) {
                $('.seats')[i].classList.remove('seatsed');
                $('.seats')[i].classList.add('seats');
            }
            if ((l >= left && l <= (left + width) - 42) && (t >= top && t <= (top + height) - 42)){
                $('.seats')[i].classList.add('seatsed');
                count++;
           }
            self.changeNum(count);
        }
    },
    //改变数组
    changeNum : function(num){
        $('.info p span').html(num);
    }
}


selectSeat.init();