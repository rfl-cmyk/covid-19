import { useState, useEffect } from 'react';
import './App.css';

import PulseLoader from "react-spinners/PulseLoader";

import Mapa from './componentes/Mapa';
import GraficoRosca from './componentes/GraficoRosca';
import GraficoLinha from './componentes/GraficoLinha';

function App() {

  const [global, setGlobal] = useState([]);
  const [history, setHistory] = useState([]);
  const [casos, setCasos] = useState([]);

  const [loading, setLoading] = useState(false)

  useEffect(() => { // loading da página
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    return(
      fetch(`https://disease.sh/v3/covid-19/all`)
        .then(resposta => resposta.json())
        .then(dados => {
          setGlobal(dados)
        })
    )
  }, []);

  useEffect(() => {
    return(
      fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=all`)
        .then(resposta => resposta.json())
        .then(dados => {
          setHistory(dados)
        })
    )
  }, []);

  useEffect(() => {
    return(
      fetch(`https://disease.sh/v3/covid-19/countries`)
        .then(resposta => resposta.json())
        .then(dados => {
          setCasos(dados)
        })
    )
  }, []);

  return (
    <div className="App">
      {
        loading ? <div className="loader"><PulseLoader color={"#1e4d6f"} loading={loading} size={15} /></div>
        :
        <>
          { casos.length && Object.keys(global).length ? <Mapa global={global} casos={casos} /> : null } {/* utilizado devido ao useEffect preencher a variável 'casos' após a renderização do componente */}

          { Object.keys(history).length ? <div className="graficoLinha"><GraficoLinha history={history} /></div> : null }

          { Object.keys(global).length ? <div className="graficoRosca"><GraficoRosca global={global} /></div> : null }

          <div className="rodape">
            <p><strong>Toolbox:</strong>&nbsp;
              <a href="https://www.npmjs.com/package/react-spinners" rel="noreferrer" target="_blank">react-spinners (loading)</a>,&nbsp;
              <a href="https://disease.sh/" rel="noreferrer" target="_blank">disease.sh (covid api)</a>,&nbsp;
              <a href="https://react-leaflet.js.org/" rel="noreferrer" target="_blank">Leaflet (map)</a> and&nbsp;
              <a href="https://github.com/reactchartjs/react-chartjs-2" rel="noreferrer" target="_blank">React-chartjs2 (graphics)</a>
            </p>
          </div>
        </>
      }
    </div>
  );
}

export default App;
