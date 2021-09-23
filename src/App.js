import { useState, useEffect } from 'react';
import './App.css';

import Mapa from './componentes/Mapa';

function App() {

  const [global, setGlobal] = useState([]);
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
      fetch(`https://disease.sh/v3/covid-19/countries`)
        .then(resposta => resposta.json())
        .then(dados => {
          setCasos(dados)
        })
    )
  }, []);

  return (
    <div className="App">
      { casos.length ? <Mapa global={global} casos={casos} /> : null } {/* utilizado devido ao useEffect preencher a variável 'casos' após a renderização do componente */}
    </div>
  );
}

export default App;
