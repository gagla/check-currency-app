import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetData from '../GetData.js';
import '../App.css';

class SearchCurrRates extends React.Component {
    state = {
        toprates: [],
        topCount: '10',
        code: 'USD'
    }
    //grabbing data from the second url form nbp api website to display the table with the # of last rates and selected currency chosen by the user; data is loaded when the user submits the form
    handleSubmit = (event) => {
        event.preventDefault();
        let headerVis = document.querySelector('#searchHeader');
        headerVis.classList.remove("vis");
        let path = `/rates/C/${this.state.code}/last/${this.state.topCount}/`
        GetData.getData(path)
            .then(resp => {
                const toprates = resp.data.rates;
                this.setState({ toprates });
                console.log('Rates chosen by the user', toprates);
            });
        console.log('Form submit. #: ' + this.state.topCount + ' Code: ' + this.state.code)
    }
    render() {
        let topratesArray = this.state.toprates.map((toprates, i) =>
            <tr key={i}>
                <td>{toprates.no}</td>
                <td>{toprates.effectiveDate}</td>
                <td>{toprates.bid}</td>
                <td>{toprates.ask}</td>
            </tr>);
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Select currency</label>
                        <select className="form-control" id="userCodeSelect" value={this.props.rates.code} onChange={(event) => this.setState({ code: event.target.value })}>
                            {this.props.rates.map((rates, i) =>
                                <option key={i}> {rates.code}
                                </option>)
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect2">Select # of the last currency rates</label>
                        <input type="number" className="form-control" id="user#input" placeholder="10" min="1" value={this.state.topCount} onChange={(event) => this.setState({ topCount: event.target.value })} required pattern="banana|cherry" />
                    </div>
                    <button type="submit" value="Submit" className="btn btn-secondary btn-lg btn-block">Search</button>
                    <hr />
                </form>
                <table className="table">
                    <thead className="thead-dark vis" id="searchHeader">
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Buy</th>
                            <th>Sell</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topratesArray.reverse()}
                    </tbody>
                </table>
            </div>
        );

    }
}

export default SearchCurrRates;