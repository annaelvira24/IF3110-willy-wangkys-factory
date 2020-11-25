import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import LoginForm from './LoginForm';
import './Login.css';

class Login extends Component {
    state = {
        cookie: undefined
    }

    constructor() {
        super();
        let cookie = new Cookies();
        this.state.cookie = cookie.get("userFactory");
    }

    handleLogin = async e => {
        e.preventDefault();
        let request = require('request');
        let xml2js = require('xml2js');

        let username = e.target.elements.username.value;
        let password = e.target.elements.password.value;

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
				<soapenv:Header/>
				<soapenv:Body>
					<ser:Login>
						<username>` + username + `</username>
                        <password>` + password + `</password>
					</ser:Login>
				</soapenv:Body>
			</soapenv:Envelope>`;

        let options = {
            url: 'http://localhost:8080/web_service_factory/services/Login?wsdl',
            method: 'POST',
            body: xml,
            headers: {
                'Content-Type': 'text/xml;charset=utf-8',
            }
        };

        let callback = (error, response, body) => {
            console.log(error)
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
                        let cookieValue = btoa(JSON.stringify(result));
                        let cookies = new Cookies();
                        cookies.set('userFactory', cookieValue, { path: '/', expires: new Date(Date.now() + 86400000) });
                        window.location.reload();
                    }
                    else {
                        console.log(result['status'])
                        document.getElementById('username-input').style.borderColor = 'red';
                        document.getElementById('username-input').style.borderWidth = '1.5px';
                        document.getElementById('password-input').style.borderColor = 'red';
                        document.getElementById('password-input').style.borderWidth = '1.5px';
                        document.getElementById('false-msg').style.color = 'red';
                        document.getElementById('false-msg').innerHTML = `Wrong username or password`;
                    }
                });
            };
        };

        request(options, callback);

    }

    clearSpan = async e => {
        document.getElementById('username-input').style.borderColor = '#ccc';
        document.getElementById('password-input').style.borderWidth = '1px';
        document.getElementById('false-msg').innerHTML = ``;
    }

    render() {
        return (
            <React.Fragment>
                <div className="wrapper-login">
                    <div>
                        <label>Willy Wangky's Factory</label>
                    </div>

                    <div className="container-login">
                        <LoginForm onLogin={this.handleLogin} clear={this.clearSpan}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;