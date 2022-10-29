// リロード
// $(function () {
//     $('html,body').animate({ scrollTop: 0 }, '1');
// });


// メニュー
$(function () {
    var $menuBtnLeft = $('.g-nav-l'),
        $menuBtnRight = $('.g-nav-r'),
        $dropdownLeft = $('.link-l'),
        $dropdownRight = $('.link-r'),
        $header = $('header'),
        $border1 = $('.border1'),
        $border2 = $('.border2'),
        $chevron1 = $('.chevron1'),
        $chevron2 = $('.chevron2');



    $menuBtnLeft.each(function () {
        $(this).mouseenter(function () {
            $dropdownLeft.addClass('active');
            $dropdownRight.removeClass('active');
            $border1.addClass('active');
            $border2.addClass('active');
            $chevron1.addClass('active');
            $chevron2.addClass('active');

        });
    });
    $menuBtnRight.each(function () {
        $(this).mouseenter(function () {
            $dropdownRight.addClass('active');
            $dropdownLeft.removeClass('active');
            $border1.addClass('active');
            $border2.addClass('active');
            $chevron1.addClass('active');
            $chevron2.addClass('active');
        });
    });

    $header.each(function () {
        $(this).mouseleave(function () {
            $dropdownLeft.removeClass('active');
            $dropdownRight.removeClass('active');
            $border1.removeClass('active');
            $border2.removeClass('active');
            $chevron1.removeClass('active');
            $chevron2.removeClass('active');
        });
    });

    $chevron1.each(function () {
        $(this).mouseenter(function () {
            $dropdownLeft.stop(true).animate({ scrollLeft: 1200 }, 2000);
            $dropdownRight.stop(true).animate({ scrollLeft: 1200 }, 2000);
        });
    });

    $chevron2.each(function () {
        $(this).mouseenter(function () {
            $dropdownLeft.stop(true).animate({ scrollLeft: 0 }, 2000);
            $dropdownRight.stop(true).animate({ scrollLeft: 0 }, 2000);
        });
    });

    // スティキーメニュー
    $('.link-l').each(function () {
        var $window = $(window),
            $header = $(this),
            $border2 = $('.border2'),
            $dropDownPanel = $('.dropdown');

        headerOffsetTop = $('.scrollmenu').offset().top;

        $window.on('scroll', function () {
            if ($window.scrollTop() > headerOffsetTop) {
                $header.addClass('sticky');
                $chevron1.addClass('sticky');
                $chevron2.addClass('sticky');
                $dropDownPanel.addClass('sticky');
                $border2.addClass('sticky');
            } else {
                $header.removeClass('sticky');
                $chevron1.removeClass('sticky');
                $chevron2.removeClass('sticky');
                $dropDownPanel.removeClass('sticky');
                $border2.removeClass('sticky');
            }
        });
    });
});



// ドロップダウン
$(function () {
    $('.scrollmenu').each(function () {
        var $linksGroup = $(this).find('div'),
            $tabAnchors = $linksGroup.find('div'),
            $nav = $('.nav'),
            $panelsParent = $('.dropdown'),
            $background = $('.b-color'),
            $panels = $('.dropdown').find('div');

        $tabAnchors.mouseenter(function () {
            $panels.hide();
            var $this = $(this);
            $($this.attr('href')).stop(true).slideToggle(1000);
            $($this.attr('href')).css({ 'visibility': 'visible' });
            $background.css({ 'visibility': 'visible' });

            $panelsParent.mouseleave(function () {
                $($this.attr('href')).hide();
                $background.css({ 'visibility': 'hidden' });
            });
            $nav.mouseenter(function () {
                $($this.attr('href')).hide();
            });
$background.mouseenter(function(){
    $panels.hide();
});
        });
    });

});


// スライドショー
$(function () {
    $('.slideshow').each(function () {
        var $container = $(this),
            $slideGroup = $container.find('.slideshow-slides'),
            $slides = $slideGroup.find('.slide'),
            $nav = $container.find('.slideshow-nav'),
            $indicator = $container.find('.slideshow-indicator'),
            slideCount = $slides.length,
            indicatorHTML = '',
            currentIndex = 0,
            duration = 500,
            easing = 'easeInOutExpo',
            interval = 7500,
            timer;

        $slides.each(function (i) {
            $(this).css({ left: 100 * i + '%' });
            indicatorHTML += '<a href="#">' + (i + 1) + '</a>';
        });
        $indicator.html(indicatorHTML);

        function goToSlide(index) {
            $slideGroup.animate({ left: -100 * index + '%' }, duration, easing);
            currentIndex = index;
            updateNav();
        }
        function updateNav() {
            var $navPrev = $nav.find('.prev'),
                $navNext = $nav.find('.next');
            if (currentIndex === 0) {
                $navPrev.addClass('disabled');
            } else {
                $navPrev.removeClass('disabled');
            }
            if (currentIndex === slideCount - 1) {
                $navNext.addClass('disabled');
            } else {
                $navNext.removeClass('disabled');
            }
            $indicator.find('a').removeClass('active');
            $indicator.find('a').eq(currentIndex).addClass('active');
        }
        function startTimer() {
            timer = setInterval(function () {
                var nextIndex = (currentIndex + 1) % slideCount;
                goToSlide(nextIndex);
            }, interval);
        }
        function stopTimer() {
            clearInterval(timer);
        }
        $nav.on('click', 'a', function (event) {
            event.preventDefault();
            if ($(this).hasClass('prev')) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex + 1);
            }
        });
        $indicator.on('click', 'a', function (event) {
            event.preventDefault();
            if (!$(this).hasClass('active')) {
                goToSlide($(this).index());
            }
        });
        $container.on({
            mouseenter: stopTimer,
            mouseleave: startTimer
        });
        goToSlide(currentIndex);
        startTimer();
    });
});

// テキストアニメーション
$(function () {
    var $messageSlide = $('.message'),
        $this = $messageSlide,
        $pause = $('.btn-pause'),
        $play = $('.btn-play'),
        $label = $this.find('label');

    $messageSlide.each(function () {
        slideLeft();
        function slideLeft() {
            $this.animate({ left: '-165%' }, 40000, resetLeft
            );
        }
        function resetLeft() {
            $this.animate({ left: '98%' }, 1, slideLeft);
        }
        $pause.on('click', function () {
            $this.pause();
            $pause.addClass('off');
            $play.removeClass('off');
        });
        $play.on('click', function () {
            $this.resume();
            $pause.removeClass('off');
            $play.addClass('off');
        });

        $label.mouseenter(function () {
            $this.pause();
        });
        $label.mouseleave(function () {
            $this.resume();
        });

    });
});

// ボタンアニメーション
$(function () {
    var $sectionBox = $('.section-box'),
        $arrowGroup = $('.arrow-box'),
        $arrows = $arrowGroup.find('label');

    $arrows.each(function () {
        $(this).on('click', function () {
            var $this = $(this);
            $($this.attr('href')).slideToggle(500).css({ 'visibility': 'visible' });
        });
    });
});
