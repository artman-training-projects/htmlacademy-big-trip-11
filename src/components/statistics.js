import AbstractComponent from './abstract-smart-component';
import {createStatisticsTemplate} from './statistics/statisticsTemplate';

import {moneyChart} from './statistics/moneyChart';
import {transportChart} from './statistics/transportChart';
import {timeSpendChart} from './statistics/timeSpendChart';

export const BAR_HEIGHT = 55;

export default class Statistics extends AbstractComponent {
  constructor(eventsModel) {
    super();
    this._eventsModel = eventsModel;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  hide() {
    super.hide();
  }

  show() {
    super.show();
    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();
    const ctxMoney = element.querySelector(`.statistics__chart--money`);
    const ctxTransport = element.querySelector(`.statistics__chart--transport`);
    const ctxTimeSpend = element.querySelector(`.statistics__chart--time`);

    const events = this._eventsModel.getAllEvents();

    this._resetCharts();
    this._moneyChart = moneyChart(ctxMoney, events);
    this._transportChart = transportChart(ctxTransport, events);
    this._timeSpendChart = timeSpendChart(ctxTimeSpend, events);
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeSpendChart) {
      this._timeSpendChart.destroy();
      this._timeSpendChart = null;
    }
  }
}
