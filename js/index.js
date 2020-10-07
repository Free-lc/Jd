window.addEventListener("load", function () {
  //设置左侧浮动折叠显示
  const pttul = document.querySelector('.pttul');
  const pttli = pttul.children;
  const foldcontainer = document.querySelector('.foldcontainer');
  const folddiv = foldcontainer.children;
  // console.log(foldcontainer.children.length);
  for(var i = 0;i < pttul.children.length ;i++ ){
    pttli[i].onmouseover = function(){
      folddiv[i].style.display = 'block';
    }
    pttli[i].onmouseout = function(){
      folddiv[i].style.display = 'none';
    }
  }

  // 设置广告图
  var header = document.getElementById("header");
  var banner = document.querySelector(".banner_button");
  var siderbar = document.querySelector(".sider-bar");
  var middlew = document.querySelector(".middle_w");
  var shortcut = document.querySelector(".shortcut");
  var grid = document.querySelector(".grid");
  banner.onclick = function(){
      header.style.display = "none";
      siderbar.style.top = "188px" ;
  }
  console.log(lis[14]);

  //设置侧边栏
  var GoBack = document.querySelector(".GoBack");
  var footer = document.querySelector(".footer");
  var service = document.querySelector(".service");
  var footerTop = footer.offsetTop;
  var Toplength = grid.offsetTop-60;     //达到此高度时进行fixed
  // var siderbarTop = siderbar.offsetTop - Toplength;
  document.addEventListener('scroll',function(){
      //当页面被向上卷去249，就要改为固定定位
      if(window.pageYOffset >= Toplength){
          siderbar.style.position = 'fixed';
          siderbar.style.top = "60px";
      }
      else{
          siderbar.style.position = 'absolute';
          siderbar.style.top = "268px";
      }
      //超过footer范围显示回到顶部按钮
      if(window.pageYOffset >= footerTop-300){
          GoBack.style.display = 'block';
      }
      else{
          GoBack.style.display = 'none'
      }

      // 返回顶部
      GoBack.addEventListener('click',function(){
          window.scroll(0,0);
      })

  })
  
  //轮播图制作
  // 获取元素
  var arrow_1 = document.querySelector(".arrow-1");
  var arrow_2 = document.querySelector(".arrow-2");
  var grid_col2_l = document.querySelector(".grid-col2-l");
  var ul = grid_col2_l.querySelector("ul");
  var circle = document.querySelector(".circle");
  var focusWidth = ul.children[0].offsetWidth;
  //js实现鼠标悬停改变箭头颜色
  arrow_1.onmouseover = function () {
    this.style.opacity = "0.4";
  };
  arrow_1.onmouseout = function () {
    this.style.opacity = "0.1";
  };
  arrow_2.onmouseover = function () {
    this.style.opacity = "0.4";
  };
  arrow_2.onmouseout = function () {
    this.style.opacity = "0.1";
  };
  //动态根据图片个数生成按钮个数

  // console.log(ul.children.length);
  for (var i = 0; i < ul.children.length; i++) {
    var li = document.createElement("li");
    li.setAttribute("index", i);
    circle.appendChild(li);
    li.addEventListener("mousedown", function () {
      for (var i = 0; i < circle.children.length; i++) {
        circle.children[i].className = "";
      }
      this.className = "current";
      //点击按钮移动图片

      var index = this.getAttribute("index");
      num = index;
      follow = index;
      animate(ul, -index * focusWidth);
    });
  }
  circle.children[0].className = "current";
  //克隆第一个图
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  var num = 0;
  //表示惦记的次数
  var follow = 0; //控制小圆点播放
  //点击箭头移动图片
  arrow_2.addEventListener("click", function () {
    if (num == ul.children.length - 1) {
      ul.style.left = 0;
      num = 0;
    }
    num++;
    animate(ul, -num * focusWidth);
    follow = (follow + 1) % circle.children.length;
    for (var i = 0; i < circle.children.length; i++) {
      circle.children[i].className = "";
    }
    circle.children[follow].className = "current";
  });

  arrow_1.addEventListener("click", function () {
    if (num == 0) {
      ul.style.left = -(ul.children.length - 1) * focusWidth + "px";
      num = ul.children.length - 1;
    }
    num--;
    animate(ul, -num * focusWidth);
    follow--;
    if (follow < 0) follow = circle.children.length - 1;
    for (var i = 0; i < circle.children.length; i++) {
      circle.children[i].className = "";
    }
    circle.children[follow].className = "current";
  });

  //自动播放录播图
  var timer = setInterval(function () {
    arrow_2.click(); //手动调用点击事件
  }, 2000);
  //鼠标悬停停止滚动
  grid_col2_l.addEventListener("mouseenter", function () {
    clearInterval(timer);
    timer = null;
  });
  //鼠标离开继续滚动
  grid_col2_l.addEventListener("mouseleave", function () {
    timer = setInterval(function () {
      arrow_2.click(); //手动调用点击事件
    }, 2000);
  });
});

