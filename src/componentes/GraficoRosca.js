import { Doughnut } from 'react-chartjs-2';

function GraficoRosca({ global }) {

    var totalDeaths = global.deaths * 100 / global.cases;
    var totalRecovered = global.recovered * 100 / global.cases;

    const data = {
        labels: [
          'Cases',
          `Recovered (${totalRecovered.toFixed(2)}%)`,
          `Deaths (${totalDeaths.toFixed(2)}%)`
        ],
        datasets: [
          {
            data: [
              global.cases,
              global.recovered,
              global.deaths
            ],
            backgroundColor: [
              'rgba(255, 165, 0, 0.8)',
              'rgba(51, 186, 50, 0.8)',
              'rgba(255, 49, 49, 0.8)'
            ],
            borderColor: [
              'rgba(255, 165, 0, 1)',
              'rgba(51, 186, 50, 1)',
              'rgba(255, 49, 49, 1)'
            ],
            borderWidth: 1,
          },
        ],
      };
    
      return( <Doughnut data={data} /> )
};

export default GraficoRosca;