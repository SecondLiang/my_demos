
// 工厂方法模式（抽象工厂模式）
function SquareFactory() {

}

SquareFactory.create = function(type,x,y,color){ 
    if (SquareFactory.prototype[type] == undefined){
        throw 'no this child is factory';
    }
    if(SquareFactory.prototype[type].prototype.__proto__.constructor != SquareFactory.prototype ){
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }
    var newSquare = new SquareFactory.prototype[type](x,y,color);
    return newSquare;
}
// 出厂之前给创建的格子 设置初始化样式
SquareFactory.prototype.init = function(squareObj,color,message,img_url){
    squareObj.viewContent.style.position = 'absolute';
    squareObj.viewContent.style.left = squareObj.x * squareObj.width + 'px';
    squareObj.viewContent.style.top = squareObj.y * squareObj.height + 'px';
    squareObj.viewContent.style.width = squareObj.width + 'px';
    squareObj.viewContent.style.height = squareObj.height + 'px';
    if(color != undefined){
        squareObj.viewContent.style.backgroundColor = color;
    }
    
    if (img_url != undefined){
        squareObj.viewContent.style.backgroundImage = 'url(' + img_url + ')';
        squareObj.viewContent.style.backgroundSize = '100% 100%';
    }
    squareObj.touch = function(){
        return message;
    }
}

SquareFactory.prototype.Floor = function (x, y, color) { 
    var floor = new Floor(x,y,SQUARE_WIDTH,SQUARE_WIDTH);
    this.init(floor, color, STRATEGYENUM.move,'./src/img/timg.jpg');
    return floor;
}
SquareFactory.prototype.Stone = function (x, y, color) { 
    var stone = new Stone(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
    this.init(stone, color, STRATEGYENUM.die);
    return stone;
}
SquareFactory.prototype.Food = function (x, y, color) { 
    var food = new Food(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
    this.init(food, color, STRATEGYENUM.eat);
    food.update(x,y);
    return food;
}
SquareFactory.prototype.SnakeHead = function (x, y, color) { 
    var sh = new SnakeHead(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
    this.init(sh, color, STRATEGYENUM.die, './src/img/snakeHead.jpg');
    sh.update(x,y);
    return sh;
}
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var sb = new SnakeBody(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
    this.init(sb, color, STRATEGYENUM.die);
    return sb;
}

