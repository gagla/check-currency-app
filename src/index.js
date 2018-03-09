import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';





class RatesTable extends React.Component {

    state = {
        rates: []
      }
    componentDidMount() {
        axios.get(`http://api.nbp.pl/api/exchangerates/tables/A/last?format=json`)
          .then(res => {
            const rates = res.data[0].rates;
            const date = res.data[0].effectiveDate
            this.setState({ rates });
            console.log(date);
          })
      }
    
    render() {
      return (
        <div className="col-8">
        <table className="table">
  
        <thead className="thead-dark">
            <tr>
                <th>Currency</th>
                <th>Code</th>
                <th>Mid-rate</th>
            </tr>
        </thead> 
        <tbody>

        { this.state.rates.map(rates => 
        <tr><td>{rates.currency}</td><td>{rates.code}</td><td>{rates.mid}</td></tr>)
        
    }

        </tbody>
        </table>
    </div>
    


      );
    }
  }


class SearchForm extends React.Component {

    state = {
        rates: []
      }
    componentDidMount() {
        axios.get(`http://api.nbp.pl/api/exchangerates/tables/A/last?format=json`)
          .then(res => {
            const rates = res.data[0].rates;

            this.setState({ rates });
          
          })
      }
    
    render() {
        return (
        <div className="col-4">
            <form>
            <div class="form-group">
    <label for="exampleFormControlSelect1">Select currency</label>
    <select class="form-control" id="exampleFormControlSelect1">
    { this.state.rates.map(rates => 
        <option>{rates.code}</option>)
        
    }

    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect2">Select # of the last currency rates</label>
    <select class="form-control" id="exampleFormControlSelect2">
      <option>5</option>
      <option>10</option>
      <option>50</option>
      <option>100</option>
    </select>
  </div>
            </form>
    
          
          
      </div>
  
        );
      }
    }

class App extends React.Component {
   
    render() {
      return (
          <div>
    <h1 className="text-center">Check Currency Rates App</h1>
      <div className="container">
      <div className="row">

        <RatesTable />
        <SearchForm />

        
        </div>  
    </div>
</div>
      );
    }
  }
  

ReactDOM.render(<App />, document.getElementById('root'));

