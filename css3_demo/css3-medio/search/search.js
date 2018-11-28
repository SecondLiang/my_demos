


(function ($) {
    function Swiper(option) {
        this.opt = option || {};
        this.warp = this.opt.father;  //600
        // this.dataArr = this.opt.dataArr;  
        this.iptW = this.opt.iptBoxWidth; //520
        // this.btnW = this.opt.btnBoxWidth;   //80
        this.searH = this.opt.searchBoxHeight;  //36
        this.iptPlace = this.opt.iptPlacehodler;
        this.btnText = this.opt.btnText;
        this.btnC = this.opt.btnC;
        //ajax参数部分
        this.url = this.opt.url;
        this.type = this.opt.type;
        this.dataType = this.opt.dataType;
        this.name1 = this.opt.name1;
        this.name2 = this.opt.name2;
        this.count = this.opt.count;
        this.succFn = this.opt.succFn;
        this.errFn = this.opt.errFn;
        // this.dataArr = 123;
        this.timer = null;
        this.init();
    }
    Swiper.prototype.init = function () {
        // this.getData();
        this.createDom();
        this.bindEvent();
    }
    Swiper.prototype.createDom = function () {
        var search_form = $('<div class="search_form"></div>');
        search_form.css('height', this.searH + 'px');
        var ipt_box = $('<div class="ipt_box"></div>');
        ipt_box.css('width', this.iptW + 'px');
        var ipt = '<input type="text" placeholder=' + this.iptPlace + '>'
        ipt_box.html(ipt);
        var btn_box = $('<div class="btn_box"></div>');
        btn_box.css('width', this.warp.width() - this.iptW + 'px');
        var a = '<a href="javascript:void(0)">'+ this.btnText +'</a>';
        btn_box.html(a);
        search_form.append(ipt_box).append(btn_box);
        btn_box.find('a').css('backgroundColor',this.btnC);
        var hover_list = $('<div class="hover_list"></div>');
        var search_cot = $('<ul class="search_cot"></ul>');
        hover_list.append(search_cot);
        hover_list.css('width', this.iptW + 'px');
        $('#search_swiper').append(search_form).append(hover_list);

        $('#search_swiper .hover_list .search_cot li').css('width', this.searH + 'px');
        $('#search_swiper .hover_list .search_cot li a .info_img').css({ 'width': this.searH + 'px', 'height': this.searH + 'px' });
        $('#search_swiper .hover_list .search_cot li a .info_dec').css('width', (this.iptW - this.searH - 15) + 'px');
        $('#search_swiper .hover_list .search_cot li a .info_dec > p > .info_span').css('line-height', this.searH + 'px');
    }
    
    //获取数据
    Swiper.prototype.getData = function (val) {
        var self = this;
        var dataArr;
        $.ajax({
            type: self.type,
            url: self.url + '?' + self.name1 + val + self.name2 + self.count,
            dataType : 'jsonp',
            async: false,
            cache: false,
            success : function(data){
               self.succFn(data);
            },
            error : function(){
                self.errFn();
            }
        })
    }

    //数据展示和防抖处理
    Swiper.prototype.antishake = function (){
        var self = this;
        return function(){
            clearInterval(self.timer);
            self.timer = setInterval(function () {
                var val = $('#search_swiper input').val();
                self.getData(val);
                clearInterval(self.timer);
            }, 500);
        }
    }
    //input 绑定监听事件
    Swiper.prototype.bindEvent = function (){
        var self = this;
        $('#search_swiper input').on('input', self.antishake());
    }
    $.fn.extend({
        searchplugIns: function (option) {
            option.father = $(this) || $('body');
            new Swiper(option);
        }
    })
})(jQuery);