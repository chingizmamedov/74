import './scss/main.scss'
import $ from 'jquery'
import slick from 'slick-carousel'

$(function () {

  $('.recent__slider').not('.slick-initialized').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });


  $('.object__slider_big').not('.slick-initialized').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.suka'
  });
  $('.suka').not('.slick-initialized').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.object__slider_big',
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    variableWidth: true
  });

  $('.menu__btn').click(function(){
    $(this).children().toggleClass('is-active')
  })

  $('.select__display').click(function(){
    $(this).toggleClass('select__display_is-active')
    $(this).find('.select__display_close').toggle()
    $(this).find('.select__display_open').toggle()
    $(this).siblings().toggleClass('select__list_shown')
  })

  $('.select__list__item').click(function () {
      $(this).parent().siblings().val($(this).text())
      // $(this).parent().toggleClass('select__list_shown')
    })


    $(window).scroll(function(){
      var headerBotPos = $('.header').offset().top + $('.header').outerHeight() - $(window).scrollTop()
      var footerHtoPos = $('.footer').offset().top - $(window).scrollTop(),
          filterHeight = $('#filter').outerHeight() + 40
          if(footerHtoPos > filterHeight) {            
            $('.filter').css({
              position: 'absolute',
              zIndex: '99',
              bottom: 'unset',
              top: '20px'
            })
          }
          if(headerBotPos < 0) {
            $('#filter').css({
              position: 'fixed'
            })
          }
          if(footerHtoPos < filterHeight) {
            $('.filter').css({
              position: 'absolute',
              zIndex: '99',
              bottom: '20px',
              top: 'unset'
            })
          }
          if(headerBotPos > 0) {
            $('#filter').css({
              position: 'absolute'
            })
          }
          




    })
})