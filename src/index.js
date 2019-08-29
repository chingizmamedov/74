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



  $('.preview__slider_big').not('.slick-initialized').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.preview__slider__bottom'
  });
  $('.preview__slider__bottom').not('.slick-initialized').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.preview__slider_big',
    dots: false,
    centerMode: true,
    infinite: true,
    focusOnSelect: true,
    variableWidth: true,
    prevArrow: $('.prew-btn'),
    nextArrow: $('.next-btn')
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
    variableWidth: true,
    prevArrow: $('.prew-btn'),
    nextArrow: $('.next-btn')
  });

  $('.menu__btn').click(function(){

    $(this).children().toggleClass('is-active')
    $(".mobile__menu").slideToggle()
    
  })

  $('.select__display').click(function(){
    $(this).toggleClass('select__display_is-active')
    $(this).find('.select__display_close').toggle()
    $(this).find('.select__display_open').toggle()
    $(this).siblings().toggleClass('select__list_shown')
  })
  $(".select__list__item").click(function () {
    $(this).parent().siblings().val($(this).text())
  })
  $(window).scroll(function(){
    var headerBotPos = $('.header').offset().top + $('.header').outerHeight() - $(window).scrollTop()
    var footerHtoPos = $('.footer').offset().top - $(window).scrollTop(),
        filterHeight = $('#filter').outerHeight() + 40
        if(footerHtoPos > filterHeight) {            
          $('.filter').css({
            position: 'absolute',
            zIndex: '97',
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
            zIndex: '97',
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
  $(".card__heart").off('click').click(function(e) {
    // debugger
    e.preventDefault();
    console.log($(this).hasClass("card__heart__favor"))
    $(this).hasClass("card__heart__favor") ? $(this).removeClass('card__heart__favor') : $(this).addClass('card__heart__favor')
  })

  $(".modal__alert__close").click(function(){
    $(this).parent().hide()
    $("#modal__back").hide()
  })

  $(".modal__preview__close").click(function(){
    $(this).parent().toggleClass('modal__preview__shown')
    $("#modal__back").hide()
  })

  $("#modal__back").click(function(){
    $(this).hide()
    $(".modal").hide()
    $(".modal__preview").toggleClass('modal__preview__shown')
  })

  $(".filter__btn").click(function(){
    $("#filter").parent().toggle()
  })

  

  $(".callback__btn").click(function(){
    $(".modal__find").show()
    $("#modal__back").show()
  })

  $(".quick-view").click(function(){
    $(".modal__preview").toggleClass('modal__preview__shown')
    $("#modal__back").show()
  })
  

})