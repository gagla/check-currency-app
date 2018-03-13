//GRADUATE GFT PROGRAMME - Agnieszka Wawrzyniak

//app created with npx create-react-app my-app
//axios installed by the command 'npm install -D axios'
//bootstrap installed by the command 'npm install -D bootstrap'


import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// displaying the current rates table from nbp api

const RatesTable = (props) => {

  return (
      <div className="col-8">
        <div>
          <h4> rates on {props.dateRates} </h4>
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Currency</th>
              <th>Code</th>
              <th>Sell</th>
              <th>Buy</th>
            </tr>
          </thead> 
          <tbody>
            {props.rates.map((rates,i) => 
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

// displaying search results (DESC order) table with # of last rates of chosen currency. User specifies the # of rates and the currency code.  

const SearchResults = (props) => {

  let topratesArray = props.toprates.map((toprates,i) => 
    <tr key={i}>
      <td>{toprates.no}</td>
      <td>{toprates.effectiveDate}</td>
      <td>{toprates.bid}</td>
      <td>{toprates.ask}</td>
    </tr>);
  
  return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Sell</th>
            <th>Buy</th>
          </tr>
        </thead> 
        <tbody>
       {topratesArray.reverse()}
        </tbody>
      </table>
  );
}

//displaying current time refreshing every 1000ms

class Clock extends React.Component {
  state = {
    time: ''
  }

  componentDidMount() {
    this.clock = setInterval(() => this.tick(),
      1000
    );
  }
  //unmounting not necessary - clock ticks all the time ;)

  // componentWillUnmount() {
  //   clearInterval(this.clock);
  // }

  tick() {
    const time = new Date().toLocaleTimeString()
    this.setState({time}); 
    // console.log('Actual time: ', this.state.time);
  }
 
  render() {
    return (
        <h4 className="text-center">current time:  {this.state.time} </h4>
    );
  }
} 

class App extends React.Component {
  state = {
    rates: [],
    toprates: [],
    topCount: '10',
    code: 'USD',
    dateRates:'',
  }
  //grabbing data from the first url form nbp api website to display the table with various currencies when app is loaded
  componentDidMount() {
    axios.get(`http://api.nbp.pl/api/exchangerates/tables/C/last`)
      .then(res => {
        const rates = res.data[0].rates;
        const dateRates = res.data[0].effectiveDate;
        this.setState({ rates, dateRates});
        console.log('The date of the currencies rates table ' + dateRates);
        console.log('Rates from the table ', rates);
      }
      );
  }
    //grabbing data from the second url form nbp api website to display the table with the # of last rates and selected currency chosen by the user; data is loaded when the user submits the form

  handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`http://api.nbp.pl/api/exchangerates/rates/C/${this.state.code}/last/${this.state.topCount}/`)
    .then(resp => {
      const toprates = resp.data.rates;
      this.setState({ toprates});
      console.log('Rates chosen by the user', toprates);
    });
    console.log('Form submit. #: '+ this.state.topCount + ' Code: ' + this.state.code )
  }

  render() {
    //boostrap grid:
    //col-8 to display the table from function ResetTable, 
    //col-4 to display search form and SearchResults function below
    return (
        <div>
          <hr />
            <h1 className="text-center">Check Currency App </h1>
             <hr />
          <Clock />
          <div className="container">
            <div className="row">
              <RatesTable rates={this.state.rates} dateRates={this.state.dateRates} />
              <div className="col-4">

                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Select currency</label>
                    <select className="form-control" id="userCodeSelect" value={this.state.code} onChange = {(event) => this.setState({code: event.target.value})}>
                      {this.state.rates.map((rates,i) => 
                        <option key={i}> {rates.code} 
                        </option>)
                      }
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect2">Select # of the last currency rates</label>
                    <input type="number" className="form-control" id="user#input" placeholder="10" min="1" value={this.state.topCount} onChange = {(event) => this.setState({topCount: event.target.value})} required pattern="banana|cherry" />
                  </div>
                  <button type="submit" value="Submit" className="btn btn-secondary btn-lg btn-block">Search</button>
                  <hr />
                </form>

              <SearchResults toprates = {this.state.toprates} />
              </div>
            </div>  
          </div>
        </div>
    );
  }
}
  
ReactDOM.render(<App />, document.getElementById('root'));