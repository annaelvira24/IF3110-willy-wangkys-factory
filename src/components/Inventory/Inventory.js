import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import './Inventory.css';

class Inventory extends Component {
    state = {
        cookie: undefined,
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
					<ser:GetIngredient/>
				</soapenv:Body>
			</soapenv:Envelope>`;

        let options = {
            url: 'http://localhost:8080/web_service_factory/services/GetIngredient?wsdl',
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
                        let inventoryContent = document.getElementsByClassName('inventory-content')[0];

                        for (let i = 0; i < result["ingredientId"].length; i++) {
                            inventoryContent.appendChild(this.renderInventoryContent(result, i));
                        }
                    }
                });
            };
        };

        request(options, callback);
    }

    isExpired(expiryDate){
        let today = new Date();
        let expiry = new Date(expiryDate)
        let status = "";
        if (expiry < today.getDate()){
            status = "expired"
        }
        return status;

    }

    renderInventoryContent(e, i) {
        let inventoryContentItem = document.createElement('div');
        inventoryContentItem.className = 'inventory-content-item';

        let ingredientId = document.createElement('div');
        ingredientId.className = 'text-content-' + this.isExpired(e["expiryDate"][i]);
        ingredientId.innerHTML = e["ingredientId"][i];

        let ingredientName = document.createElement('div');
        ingredientName.className = 'text-content-' + this.isExpired(e["expiryDate"][i]);
        ingredientName.innerHTML = e["ingredientName"][i];

        let stock = document.createElement('div');
        stock.className = 'text-content-' + this.isExpired(e["expiryDate"][i]);
        stock.innerHTML = e["stock"][i];

        let expiryDate = document.createElement('div');
        expiryDate.className = 'text-content-' + this.isExpired(e["expiryDate"][i]);
        expiryDate.innerHTML = e["expiryDate"][i];

        inventoryContentItem.appendChild(ingredientId);
        inventoryContentItem.appendChild(ingredientName);
        inventoryContentItem.appendChild(stock);
        inventoryContentItem.appendChild(expiryDate);

        return inventoryContentItem;
    }

    render() {
        return (
            <React.Fragment>

                <div className="wrapper-inventory">
                    <div>
                        <label>Inventory</label>
                    </div>
                    <div className="inventory">
                        <div className="inventory-header">
                            <div className="text-header">
                                ID
                            </div>
                            <div className="text-header">
                                Ingredient Name
                            </div>
                            <div className="text-header">
                                Stock
                            </div>
                            <div className="text-header">
                                Expiry Date
                            </div>
                        </div>

                        <div className="inventory-content">
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default Inventory;