import $ from 'jquery'
import Swiper from 'swiper'
import { Grid, Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { rem } from '../utils/constants'
import initForms from '../utils/forms'


$(function () {
    initSwipers()
    initForms()
    modalsHandler()
    dropDowns()
    initSelect()
    reviewOpener()
})

function initSwipers() {
    const ourProjects = document.querySelector('.our-projects')
    if (ourProjects) {
        new Swiper(ourProjects.querySelector('.swiper'), {
            loop: true,
            modules: [Navigation],
            slidesPerView: 1,
            slidesPerGroup: 1,
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
        const { classList } = ev.target
        if (!classList.contains('modal-closer')) return

        if (classList.contains('modal')) {
            $(ev.target).fadeOut().removeClass('_opened')

        } else {
            $(ev.target.closest('.modal')).fadeOut().removeClass('_opened')

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
        const  target = ev.target
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