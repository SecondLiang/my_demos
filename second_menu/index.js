var meun = {
    tl : $('.title_list'),
    cl : $('.con_list'),
    init : function () {
        this.event(this.tl);
    },
    event : function ($ele) {
        var self = this;
        $ele.each(function (index) {
            $(this).on('click', function () {
                self.myAnimate(index);
            });
        });
    },
    myAnimate : function(index){
        switch (index) {
            case 0:
                this.showList(index,$('.movie_list'));
                break;
            case 1:
                this.showList(index, $('.music_list'));
                break;
            case 2:
                this.showList(index, $('.books_list'));
                break;
            case 3:
                this.showList(index, $('.play_list'));
                break;
            case 4:
                this.showList(index, $('.phone_list'));
                break;
        }
    },
    showList: function (index,$ele){
        if ($ele.attr('data') == 't'){
            this.hideLi($ele);
        }else{
            this.hideLi($('.con_list'));
            $ele.slideDown('slow', function () {
                $ele.attr('data', 't');
            });
        }
    },
    hideLi : function($ele){
        $ele.slideUp('fast',function(){
            $(this).attr('data','f');
        });
    }
}
meun.init();