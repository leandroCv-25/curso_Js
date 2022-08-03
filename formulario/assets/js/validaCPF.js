// 42106668821
function validaCPF(cpf) {
    if(cpf == ""){
        return false;
    }

    const cpfArray = Array.from(cpf);

    const cpfFiltred = cpfArray.filter(value=>Number(value)||value==='0');

    

    if(isSequeciencia(cpfFiltred)){
        return false;
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
            return true;
        } else{
            return false;
        }
    }
};

function isSequeciencia(cpf){
    const sequencia = [];
    for(let i=0;i<cpf.length;i++){
      sequencia.push(cpf[0]);
    }
    return (sequencia.toString() == cpf.toString()); 
}
