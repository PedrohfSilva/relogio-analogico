//Ponteiros do relógio
window.addEventListener('load', changeSeconds);
window.addEventListener('load', changePointer);

window.setInterval(changeSeconds, 20);
function changeSeconds() {
    var botao = document.querySelector("input#botao");
    var pointSecond = document.querySelector('div#base-segundo');
    var pointSecondAudio = document.querySelector('div#base-segundo-audio');
    time = new Date();
    var anguloSegundo = 6*time.getSeconds()+0.006*time.getMilliseconds();
    pointSecondAudio.style.transform = `translate(-50%, -50%) rotate(${anguloSegundo}deg)`;
    if(botao.checked) {
        pointSecond.style.display = 'block';
        pointSecondAudio.style.display = 'none';
    } else {
        pointSecond.style.display = 'none';
        pointSecondAudio.style.display = 'block';
    }
}

var audio = document.createElement('audio');
audio.setAttribute('src', 'audio.mp3');

window.setInterval(changePointer, 1000);
function changePointer() {
    var botao = document.querySelector("input#botao");
    var pointHour = document.querySelector("div#base-hora");
    var pointMinute = document.querySelector('div#base-minuto');
    var pointSecond = document.querySelector('div#base-segundo');

    var time = new Date();
    var anguloHora = 30*time.getHours()+0.5*time.getMinutes();
    var anguloMinuto = 6*time.getMinutes()+0.1*time.getSeconds();
    var anguloSegundo = 6*(time.getSeconds()+1);

    if(botao.checked) {
        audio.play();
    }
    
    pointHour.style.transform = `translate(-50%, -50%) rotate(${anguloHora}deg)`;
    pointMinute.style.transform = `translate(-50%, -50%) rotate(${anguloMinuto}deg)`;
    pointSecond.style.transform = `translate(-50%, -50%) rotate(${anguloSegundo}deg)`;

    if(time.getHours() < 12) {
        document.getElementById("am-pm").innerHTML = "AM";
    }
    else {
        document.getElementById("am-pm").innerHTML = "PM";
    }

    let dataAtual = document.querySelector('div#data');
    let relogioDigital = document.querySelector('div#relogioDigital');

    var horas = String(time.getHours()).padStart(2, 0);
    var minutos = String(time.getMinutes()).padStart(2, 0);
    var segundos = String(time.getSeconds()).padStart(2,0);

    var dia = String(time.getDate()).padStart(2, 0);
    var mes = String(time.getMonth()+1).padStart(2, 0);
    var dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    dataAtual.innerText = `Data: ${dia}/${mes}/${time.getFullYear()} - ${dias[time.getDay()]}`;
    relogioDigital.innerText = `${horas}:${minutos}:${segundos}`;
}


//Separação dos segundos
function posicao(angulo, seno, cosseno, elemento) {
    let vertical = 50-Math.abs(seno*49.4)
    let horizontal = 50-Math.abs(cosseno*49.4)
    if(angulo<90) {
        elemento.style.top = `${vertical}%`
        elemento.style.right = `${horizontal}%`
        elemento.style.transform = `translate(50%, -50%) rotate(${360-angulo}deg)`
    }
    else if(angulo<180) {
        elemento.style.top = `${vertical}%`
        elemento.style.left = `${horizontal}%`
        elemento.style.transform = `translate(-50%, -50%) rotate(${360-angulo}deg)`
    }
    else if(angulo<270) {
        elemento.style.bottom = `${vertical}%`
        elemento.style.left = `${horizontal}%`
        elemento.style.transform = `translate(-50%, 50%) rotate(${360-angulo}deg)`
    }
    else {
        elemento.style.bottom = `${vertical}%`
        elemento.style.right = `${horizontal}%`
        elemento.style.transform = `translate(50%, 50%) rotate(${360-angulo}deg)`
    }
}

window.addEventListener('load', separa)
function separa() {
    let relogio = document.getElementById('relogio')
    let tracos = document.createElement('div')
    tracos.setAttribute('id', 'tracos')

    relogio.appendChild(tracos)
    for(let i=0; i<60; i++) {
        let traco = document.createElement('div')
        traco.style.position = 'absolute'
        tracos.appendChild(traco)
        let radToDeg = Math.PI/180
        let seno = Math.sin(i*6*radToDeg)
        let cosseno = Math.cos(i*6*radToDeg)
        posicao(i*6, seno, cosseno, traco)

        traco.style.width = '1.2%'
        traco.style.height = '0.3%'
        traco.style.backgroundColor = '#333'
        if(i % 5 == 0) {
            traco.style.backgroundColor = '#222'
            traco.style.height = '0.6%'
        }
    }
}