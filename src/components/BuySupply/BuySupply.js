import React, {Component} from 'react';

class BuySupply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: '',
            bahan: ''
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const inputs = event.target.getElementsByTagName('input');

        this.setState({
            balance: inputs.balance.value,
            bahan: inputs.target.value
        });
    }
    
    render() {
        return (
            <div className="container-buy-supply">
                <form className="buy-supply-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="balance"/>
                    <input type="text" name="bahan"/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default BuySupply;