import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import './Order.css';

class Order extends Component {
    state = {
        cookie: undefined,
    }

    constructor() {
        super();
        const cookie = new Cookies();
        this.state.cookie = cookie.get("userFactory");
    }

    handleApprove = orderId => {
        let request = require('request');
        let xml2js = require('xml2js');

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
    	    	<soapenv:Header/>
    			<soapenv:Body>
    				<ser:GiveApproval>
    				    <idAddStock>` + orderId + `</idAddStock>
    				</ser:GiveApproval>
    			</soapenv:Body>
    		</soapenv:Envelope>`;

        let options = {
            url: 'http://localhost:8080/web_service_factory/services/GiveApproval?wsdl',
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
                    explicitArray: true
                };

                xml2js.parseString(resultResponse, xmlOptions, (err, res) => {
                    let json = JSON.stringify(res);
                    let result = JSON.parse(json)["return"];
                    console.log("result : ", result);
                });
            };
        };

        request(options, callback);
    }

    componentDidMount() {
        let request = require('request');
        let xml2js = require('xml2js');

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
    	    	<soapenv:Header/>
    			<soapenv:Body>
    				<ser:GetOrder/>
    			</soapenv:Body>
    		</soapenv:Envelope>`;

        let options = {
            url: 'http://localhost:8080/web_service_factory/services/GetOrder?wsdl',
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
                    explicitArray: true
                };

                xml2js.parseString(resultResponse, xmlOptions, (err, res) => {
                    let json = JSON.stringify(res);
                    let result = JSON.parse(json)["return"];
                    console.log("result : ", result);

                    if (result["status"][0] === "200") {
                        let orderContent = document.getElementsByClassName('order-content')[0];

                        for (let i = 0; i < result["orderId"].length; i++) {
                            orderContent.appendChild(this.renderOrderContent(result, i));
                        }
                    }
                });
            };
        };

        request(options, callback);
    }

    renderOrderContent(e, i) {
        let orderContentItem = document.createElement('div');
        orderContentItem.className = 'order-content-item';

        let addStockId = document.createElement('div');
        addStockId.innerHTML = e["orderId"][i];

        let productName = document.createElement('div');
        productName.innerHTML = e["productName"][i];

        let amount = document.createElement('div');
        amount.innerHTML = e["amount"][i];

        let status = document.createElement('div');
        if (e["orderStatus"][i] == "Pending"){
            let approvalButton = document.createElement('button');
            approvalButton.onClick = e => this.handleApprove(e["orderId"][i]);
        }
        status.className = 'text-content-' + e["orderStatus"][i];
        status.innerHTML = e["orderStatus"][i];

        let approval = document.createElement('div');
        let approvalButton = document.createElement('a');
        // approvalButton.href = "/recipe/" + e["productId"][i];
        approvalButton.innerText = "Give Approval";
        approval.appendChild(approvalButton)

        orderContentItem.appendChild(addStockId);
        orderContentItem.appendChild(productName);
        orderContentItem.appendChild(amount);
        orderContentItem.appendChild(status);

        return orderContentItem;
    }

    render() {
        return (
            <React.Fragment>

                <div className="wrapper-order">
                    <div>
                        <label>Order</label>
                    </div>
                    <div className="order">
                        <div className="order-header">
                            <div className="text-header">
                                ID
                            </div>
                            <div className="text-header">
                                Product Name
                            </div>
                            <div className="text-header">
                                Amount
                            </div>
                            <div className="text-header">
                                Status
                            </div>
                        </div>

                        <div className="order-content">
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default Order;