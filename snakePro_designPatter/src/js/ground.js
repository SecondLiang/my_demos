var ground = new Ground(LEFT, TOP, SQUARE_WIDTH * X_LEN, SQUARE_WIDTH * Y_LEN);

ground.init = function(){
    // 渲染舞台
    // console.log(this.viewContent);
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width +'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = 'pink';
    this.viewContent.style.display = 'none';
    document.body.appendChild(this.viewContent);

    // 存储舞台所有方格的二维数组
    this.SquareArr = [
        /*
            [],
            [],
            ...
        */ 
    ];

    for(var i = 0;i < Y_LEN;i++){
        this.SquareArr[i] = new Array(X_LEN);
        for(var j = 0;j < X_LEN;j++){
            if(j == 0 || j == Y_LEN - 1 || i == 0 || i == X_LEN - 1){
                // 调用工厂创建石头
                var newSquare = SquareFactory.create('Stone',j,i,'black');
            }else{
                // 调用工厂创建地板
                var newSquare = SquareFactory.create('Floor', j, i, undefined);
            }
            this.SquareArr[i][j] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent);
        }
    }
}
// 拆地板
ground.remove = function(x,y){
    // 很据坐标找到要拆的那块地板
    var square = this.SquareArr[y][x];
    this.viewContent.removeChild(square.viewContent); //在结构（html）上删除
    this.SquareArr[y][x] = null; //在数据上删除
}
// 补地板
ground.append = function(square){ 
    this.viewContent.appendChild(square.viewContent);
    this.SquareArr[square.y][square.x] = square;
}



