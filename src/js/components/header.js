import $ from 'jquery'


$(function () {
    const header = $('.header'),
        headerOpener = header.find('.header__c-btn'),
        headerModal = header.find('.header__c-modal'),
        opened = '_opened',
        html = document.querySelector('html')


    headerOpener.on('click', (ev) => {
        if (!ev.currentTarget.classList.contains(opened)) {
            header.addClass(opened)
            ev.currentTarget.classList.add(opened)
            headerModal.fadeIn().addClass(opened)
            html.classList.add('lock')

        } else {
            header.removeClass(opened)
            ev.currentTarget.classList.remove(opened)
            headerModal.fadeOut().removeClass(opened)
            html.classList.remove('lock')
        }
    })


})