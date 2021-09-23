import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import gIcon from '../images/green-icon.png';
import oIcon from '../images/orange-icon.png';
import rIcon from '../images/red-icon.png';

import 'leaflet/dist/leaflet.css';
import './mapa.css';

function Mapa(props) {

    var greenIcon = L.icon({
        iconUrl: gIcon,    
        iconSize:     [15, 15],
        iconAnchor:   [0, 0],
        popupAnchor: [8, 5]
    });

    var orangeIcon = L.icon({
        iconUrl: oIcon,    
        iconSize:     [15, 15],
        iconAnchor:   [0, 0],
        popupAnchor: [8, 5]
    });

    var redIcon = L.icon({
        iconUrl: rIcon,    
        iconSize:     [15, 15],
        iconAnchor:   [0, 0],
        popupAnchor: [8, 5]
    });

    const markerColor = (a, b) => { // função responsável por determinar a cor de cada marcador
        var dados = parseInt(b * 100 / a);
        var icon;

        if (dados >= 10) {
            icon = redIcon;
        } else if (dados <= 9 && dados >= 5){
            icon = orangeIcon;
        } else {
            icon = greenIcon;
        }

        return icon;
    }
  
    return (
        <>

            <div className="mapInfos">
                <h1>Global cases of covid-19</h1>
                <ul>
                    <li>
                        <h3>Population</h3>
                        <h2 className="blue">{props.global.population.toLocaleString('pt-BR')}</h2>
                    </li>
                    <li>
                        <h3>Cases</h3>
                        <h2 className="orange">{props.global.cases.toLocaleString('pt-BR')}</h2>
                    </li>
                    <li>
                        <h3>Deaths</h3>
                        <h2 className="red">{props.global.deaths.toLocaleString('pt-BR')}</h2>
                    </li>
                    <li>
                        <h3>Recovered</h3>
                        <h2 className="green">{props.global.recovered.toLocaleString('pt-BR')}</h2>
                    </li>
                </ul>
            </div>

            <div className="mapSubs">
                <ul>
                    <li><h3>Percentage of Infections</h3></li>
                    <li>(in relation to population)</li>
                    <li><p>Above 10%</p></li>
                    <li><p>Between 5 and 9%</p></li>
                    <li><p>Under 5%</p></li>
                </ul>
            </div>

            <MapContainer minZoom={2} maxZoom={5} center={[ 15, -7 ]} zoom={2} scrollWheelZoom={true}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { props.casos.map(dados => {
                    let localizacao = [ dados.countryInfo.lat, dados.countryInfo.long ]
                    return(
                    <Marker key={dados.country} title={dados.country} riseOnHover={true} icon={markerColor(dados.population, dados.cases)} position={localizacao}>
                        <Popup>
                            <img className="flag" src={dados.countryInfo.flag} alt={dados.country} />
                            <ul>
                                <li><h3>{dados.country}</h3></li>
                                <li><p>&rsaquo; population: <strong>{dados.population.toLocaleString('pt-BR')}</strong></p></li>
                                <li><p>&rsaquo; total cases: <strong>{dados.cases.toLocaleString('pt-BR')}</strong></p></li>
                                <li><p>&rsaquo; total deaths: <strong>{dados.deaths.toLocaleString('pt-BR')}</strong></p></li>
                            </ul>
                        </Popup>
                    </Marker>
                    )
                })}  
            </MapContainer>
        </>
    );
}

export default Mapa;