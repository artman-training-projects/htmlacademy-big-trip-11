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
    super.hide();
  }

  show() {
    super.show();
    // this.rerender(this._tasks, this._dateFrom, this._dateTo);
  }

  recoveryListeners() {}

  // rerender(tasks, dateFrom, dateTo) {
  //   this._tasks = tasks;
  //   this._dateFrom = dateFrom;
  //   this._dateTo = dateTo;

  //   super.rerender();

  //   this._renderCharts();
  // }

  // _renderCharts() {
  //   const element = this.getElement();

  //   this._applyFlatpickr(this.getElement().querySelector(`.statistic__period-input`));

  //   const daysCtx = element.querySelector(`.statistic__days`);
  //   const colorsCtx = element.querySelector(`.statistic__colors`);

  //   this._resetCharts();

  //   this._daysChart = renderDaysChart(daysCtx, this._tasks.getTasks(), this._dateFrom, this._dateTo);
  //   this._colorsChart = renderColorsChart(colorsCtx, this._tasks.getTasks());
  // }

  // _resetCharts() {
  //   if (this._daysChart) {
  //     this._daysChart.destroy();
  //     this._daysChart = null;
  //   }

  //   if (this._colorsChart) {
  //     this._colorsChart.destroy();
  //     this._colorsChart = null;
  //   }
  // }

  // _applyFlatpickr(element) {
  //   if (this._flatpickr) {
  //     this._flatpickr.destroy();
  //   }

  //   this._flatpickr = flatpickr(element, {
  //     altInput: true,
  //     allowInput: true,
  //     defaultDate: [this._dateFrom, this._dateTo],
  //     mode: `range`,
  //     onChange: (dates) => {
  //       if (dates.length === 2) {
  //         this.rerender(this._tasks, dates[0], dates[1]);
  //       }
  //     }
  //   });
  // }
}
