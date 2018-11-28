
var demo = {
    init: function () {
        this.index();
        this.login();
    },
    index: function () {
        //点击登陆弹出登陆框
        $('.login_btn').on('click', function (e) {
            cancelHandle(e);//取消a标签的默认事件
            $('.bg').show();
            $('.login_box').show();
        });
        $('.close').on('click', function () {
            $('.login_box').hide();
            $('.bg').hide();
        })
        $('.e_box > .e_w_m').hover(
            function () {
                $('.prompt').css('display', 'inline-block');
                $('.e_box').animate({
                    left: '50px'
                }, 200, function () {
                    //回调函数
                });
            },
            function () {
                $('.e_box').animate({
                    left: '100px'
                }, 200, function () {
                    //回调函数
                    $(this).stop();
                    $('.prompt').css('display', 'none');
                });
            }
        );
    },
    login: function () {
        $('.login_box').on('mousedown', function (e) {
            var e = e || window.event;
            var X = e.clientX - $(this).position().left;
            var Y = e.clientY - $(this).position().top;
            $(document).on('mousemove', function (e) {
                var e = e || window.event;
                var left = e.clientX - X;
                var top = e.clientY - Y;
                $('.login_box').css({ 'left': left + 'px', 'top': top + 'px' });
            })
            $(document).on('mouseup', function () {
                $(document).off('mouseup');
                $(document).off('mousemove');
            })
        })
    }
}

//通过jsonp跨域实现百度联想词
$('input').on('input', function () {
    var value = $(this).val();
    var oScript = document.createElement('script');
    oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value + '&cb=doJson';
    document.body.appendChild(oScript);
    //用完之后删除
    document.body.removeChild(oScript);
});
function doJson(data) {
    var str = '';
    var s = data.s;
    if (s.length > 0) {
        s.forEach(function (ele, index) {
            str += '<li><a href="https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=90702711_hao_pg&wd=' + ele + '">' + ele + '</a></li>'
        })
        $('.inp_ul').html(str);
        $('.inp_ul').show();
    } else {
        $('.inp_ul').hide();
    }
}


demo.init();