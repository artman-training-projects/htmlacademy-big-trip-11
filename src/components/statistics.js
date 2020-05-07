import {HIDDEN_CLASS} from '../components/abstract-component';
import AbstractSmartComponent from './abstract-smart-component';

// import {initStatistics} from '../utils/forStatistics';

// import Chart from "chart.js";
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(eventsModel) {
    super();
    this._eventsModel = eventsModel;
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  hide() {
    this.getElement().classList.add(HIDDEN_CLASS);
  }

  show() {
    this.getElement().classList.remove(HIDDEN_CLASS);
  }
}
