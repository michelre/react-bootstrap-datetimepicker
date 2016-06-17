import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import moment from "moment";
import Constants from "./Constants.js";

export default class DateTimePickerMonths extends Component {
  static propTypes = {
    subtractYear: PropTypes.func.isRequired,
    addYear: PropTypes.func.isRequired,
    viewDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    showYears: PropTypes.func.isRequired,
    setViewMonth: PropTypes.func.isRequired,
    setSelectedMonth: PropTypes.func.isRequired,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    mode: PropTypes.oneOf([Constants.MODE_DATE, Constants.MODE_MONTH, Constants.MODE_DATETIME])
  }

  renderMonths = () => {
    var classes, i, month, months, monthsShort, _minDate, _maxDate;
    const onClick = this.props.mode === Constants.MODE_MONTH ? this.props.setSelectedMonth : this.props.setViewMonth;
    const { minDate, maxDate } = this.props;
    month = this.props.selectedDate.month();
    monthsShort = moment.monthsShort();
    _minDate = (!minDate) ? moment(0) : minDate.clone().startOf('month');
    _maxDate = (!maxDate) ? moment({y: 2999}) : maxDate.clone().startOf('month');
    i = 0;
    months = [];
    while (i < 12) {
      var current = moment(i + 1, 'M').year(this.props.viewDate.year());
      classes = {
        month: true,
        "active": i === month && this.props.viewDate.year() === this.props.selectedDate.year(),
        disabled: !current.isBetween(_minDate, _maxDate, 'month', '[]')
      };
      months.push(<span className={classnames(classes)} key={i} onClick={onClick}>{monthsShort[i]}</span>);
      i++;
    }
    return months;
  }

  render() {
    return (
    <div className="datepicker-months" style={{display: "block"}}>
          <table className="table-condensed">
            <thead>
              <tr>
                <th className="prev" onClick={this.props.subtractYear}><span className="glyphicon glyphicon-chevron-left" /></th>

                <th className="switch" colSpan="5" onClick={this.props.showYears}>{this.props.viewDate.year()}</th>

                <th className="next" onClick={this.props.addYear}><span className="glyphicon glyphicon-chevron-right" /></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="7">{this.renderMonths()}</td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}
