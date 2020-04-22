$(document).ready(function() {
    $('.carousel__inner').slick({
        centerMode: true,
        centerPadding: 0,
        speed: 1500,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
           }
        ]
    });


    // ТАБЫ(КАТАЛОГ С СОРТИРОВКОЙ ПО КАТЕГОРИЯМ)

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass
          ('catalog__content_active').eq($(this).index()).addClass
          ('catalog__content_active');
      });
      


    // СДВИГАНИЕ ЭЛЕМЕНТОВ КАТАЛОГА ВЛЕВО

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass("catalog-item__content_active");
                $('.catalog-item__list').eq(i).toggleClass("catalog-item__list_active");
            })
      })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    //МОДАЛЬНЫЕ ОКНА

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function(){
           $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
           $('.overlay, #order').fadeIn('slow'); 
        })
    });

    // ПЛАГИН ДЛЯ ВАЛИДАЦИИ

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    // ФОРМАТИРОВАНИЕ ПОЛЯ ДЛЯ ВВОДА НОМЕРА ТЕЛЕФОНА

    $('input[name=phone]').mask("+ 7 (999) 999-99-99");



    // ФРОНТЕНД ЧАСТЬ ФОРМЫ, ОТПРАВКА АЯКС ЗАПРОСА

 $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order, .overlay').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });



    // ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН
    
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
  
    


    // ФУНКЦИЯ ДЛЯ ОСУЩЕСТВЛЕНИЯ ПЛАВНОГО СКРОЛЛА

    $(window).scroll(function(){
        if($(this).scrollTop()>700){
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    })
    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });


    //ИНИЦИАЛИЗАЦИЯ БИБЛИОТЕКИ С АНИМАЦИЯМИ

    new WOW().init();

});


