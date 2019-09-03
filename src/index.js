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
    nextArrow: $('.prew-btn'),
    prewArrow: $('.next-btn')
  });

  $('.object__slider_big').not('.slick-initialized').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.suka',
    adaptiveHeight: true
  });
  $('.suka').not('.slick-initialized').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.object__slider_big',
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    prevArrow: $('.next-btn'),
    nextArrow: $('.prew-btn')
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
    $(this).parent().hide();
    $("#modal__back").hide()
  })

  $(".modal__preview__close").click(function(){
    $(this).parent().removeClass('modal__preview__shown')
    $("#modal__back").hide()
  })

  $("#modal__back").click(function(){
    $(this).hide()
    $(".modal").hide()
    $(".modal__preview").removeClass('modal__preview__shown')
  })

  $(".contact__mobile__submit").click(function(){
    $(".modal__callback").show()
    $("#modal__back").show()
  })

  $('#callback_form_mobile').on('submit',function(e) {
    e.preventDefault();
    $.ajax({
      url: '/ajax.php',
      method: 'POST',
      data: {
          name: $(this).find('input[name="name"]').val(),
          phone: $(this).find('input[name="phone"]').val(),
          act: 'callback'
      },
      success: function(dat){
        if (dat != '') {
            $(this).find('input[name="name"]').val('');
            $(this).find('input[name="phone"]').val('');
            var jsonpars = jQuery.parseJSON(dat);
            if (jsonpars.result == 'success') {
              $(".modal__callback").hide();
              $(".modal__alert").css({
                display: "flex"
              });
            }
        }
      }
    });
    
});
  

  $(".filter__btn").click(function(){
    $("#filter").parent().toggle()
  })

  
  function bindCallback() {
    $(".callback__btn").click(function(){
      $(".modal__find").show()
      $("#modal__back").show()
    })
  }
  bindCallback();
  // $(".quick-view").click(function(){
  //   $(".modal__preview").addClass('modal__preview__shown')
  //   $("#modal__back").show()
  // })

  function bindSubscribes() {
    $('.subscribe_button').off('click');
    $('.subscribe_button').on('click',function(e) {
        e.preventDefault();
        var idprod = $(this).attr('data-id');
        let that = $(this);
        $(this).addClass('disabled');
        if (idprod != '') {
                $.ajax({
                  url: '/ajax.php',
                  method: 'POST',
                  data: {
                      idprod: idprod,
                      act: 'subscribe'
                  },
                  success: function(dat){
                    that.removeClass('disabled');
                    var jsonpars = jQuery.parseJSON(dat);
                    if (jsonpars.result == 'added') that.addClass('card__heart__favor');
                    if (jsonpars.result == 'removed') that.removeClass('card__heart__favor');
                    if (location.pathname == '/favorites/') location.reload();
                  }
                });
        };
    });
  }

  

  function bindFastSub() {
    $('.modal__preview .subscribe_button').on('click',function(e) {
      e.preventDefault();
      var idprod = $(this).attr('data-id');
      let that = $(this);
      $(this).addClass('disabled');
      if (idprod != '') {
              $.ajax({
                url: '/ajax.php',
                method: 'POST',
                data: {
                    idprod: idprod,
                    act: 'subscribe'
                },
                success: function(dat){
                  that.removeClass('disabled');
                  var jsonpars = jQuery.parseJSON(dat);
                  if (jsonpars.result == 'added') that.addClass('card__heart__favor');
                  if (jsonpars.result == 'removed') that.removeClass('card__heart__favor');
                  if (location.pathname == '/favorites/') location.reload();
                }
              });
      };
  });
  }
  bindSubscribes();

  function showFastView(id) {
      $('.modal__preview .datamodal').html('');
      $(".modal__preview").addClass('modal__preview__shown');
      $('#modal__back').show();
      if (id != '') {
          $.ajax({
            url: '/ajax.php',
            method: 'POST',
            data: {
                act: 'getfast',
                idprod: id
            },
            success: function(dat){
              if (dat != '') {
                  $('.modal__preview .datamodal').html(dat);
                  $('.modal__preview .preview__slider_big').not('.slick-initialized').slick({
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      arrows: false,
                      fade: true,
                      asNavFor: '.preview__slider__bottom'
                    });
                    $('.modal__preview .preview__slider__bottom').not('.slick-initialized').slick({
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
                    bindCallback();
                    bindSubscribes();
              }
            }
          });
      }
  }

  window.showFastView = showFastView;

  $('.quick_view').on('click',function(e) {
      e.preventDefault();
      let id = $(this).attr('data-id');
      showFastView(id);
  });
  

})