import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class RatesTable extends React.Component {

  render() {
    return (
      <div>
        <div>
          <h4> rates on {this.props.dateRates} </h4>
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Currency</th>
              <th>Coder</th>
              <th>Buy</th>
              <th>Sell</th>
            </tr>
          </thead>
          <tbody>
            {this.props.rates.map((rates, i) =>
              <tr key={i}>
                <td>{rates.currency}</td>
                <td>{rates.code}</td>
                <td>{rates.bid}</td>
                <td>{rates.ask}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    );
  }
}
export default RatesTable;