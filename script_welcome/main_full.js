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
        
    });


    $('.swipe-box').addClass('on');

    if ($('.swipe-box').hasClass('on')) {
        setTimeout(() => {
            $('.swipe-box').removeClass('on');
        }, 3000)
    }

    $('.swipe-box').on('click', () => {
        $('.swipe-box').removeClass('on');
    })


})
    



