var mines = {
    init: function () {
        this.warp = document.getElementsByClassName('warpper')[0];
        this.select = document.getElementsByClassName('select')[0];
        this.ipt = document.getElementsByName('asd');
        this.btn = document.getElementsByClassName('btn')[0];
        this.alertBox = document.getElementsByClassName('alertBox')[0];
        this.reset = document.getElementsByClassName('reset')[0];
        this.ul = null;
        this.lis = null;
        this.minesNum = 100;
        this.minesOver = this.minesNum;
        this.c = 1;
        this.bindEvent();
    },
    //生成方格
    stageDom: function () {
        this.warp.innerHTML = '';
        this.ul = document.createElement('ul');
        for (var i = 1; i <= 30; i++) {
            for (var j = 1; j <= 30; j++) {
                this.ul.innerHTML += '<li id = "' + i + '-' + j + '"></li>'
            }
        }
        this.warp.append(this.ul);
        this.mineFields(this.minesNum);
    },
    //布雷
    mineFields: function (minesNum) {
        // console.log(minesNum)
        var thunders;
        this.lis = document.getElementsByTagName('li');
        for (var j = 0; j < minesNum; j++) {
            thunders = Math.floor(Math.random() * 900);
            this.lis[thunders].setAttribute('class', 'lei');
        }
    },
    //事件监听
    bindEvent: function () {
        var c = 1;
        var self = this;
        //取消鼠标右击菜单时间
        this.warp.oncontextmenu = function () {
            return false;
        }
        addEvent(this.warp, 'mousedown', function (e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            // console.log(target.getAttribute('data'));
            if (e.which == 1) {
                self.leftClick(target);
            } else if (e.which == 3) {
                self.rightClick(target);
            }
        })
        addEvent(this.btn,'click',function(){
            for(var i = 0; i < self.ipt.length;i++){
                if (self.ipt[i].checked == true){
                    self.minesNum = +self.ipt[i].value;
                }
            }
            self.select.style.display = 'none';
            self.warp.style.display = 'block';
            self.stageDom();
        });
        addEvent(this.reset,'click',function(){
            self.alertBox.style.display = 'none';
            self.select.style.display = 'block';
        })
    },
    leftClick: function (target) {
        var self = this;
        var leis = document.getElementsByClassName('lei');
        if (!target.classList.contains('flag')) {
            //如果点到雷
            if (target && target.getAttribute('class') == 'lei') {
                // console.log('game over')
                // removeEvent(this.warp,'mousedown');
                for (var p = 0; p < leis.length; p++) {
                    leis[p].classList.add('isLei');
                }
                setTimeout(function(){
                    self.alertBox.style.display = 'block';
                    self.warp.style.display = 'none';
                },500)
            } else {
                //没有点到雷
                var n = 0;
                var arr = [];
                var place = target.getAttribute('id').split('-');
                var a1 = document.getElementById((+place[0] - 1) + '-' + (+place[1] - 1));
                var a2 = document.getElementById((+place[0] - 1) + '-' + (+place[1]));
                var a3 = document.getElementById((+place[0] - 1) + '-' + (+place[1] + 1));
                var a4 = document.getElementById((+place[0]) + '-' + (+place[1] - 1));
                var a5 = document.getElementById((+place[0]) + '-' + (+place[1] + 1));
                var a6 = document.getElementById((+place[0] + 1) + '-' + (+place[1] - 1));
                var a7 = document.getElementById((+place[0] + 1) + '-' + (+place[1]));
                var a8 = document.getElementById((+place[0] + 1) + '-' + (+place[1] + 1));
                // console.log((place[0] - 1) + '-' + (place[1] - 1));
                // console.log(a)
                arr.push(a1, a2, a3, a4, a5, a6, a7, a8);
                // console.log(arr)
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i]) {
                        if (arr[i].getAttribute('class') == 'lei') {
                            n++;
                        }
                    }
                }
                if (n !== 0) {
                    target.innerHTML = n;
                }
                target.style.backgroundColor = '#999';
                target.classList.add('num');
                //如果等于0；就扩散
                if (n == 0) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i]) {
                            if (!arr[i].classList.contains('check')) {
                                arr[i].classList.add('check');
                                this.leftClick(arr[i]);
                            }
                        }
                    }
                }
            }
        }
    },
    rightClick: function (target) {
        if (target.classList.contains('num')) {
            return false;
        }
        target.classList.toggle('flag');
        if (target.classList.contains('lei') && target.classList.contains('flag')) {
            this.minesOver--;
        }
        if (target.classList.contains('lei') && !target.classList.contains('flag')) {
            this.minesOver++;
        }
        if (this.minesOver == 0) {
            alert('你赢了！')
        }
        console.log(this.minesOver);
    },

}
mines.init();