import $ from 'jquery'
import Swiper from 'swiper'
import { Grid, Navigation, Pagination } from 'swiper/modules'
import { rem } from '../utils/constants'
import initForms from '../utils/forms'


$(function () {
    initSwipers()
    initForms()
    modalsHandler()
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
            breakpoints: {
                768: {
                    slidesPerView: 3,
                   
                }
            },
            navigation: {
                prevEl: lastNews.querySelector('.swiper-btn-prev'),
                nextEl: lastNews.querySelector('.swiper-btn-next'),
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
