Parse.initialize("ARKNOchu6ZJ851F3ofbuz1HYcAm6KjBZoj5D5wUo", "A0hhrBYZA4SGFus82faRzlkEjMZqMqmK1qHmqRR0");
var currentUser = Parse.User.current();
if(currentUser){
  location.href= "/home";
}

// 페이지들을 Vue로 나타내긴 했지만 실제 view에 영향을 끼치는 건 없다.
var page1 = new Vue({
  el : '.pt-page-2',
  data : {
    animated : false
  },
  methods : {
    init : function(){
      this.animated = false;
      $('.item1').css({ opacity: 0 });
      $('.item2').css({ scale:0, opacity: 0 });
      $('.item3').css({ scale:0, opacity: 0 });
      $('.item4').css({ scale:0, opacity: 0 });
      $('.item5').css({ scale:0, opacity: 0 });
      $('.item6').css({ scale:0, opacity: 0 });
      $('.item7').css({ opacity: 0 });
      $('.item8').css({ opacity: 0 });
      $('.item9').css({ scale:0, opacity: 0 });
    },
    animate: function(){
      $('#figures1').transition({
        opacity: 100,
        duration: 1100,
        delay: 850
      });
      $('.item1').transition({
        opacity: 100,
        duration: 500,
        delay: 1300
      });
      $('.item2').transition({
        opacity: 100,
        duration: 800,
        scale: 1,
        delay: 1800
      });
      $('.item3').transition({
        opacity: 100,
        duration: 800,
        scale: 1,
        delay: 2100
      });
      $('.item4').transition({
        opacity: 100,
        duration: 800,
        scale: 1,
        delay: 2400
      });
      $('.item5').transition({
        opacity: 100,
        duration: 800,
        scale: 1,
        delay: 2700
      });
      $('.item6').transition({
        opacity: 100,
        duration: 800,
        scale: 1,
        delay: 3000
      });
      $('.item7').transition({
        opacity: 100,
        duration: 800,
        delay: 3500
      });
      $('.item8').transition({
        opacity: 100,
        duration: 800,
        delay: 4400
      }).transition({
        opacity: 0,
        duration: 500,
        delay: 1000
      });
      $('.item9').transition({
        opacity: 100,
        duration: 500,
        scale: 1,
        delay: 6300
      });
    }
  }
});

var page2 = new Vue({
  el : '.pt-page-3',
  data : {
    animated : false
  },
  methods : {
    init: function(){
      this.animated = false;
      $('.item10').css({ opacity: 0 });
      $('.item11').css({ opacity: 0 });
      $('.item12').css({ scale:0, opacity: 0 });
      $('.item13').css({ opacity: 0 });
      $('.item14').css({ opacity: 0 });
      $('.item15').css({ opacity: 0 });
      $('.item16').css({ opacity: 0 });
      $('.item17').css({ opacity: 0 });
      $('.item18').css({ scale:0, opacity: 0 });
      $('.item19').css({ opacity: 0 });
      $('.item20').css({ opacity: 0 });
      $('.item21').css({ opacity: 0 });
      $('.item22').css({ opacity: 0 });
      $('.item23').css({ opacity: 0 });
      $('.item24').css({ opacity: 0 });
    },
    animate: function(){
      $('#figures2').transition({
        opacity: 100,
        duration: 1100,
        delay: 850
      });
      $('.item10').transition({
        opacity: 100,
        duration: 500,
        delay: 1300
      });
      $('.item11').transition({
        opacity: 100,
        duration: 500,
        delay: 2000
      });
      $('.item12').transition({
        scale: 1,
        opacity: 100,
        duration: 500,
        delay: 2500
      });
      $('.item13').transition({
        opacity: 100,
        duration: 500,
        delay: 3000
      });
      $('.item14').transition({
        opacity: 100,
        duration: 500,
        delay: 3300
      });
      $('.item15').transition({
        opacity: 100,
        duration: 500,
        delay: 3600
      });
      $('.item16').transition({
        opacity: 100,
        duration: 500,
        delay: 3900
      });
      $('.item17').transition({
        opacity: 100,
        duration: 500,
        delay: 2000
      });
      $('.item18').transition({
        scale: 1,
        opacity: 100,
        duration: 500,
        delay: 2500
      });
      $('.item19').transition({
        opacity: 100,
        duration: 500,
        delay: 3000
      });
      $('.item20').transition({
        opacity: 100,
        duration: 500,
        delay: 3300
      });
      $('.item21').transition({
        opacity: 100,
        duration: 500,
        delay: 3600
      });
      $('.item22').transition({
        opacity: 100,
        duration: 500,
        delay: 3900
      });
      $('.item23').transition({
        opacity: 100,
        duration: 500,
        delay: 4600
      });
      $('.item24').transition({
        opacity: 100,
        duration: 500,
        delay: 4600
      });
    }
  }
});

// 처음 페이지 애니메이션
$('.bar').transition({
  height: '180px',
  opacity: 100,
  duration: 1000
});
$('.title').transition({
  opacity: 100,
  duration: 1400
});

var currentPage = 0;
var firstAnimationInterval;
var secondAnimationdInterval;
var thirdAnimationInterval;
// 1초마다 페이지가 달라졌는지 확인하고 달라졌으면 각 페이지의 애니메이션을 실행한다.
setInterval(function(){
  if($('.pt-wrapper').data('current') != currentPage){
    // currentPage 값을 현재 페이지로 갱신해준다.
    currentPage = $('.pt-wrapper').data('current');
    // 페이지가 달라질때마다 모든 페이지의 애니메이션 요소들을 원래대로 초기화 시켜준다.
    $('#figures1').css({ opacity: 0 });
    page1.init();
    if(firstAnimationInterval) clearInterval(firstAnimationInterval);
    $('#figures2').css({ opacity: 0 });
    page2.init();
    if(secondAnimationdInterval) clearInterval(secondAnimationdInterval);
    // 현재 페이지가 1 페이지, pt-page-2 이면
    if($('.pt-wrapper').data('current') == 1){
      if(page1.animated === false){
        $('#title1').transition({
          left: "15%",
          duration: 700
        });
        $('#subtitle1').transition({
          left: "15%",
          duration: 700
        });
        // 애니메이션을 재생한다.
        page1.animate();
        // 6.3초 뒤에 애니메이션이 끝났다고 설정한다.
        setTimeout(function(){ page1.animated = true; }, 6300);
        // 10초마다 애니메이션 재생이 끝났는지 확인하고 끝났으면 다시 재생한다.
        firstAnimationInterval = setInterval(function(){
          if(page1.animated === true){
            page1.animated = false;
            page1.init();
            page1.animate();
            setTimeout(function(){ page1.animated = true; }, 6300);
          }
        }, 10000);
      }
      // 현재 페이지가 2 페이지, pt-page-3 이면
    } else if($('.pt-wrapper').data('current') == 2){
      if(page2.animated === false){
        $('#title2').transition({
          left: "15%",
          duration: 700
        });
        $('#subtitle2').transition({
          left: "15%",
          duration: 700
        });
        // 애니메이션을 재생한다.
        page2.animate();
        // 4.6초 뒤에 애니메이션이 끝났다고 설정한다.
        setTimeout(function(){ page2.animated = true; }, 4600);
        // 10초마다 애니메이션 재생이 끝났는지 확인하고 끝났으면 다시 재생한다.
        secondAnimationInterval = setInterval(function(){
          if(page2.animated === true){
            page2.animated = false;
            page2.init();
            page2.animate();
            setTimeout(function(){ page2.animated = true; }, 4600);
          }
        }, 10000);
      }
    }
  }
}, 1000);