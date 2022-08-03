const input = document.querySelector('.cpf-validador');
const form = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

function iniciaValidacao() {
    this.pressionaEnter();

};

function pressionaEnter(){
    input.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            this.validaCPF();
        }
    });
};

// 42106668821

function validaCPF() {
    const cpf = input.value;
    if(cpf == ""){
        resultado.innerHTML= "Entrada invalída";
        return;
    }
    const cpfArray = Array.from(cpf);

    const cpfFiltred = cpfArray.filter(value=>Number(value)||value==='0');

    if(isSequeciencia(cpfFiltred)){
        resultado.innerHTML= "CPF invalído";
    }else{
        let primeiroDigito = cpfFiltred.reduce((acumulador,value,index,array)=>{
            if(index>=array.length-2){
                return acumulador;
            }
            return acumulador += (Number(value))*(array.length-1-index);
        },(0));
    
        primeiroDigito = 11-primeiroDigito%11;
    
        primerioDigito = primeiroDigito>9?0:primeiroDigito;
    
        let segundoDigito = cpfFiltred.reduce((acumulador,value,index,array)=>{
            if(index>=array.length-2){
                return acumulador;
            }
            return acumulador += (Number(value))*(array.length-index);
        },(2*primeiroDigito));
    
        segundoDigito = 11-segundoDigito%11;
    
        segundoDigito = segundoDigito>9?0:segundoDigito;
    
        
    
        if(primeiroDigito == cpfFiltred[9] && segundoDigito == cpfFiltred[10]){
            resultado.innerHTML= "CPF valído";
        } else{
            resultado.innerHTML= "CPF invalído";
        }
    }
};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    validaCPF();
});

function isSequeciencia(cpf){
    const sequencia = [];
    for(i=0;i<cpf.length;i++){
       sequencia.push(cpf[0]);
    }
    return (sequencia.toString === cpf.toString); 
}

iniciaValidacao();
