class Validar {
    constructor() {
        this.validacoes = [
            'data-required',
            'data-only-letters',
            'data-min-length',
            'data-max-length',
            'data-required',
            'data-email-validate',
            'data-equal',
            'data-password-validate',
        ]
    }

    validate(form) {
        let limparvalidacoes = document.querySelectorAll('form .error-validation');
        if(limparvalidacoes.length > 0 ){
            this.fecharValidacoes(limparvalidacoes);
        }

        let inputs = form.getElementsByTagName('input');
        let inputsArray = [...inputs];

        inputsArray.forEach(function (input) {
            for (let i = 0; this.validacoes.length > i; i++) {
                if (input.getAttribute(this.validacoes[i]) != null) {
                    let metodo = this.validacoes[i].replace('data-', '').replace('-', '');
                    let value = input.getAttribute(this.validacoes[i]);
                    this[metodo](input, value);
                }
            }
        }, this);

    } 

    required(input){
        let inputValue = input.value;
        if(inputValue === ''){
            let errorMessage = `Este campo é obrigatório`;
            this.printMessage(input, errorMessage);
        }
    }

    minlength(input, minValue){
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
        }
    }

    maxlength(input, maxValue){
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
        if(inputLength > maxValue){
            this.printMessage(input, errorMessage);
        }
    }

    emailvalidate(input){
        let regular = /\S+@\S+\.\S+/;

        let CadastrarEmail = input.value;
        let errorMessage = `Insira um e-mail no padrão XXXX@gmail.com`;

        if(!regular.test(CadastrarEmail)){
            this.printMessage(input, errorMessage);
        }
    }

    onlyletters(input){
        let regular = /^[A-Za-z]+$/;

        let inputValue = input.value
        let errorMessage = `Este campo não aceita números nem caracteres especiais`

        if(!regular.test(inputValue)){
            this.printMessage(input, errorMessage);
        }
    }

    passwordvalidate(input){
        let Arraycrt = input.value.split("");

        let maiusculas = 0;
        let numeros = 0;

        for(let i = 0; Arraycrt.length > i; i++){
            if(Arraycrt[i] === Arraycrt[i].toUpperCase() && isNaN(parseInt(Arraycrt[i]))){
                maiusculas++;
            } else if(!isNaN(parseInt(Arraycrt[i]))){
                numeros++;
            }
        }
        if(maiusculas === 0 || numeros === 0){
            let errorMessage = `A senha precisa conter letra maiúscula e números`
            this.printMessage(input, errorMessage);
        }


    }

    equal(input, inputName){
        let inputCompara = document.getElementsByName(inputName)[0];
        let errorMessage = `Este campo precisa estar igual ao campo ${inputName}`;

        if(input.value != inputCompara.value){
            this.printMessage(input, errorMessage);
        };
    }

    printMessage(input, msg){
        let errorsQtd = input.parentNode.querySelector('.error-validation')
        if(errorsQtd === null){
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');
      
            inputParent.appendChild(template);
        }
    }

    fecharValidacoes(validacoes){
        validacoes.forEach(remover => remover.remove());
    }
}

let form = document.getElementById("registro");
let submit = document.getElementById("btn");
let validar = new Validar();

submit.addEventListener('click', function (e) {
    e.preventDefault();

    validar.validate(form);


});

let btnsenha = document.querySelector('#btn1');
btnsenha.addEventListener('click', ()=>{
    let inputSenha = document.querySelector('#password')
    if(inputSenha.getAttribute('type') == 'password'){
        inputSenha.setAttribute('type', 'text')
    }else{
        inputSenha.setAttribute('type', 'password')
    }
})

let btnConfirm = document.querySelector('#btn2');
btnConfirm.addEventListener('click', ()=>{
    let inputConfirmSenha = document.querySelector('#passwordconfirmation')
    if(inputConfirmSenha.getAttribute('type') == 'password'){
        inputConfirmSenha.setAttribute('type', 'text')
    }else{
        inputConfirmSenha.setAttribute('type', 'password')
    }
})

