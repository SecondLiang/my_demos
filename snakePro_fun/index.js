var warpper = document.getElementsByClassName('warpper')[0];
var lis = document.getElementsByTagName('li');
var snakes = document.getElementsByClassName('body');
var snakeHead = document.getElementsByClassName('head')[0];
var timer;
var start = document.getElementsByClassName('grade')[0];
var radio = document.getElementsByName('grades');
var btn = document.getElementsByTagName('button')[0];
var retult;
var snakeObj = {
    speed: 150,
    speed1: 100,
    speed2: 60,
    code: 39
};

btn.onclick = function () {
    retult = startGame();
    if (retult == 'easy') {
        start.style.display = 'none';
        init(snakeObj.speed);
    } else if (retult == 'hard') {
        start.style.display = 'none';
        init(snakeObj.speed1);
    } else if (retult == 'great_hard') {
        start.style.display = 'none';
        init(snakeObj.speed2);
    }
}
function startGame() {
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked == true) {
            if (radio[i].value == 'great_hard') {
                alert('你会死的很惨滴~~~~  ^_^');
            }
            return radio[i].value;
        }
    }
}
function init(speed) {
    //创建一个小蛇
    createSnake();
    //随机制造食物
    foods(lis);
    //蛇头根据方向指挥
    snakeMove(speed);
    keyEvent(speed);
}

function gameRule() {
    var count = 0;
    //出界
    if (snakeHead.offsetLeft < 0 || snakeHead.offsetTop < 0 || snakeHead.offsetLeft > 870 || snakeHead.offsetTop > 870) {
        if (timer) {
            clearInterval(timer);
        }
        for (var i = 0; i < snakes.length; i++) {
            snakes[i].style.backgroundColor = 'red';
            snakes[i].innerText = '^_^';
        }
        alert("你个笨蛋，得了" + (snakes.length - 3) + "分！！！蛇撞墙死了，头都碎了一地~~~~~");
        location.reload();
        return false;
    }
    //咬尾巴
    for (var k = 1; k < snakes.length; k++) {
        if (snakes[0].offsetLeft == snakes[k].offsetLeft && snakes[0].offsetTop == snakes[k].offsetTop) {
            if (timer) {
                clearInterval(timer);
            }
            for (var j = 0; j < snakes.length; j++) {
                snakes[j].style.backgroundColor = 'red';
                snakes[j].innerText = '^_^';
            }
            alert("你个笨蛋，得了" + (snakes.length - 3) + "分！！！蛇咬到自己尾巴了~~~~~");
            location.reload();
            return false;
        }
    }
    //游戏胜利
    for (var v = 0; v < lis.length; v++) {
        if (lis[v].style.backgroundColor === 'rgb(244, 164, 96)') {
            count++;
        }
    }
    if (count == 0) {
        if (timer) {
            clearInterval(timer);
        }
        alert('你厉害！得了' + (snakes.length - 3) + '分,满分! ,你需要挑战高难度');
        location.reload();
    }
    console.log(count);
    count = 0;
}

function snakeMove(speed) {
    timer = setInterval(function () {
        switch (snakeObj.code) {
            case 37:
                snakeBodyFollowHead();
                snakes[0].style.left = snakes[0].offsetLeft - 30 + 'px';
                gameRule();
                break;
            case 38:
                snakeBodyFollowHead();
                snakes[0].style.top = snakes[0].offsetTop - 30 + 'px';
                gameRule();
                break;
            case 39:
                snakeBodyFollowHead();
                snakes[0].style.left = snakes[0].offsetLeft + 30 + 'px';
                gameRule();
                break;
            case 40:

                snakeBodyFollowHead();
                snakes[0].style.top = snakes[0].offsetTop + 30 + 'px';
                gameRule();
                break;
        }
    }, speed);
}
function keyEvent(speed) {
    addEvent(document, 'keydown', function (e) {
        var e = e || window.event;
        var code = e.keyCode;
        switch (code) {
            case 37:
                if (snakes[0].offsetLeft == snakes[1].offsetLeft) {
                    snakeObj.code = 37;
                }
                break;
            case 38:
                if (snakes[0].offsetTop == snakes[1].offsetTop) {
                    snakeObj.code = 38;
                }
                break;
            case 39:
                if (snakes[0].offsetLeft == snakes[1].offsetLeft) {
                    snakeObj.code = 39;
                }
                break;
            case 40:
                if (snakes[0].offsetTop == snakes[1].offsetTop) {
                    snakeObj.code = 40;
                }
                break;
            case 80:
                if (timer) {
                    clearInterval(timer);
                }
                break;
            case 83:
                snakeMove(speed);
                break;
        }
    })
}
function eatfood() {
    var newEle;
    for (var i = 0; i < lis.length; i++) {
        //吃食物
        if (lis[i].style.backgroundColor === 'rgb(244, 164, 96)') {
            if (lis[i].offsetLeft == snakeHead.offsetLeft && lis[i].offsetTop == snakeHead.offsetTop) {
                lis[i].style.backgroundImage = 'url(img/timg.jpg)';
                lis[i].style.backgroundColor = 'transparent';
                newEle = document.createElement('div');
                warpper.appendChild(newEle);
                newEle.className = 'body';
                break;
            }
            //吃石头    
        } else if (lis[i].style.backgroundColor === 'rgb(0, 0, 0)') {
            if (lis[i].offsetLeft == snakeHead.offsetLeft && lis[i].offsetTop == snakeHead.offsetTop) {
                if (timer) {
                    clearInterval(timer);
                }
                for (var j = 0; j < snakes.length; j++) {
                    snakes[j].style.backgroundColor = 'red';
                    snakes[j].innerHTML = '^_^';
                }
                alert("你个笨蛋，得了" + (snakes.length - 3) + "分！！！蛇中毒死了~~~~~");
                location.reload();
                break;
            }
        } else if (lis[i].style.backgroundColor === '') {
        }
    }
}

function snakeBodyFollowHead() {
    eatfood();
    for (var i = snakes.length - 1; i > 0; i--) {
        //把前一个的位置给后一个，必须从后往前，否则，前面的位置变了，后面的就没法得到前面的原来的位置了
        snakes[i].style.left = snakes[i - 1].style.left;
        snakes[i].style.top = snakes[i - 1].style.top;
    }
}

function createSnake() {
    for (var i = 0; i < snakes.length; i++) {
        snakes[i].style.left = (snakes.length - 1 - i) * 30 + 'px';
    }
}

function randoms() {
    var count = Math.floor((Math.random() * 900));
    return count;
}

function foods(ele) {
    var lens = ele.length;
    var num;
    for (var i = 0; i < lens; i++) {
        num = randoms();
        if (num % 2 == 0 && num % 3 == 1 && num % 8 == 2) {
            if (num % 7 == 0 || num % 5 == 0) {
                ele[num].style.backgroundColor = '#000000';
            } else {
                ele[num].style.backgroundColor = '#F4A460';
            }

        }
    }
}

