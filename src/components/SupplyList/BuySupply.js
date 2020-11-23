import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import './BuySupply.css';

class BuySupply extends Component {
    constructor() {
        super();
        this.state = {
            supplies: [],
            inputList: [{id: 1, amount: 0}]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleBuyClick = this.handleBuyClick.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/supply')
        .then(res => {
            const supplies = res.data;
            this.setState({supplies});
        });
    }

    handleChange(e,i) {
        const {name, value} = e.target;
        const list = [...this.state.inputList];
        list[i][name] = parseInt(value);
        this.setState({list});
    }

    handleAddClick(e) {
        e.preventDefault();
        const oldState = this.state.inputList;
        const newItem = {id: 1, amount:0};
        oldState.push(newItem);
        this.setState([...this.state.inputList, ...oldState]);
    }

    handleBuyClick() {
        const BuySupp = {
            "balance": 200000,
            "items": this.state.inputList
        }

        axios.post('http://localhost:5000/supply/buy', {BuySupp})
        .then(res => {console.log(res)})
        .catch(error => {console.log(error)});
    }

    render() {
        return (
            <form>
                <h1>Buy Supplies</h1>
                {this.state.inputList.map((item, i) => {
                    return(
                        <div className="form-buy" onChange={e => this.handleChange(e,i)}>
                            <select name= "id" value={item.value}>
                                {this.state.supplies.map(supp => {return (
                                    <option value={supp.id_bahan}>
                                        {supp.nama_bahan}
                                    </option>
                                );})}
                            </select>
                            <input type="text" className="amount-supp" name="amount" placeholder="Quantity"/>
                            <button className="btn-add" onClick={(e) => this.handleAddClick(e)}>Add</button>
                        </div>
                    )
                })}
                <Link to={'/home'} className="btn-buy" onClick={this.handleBuyClick()}>
                    Buy All
                </Link>
            </form>
        )
    }
}

export default BuySupply;