


(function ($) {
    function Swiper(option) {
        this.opt = option || {};
        this.warp = this.opt.father;  //600
        this.dataArr = this.opt.searchData;  
        this.iptW = this.opt.iptBoxWidth; //520
        // this.btnW = this.opt.btnBoxWidth;   //80
        this.searH = this.opt.searchBoxHeight;  //36
        this.iptPlace = this.opt.iptPlacehodler;
        this.btnText = this.opt.btnText;
        this.btnB = this.opt.btnB;
        this.timer = null;
        this.init();
    }
    Swiper.prototype.init = function () {
        // console.log(this.warp.width())
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
        // console.log(this.btnW);
        var a = '<a href="javascript:void(0)">'+ this.btnText +'</a>';
        btn_box.html(a);
        search_form.append(ipt_box).append(btn_box);
        btn_box.find('a').css('backgroundColor',this.btnB);
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
    //防抖处理
    Swiper.prototype.antishake = function(e){
        var e = e || window.event;
        e.preventDefault(); //阻止默认事件
        var newArr;
        var strLi;
        var self = this;
        return function(){
            clearInterval(self.timer);
            self.timer = setInterval(function () {
                    strLi = '';
                    newArr = [];
                    // self.dataArr.filter(function (ele, index) {
                    //     if (ele.name.indexOf($('#search_swiper input').val()) !== -1 || ele.lable.indexOf($('#search_swiper input').val()) > 0) {
                    //         newArr.push(ele);
                    //     }
                    // })
                    var strLi;
                    // if (newArr) {
                        newArr.forEach(function (ele, index) {
                            if ($('#search_swiper input').val() !== '') {
                                $('#search_swiper .hover_list').show();
                                strLi += '<li class="li_list">\
                                            <a href = '+ ele.linkUrl + ' >\
                                                <div class="info_img">\
                                                    <img src='+ ele.imgUrl + ' alt=" " title="logo">\
                                                </div>\
                                                <div class="info_dec">\
                                                    <p>\
                                                        <span class="info_span s_name">'+ ele.name + '<i class="lable" >' + ele.lable + '</i ></span >\
                                                        <span class="info_span s_dec">'+ ele.dec + '</span>\
                                                    </p >\
                                                </div>\
                                            </a>\
                                        </li >';
                            } else {
                                strLi = '';
                                clearInterval(self.timer);
                                $('#search_swiper .hover_list').hide();
                            }
                        });
                    // }
                $('.search_cot').html(strLi);
                clearInterval(self.timer);

                // $('#search_swiper .hover_list .search_cot li').on('mouseenter', function (event) {
                //     $(this).css('backgroundColor','rgb(189, 215, 241)');
                // }).on('mouseleave', function () {
                //     $(this).css('backgroundColor', '#fff');
                // })
            }, 500);
        }
    }
    //input 绑定监听事件
    Swiper.prototype.bindEvent = function(){
        var self = this;
        $('#search_swiper input').on('input',self.antishake());
    }
    $.fn.extend({
        searchplugIns: function (option) {
            option.father = $(this) || $('body');
            new Swiper(option);
        }
    })
})(jQuery);