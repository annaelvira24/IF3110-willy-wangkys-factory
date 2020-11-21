import React, {Component} from 'react';
import SupplyComponent from './SupplyComponent';
import './SupplyComponent.css';
import axios from "axios";

class SupplyList extends Component {
    state = {
        supplies: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/daftarbahan')
        .then(res => {
            const supplies = res.data;
            this.setState({supplies});
        });
    }

    render() {
        return (
        <div className="wrapper-supply">
                    <div>
                        <label>Buy Supply</label>
                    </div>
                    <div className="supply">
                        <div className="supply-header">
                            <div className="text-header">
                                ID
                            </div>
                            <div className="text-header">
                                Supply Name
                            </div>
                            <div className="text-header">
                                Price
                            </div>
                        </div>

                        <div className="supply-content">
                            {this.state.supplies.map(supp => <SupplyComponent idbahan = {supp.id_bahan} namabahan={supp.nama_bahan} harga={supp.harga_satuan}/>)}
                        </div>
                    </div>
                </div>
        );
    }
}

export default SupplyList;
