function mostraData(){
    const h1 = document.querySelector(".container h1");
    const date = new Date();

    const semana = ["Domingo", "Segunda-feira", "Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
    const mes = ["Janeiro", "Fevereiro", "Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];


    h1.innerHTML = `${semana[date.getDay()]}, ${date.getDate()} de ${mes[date.getMonth()]} de ${date.getFullYear()} ${zeroEsquerda(date.getHours())}:${zeroEsquerda(date.getMinutes())}:${zeroEsquerda(date.getSeconds())}`;
}

function zeroEsquerda(num){
    return num>=10?num:`0${num}`;
}

function mostraDataCurta(){
    const h1 = document.querySelector(".container h1");
    const date = new Date();
    const opcoes = {
        dateStyle: 'full',
        timeStyle: "short",
    };

    h1.innerHTML = date.toLocaleString('pt-BR',opcoes);
}

mostraDataCurta();

