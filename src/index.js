import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const RatesTable = (props) => {
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
              { props.rates.map((rates,i) => 
                <tr key={i}>
                  <td>{rates.currency}</td>
                  <td>{rates.code}</td>
                  <td>{rates.mid}</td>
                </tr>) 
              }
            </tbody>
          </table>
        </div>
    );
    
}


const SearchForm = (props) => {
  
    return (
       
          <form>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Select currency</label>
              <select className="form-control" id="exampleFormControlSelect1">
                { props.rates.map((rates,i) => 
                  <option key={i}>{rates.code}</option>)
                }
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect2">Select # of the last currency rates</label>
              <select className="form-control" id="exampleFormControlSelect2">
                <option>5</option>
                <option>10</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </form>
     
  
    );
}

const SearchResults = (props) => {
  
  return (

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Mid-rate</th>
          </tr>
        </thead> 
        <tbody>
          { props.toprates.map((toprates,i) => 
            <tr key={i}>
              <td>{toprates.no}</td>
              <td>{toprates.effectiveDate}</td>
              <td>{toprates.mid}</td>
            </tr>) 
          }
        </tbody>
      </table>

);
}
    
class Rates extends React.Component {
  state = {
    rates: [],
    toprates: []
  }
  componentDidMount() {
    axios.get(`http://api.nbp.pl/api/exchangerates/tables/A/last`)
      .then(res => {
        const rates = res.data[0].rates;
        this.setState({ rates });
    
      
      })
    axios.get(`http://api.nbp.pl/api/exchangerates/rates/${this.props.table}/${this.props.code}/last/${this.props.topCount}/`)
      .then(resp => {
        const toprates = resp.data.rates;
        this.setState({ toprates });
        console.log(toprates);

      });
  }


  render() {
    return (
        <div>
          <h1 className="text-center">Check Currency Rates App</h1>
          <div className="container">
            <div className="row">
              <RatesTable rates={this.state.rates} />
              <div className="col-4">
              <SearchForm rates={this.state.rates}/>
              <SearchResults toprates = {this.state.toprates} />
              </div>
            </div>  
          </div>
        </div>
    );
  }

}


class App extends React.Component {
  
    render() {
      return (
          <Rates table="A" code="USD" topCount="10"/>
      );
    }
  }
  

ReactDOM.render(<App />, document.getElementById('root'));

