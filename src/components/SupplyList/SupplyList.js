import React, {Component} from 'react';
import axios from "axios";

class SupplyList extends Component {
    state = {
        datas: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/daftarbahan')
        .then(res => {
            const datas = res.data;
            this.setState({datas});
        });
    }

    render() {
        return(
        <ul>
            {this.state.datas.map(data => <li>{data.nama_bahan}</li>)}
            {this.state.datas.map(data => <li>{data.harga_satuan}</li>)}
        </ul>
        )};
}

export default SupplyList;