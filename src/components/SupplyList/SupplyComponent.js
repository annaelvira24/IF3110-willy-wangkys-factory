import React, {Component} from 'react';
import './SupplyComponent.css';

class SupplyComponent extends Component {
    render() {
        return (
                <div className="supply-content-item">
                    <h1>{this.props.idbahan}</h1>
                    <h1>{this.props.namabahan}</h1>
                    <h1>{this.props.harga}</h1>
                </div>
        )
    }
}

export default SupplyComponent;