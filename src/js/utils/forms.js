
export default class Form {

    constructor(formDomEl, submitFoo) {
        this._form = formDomEl
        this.submitForm = submitFoo
        this._inputs = Array.from(this._form.querySelectorAll('input'))
        this._inputsData = this._createInputData(this._inputs)
        /*  this._btnSubmit = this._form.querySelector('button[type="submit"]')
            this._btnSubmit.setAttribute('disabled', true) */
        this._inputContainerSelector = 'form-input'
        this._inputErrorMsgSelector = 'form-input-txt-error'
        this._inputErrorSelector = '_error'
        this.initForm()
    }
    _validation(inputTarget) {

        const target = inputTarget
        this._inputsData[target.name].value = target.value;


        //валидация инпутов
        switch (target.name) {
            case 'name':
                this._checkInputValid(target, /^[A-Za-zА-Яа-яЁё]+$/, 'Допустим ввод только букв')
                break;
            case 'secondName':
                this._checkInputValid(target, /^[A-Za-zА-Яа-яЁё]+$/, 'Допустим ввод только букв')
                break;

            /*  case 'email':
                 this._checkInputValid(target, /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Поле должно быть в формате email@domain.com')
                 break; */


            case 'phone':
                this._checkInputValid(target, /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Формат номера телефона +7 (888) 888-88-88')
                break;



            default:
                this._checkInputValid(target)
                break;
        }

        for (const name of Object.keys(this._inputsData)) {
            if (!this._inputsData[name].isValid) {
                return
            }
        }

    }

    _onSubmit(evt) {
        evt.preventDefault();
        for (const inp of Object.keys(this._inputsData)) {
            if (this._inputsData[inp].isValid == false) {
                this._inputs.forEach(e => { this._validation(e) })
                return
            }
        }

        this.submitForm(this._inputsData)
        //после сабмита
        const inputs = this._form.querySelectorAll('.' + this._inputContainerSelector + ' input');
        inputs.forEach(input => {
            input.value = '';
        });

        this._inputsData = this._createInputData(this._inputs)
    }

    _checkInputValid(target, regex = null, regexMsg = 'че то не так написал, исправляй') {

        if (!this._inputsData[target.name].isRequired) return


        const inputContainer = target.closest('.' + this._inputContainerSelector);
        const errorMsg = inputContainer.querySelector('.' + this._inputErrorMsgSelector);

        if (this._inputsData[target.name].isRequired && !this._inputsData[target.name].value) {
            //check requred

            inputContainer.classList.add(this._inputErrorSelector);
            errorMsg.textContent = 'Это поле обязательно.'
            this._inputsData[target.name].isValid = false


        } else if (target.getAttribute('type') == 'checkbox' || target.getAttribute('type') == 'radio') {
            //check for checkbox and radio

            this._inputsData[target.name].isValid = !this._inputsData[target.name].isRequired ? true : target.checked
            if (!target.checked) {
                inputContainer.classList.add(this._inputErrorSelector);
            } else {
                inputContainer.classList.remove(this._inputErrorSelector);
            }


        } else if (regex && !regex.test(target.value)) {
            //check regex
            inputContainer.classList.add(this._inputErrorSelector);
            errorMsg.textContent = regexMsg
            this._inputsData[target.name].isValid = false


        } else {
            //validation successfull
            this._inputsData[target.name].isValid = true
            inputContainer.classList.remove(this._inputErrorSelector)
            errorMsg.textContent = ' '
        }


    }


    _createInputData(inputs) {

        return inputs.reduce((acc, curr) => {
            if (!acc[curr.name]) {
                acc[curr.name]
                acc[curr.name] = { value: curr.dataset.defaultv ? curr.dataset.defaultv : '', isValid: curr.dataset.required ? false : true, isRequired: curr.dataset.required ? true : false }
            }
            return acc
        }, {})


    }

    initForm() {
        this._form.noValidate = true
        this._form.addEventListener('submit', (e) => this._onSubmit(e))
        this._inputs.forEach(el => {
            el.addEventListener('input', (e) => this._validation(e.target))
            el.addEventListener('blur', (e) => this._validation(e.target))
        })

    }

}
