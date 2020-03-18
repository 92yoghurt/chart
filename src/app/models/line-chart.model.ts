import { Chart } from 'angular-highcharts';

export class LineChart {
  public data: Chart;

  constructor(private series) {
    this.data = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Mn', 'Td', 'Wn', 'Th', 'Fr', 'St', 'Sn']
      },
      credits: {
        enabled: false
      },
      series: series
    });
  }
}
