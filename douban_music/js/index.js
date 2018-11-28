$(function(){
    $('#silder').silderImg({
        imgArr: ['./img/b1.jpg', './img/b2.jpg', './img/b3.jpg', './img/b4.jpg', './img/b5.jpg', './img/b6.jpg', './img/b7.jpg','./img/b1.jpg']
    });
    var Data = [
        { imgUrl: './img/s1.jpg', name: 'Dolphy', lable: '(歌曲)', linkUrl: 'https://site.douban.com/dolphykickbebop/', dec: '我是最棒的' },
        { imgUrl: './img/s2.jpg', name: 'Late', lable: '(歌曲)', linkUrl: 'https://site.douban.com/latetroubles/', dec: '我是最棒的' },
        { imgUrl: './img/s3.jpg', name: '鸭德天', lable: '(音乐人)', linkUrl: 'https://site.douban.com/yatingtian/', dec: '我是最棒的' },
        { imgUrl: './img/s4.jpg', name: '宽宽', lable: '(音乐人)', linkUrl: 'https://site.douban.com/haveaniceday/', dec: '我是最棒的' },
        { imgUrl: './img/s5.jpg', name: '小河', lable: '(音乐人)', linkUrl: 'https://site.douban.com/xiaohe/', dec: '我是最棒的' },
        { imgUrl: './img/s6.jpg', name: 'BRE', lable: '(歌曲)', linkUrl: 'https://site.douban.com/bre/', dec: '我是最棒的' },
        { imgUrl: './img/s7.jpg', name: '冯家界&&西山', lable: '(音乐人)', linkUrl: 'https://site.douban.com/westhill/', dec: '我是最棒的' },
        { imgUrl: './img/s8.jpg', name: 'Alternative', lable: '(音乐人)', linkUrl: 'https://site.douban.com/AfB/', dec: '我是最棒的' },
        { imgUrl: './img/s1.jpg', name: '王博', lable: '(音乐人)', linkUrl: 'https://site.douban.com/sweetsugar/', dec: '我是最棒的' },
    ];
    $('#search_swiper').searchplugIns({
        searchData: Data,
        iptBoxWidth: 472,
        btnBoxwidth: 36,
        searchBoxHeight: 34,
        iptPlacehodler: '音乐人、歌曲',
        btnText: 'S',
        btnB: 'rgb(179, 176, 176)'
    });
})