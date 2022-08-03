class Formulario{
    constructor(){
        this.formulario =  document.querySelector('.formulario');
        this.eventos();
    }

    eventos(){
       this.formulario.addEventListener('submit',e=>{
        this.handleSubmit(e);
       }) 
    }

    handleSubmit(e){
        e.preventDefault();
        this.checkFields();
       this.checkPasswordFields();
    }

    checkPasswordFields(){
        let valid = true;

        const password = this.formulario.querySelector('.senha');
        const repeatPassword = this.formulario.querySelector('.repetir-senha');

        if(password.value !== repeatPassword.value){
            this.createError(password,"As senhas precisam ser iguais.");
            this.createError(repeatPassword,"As senhas precisam ser iguais.");
            valid = false;
        }

        if(password.value.length<6|| password.value.length>12){
            this.createError(password,"Senha precisa ter entre 6 e 12 caracteres.");
            valid = false;
        }
    }

    checkFields(){
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove();
        }

        for(let field of this.formulario.querySelectorAll('input')){
            if(!field.value){
                const label = field.previousElementSibling.innerText;
                this.createError(field,`Campo ${label} não pode estar em branco.`);
                valid = false
            }

            if(field.classList.contains('cpf')){
                if(!validaCPF(field.value)){
                    this.createError(field,`CPF inválido.`)
                    valid = false;
                }
            }

            if(field.classList.contains('usuario')){
                valid = this.validUsuario(field);
            }
        }

        return valid;
    }

    validUsuario(field){
        const usuario = field.value;

        let valid = true;

        if(usuario.length < 3 || usuario.length>12){
            this.createError(field,"Usuário deverá ter entre 3 e 12 caracteres");
            valid = false;
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.createError(field,"Usuário só poderá conter letras e/ou números");
            valid = false;
        }


        return valid
    }
    

    createError(field,msg){
        const div = document.createElement('div');
        div.innerHTML =  msg;
        div.classList.add('error-text');

        field.insertAdjacentElement('afterend',div);
    }
}

const formulario = new Formulario();