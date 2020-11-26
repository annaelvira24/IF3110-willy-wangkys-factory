import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import './Balance.css';

class Balance extends Component {
    state = {
        cookie: undefined,
        balance: undefined
    }

    constructor() {
        super();
        const cookie = new Cookies();
        this.state.cookie = cookie.get("userFactory");
    }

    componentDidMount() {
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

    render() {
        let balanceAmount = Number(this.state.balance);
        balanceAmount = balanceAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        // const balanceAmount = this.state.balance;
        return (
            <div className="wrapper-info">
                <div className="wrapper-info-balance-info">

                    <div className="wrapper-main-info">
                        <label className="text-balance">
                            Balance: <span id="balance-info">Rp. {balanceAmount}</span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
};

export default Balance;