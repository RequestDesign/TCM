import $ from 'jquery'
import Swiper from 'swiper'
import { Grid, Navigation, Mousewheel, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { rem } from '../utils/constants'
import initForms from '../utils/forms'
import { Fancybox } from '@fancyapps/ui'
import Marquee from '../utils/Marquee'


$(function () {
    initSwipers()
    initForms()
    modalsHandler()
    dropDowns()
    initSelect()
    reviewOpener()
    /*  headerScrollLisneter() */
    initFancybox()
    initMarque()
    initCounter()
    initVideos()
})

function initFancybox() {
    const anytarget = document.querySelector('[data-fancybox]')
    if (!anytarget) return



    Fancybox.bind('[data-fancybox]', {
        Thumbs: false,
        Toolbar: {
            display: {
                left: [],
                middle: ["infobar"],
                right: ["close"],
            },
        },
    })
}

function initSwipers() {
    const ourProjects = document.querySelector('.our-projects')
    if (ourProjects) {
        new Swiper(ourProjects.querySelector('.swiper'), {
            loop: true,
            modules: [Navigation, Mousewheel],
            slidesPerView: 1.15,
            mousewheel: true,
            centeredSlides: true,
            initialSlide: 3,
            spaceBetween: rem(3),
            slideActiveClass: 'our-projects-item_active',
            slideNextClass: 'our-projects-item_prev',
            slidePrevClass: 'our-projects-item_next',

            breakpoints: {
                768: {
                    slidesPerView: 4,
                    spaceBetween: 0,

                }
            },
            navigation: {
                prevEl: ourProjects.querySelector('.swiper-btn-prev'),
                nextEl: ourProjects.querySelector('.swiper-btn-next'),
            }


        })

    }
    const lastNews = document.querySelector('.last-news');
    if (lastNews) {
        new Swiper(lastNews.querySelector('.swiper'), {
            modules: [Navigation, Grid],
            loop: false,
            slidesPerView: 1,
            spaceBetween: rem(3),
            grid: { rows: 2, fill: 'row' },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    grid: { rows: 1 },
                }
            },
            navigation: {
                prevEl: lastNews.querySelector('.swiper-btn-prev'),
                nextEl: lastNews.querySelector('.swiper-btn-next'),
            }
        })
    }
    const projectsDetail = document.querySelector('.projects-detail-top')
    if (projectsDetail) {
        new Swiper(projectsDetail.querySelector('.swiper'), {
            loop: true,
            modules: [Navigation, Autoplay, EffectFade],
            slidesPerView: 1,
            fadeEffect: {
                crossFade: true
            },
            effect: "fade",
            spaceBetween: rem(3),
            autoplay: true,
            navigation: {
                prevEl: projectsDetail.querySelector('.swiper-btn-prev'),
                nextEl: projectsDetail.querySelector('.swiper-btn-next'),
            }


        })

    }
    const cardProject = document.querySelectorAll('.card-project')
    if (cardProject) {
        cardProject.forEach(e => {
            new Swiper(e.querySelector('.swiper'), {
                modules: [Navigation],
                slidesPerView: 1,
                spaceBetween: rem(3),
                simulateTouch: false,
                navigation: {
                    prevEl: e.querySelector('.swiper-btn-prev'),
                    nextEl: e.querySelector('.swiper-btn-next'),
                }


            })
        })


    }
    const recomendation = document.querySelector('.recomendation__c-slider')
    if (recomendation) {
        new Swiper(recomendation.querySelector('.swiper'), {
            modules: [Navigation],
            slidesPerView: 1.2,
            centeredSlides: true,
            spaceBetween: rem(3),
            navigation: {
                prevEl: recomendation.querySelector('.swiper-btn-prev'),
                nextEl: recomendation.querySelector('.swiper-btn-next'),
            }


        })



    }
}

function modalsHandler() {


    const modalOpeners = $('.modal-opener'),
        modalClosers = $('.modal-closer'),
        html = $('html')


    if (!modalOpeners || !modalClosers) return

    modalOpeners.on('click', (ev) => {
        const { modal } = ev.currentTarget.dataset

        $(`.modal-${modal}`)
            .fadeIn()
            .addClass('_opened')
        html.addClass('lock')
    })


    modalClosers.on('click', (ev) => {

        const { classList } = ev.target;
        console.log(classList.contains('modal-closer'));
        if (!classList.contains('modal-closer')) return

        if (classList.contains('modal')) {
            $(ev.target).fadeOut().removeClass('_opened')

        } else {

            $(ev.target.closest('.modal')).fadeOut().removeClass('_opened')
            if ($(ev.target.closest('.header-mobile'))) {
                $(ev.target.closest('.header-mobile')).removeClass('_opened')
            }
        }
        html.removeClass('lock')
    })
}

function dropDowns() {
    const ddBtn = $('.drop-down-target')
    if (!ddBtn) return

    ddBtn.on('click', (e) => {
        e.preventDefault()
        e.currentTarget.classList.toggle('_opened')
        e.currentTarget.closest('.drop-down-container')
            .classList.toggle('_opened')
    })

}

const inputChange = new Event('input')

function initSelect() {


    const selects = document.querySelectorAll('.select')
    if (!selects) return

    selects.forEach((select) => {
        const options = select.querySelectorAll('.select__items-list-e')

        options.forEach((option) => {
            option.addEventListener('click', (ev) => {
                const input = select.querySelector('.select__target-input')
                /**
                * 1. присваивание нового значения инпуту на прямую
                * (значение для инпута берется из data-value или textContent кнопки)
                * 
                * 2. тригер input ивента на инпуте для тригера валидации формы и записи новго значения
                * 
                * 3-4. переключение дизейбла у кнопок
                * 
                * 5. тригер дропдауна для закрытия
                */

                input.value = ev.target.dataset.value || ev.target.textContent
                input.dispatchEvent(inputChange)
                options.forEach((btn) => btn.removeAttribute('disabled'))
                ev.target.setAttribute('disabled', 'true')

                select.querySelector('.drop-down-target').click()

            })
        })

    })



}

function reviewOpener() {
    //работать только при загрузке страницы на мобиле

    if (!document.querySelector('.news-cards__c-list') || window.innerWidth >= 769) return


    const container = $('.card-news__info'),
        textContainerSelector = '.card-news__info-body',
        textSelector = '.card-news__info-body-text',
        shortenedTextSelecor = '_closed',
        maxHeight = 150

    document.querySelectorAll(textSelector).forEach((e) => {
        if (e.offsetHeight > maxHeight) {
            e = $(e)
            e.addClass(shortenedTextSelecor)
            console.log(e.closest(textContainerSelector));
            e.closest(textContainerSelector)
                .append(`<button href="#" class="card-news__loadmore txt16 txt-up flex-row">
                    подробнее
    </button>`)
        }

    })

    container.on('click', (ev) => {

        console.log();
        if (!ev.target.classList.contains('card-news__loadmore')) return
        const target = ev.target
        const parent = target.closest(textContainerSelector)

        if (!ev.target.classList.contains('_opened')) {
            ev.target.classList.add('_opened')
            parent.querySelector(textSelector)
                .classList.remove(shortenedTextSelecor)
            target.textContent = 'свернуть'


        } else {
            ev.target.classList.remove('_opened')
            parent.querySelector(textSelector)
                .classList.add(shortenedTextSelecor)
            target.textContent = 'подробнее'
        }



    })

}

function headerScrollLisneter() {

    const header = document.querySelector('.header')
    if (!header) return

    window.addEventListener('scroll', (e) => {
        if (window.innerWidth < 769) return

        if (scrollY > 0) {
            header.classList.add('_cliped')


        } else {

            header.classList.remove('_cliped')

        }



    })
}

function initMarque() {
    const target = document.querySelector('.clients');
    if (!target) return
    new Marquee(target, window.innerWidth > 768 ? 400 : 180)

    const reverse = document.querySelector('.clients._rev');
    if (!reverse) return
    new Marquee(reverse, window.innerWidth > 768 ? 400 : 180, true)

}

function initCounter() {
    const target = document.querySelector('.counter')
    if (!target) return

    const counts = Array.from(target.querySelectorAll('[data-counter]'))

    function onScroll() {
        if (window.innerHeight - 200 > target.getBoundingClientRect().top) {
            counts.forEach(countEl => startCounter(countEl));
            window.removeEventListener('scroll', onScroll);
        }
    }

    window.addEventListener('scroll', onScroll);

    function startCounter(countEl) {
        const val = parseInt(countEl.dataset.counter, 10); // Считываем конечное значение
        countEl.textContent = 0;

        let currentVal = 0;
        const duration = 3000; // Длительность анимации в миллисекундах
        const interval = 50; // Интервал обновления значения
        const step = val / (duration / interval); // Шаг увеличения

        const counterInterval = setInterval(() => {
            currentVal += step;
            if (currentVal >= val) {
                countEl.textContent = val; // Устанавливаем конечное значение
                clearInterval(counterInterval); // Останавливаем интервал
            } else {
                countEl.textContent = Math.floor(currentVal); // Устанавливаем текущее значение
            }
        }, interval);
    }
}

function initVideos() {
    const vidos = document.querySelectorAll('.section-bg-img-video');
    if (vidos) {
        vidos.forEach((el) => {
            const video = el.querySelector('video'),
                placeholder = el.querySelector('img')

            if (placeholder) {

                video.addEventListener('canplay', () => {
                    console.log('hello');
                    placeholder.style.display = 'none';
                    video.style.display = 'flex';
                })
            }

        })

    }
}