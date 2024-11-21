

export default class Marquee {
    /**
     * 
     * @param {DomElement | string} container 
     * @param {number} timing 
     * @param {boolean} reverse 
     */
    constructor(container, timing, reverse = false) {
        this._container = typeof container == 'string' ? document.querySelector(container) : container
        this._timing = timing //second
        this._isReverse = reverse
        this._list = this._container.querySelector('.marquee')
        this._slides = Array.from(this._list.children)
        this._duplicateSlides()
        this._maxTranslate = this._list.lastElementChild.getBoundingClientRect().left - this._container.getBoundingClientRect().width
        this._addSliding()
    }
    _duplicateSlides() {

        const ww = window.innerWidth,
            lastElPos = this._list.lastElementChild.getBoundingClientRect().left,
            minWidth = this._container.getBoundingClientRect().width * 4,
            addCount = Math.ceil(minWidth / lastElPos)
        for (let i = 0; addCount + 1 > i; i++) {

            this._slides.forEach((e) => [
                this._list.append(e.cloneNode(true))
            ])
        }

    }
    _addSliding() {
        if (this._isReverse) {
            this._list.style.transform = `translateX(-${this._maxTranslate}px)`
            this._list.getBoundingClientRect();
        }

        this._sliding()

    }
    _sliding() {
        this._list.style.transition = `transform ${this._timing}s linear`
        if (this._isReverse) {
            this._list.style.transform = `translateX(0px)`

        } else {
            this._list.style.transform = `translateX(-${this._maxTranslate}px)`

        }
        setTimeout(() => {
            console.log('timing');
             this._list.style.transition = `transform 0s linear`
            if (this._isReverse) {
                this._list.style.transform = `translateX(-${this._maxTranslate}px)`

            } else {
                this._list.style.transform = `translateX(0px)`
            }

            this._list.getBoundingClientRect(); // Этот вызов заставляет браузер применить изменения
            // Запускаем анимацию заново
            requestAnimationFrame(() => this._sliding());
        }, this._timing * 1000);
    }



}