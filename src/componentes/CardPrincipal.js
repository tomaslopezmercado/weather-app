import React from 'react'

function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../iconos', false, /\.(png|jpe?g|svg)$/));

function CardPrincipal(props) {
  return (
    <div>
        <div className='cardPrincipal'>
        <div className="ubicacion">{props.ciudad}, {props.pais}</div>
        <div className="fecha">{props.fecha}</div>
         <div className="tiempo"><img src={images[`${props.icono}.png`]} alt ="Icono representativo del tiempo"/>
        {props.condicionDetallada}
        </div>
        <div className="temperatura">{props.temperatura}ºC</div>
        <div className="humedad">Humedad: {props.humedad}%</div>
        <div className="viento">Viento : {props.viento} Km/h</div>
        </div>
    </div>
  )
}

export default CardPrincipal
