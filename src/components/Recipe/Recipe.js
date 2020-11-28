import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import MakeChocolateForm from './MakeChocolateForm';
import './Recipe.css';

class Recipe extends Component {
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

        let segment_str = this.props.location.pathname;
        let segment_array = segment_str.split( '/' );
        let id = segment_array.pop();
        console.log(id);

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
    	    	<soapenv:Header/>
    			<soapenv:Body>
    				<ser:GetRecipe>
    				    <productId>` + id + `</productId>
    				</ser:GetRecipe>
    			</soapenv:Body>
    		</soapenv:Envelope>`;

        let options = {
            url: 'http://localhost:8080/web_service_factory/services/GetRecipe?wsdl',
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

                    if (result["status"][0] === "200"){
                        this.setState({ productName: result["productName"] })
                        let recipeContent = document.getElementsByClassName('recipe-content')[0];

                        for (let i = 0; i < result["ingredientName"].length; i++) {
                            recipeContent.appendChild(this.renderRecipeContent(result, i));
                        }
                    }
                });
            };
        };

        request(options, callback);
    }

    renderRecipeContent(e, i) {
        let recipeContentItem = document.createElement('div');
        recipeContentItem.className = 'recipe-content-item';

        let ingredient = document.createElement('div');
        ingredient.innerHTML = e["ingredientName"][i];

        let amount = document.createElement('div');
        amount.innerHTML = e["amountNeed"][i];

        recipeContentItem.appendChild(ingredient);
        recipeContentItem.appendChild(amount);

        return recipeContentItem;
    }

    render() {
        return (
            <React.Fragment>

                <div className="wrapper-recipe">
                    <div>
                        <label>Recipe</label>
                        <label>{this.state.productName}</label>

                    </div>
                    <div className="recipe">
                        <div className="recipe-header">
                            <div className="text-header">
                                Ingredient Name
                            </div>
                            <div className="text-header">
                                Amount Needed
                            </div>
                        </div>

                        <div className="recipe-content">
                        </div>
                    </div>

                    <MakeChocolateForm/>

                </div>

                <div>
                </div>
            </React.Fragment>
        );
    }
};

export default Recipe;