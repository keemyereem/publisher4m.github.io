
/* --------------------- DoosanENC Released 2022.08.08 --------------------- */
/* --------------------- Published by 4m Creative --------------------- */

$(function(){
    
    AOS.init({
    // 핸들링 참고: https://github.com/michalsnik/aos
		once : true,
		throttleDelay : 99,
		duration: 1000,
        anchorPlacement: 'center-bobttom',
        startEvent: "load",

	});

  addEventListener("fetch", (event) => {
    event.respondWith(
      (async () => {
        // Respond from the cache if we can
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;
  
        // Else, use the preloaded response, if it's there
        const response = await event.preloadResponse;
        if (response) return response;
  
        // Else try the network.
        return fetch(event.request);
      })()
    );
  });

});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **공통**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var commonEvent = {
    init:function(){
       this.headerEvent();
       this.submenuEvent();
       this.footerEvent();
       this.goTopEvent();
    }, 

    headerEvent:() => {

      //언어선택
      $(document).on("click",".lang_select .lang_current",function(){
          var selElm = $(this).parent();
          if(!selElm.hasClass("open")){
              selElm.addClass("open");
          }else{
              selElm.removeClass("open");
          }
      });

  },
  submenuEvent: () => {
      $(document).on('click', '.sub_visual_menu .depth', function(){
          $(this).toggleClass("open");
      });

      $(document).on('click', '.sub_visual_menu .depth .drop_box li a', function(){
          var selected = $(this).text();
          var dep_tit = $(this).closest('.drop_box').siblings('.dep_tit');
          dep_tit.text(selected);  
          
      });

      $(document).on('click', '.scroll_down', function() {
        var titleTop = $('.title_area').offset().top;
        $('html, body').removeClass('smooth').animate({scrollTop: titleTop}, '300');
      });

  },

  footerEvent: () => {
    $(document).on("click",".family_site .site_selected",function(){
      var selElm = $(this).parent();
      if(!selElm.hasClass("open")){
          selElm.addClass("open");
      }else{
          selElm.removeClass("open");
      }
    });

    $(document).on("click",".family_site .site_list li a",function(){
      var selected = this.innerText;
      var siteName = document.getElementsByClassName('site_selected')[0];
      var familySite = this.parentNode.parentNode.parentNode;
      siteName.innerText = selected;
      familySite.classList.remove('open');
    });
  },
  
  goTopEvent: () => {
    $(window).scroll(function() {
      // top button controll
      if ($(this).scrollTop() > 1000) {
          $('#topButton').fadeIn();
      } else {
          $('#topButton').fadeOut();
      }
      var footerTop = $('.footer').offset().top - $(window).outerHeight();
      var pos = $('.footer').outerHeight() + Number(80);
      
      if($(this).scrollTop() > footerTop){
        $('#topButton').addClass('on').css({'bottom':pos});
      }else {
        $('#topButton').removeClass('on').css({'bottom':'8rem'});
      }

  });

  $(document).on('click', '#topButton', function() {
      $('html, body').removeClass('smooth').animate({scrollTop:0}, '300');
  });
  },

};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **메인**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mainEvent = {
    init:function(){
        this.headerEvent();
        this.intro();
        // this.createFullpage();
        this.sec04Card();
        this.sec06Tab();
        this.footerEvent();
    },

    headerEvent:() => {

        //언어선택
        $(document).on("click",".lang_select .lang_current",function(){
            var selElm = $(this).parent();
            if(!selElm.hasClass("open")){
                selElm.addClass("open");
            }else{
                selElm.removeClass("open");
            }
        });

    },

    intro:() => {
        $(window).ready(() =>{
          $('body').addClass('blockScroll');
          $('#rightnavi, .sec01_controller').addClass('blind')
        });

        $(window).load(() => {
          
            var backgroundImageUrl = "../images/main/sec01_bg1.png";

            // checking if image is already there in cache 
            if (sessionStorage.getItem(backgroundImageUrl)) {

              console.log('-> intro animation start');

              // after image showing, animation start
              setTimeout(() => {
                $('.section01').addClass('ani');
              }, 1000);

            } else {
              var img = new Image();
              img.src = backgroundImageUrl;
              img.onload = function() {
                sessionStorage.setItem(backgroundImageUrl, true);
                img = undefined;
              };

              console.log('-X cannot found imgData.');

              setTimeout(() => {
                $('.section01').addClass('ani');
              }, 1000);
            };

            // after animation ended, initializing object
            var x = document.getElementById("intro_trigger");
            x.addEventListener("animationend", () => {
                console.log('-> intro animation end');

                $('body').removeClass('blockScroll');
                $('.header').addClass('wht');
                $('#rightnavi, .sec01_controller').removeClass('blind');
                
                setTimeout(() => {
                  $('.clip-wrap').addClass('indent');
                }, 500);
                
                mainEvent.mainSwiper();

                if ($('body').width() > 768) {
                  mainEvent.createFullpage();
                } else {
                  $('section').addClass('active')
                  mainEvent.sec02Swiper();
                  mainEvent.sec03Swiper();
                }
                
                
            });


        });
    },

    mainSwiper: () => {
        var swiper = new Swiper(".mainSwiper", {
            spaceBetween: 30,
            speed: 500,
            effect: "fade",
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
              el: ".swiper-pagination-sec01",
              clickable: true,
            },

            //  슬라이드 이벤트 감지 - 참고 https://songsong.dev/entry/swiperjs-슬라이더-기본-사용법-알아보기
            on : {  
                init: function() {
                    // this.autoplay.stop()
                },

                slideChangeTransitionStart: function() {
                    $('.swiper-slide').addClass('changing');
                    $('.swiper-slide').removeClass('changed');
                },

                slideChangeTransitionEnd: () => {
                    $('.swiper-slide').removeClass('changing');
                    $('.swiper-slide').addClass('changed');
                },
            }

        });

        // 페이지네이션 동그라미 슬라이드별 이동
        swiper.on('transitionStart', ()=> {
            let $this = $('.swiper-pagination-bullet-active').position().left;
            $('.bullet_hr').css('left', ($this / 10) + 'rem');
        });

        // Next, Prev버튼 클릭 시 오토플레이 재개
        $(document).on('click', '.swiper-button', () => {
            swiper.autoplay.start();
        });


    },

    sec02Swiper: () => {
      var listArray = ["01","02","03"];
      var swiper2 = new Swiper(".section02 .swiper", {
        speed: 500,
        loop: true,
        autoplayDisableOnInteraction: false,
        slidesPerView: 1, 
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        watchOverflow: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,

        pagination: {
          el: '.swiper-pagination-sec02',
          clickable: 'true',
          type: 'bullets',
          renderBullet: function (index, className) {
              return '<span class="' + className + '">' + '<em>'+ listArray[index]+'</em>' + '<i></i>' + '<b></b>'  + '</span>';
          },
        },
        navigation: {
          nextEl: ".swiper2-button-next",
          prevEl: ".swiper2-button-prev",
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },

        on : {  
          init: function() {
              this.autoplay.stop()
          }
        }

      });
      
      if ($('.section02').hasClass('active')) {
        swiper2.autoplay.start();
      } else {

      }

    },

    sec03Swiper: () => {
      var listArray = ["주택사업","건축사업","토목사업"];
      var swiper3 = new Swiper(".section03 .bus_swiper", {
        speed: 500,
        loop: true,
        autoplayDisableOnInteraction: false,
        slidesPerView: 1, 
        allowTouchMove: false,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        watchOverflow: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,

        pagination: {
          el: '.swiper-pagination-sec03',
          clickable: 'true',
          type: 'bullets',
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '<em>'+ listArray[index]+'</em>' + '</span>';
          },
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },


      });
      //마우스 오버시 자동슬라이드 멈춤
      $(".section03 .bus_swiper").each(function(elem, target){
        var swp = target.swiper;
        $(this).hover(function() {
            swp.autoplay.stop();
        }, function() {
            swp.autoplay.start();
        });
      });


      var innerSwiper3 = new Swiper(".section03 .inner_swiper", {
        speed: 500,
        loop: false,
        autoplayDisableOnInteraction: false,
        slidesPerView: 1, 
        watchOverflow: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,

        pagination: {
          el: '.section03 .right .swiper-pagination',
          clickable: 'true',
          type: 'bullets',
      
        },
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false
        // },


      });

    },

    sec04Card: () => {
      $('.card li').hover(function() {
        var getSrc = $(this).children('.icon').attr('src');
        getSrc = getSrc.replace(".png","_hover.png");
        
        $(this).children('.icon').attr('src', getSrc);
        
      }, function() {
        var getSrc = $(this).children('.icon').attr('src');
        getSrc = getSrc.replace("_hover.png", ".png");

        $(this).children('.icon').attr('src', getSrc);
      });
      
    },

    sec06Tab: () => {
      var Tabs = $('.section06 .right .tab li');
      Tabs.on("click", function(){
        $(this).addClass('on');
        $(this).siblings().removeClass('on');

        var Tabs_idx = Tabs.index(this);
        $('.section06 .right .contents > ul').removeClass('on');
        $('.section06 .right .contents > ul').eq(Tabs_idx).addClass('on');
        
      });
    },

    footerEvent: () => {
      $(document).on("click",".family_site .site_selected",function(){
        var selElm = $(this).parent();
        if(!selElm.hasClass("open")){
            selElm.addClass("open");
        }else{
            selElm.removeClass("open");
        }
      });

      $(document).on("click",".family_site .site_list li a",function(){
        var selected = this.innerText;
        var siteName = document.getElementsByClassName('site_selected')[0];
        var familySite = this.parentNode.parentNode.parentNode;
        siteName.innerText = selected;
        familySite.classList.remove('open');
      });
    },

    createFullpage: () => {
      $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage', 'seventhPage'],
        menu: '#rightnavi',
        verticalCentered: false,
        css3: true,
        
        // sectionsColor: ['#FEC260', '#3FA796', '#fff', '#fff', '#fff'],
        // controlArrows: true,            // 슬라이드 컨트롤 애로우 생성 
        // slidesNavigation: true,         // 슬라이드 컨트롤 네비게이션 생성
        // slidesNavPosition: 'bottom',    // 슬라이드 컨트롤 네비게이션 위치 

        scrollingSpeed: 1000,
        onLeave: function(index, nextIndex, direction){

          if(nextIndex == 1 || nextIndex == 5){
            setTimeout(() => {
              $(".header").addClass("wht");
            }, 1000);
            
          }else {
            setTimeout(() => {
            $(".header").removeClass("wht");
            }, 1000);

          }

          // footer
          if(nextIndex == 7){
            $("#rightnavi, .header").addClass("indent");

          }else {
            $("#rightnavi, .header").removeClass("indent");

          }
        },

        afterLoad: function(anchorLink, index){
          /* 인포그래픽 섹션 도달 후 오토플레이 시작 */

          if (index == 2) {
            setTimeout(() => {
              mainEvent.sec02Swiper();
              
              // console.log('--> swiper02 initiating');

            }, 300);
          } else if (index == 3) {
            setTimeout(() => {
              mainEvent.sec03Swiper();
              // console.log('--> swiper03 initiating');

            },0);
          } else {
            
          }

          // footer
          if (index == 7) {
            setTimeout(() => {
              $('.footer .sec_tit > span').addClass('fin')
            }, 200);
          } else {
           
          }
        },



    });
  },

  
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **서브**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var civilEngineerEvent = {
  init: function(){
    this.civilTab();
    this.civilSwiper();
    this.oulineNav();
  },
  civilTab: () => {
    var Tabs = $('.civil_engineer .tab_box ul li');
    Tabs.on("click", function(){
      $(this).addClass('on');
      $(this).siblings().removeClass('on');
    });

  },

  civilSwiper: () => {
    $(".civil_engineer .outline .swiper").each(function(index){
      console.log(index);
      var idx = index +1;

      // 첫번째 슬라이드 2depth 스와이퍼 
      var bus03Swiper = new Swiper('.civil_engineer .outline .swiper0' + idx, {
          observer: true,
          observeParents: true,
          slidesPerView : 1,
          speed: 500,
          
          navigation: {
              nextEl: '.civil_engineer .outline .swiper-button-next0' + idx,
              prevEl: '.civil_engineer .outline .swiper-button-prev0' + idx,
          },
          watchOverflow: true,


        });
      });
  },
   oulineNav: () => {
    $('.section_nav_prev, .section_nav_next').click(function(){
      $('html,body').addClass('smooth');
    });
   },


};

//사업실적 팝업
function popupbusiness(popConts) {
  var popthis = $(".popup."+popConts);
  popthis.fadeIn(300);
  
  // 탭 메뉴 슬라이드 스와이퍼
  var popSlide01 = new Swiper('.card_popup01 .inner_box', {
      slidesPerView : '1',
      spaceBetween : 10,
      watchOverflow : true,
      navigation: {  
          nextEl: '.inner_nav .next',
          prevEl: '.inner_nav .prev',
      },
      pagination: {
          el: ".counter_slider",
          type: 'fraction',
      },
      breakpoints: {
        
        768: {
          spaceBetween: 60,
        },
      },

  });

  popthis.find(".pop_close").click(function(){
      popthis.fadeOut(300);
  });
}