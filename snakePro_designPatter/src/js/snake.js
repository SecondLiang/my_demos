var snake = new Snake();
snake.head = null; //蛇头
snake.tail = null;  //蛇尾

// 方向枚举
var DIRECTIONMENUM = {
    LEFT:{
        x:-1,
        y:0
    },
    RIGHT:{
        x:1,
        y:0
    },
    UP:{
        x:0,
        y:-1
    },
    DOWN:{
        x:0,
        y:1
    }
}



snake.init = function(ground){
    // 创建蛇头
    var SnakeHead = SquareFactory.create('SnakeHead',3,1,'red');
    // 创建蛇身1
    var SnakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'blue');
    // 创建蛇身2
    var SnakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'blue');

    // 把蛇头蛇身 形成链表结构
    SnakeHead.next = SnakeBody1;
    SnakeHead.last = null;

    SnakeBody1.next = SnakeBody2;
    SnakeBody1.last = SnakeHead;

    SnakeBody2.next = null;
    SnakeBody2.last = SnakeBody1;

    this.head = SnakeHead;
    this.tail = SnakeBody2;

    //渲染蛇头
    ground.remove(SnakeHead.x,SnakeHead.y);
    ground.append(SnakeHead);
    //渲染蛇身1
    ground.remove(SnakeBody1.x,SnakeBody1.y);
    ground.append(SnakeBody1);
    //渲染蛇身2
    ground.remove(SnakeBody2.x, SnakeBody2.y);
    ground.append(SnakeBody2);

    // 蛇默认向右移动
    snake.direction = DIRECTIONMENUM.RIGHT;

    // setInterval(function(){
    //     snake.move(ground);
    // },400)

}
//引入策略处理
 snake.strategies = {
     MOVE:function(snake,square,ground,flag){
        //  实现move
        // 新建新蛇身
         var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y,'blue');
         newBody.next = snake.head.next;
         newBody.next.last = newBody;
         newBody.last = null;
         ground.remove(snake.head.x,snake.head.y);
         ground.append(newBody);

        //  新建蛇头 注意：创建蛇头的方法是单例 需要修改坐标
         var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'red');
         newHead.next = newBody;
         newHead.last = null;
         newBody.last = newHead;

         ground.remove(square.x, square.y);
         ground.append(newHead);
        // 更新蛇头
        snake.head = newHead;
         if (!flag){
            //删除蛇尾
            var floor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(floor);
            // 更新蛇尾
            snake.tail = snake.tail.last;
        }
        


     },
     EAT: function (snake, square, ground){
        //  实现吃
         this.MOVE(snake, square, ground,true);
         game.scope++;
         game.speed -= 10;
         game.createFood(ground);
         clearInterval(game.timer);
         game.start();
         
     },
     DIE:function(){
        //  game over
        game.over();
     }
 }


// 做预判
snake.move =  function(ground){
    // 找到蛇移动的时候蛇头即将触碰的方块
    var square = ground.SquareArr[this.head.y + this.direction.y][this.head.x + this.direction.x];
    if (typeof square.touch == 'function'){
        // this -> snake
        this.strategies[ square.touch() ](this,square,ground);

    }
}
snake.headDirection = function(dire){
    switch (dire) {
        case DIRECTIONMENUM.LEFT:
            this.head.viewContent.style.transform = 'translateZ(-180deg)'
            break;
        case DIRECTIONMENUM.UP:
            this.head.viewContent.style.transform = 'translateZ(-90deg)'
            break;
        case DIRECTIONMENUM.RIGHT:
            this.head.viewContent.style.transform = 'translateZ(0deg)'
            break;
        case DIRECTIONMENUM.DOWN:
            this.head.viewContent.style.transform = 'translateZ(90deg)'
            break;        
    }

}


