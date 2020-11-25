import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import './Product.css';

class Product extends Component {
    state = {
        cookie: undefined,
    }

    constructor() {
        super();
        const cookie = new Cookies();
        this.state.cookie = cookie.get("userFactory");
    }

    handleViewRecipe = async e => {
        e.preventDefault();
        let request = require('request');
        let xml2js = require('xml2js');

        let username = e.target.elements.username.value;
        let password = e.target.elements.password.value;
        console.log(username);
    }

    componentDidMount() {
        let request = require('request');
        let xml2js = require('xml2js');

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
    	    	<soapenv:Header/>
    			<soapenv:Body>
    				<ser:GetProduct/>
    			</soapenv:Body>
    		</soapenv:Envelope>`;

        let options = {
            url: 'http://localhost:8080/web_service_factory/services/GetProduct?wsdl',
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
                        let productContent = document.getElementsByClassName('product-content')[0];

                        for (let i = 0; i < result["productId"].length; i++) {
                            productContent.appendChild(this.renderProductContent(result, i));
                        }
                    }
                });
            };
        };

        request(options, callback);
    }

    renderProductContent(e, i) {
        let productContentItem = document.createElement('div');
        productContentItem.className = 'product-content-item';

        let productId = document.createElement('div');
        productId.innerHTML = e["productId"][i];

        let productName = document.createElement('div');
        productName.innerHTML = e["productName"][i];

        let stock = document.createElement('div');
        stock.innerHTML = e["stock"][i];

        let recipe = document.createElement('div');
        let recipeButton = document.createElement('a');
        recipeButton.href = "/recipe/" + e["productId"][i];
        recipeButton.innerText = "View Recipe";
        recipe.appendChild(recipeButton)

        productContentItem.appendChild(productId);
        productContentItem.appendChild(productName);
        productContentItem.appendChild(stock);
        productContentItem.appendChild(recipe);

        return productContentItem;
    }

    render() {
        return (
            <React.Fragment>

                <div className="wrapper-product">
                    <div>
                        <label>Product</label>
                    </div>
                    <div className="inventory">
                        <div className="product-header">
                            <div className="text-header">
                                ID
                            </div>
                            <div className="text-header">
                                Product Name
                            </div>
                            <div className="text-header">
                                Stock
                            </div>
                            <div className="text-header">
                                Recipe
                            </div>
                        </div>

                        <div className="product-content">
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default Product;