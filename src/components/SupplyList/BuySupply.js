import React, {Component} from 'react';
import axios from "axios";

class BuySupply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supp_name: '',
            price: 0,
            amount: 0
        };
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.handleClickRemove = this.handleClickRemove.bind(this);
        this.handleClickBuy = this.handleClickBuy.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/supply/' + this.props.match.params.id)
        .then(res => {
            let supplyName = res.data[0].nama_bahan;
            let p = res.data[0].harga_satuan;
            this.setState({supp_name: supplyName, price: p});
        })
    }

    handleClickAdd() {
        this.setState({amount: this.state.amount + 1});
    }

    handleClickRemove() {
        this.state.amount > 0 ? 
            this.setState({amount: this.state.amount - 1}) :
            this.setState({amount: 0});
    }

    handleClickBuy() {
        const BuySupp = {
            "balance": 200000,
            "supp_id": this.props.match.params.id,
            "amount": this.state.amount
        }

        axios.post('http://localhost:5000/supply/buy', {BuySupp})
        .then(res => {console.log(res)})
        .catch(error => {console.log(error)});
    }

    render() {
        return (
            <div>
                <h1>{this.state.supp_name}</h1>
                <h1>{this.state.price}</h1>
                <button onClick={this.handleClickAdd}>Add</button>
                <h2>{this.state.amount}</h2>
                <button onClick={this.handleClickRemove}>Remove</button>
                <button onClick={this.handleClickBuy}>Buy</button>
            </div>
        )
    }

}

export default BuySupply;