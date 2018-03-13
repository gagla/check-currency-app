//GRADUATE GFT PROGRAMME - Agnieszka Wawrzyniak

//app created with npx create-react-app my-app
//axios installed by the command 'npm install -D axios'
//bootstrap installed by the command 'npm install -D bootstrap'


import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Clock from './Components/Clock.js';
import RatesTable from './Components/RatesTable.js';
import SearchCurrRates from './Components/SearchCurrRates.js';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends React.Component {
  state = {
    rates: [],
    dateRates: ''
  }
  //grabbing data from the first url form nbp api website to display the table with various currencies when app is loaded; 
  //data from this url is also used to display currency codes in SearchCurrRates component - that's it is loaded here, not in RatesTable component
  componentDidMount() {
    axios.get(`http://api.nbp.pl/api/exchangerates/tables/C/last`)
      .then(res => {
        const rates = res.data[0].rates;
        const dateRates = res.data[0].effectiveDate;
        this.setState({ rates, dateRates });
        console.log('The date of the currencies rates table ' + dateRates);
        console.log('Rates from the table ', rates);
      }
      );
  }

  render() {
//bootstrap grid:
//col-8 - to display current table with various currencies rates
//col-4 - to display table with last currency rates. Code and # of last rates chosen by the user
    return (
      <div>
        <hr />
        <h1 className="text-center">Check Currency App </h1>
        <hr />
        <Clock />
        <div className="container">
          <div className="row">
            <div className="col-8">
              <RatesTable rates={this.state.rates} dateRates={this.state.dateRates} />
            </div>
            <div className="col-4">
              <SearchCurrRates rates={this.state.rates} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;