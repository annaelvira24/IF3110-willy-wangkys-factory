import React, {Component} from 'react';
import axios from "axios";
import './BuySupply.css';

class BuySupply extends Component {
    constructor() {
        super();
        this.state = {
            supplies: [],
            inputList: [{id: 1, amount: 0}],
            status: "",
            money: 0,
            reviewList: [],
            balance: 0
        };
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleBuyClick = this.handleBuyClick.bind(this);
        this.handleConfirmClick = this.handleConfirmClick.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.showReview = this.showReview.bind(this);
        this.showStatus = this.showStatus.bind(this);
        this.isEqual = this.isEqual.bind(this);
        this.getBalance = this.getBalance.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/supply')
        .then(res => {
            const supplies = res.data;
            this.setState({supplies: supplies});
        });
        this.getBalance();
    }

    handleSelectChange(e,i) {
        var v = e.target.value;
        const newInputList = [...this.state.inputList];
        newInputList[i].id = parseInt(v);
        this.setState({newInputList});
    };

    handleAmountChange(e,i) {
        var v = e.target.value;
        const newInputList = [...this.state.inputList];
        newInputList[i].amount = parseInt(v);
        this.setState({newInputList});
    }

    handleAddClick(e) {
        e.preventDefault();
        const oldState = this.state.inputList;
        const newItem = {id: 1, amount:0};
        oldState.push(newItem);
        this.setState([...this.state.inputList, ...oldState]);
    }

    handleBuyClick(e) {
        e.preventDefault();
        const BuySupp = {
            "balance": this.state.balance,
            "items": this.state.inputList
        }

        axios.post('http://localhost:5000/supply/buy', {BuySupp})
        .then(res => {
            const received = res.data;
            this.setState({status: received.status, money: received.money});
            if(res.data.status === 'success') {
                this.showStatus();
                this.isEqual(this.state.inputList, this.state.supplies);
                this.showReview();
            }
            else {
                this.showStatus();
            }
        })
        .catch(error => {console.log(error)});
    }

    handleConfirmClick = async e => {
        e.preventDefault();
        let request = require('request');

        let items = this.state.inputList;
        let money = this.state.money;

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
				<soapenv:Header/>
				<soapenv:Body>
					<ser:ReduceBalance>
                        <money>` + money + `</money>
					</ser:ReduceBalance>
				</soapenv:Body>
			</soapenv:Envelope>`;

        let options = {
                url: 'http://localhost:8080/web_service_factory/services/ReduceBalance?wsdl',
                method: 'POST',
                body: xml,
                headers: {
                    'Content-Type': 'text/xml;charset=utf-8',
                }
        };

        let callback = (error, response, body) => {
                console.log("error", error);
        };

        request(options, callback);

        for(let i = 0; i < items.length; i++) {
            let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
				<soapenv:Header/>
				<soapenv:Body>
					<ser:AddSupply>
                        <id>` + items[i].id + `</id>
                        <amount>` + items[i].amount + `</amount>
					</ser:AddSupply>
				</soapenv:Body>
			</soapenv:Envelope>`;

            let options = {
                url: 'http://localhost:8080/web_service_factory/services/AddSupply?wsdl',
                method: 'POST',
                body: xml,
                headers: {
                    'Content-Type': 'text/xml;charset=utf-8',
                }
            };

            let callback = (error, response, body) => {
                console.log("error", error);
            };

            request(options, callback);
        }

    }

    getBalance() {
        let request = require('request');
        let xml2js = require('xml2js');

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
		    	<soapenv:Header/>
				<soapenv:Body>
					<ser:GetBalance/>
				</soapenv:Body>
			</soapenv:Envelope>`;

        let options = {
            url: 'http://localhost:8080/web_service_factory/services/GetBalance?wsdl',
            method: 'POST',
            body: xml,
            headers: {
                'Content-Type': 'text/xml;charset=utf-8',
            }
        };

        let callback = (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let parser = new DOMParser();
                let xmlResponse = parser.parseFromString(body, "text/xml");
                let resultResponse = xmlResponse.getElementsByTagName("return")[0].outerHTML;

                let xmlOptions = {
                    explicitArray: false
                };

                xml2js.parseString(resultResponse, xmlOptions, (err, res) => {
                    let json = JSON.stringify(res);
                    let result = JSON.parse(json)["return"];

                    if (result["status"] === "200") {
                        this.setState({ balance: result["balance"] })
                    } else {
                        this.setState({ balance: -1 })
                    }
                });
            };
        };

        request(options, callback);
    }

    showStatus() {
        if(this.state.status == 'success') {
            document.getElementById('status-success').style.display = 'block';
        }
        else {
            document.getElementById('status-failed').style.display = 'block';
        }
    }

    showReview() {
        document.getElementById('review-header').style.display = 'block';
        document.getElementById('review-list').style.display = 'block';
        document.getElementById('btn-confirm').style.display = 'block';
    }

    isEqual(a1, a2) {
        var result = []
        a1.forEach(i1 => {
            a2.forEach(i2 => {
                if(i1.id === i2.id_bahan) {
                    let o = {'id': i1.id, 'suppName': i2.nama_bahan, 'amount': i1.amount}
                    result.push(o);
                }
            })
        });
        this.setState({reviewList: result});
    }

    render() {
        return (
            <form>
                <h1>Buy Supplies</h1>
                {this.state.inputList.map((item, i) => {
                    return(
                        <div className="form-buy">
                            <select name= "id" value={item.value} onChange={e => this.handleSelectChange(e,i)}>
                                {this.state.supplies.map(supp => {return (
                                    <option value={supp.id_bahan}>
                                        {supp.nama_bahan}
                                    </option>
                                );})}
                            </select>
                            <input type="text" className="amount-supp" name="amount" placeholder="Quantity" onChange={e => this.handleAmountChange(e,i)}/>
                            <button className="btn-add" onClick={(e) => this.handleAddClick(e)}>Add</button>
                        </div>
                    )
                })}
                <button className="btn-buy" onClick={(e) => this.handleBuyClick(e)}>
                    Buy All
                </button>

                <div id="status-success" className="status">
                    <h2>Balance is enough.</h2>
                    <h2>Remaining balance: {this.state.money}</h2>
                    <h2>Review your order list and proceed by clicking 'Confirm Buy'</h2>
                </div>

                <div id="status-failed" className="status">
                    <h2>Balance is not enough.</h2>
                    <h2>Needed: {this.state.money}</h2>
                </div>

                <h1 id='review-header'>Review List</h1>
                <ul id='review-list'>
                    {this.state.reviewList.map(item => { return(
                        <li>{item.suppName} ({item.amount})</li>
                    )
                    })}
                </ul>

                <button id="btn-confirm" onClick={(e) => this.handleConfirmClick(e)}>
                    Confirm Buy
                </button>

            </form>
        )
    }
}

export default BuySupply;