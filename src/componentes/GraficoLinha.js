import { Line } from 'react-chartjs-2';

function GraficoLinha({ history }) {

      const data = {
        labels: ['Jan', 'Jul', 'Jan/2021', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Cases',
            data: [
              history.cases["1/22/20"],
              history.cases["7/22/20"],
              history.cases["1/22/21"],
              history.cases["7/22/21"],
              history.cases["8/4/21"]
            ],
            fill: false,
            backgroundColor: 'rgb(253, 180, 47)',
            borderColor: 'rgba(253, 180, 47, 0.9)',
          },
          {
            label: 'Recovered',
            data: [
              history.recovered["1/22/20"],
              history.recovered["7/22/20"],
              history.recovered["1/22/21"],
              history.recovered["7/22/21"],
              history.recovered["8/4/21"]
            ],
            fill: false,
            backgroundColor: 'rgb(90, 197, 87)',
            borderColor: 'rgba(90, 197, 87, 0.9)',
          },
          {
            label: 'Deaths',
            data: [
              history.deaths["1/22/20"],
              history.deaths["7/22/20"],
              history.deaths["1/22/21"],
              history.deaths["7/22/21"],
              history.deaths["8/4/21"]
            ],
            fill: false,
            backgroundColor: 'rgb(253, 87, 86)',
            borderColor: 'rgba(253, 87, 86, 0.9)',
          }
        ],
      };

    return <Line data={data} />
};

export default GraficoLinha;