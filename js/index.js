const GLOBAL_AVERAGE_TEMPERATURE = 14;

// вызов функции
fetchData().then(parsedData).then(reducedData).then(chartedData);

// функция возврата инфы с ДБ
function fetchData() {
  return fetch('../db.csv').then(response => response.text());
}

// парсит данные в удобный вид
function parsedData(res) {
  return Papa.parse(res, { header: true }).data; // вызвали библиотеку для csv - papaparse
}

// собираем данные в один обьект
function reducedData(data) {
  return data.reduce(
    (accum, item) => {
      accum.year.push(Number(item.Year) + GLOBAL_AVERAGE_TEMPERATURE);
      accum.glob.push(Number(item.Glob) + GLOBAL_AVERAGE_TEMPERATURE);
      accum.nhem.push(Number(item.NHem) + GLOBAL_AVERAGE_TEMPERATURE);
      accum.shem.push(Number(item.SHem) + GLOBAL_AVERAGE_TEMPERATURE);

      return accum;
    },
    { year: [], glob: [], nhem: [], shem: [] },
  );
}

// рисуем на канвасе
function chartedData({ year, glob, nhem, shem }) {
  // передаем ссылку на canvas элемент
  const ctx = document.querySelector('#js-chart').getContext('2d');

  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: year, // передаем значение оси Y
      //   передаем отдельными обьектами значение разных температур
      datasets: [
        {
          label: '# glob temerature',
          data: glob,
          backgroundColor: ['rgba(255, 99, 132, 0.5)'],
          fill: true,
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
        {
          label: '# NHem temerature',
          data: nhem,
          backgroundColor: ['rgba(54, 162, 235, 0.5)'],
          fill: true,
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
        {
          label: '# SHem temerature',
          data: shem,
          backgroundColor: ['rgba(255, 206, 86, 0.5)'],
          fill: true,
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Years',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Average temperatures',
          },
        },
      },
    },
  });
}
