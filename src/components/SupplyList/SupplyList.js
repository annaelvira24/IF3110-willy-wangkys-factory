import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Balance from '../Balance/Balance'
import './SupplyList.css';
import axios from "axios";

class SupplyList extends Component {
    constructor(){
        super();
        this.state = {
            supplies: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/supply')
        .then(res => {
            const supplies = res.data;
            this.setState({supplies});
        });
    }

    render() {
        return (
            <React.Fragment>

                <Balance/>
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
                            {this.state.supplies.map((item, i) => {return (
                                <div className="supply-content-item">
                                    <h1>{item.id_bahan}</h1>
                                    <h1>{item.nama_bahan}</h1>
                                    <h1>{item.harga_satuan}</h1>
                                </div>
                            );
                            })}
                        </div>
                    </div>
                    <Link to={`/supply/buy`} style={{borderRadius: "10px", textDecoration: 'none', margin: "30px", padding: "10px 80px", backgroundColor: "darkorange", color: "white"}}>
                        Buy Supplies
                    </Link>
                </div>

            </React.Fragment>

        );
    }
}

export default SupplyList;
