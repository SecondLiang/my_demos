var game = new Game();
game.scope = 0;
game.timer = null;
game.speed = 400;

game.createFood = function (ground) {
    var x = null;
    var y = null;
    var flag = true;
    while (flag) {
        x = 1 + parseInt(Math.random() * 28);
        y = 1 + parseInt(Math.random() * 28);

        var ok = true;
        // 遍历 蛇 链表
        for (var node = snake.head; node; node = snake.next) {
            // 如果在蛇身上
            if (x == node.x && y == node.y) {
                ok = false;
            }
        }
        if (ok) {
            flag = false;
        }
    }
    // console.log(x ,y)
    var food = SquareFactory.create('Food', x, y, 'green');
    // console.log(food);
    ground.remove(food.x, food.y);
    ground.append(food);
}

game.start = function () {
    clearInterval(game.timer);
    game.timer = setInterval(function () {
        snake.move(ground);
    }, game.speed)
}

game.describe = function (ground) {
    var desc_warp = document.getElementsByClassName('desc_warp')[0];
    var btn = document.getElementsByClassName('btn')[0];
    var grades = document.getElementsByTagName('input');
    var self = this;
    btn.addEventListener('click', function () {
        var selected = getGrade();
        if (selected == 1) {
            game.speed = 400;
        } else if (selected == 2) {
            game.speed = 300;
        } else if (selected == 3) {
            game.speed = 200;
        }
        desc_warp.style.display = 'none';
        ground.viewContent.style.display = 'block';
        self.start();
    })

    function getGrade() {
        for (var i = 0; i < grades.length; i++) {
            if (grades[i].checked == true) {
                return grades[i].value;
            }
        }
    }
}

game.init = function (ground) {
    ground.init();
    snake.init(ground);

    document.onkeydown = function (e) {
        if (e.which == 37 && snake.direction != DIRECTIONMENUM.RIGHT) {
            snake.direction = DIRECTIONMENUM.LEFT;
            snake.headDirection(snake.direction);
        } else if (e.which == 38 && snake.direction != DIRECTIONMENUM.DOWN) {
            snake.direction = DIRECTIONMENUM.UP;
            snake.headDirection(snake.direction);
        } else if (e.which == 39 && snake.direction != DIRECTIONMENUM.LEFT) {
            snake.direction = DIRECTIONMENUM.RIGHT;
            snake.headDirection(snake.direction);
        } else if (e.which == 40 && snake.direction != DIRECTIONMENUM.UP) {
            snake.direction = DIRECTIONMENUM.DOWN;
            snake.headDirection(snake.direction);
        }
    }
    this.createFood(ground);
    this.describe(ground);


}
game.init(ground);




game.over = function(){
    clearInterval(game.timer);
    // var alertDiv = new Alert(100,100,200,100);
    alert('得分：' + game.scope);
}








