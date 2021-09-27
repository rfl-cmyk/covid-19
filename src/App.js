import { useState, useEffect } from 'react';
import './App.css';

import Mapa from './componentes/Mapa';
import GraficoRosca from './componentes/GraficoRosca';
import GraficoLinha from './componentes/GraficoLinha';

function App() {

  const [global, setGlobal] = useState([]);
  const [history, setHistory] = useState([]);
  const [casos, setCasos] = useState([]);

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
      { casos.length && Object.keys(global).length ? <Mapa global={global} casos={casos} /> : null } {/* utilizado devido ao useEffect preencher a variável 'casos' após a renderização do componente */}

      { Object.keys(history).length ? <div className="graficoLinha"><GraficoLinha history={history} /></div> : null }

      { Object.keys(global).length ? <div className="graficoRosca"><GraficoRosca global={global} /></div> : null }
    </div>
  );
}

export default App;
