
/* --------------------- Unisef-PMS Released 2022.08.31 --------------------- */
/* ------------------------ Published by 4m Creative ------------------------ */

// 인트로 팝업 트리거
$(document).ready(function(){

    $('.swipe-box').addClass('on');

    if ($('.swipe-box').hasClass('on')) {
        setTimeout(() => {
            $('.icon-hand').addClass('on');
        }, 0)
        setTimeout(() => {
            $('.swipe-box').removeClass('on');
            $('.icon-hand').removeClass('on');
        }, 2000)
        setTimeout(() => {
            $('.swipe-box').hide();
        }, 2500)
    }

    $('.swipe-box').on('click', () => {
        $('.swipe-box').removeClass('on');
        setTimeout(() => {
            $('.swipe-box').hide();
        }, 500)
    })
})

    // body 태그 클래스에 vertical이 주어질 경우, 세로 스와이프/ 인트로 팝업 조정
    let options = {};
    if ($("body").hasClass('vertical')) {
    $('.popup_vertical').show();
    options = {
        direction: 'vertical',
        loop: true,
        spaceBetween: 0,
    }
    } else {
    $('.popup_horizontal').show();
    options = {
        direction: 'horizontal',
        loop: true,
        spaceBetween: 0,
    }
    }
    var swiper = new Swiper('.mySwiper', options);

    // 터치 스와이프 스크롤 우선 적용 후 슬라이드 넘김
    var startScroll, touchStart, touchCurrent;

    swiper.slides.on('touchstart', function (e) {
        startScroll = this.scrollTop;
        touchStart = e.targetTouches[0].pageY;
    }, true);

    swiper.slides.on('touchmove', function (e) {
        touchCurrent = e.targetTouches[0].pageY;
        var touchesDiff = touchCurrent - touchStart;
        var slide = this;
        var onlyScrolling = 
                ( slide.scrollHeight > slide.offsetHeight ) && //allow only when slide is scrollable
                (
                    ( touchesDiff < 0 && startScroll === 0 ) || //start from top edge to scroll bottom
                    ( touchesDiff > 0 && startScroll === ( slide.scrollHeight - slide.offsetHeight ) ) || //start from bottom edge to scroll top
                    ( startScroll > 0 && startScroll < ( slide.scrollHeight - slide.offsetHeight ) ) //start from the middle
                );
        if (onlyScrolling) {
            e.stopPropagation();
        }
    }, true);