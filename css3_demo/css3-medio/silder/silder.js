
(function ($) {
    function Swiper(option) {
        //容错
        this.opt = option || {};
        //获取轮播图展示的区域 
        this.warp = this.opt.container;
        //获取图片数组
        this.imgArr = this.opt.imgArr;
        //获取图片数组的索引长度
        this.len = this.imgArr.length - 1;
        this.imgIndex = 0;
        this.imgWidth = this.warp.width(); //图片宽度
        this.imgHeight = this.warp.height();
        this.timer = null;
        this.flag = true;
        //入口函数
        this.init();
    }
    Swiper.prototype.init = function () {
        
        this.creatDom();
        this.bindEvent();
        this.bannerAuto();
    }
    Swiper.prototype.creatDom = function () {
        var img_box = $('<div class = "img_box"></div>');
        var img_list = $('<ul class = "img_list"></ul>')
        img_list.css('width', this.imgWidth * this.imgArr.length + 'px');
        var nav_box = $('<div class = "nav_box"></div>');
        var nav_list = $('<ul class = "nav_list"></ul>')
        var prev = $('<div class = "prev">&lt;</div>');
        var next = $('<div class = "next">&gt;</div>');
        var imgLi = '';
        var navLi = '';
        for (var i = 0; i < this.len; i++) {
            imgLi += '<li><a href="javascript:void(0)"><img src=' + this.imgArr[i] + ' alt=""></a></li>';
            navLi += '<li></li>';
        }
        imgLi += '<li><a href="javascript:void(0)"><img src=' + this.imgArr[0] + ' alt=""></a></li>';
        $(img_list).html(imgLi);
        $(nav_list).html(navLi);
        $('#silder').append(img_box.append(img_list)).append($(prev)).append($(next)).append(nav_box.append(nav_list));
        $('#silder > .nav_box > .nav_list > li').eq(0).addClass('active');
        $('#silder .img_list li').css('width', parseInt(img_list.width())/this.imgArr.length +'px');
        // $('#silder .img_box').css('overflow','hidden');
        $('#silder > .img_box > .img_list > li> a > img').css({'width':this.imgWidth + 'px','height':this.imgHeight + 'px'});
        console.log(1);
    }
    //点击事件函数
    Swiper.prototype.bindEvent = function () {
        var self = this;
        $('.nav_list li').add('.prev').add('.next').on('click', function () {
            clearInterval(self.timer);
            if ($(this).attr('class') == 'prev' || $(this).attr('class') == 'next') {
                if ($(this).attr('class') == 'prev') {
                    self.move('prev');
                    self.changeStyle();
                } else {
                    self.move('next');
                    self.changeStyle();
                }
            } else {
                self.move($(this).index());
                self.changeStyle();
            }
        })
        this.warp.on('mouseenter', function () {
            clearInterval(self.timer);
            $('.prev').add('.next').show();
        }).on('mouseleave', function () {
            self.bannerAuto();
            $('.prev').add('.next').hide();
        })
    }
    // 移动的函数
    Swiper.prototype.move = function (stamp) {
        var self = this;
        var len = this.len;
        var imgWidth = this.imgWidth;
        if (self.flag) {
            self.flag = false;
            if (stamp == 'prev') {
                if (self.imgIndex == 0) {
                    $('.img_list').css('left', -(len * imgWidth) + 'px');
                    self.imgIndex = len - 1;
                    self.banner();
                } else {
                    self.imgIndex--;
                    self.banner();
                }
            } else if (stamp == 'next') {
                if (self.imgIndex == len - 1) {
                    $('.img_list').animate({ 'left': (-len * imgWidth) + 'px' }, 800, function () {
                        $('.img_list').css('left', 0 + 'px');
                        self.bannerAuto();
                        self.flag = true;
                    });
                    self.imgIndex = 0;
                } else {
                    self.imgIndex++;
                    self.banner();
                }
            } else {
                self.imgIndex = stamp;
                self.banner();
            }
        }
    }
    Swiper.prototype.banner = function () {
        var self = this;
        $('.img_list').animate({ 'left': -self.imgIndex * self.imgWidth + 'px' }, 800,function(){
            self.bannerAuto();
            self.flag = true;
        });
    }
    Swiper.prototype.changeStyle = function () {
        var self = this;
        $('#silder > .nav_box > .nav_list > li.active').removeClass('active');
        $('#silder > .nav_box > .nav_list > li').eq(self.imgIndex).addClass('active');
    }
    //自动轮播函数
    Swiper.prototype.bannerAuto = function () {
        var self = this;
        clearInterval(self.timer);
        self.timer = setInterval(function () {
            self.move('next');
            self.changeStyle();
        }, 1000);
    }
    $.fn.extend({
        silderImg: function (option) {
            option.container = $(this) || $('body');
            new Swiper(option);
        }
    });
})(jQuery);
