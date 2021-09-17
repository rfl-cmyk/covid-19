import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';

import 'leaflet/dist/leaflet.css';
import './mapa.css';

function Mapa(props) {
    const markerIconConst = L.icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon,
        iconAnchor: [5, 55],
        popupAnchor: [10, -44],
        iconSize: [25, 45],
    });
  
    return (
        <MapContainer minZoom={2} center={[ 15, 30 ]} zoom={3} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            { props.casos.map(dados => {
                let localizacao = [ dados.countryInfo.lat, dados.countryInfo.long ]
                return(
                <Marker key={dados.country} title={dados.country} riseOnHover={true} icon={markerIconConst} position={localizacao}>
                    <Popup>
                        <img className="flag" src={dados.countryInfo.flag} alt={dados.country} />
                        <h3>{dados.country}</h3>
                        <p>&rsaquo; population: <strong>{dados.population.toLocaleString('pt-BR')}</strong></p>
                        <p>&rsaquo; total cases: <strong>{dados.cases.toLocaleString('pt-BR')}</strong></p>
                        <p>&rsaquo; total deaths: <strong>{dados.deaths.toLocaleString('pt-BR')}</strong></p>
                        <hr/>
                        <p>&rsaquo; today cases: <strong>{dados.todayCases.toLocaleString('pt-BR')}</strong></p>
                        <p>&rsaquo; today deaths: <strong>{dados.todayDeaths.toLocaleString('pt-BR')}</strong></p>
                    </Popup>
                </Marker>
                )
            })}  
        </MapContainer>
    );
}

export default Mapa;