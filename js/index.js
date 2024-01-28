const date = new Date;
let lat, long, hours, minutes

//API horas, e localização
async function callAPIS() {

    hours = date.getHours();
    minutes = date.getMinutes()

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        /* geolocation IS NOT available */
        console.log("geolocation error");
    }


    function success(pos) {
        const crd = pos.coords;

        lat = crd.latitude
        long = crd.longitude

        //console.log(`Your current position is: lat ${lat} & lon ${long}`);

        localizacao()
    }
}

async function localizacao() {
    // pedido à API usando a função fetch ---- não esquecer o await, que só funciona com funções assíncronas!
    let response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=a5e6025f02bfb73d9f950c50cf9d17e4`)

    // o ok refere-se aos códigos 200 -- o circuito funcionou
    if (response.ok) {
        const local = await response.json()
        // console.log(`And you are standing in ${local[0].name}`);
        //console.log(`Exactly at ${hours} hours and ${minutes} minutes of today`);

        texto = `Your current position is: lat ${lat} & lon ${long}. And you are standing in ${local[0].name}. Exactly at ${hours} hours and ${minutes} minutes today.`
        textoFinal = `Your have been present at: lat ${lat} & lon ${long} in ${local[0].name}.`
        textoFinalDois = `Since ${hours} hours and ${minutes} minutes today.`
    } else {
        alert('Local exato erro:' + response.statusText)
    }

    // simulação
    // hours = 1

    if (hours < 6 || hours > 23) {
        timmerWritting = 20
        textMove = 0.9

        timmerClickMin = 40
        timmerClickMax = 150
    } else if (hours < 11) {
        timmerWritting = 300
        textMove = 0.05

        timmerClickMin = 450
        timmerClickMax = 1000
    } else if (hours < 17) {
        timmerWritting = 200
        textMove = 0.1

        timmerClickMin = 200
        timmerClickMax = 310
    } else if (hours < 22) {
        timmerWritting = 80
        textMove = 0.7

        timmerClickMin = 80
        timmerClickMax = 300
    }
}


window.onblur = function () {
    foco = false
};


