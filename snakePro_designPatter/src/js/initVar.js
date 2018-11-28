// 定义全局的常量:
// 定义各自的宽度（正方形）
var SQUARE_WIDTH = 20;
// 定义横、列格子的个数
var Y_LEN = 30;
var X_LEN = 30;
// 定义舞台坐标
var LEFT = 20;
var TOP = 100;

// 定义基类
function Square(x,y,width,height,viewContent){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = this.viewContent || document.createElement('div');
}
// 定义基类的接口，该接口让子项类去实现
Square.prototype.touch = function(){
    
}
// 修改方格坐标
Square.prototype.update = function (x,y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUARE_WIDTH + 'px';
    this.viewContent.style.top = y * SQUARE_WIDTH + 'px';
}
// 创建子项:
// 创建地板
var Floor = tool.extends(Square);
// 创建食物（单例）
var Food = tool.single(Square);
// 创建石头 
var Stone = tool.extends(Square);
// 创建蛇头（单例）
var SnakeHead = tool.single(Square);
// 创建蛇身体
var SnakeBody = tool.extends(Square);
// 创建蛇
var Snake = tool.single();
// 创建舞台（单例）
var Ground = tool.single(Square);
// 创建游戏（单例）
var Game = tool.single();
// 创建over弹框
var Alert = tool.single(Square);
// 创建游戏描述
var Describe = tool.single(Square);

// 集合所有消息的策略消息
var STRATEGYENUM = {
    move:'MOVE',
    eat:'EAT',
    die:'DIE'
}
