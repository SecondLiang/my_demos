(function(){
    var imgBox = document.getElementsByClassName('img-box')[0];
    var bigBox = document.getElementsByClassName('big-box')[0];
    var fdj = document.getElementsByClassName('fangdajing')[0];
    var img = document.getElementsByClassName('img')[0];
    var bigImg = document.getElementsByClassName('big-img')[0];
    function magnifierInit(){
        bindEvent(2);
    }
    function bindEvent(num){
        var maxL;
        var minL;
        var maxT;
        var minT;
        var x,
            y;

        imgBox.addEventListener('mouseenter',function(e){
            bigBox.style.display = 'block';
            fdj.style.display = 'block';
            maxL = imgBox.offsetWidth - fdj.offsetWidth;
            minL = 0;
            maxT = imgBox.offsetHeight - fdj.offsetHeight;
            minT = 0;
            var src = img.getAttribute('src');
            bigImg.setAttribute('src',src);
            bigImg.style.width = num * bigBox.offsetWidth + 'px';
            bigImg.style.height = num * bigBox.offsetHeight + 'px';
        })
        imgBox.addEventListener('mousemove',function(e){
            x = parseInt(e.clientX) - 100 - fdj.offsetWidth / 2;
            y = parseInt(e.clientY) - 100 - fdj.offsetHeight / 2;
            var endX = (x > minL) ? (x < maxL) ? x : maxL : minL;
            var endY = (y > minT) ? (y < maxT) ? y : maxT : minT;
            fdj.style.left = endX + 'px';
            fdj.style.top = endY + 'px';
            var b = parseInt(bigBox.offsetWidth / fdj.offsetWidth);
            bigImg.style.marginLeft = -endX * b + 'px';
            bigImg.style.marginTop = -endY * b + 'px';
        })
        imgBox.addEventListener('mouseleave', function (e) {
            bigBox.style.display = 'none';
            fdj.style.display = 'none';
        })
    }

    window.magnifierInit = magnifierInit;
})()