// ------------------------------------------------------------------------------------------------------------------------------------- //
// **********************************************************| 슬라이드 옵션 |********************************************************** //
// ------------------------------------------------------------------------------------------------------------------------------------- //


// ------------------------------------------------------------------------------------------------------------------------------------------ //
// **********************************************************| 스와이프 조작 팝업 |********************************************************** //
// ------------------------------------------------------------------------------------------------------------------------------------------ //
$(document).ready(function(){

    $('#fullPage').fullpage({
        sectionSelector: '.slide-box',
        fitToSection: true,
        scrollOverflow: true,
        dragAndMove: true,
        scrollHorizontally: true,
        continuousVertical: true,


    });


    $('.swipe-box').addClass('on');

    if ($('.swipe-box').hasClass('on')) {
        setTimeout(() => {
            $('.icon-hand').addClass('on');
        }, 0)
        setTimeout(() => {
            $('.swipe-box').removeClass('on');
            $('.icon-hand').removeClass('on');
        }, 2000)
    }

    $('.swipe-box').on('click', () => {
        $('.swipe-box').removeClass('on');
    })

    swiper = new Swiper(".horizon_slide", {
        speed: 500,
        loop: true,
        autoplayDisableOnInteraction: false,
        slidesPerView: 1, 
        initialSlide: 0,
        watchOverflow: true,
        observer: true,
        observeParents: true,
  
    });



})
    



