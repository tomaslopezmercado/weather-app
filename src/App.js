import React, { Component } from 'react'
import CardPrincipal from './componentes/CardPrincipal';

const api_key = 'd5d873cb391a110855a518b631c09879';


const dateBuilder = (d) => {
    let months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",];
    let days = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado",];
        
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
        
    return `${day} ${date}` + " de " + `${month}` + ", " + `${year}`;
}; 

const conversorUnidades = (valor) =>{
    let resultado = (valor/1000)*3600
    return resultado.toFixed(2);
}

const getIcono = (valor) =>{
  
  let icono;

  switch(valor){
    case 'Thunderstorm':
      icono = 'tormenta'
      break;
    case 'Drizzle':
      icono = 'llovizna'
      break;
    case 'Rain':
      icono = 'lluvia'
      break;
    case 'Snow':
      icono = 'nieve'
      break;
    case 'Atmosphere':
      icono = 'atmosphere'
      break;
    case 'Clear':
      icono = 'despejado'
      break;
    case 'Clouds':
      icono ='nublado'
      break;
  }

  return icono;
}

const traduccion = (condition) => {
  let condicion;
  switch (condition) {
    case "thunderstorm with light rain":
      condicion = "Tormentas con lluvias ligeras";
      break;
    case "thunderstorm with rain":
      condicion = "Tormentas con lluvias";
      break;
    case "thunderstorm with heavy rain":
      condicion = "Tormentas con lluvias intensas";
      break;
    case "light thunderstorm":
      condicion = "Tormentas ligeras";
      break;
    case "thunderstorm":
      condicion = "Tormentas";
      break;
    case "heavy thunderstorm":
      condicion = "Tormentas intensas";
      break;
    case "ragged thunderstorm	":
      condicion = "Tormentas irregulares";
      break;
    case "thunderstorm with light drizzle":
      condicion = "Tormentas con ligeras lloviznas";
      break;
    case "thunderstorm with drizzle":
      condicion = "Tormentas con lloviznas";
      break;
    case "thunderstorm with heavy drizzle":
      condicion = "Tormentas con lloviznas intensas";
      break;
    case "light intensity drizzle":
      condicion = "Lloviznas ligeras";
      break;
    case "drizzle":
      condicion = "Lloviznas";
      break;
    case "heavy intensity drizzle":
      condicion = "Lloviznas intensas";
      break;
    case "light intensity drizzle rain":
      condicion = "Lloviznas ligeras";
      break;
    case "drizzle rain":
      condicion = "Lloviznas";
      break;
    case "heavy intensity drizzle rain":
      condicion = "Llvozinas intensas";
      break;
    case "shower rain and drizzle":
      condicion = "LLoviznas";
      break;
    case "heavy shower rain and drizzle":
      condicion = "Lloviznas";
      break;
    case "shower drizzle":
      condicion = "Lloviznas";
      break;
    case "light rain":
      condicion = "LLuvia ligera";
      break;
    case "moderate rain":
      condicion = "Lluvia moderada";
      break;
    case "heavy intensity rain":
      condicion = "Lluvias intensas";
      break;
    case "very heavy rain":
      condicion = "LLuvias muy intensas";
      break;
    case "extreme rain":
      condicion = "Lluvias extremas";
      break;
    case "freezing rain":
      condicion = "Lluvia gélida";
      break;
    case "light intensity shower rain":
      condicion = "Chubascos ligeros";
      break;
    case "shower rain":
      condicion = "Chubascos";
      break;
    case "heavy intensity shower rain":
      condicion = "Chubascos intensos";
      break;
    case "ragged shower rain":
      condicion = "Chubascos intensos irregulares";
      break;
    case "light snow":
      condicion = "Nieve ligera";
      break;
    case "Snow":
      condicion = "Nieve";
      break;
    case "Heavy snow":
      condicion = "Nive intensa";
      break;
    case "Sleet":
      condicion = "Aguanieve";
      break;
    case "Shower sleet":
      condicion = "Chubascos de aguanieve";
      break;
    case "Light rain and snow":
      condicion = "LLuvias ligeras y nieve";
      break;
    case "Rain and snow":
      condicion = "Lluvia y nieve";
      break;
    case "Light shower snow":
      condicion = "Chubascos de aguanieve ligeros";
      break;
    case "Shower snow":
      condicion = "Chubascos de nieve";
      break;
    case "Heavy shower snow":
      condicion = "Chubascos de nieve intensos";
      break;
    case "mist":
      condicion = "Neblina";
      break;
    case "Smoke":
      condicion = "Humo";
      break;
    case "Haze":
      condicion = "Calina";
      break;
    case "sand/ dust whirls":
      condicion = "Remolinos de arena/polvo";
      break;
    case "fog":
      condicion = "Niebla";
      break;
    case "sand":
      condicion = "Arena";
      break;
    case "dust":
      condicion = "Polvo";
      break;
    case "volcanic ash":
      condicion = "Ceniza volcánica";
      break;
    case "squalls":
      condicion = "Chubascos";
      break;
    case "tornado":
      condicion = "Tornados";
      break;
    case "clear sky":
      condicion = "Cielo despejado";
      break;
    case "few clouds: 11-25%":
      condicion = "Algunas nubes";
      break;
    case "scattered clouds: 25-50%":
      condicion = "Nubes dispersas";
      break;
    case "broken clouds: 51-84%":
      condicion = "Nubes fragmentadas";
      break;
    case "overcast clouds: 85-100%":
      condicion = "Nublado";
      break;
  }
  return condicion;
};



export default class App extends Component {
    
    constructor(){
        super();
        this.state = {
           ciudad: undefined,
           pais: undefined,
           temperatura: undefined,
           viento: undefined,
           humedad: undefined,
           fecha: undefined,
           condicionDetallada: undefined,
           condition: undefined,
           icono: undefined
        };
       this.getWeather();
    }

  

    getWeather = async () => {
        const api_call = await fetch (
            `http://api.openweathermap.org/data/2.5/weather?lat=-34.599722&lon=-58.381944&appid=${api_key}`
        );

        const response = await api_call.json();


        this.setState({
          ciudad: response.name,
          pais: response.sys.country,
          temperatura: Math.round((response.main.temp)-273.15),
          viento: conversorUnidades(response.wind.speed),
          humedad: response.main.humidity,
          fecha: dateBuilder(new Date()),
          condicionDetallada: traduccion(response.weather[0].description),
          condition: response.weather[0].main,
          icono: getIcono(response.weather[0].main)
        })
        console.log(response.weather[0].main)
    }


    
  render() {
    return (
      <CardPrincipal
      ciudad = {this.state.ciudad}
      pais = {this.state.pais}
      temperatura = {this.state.temperatura}
      viento = {this.state.viento}
      humedad = {this.state.humedad}
      fecha = {this.state.fecha}
      condicionDetallada = {this.state.condicionDetallada}
      icono = {this.state.icono}
      />
    )
    
  }
}