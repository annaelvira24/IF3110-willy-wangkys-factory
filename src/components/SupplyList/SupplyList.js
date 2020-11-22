import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './SupplyList.css';
import axios from "axios";

class SupplyList extends Component {
    state = {
        supplies: []
    }

    async componentDidMount() {
        await axios.get('http://localhost:5000/supply')
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
                            {this.state.supplies.map(supp => {return (
                                <div className="supply-content-item">
                                    <h1>{supp.id_bahan}</h1>
                                    <h1>{supp.nama_bahan}</h1>
                                    <h1>{supp.harga_satuan}</h1>
                                    <Link to={`/supply/${supp.id_bahan}`}>Buy</Link>
                                </div>
                            );
                            })}
                        </div>
                    </div>
                </div>
        );
    }
}

export default SupplyList;
