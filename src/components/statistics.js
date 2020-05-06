import AbstractSmartComponent from './abstract-smart-component';
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class Statistics extends AbstractSmartComponent {
  constructor(eventsModel) {
    super();

    this._eventsModel = eventsModel;
  }

  getTemplate() {
    return;
  }

  hide() {
    //
  }

  show() {
    //
  }
}
