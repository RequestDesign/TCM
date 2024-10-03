import $ from 'jquery'
import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import { rem } from '../utils/constants'
import initForms from '../utils/forms'


$(function () {
    initSwipers()
    initForms()
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
    const lastNews = document.querySelector('.news');
    if (lastNews) {
        new Swiper(lastNews.querySelector('.swiper'), {
            modules: [Navigation],
            loop: false,
            slidesPerView: 1,
            spaceBetween: rem(3),
            breakpoints: {
                768: {
                    slidesPerView: 3
                }
            },
            navigation: {
                prevEl: lastNews.querySelector('.swiper-btn-prev'),
                nextEl: lastNews.querySelector('.swiper-btn-next'),
            }
        })
    }
}

