import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import inventory from '../../assets/boxes.svg'
import order from '../../assets/order.svg'
import restock from '../../assets/restock.svg'
import chocolate from '../../assets/chocolate.svg'
import './Homepage.css';

class Homepage extends Component {
    state = {
        cookie: undefined,
        accountNumber: undefined,
        customerName: undefined
    }

    constructor() {
        super();
        const cookie = new Cookies();
        this.state.cookie = cookie.get("userFactory");
    }
    //
    // componentDidMount() {
    //     if (this.state.cookie && !this.state.customerName) {
    //         this.setState({ customerName: JSON.parse(atob(this.state.cookie))["customerName"] });
    //     }
    //
    //     if (this.state.cookie && !this.state.accountNumber) {
    //         this.setState({ accountNumber: JSON.parse(atob(this.state.cookie))["accountNumber"] });
    //     }
    // }
    //
    // getVirtualAccount = async e => {
    //     let request = require('request');
    //     let xml2js = require('xml2js');
    //
    //     let random = Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);
    //
    //     let xml =
    //         `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
	// 			<soapenv:Header/>
	// 			<soapenv:Body>
	// 				<ser:GetVirtualNumber>
	// 					<senderAccount>` + random + `</senderAccount>
	// 					<receiverAccount>` + this.state.accountNumber + `</receiverAccount>
	// 				</ser:GetVirtualNumber>
	// 			</soapenv:Body>
	// 		</soapenv:Envelope>`;
    //
    //     let options = {
    //         url: 'http://localhost:8080/web_service_bank_pro/services/GetVirtualNumber?wsdl',
    //         method: 'POST',
    //         body: xml,
    //         headers: {
    //             'Content-Type': 'text/xml;charset=utf-8',
    //         }
    //     };
    //
    //     let callback = (error, response, body) => {
    //         if (!error && response.statusCode === 200) {
    //             let parser = new DOMParser();
    //             let xmlResponse = parser.parseFromString(body, "text/xml");
    //             let resultResponse = xmlResponse.getElementsByTagName("return")[0].outerHTML;
    //
    //             let xmlOptions = {
    //                 explicitArray: false
    //             };
    //
    //             xml2js.parseString(resultResponse, xmlOptions, (err, res) => {
    //                 let json = JSON.stringify(res);
    //                 let result = JSON.parse(json)["return"];
    //
    //                 if (result["status"] === "200") {
    //                     document.getElementById('message1').innerHTML = `Virtual Account`;
    //                     document.getElementById('message2').innerHTML = result["virtualNumber"];
    //                 } else {
    //                     document.getElementById('message1').innerHTML = `Failed to generate virtual account`;
    //                     document.getElementById('message1').style.color = `red`;
    //                 }
    //
    //                 document.getElementById('modal-virtual').style.display = 'block';
    //             });
    //         };
    //     };
    //
    //     request(options, callback);
    // }
    //
    // closeModal() {
    //     document.getElementById('modal-virtual').style.display = 'none';
    // }

    render() {
        return (
            <React.Fragment>
                <div className="wrapper-greet">

                    <div className="text-title">
                        Welcome to Willy Wangky's Factory!
                    </div>

                    <div class = "cardContainer">
                        <div className="card">
                            <Link to="/order">
                                <img src={order}/>
                                <font color = "black">ORDER</font>
                            </Link>
                        </div>

                        <div className="card">
                            <Link to="/inventory">
                                <img src={inventory}/>
                                <font color = "black">INVENTORY</font>
                            </Link>
                        </div>

                        <div className="card">
                            <Link to="/product">
                                <img src={chocolate}/>
                                <font color = "black">PRODUCT</font>
                            </Link>
                        </div>

                        <div className="card">
                            <Link to="/supply">
                                <img src={restock}/>
                                <font color = "black">BUY SUPPLIES</font>
                            </Link>

                        </div>

                    </div>
                </div>



                {/*<div id="modal-virtual" className="modal" onClick={this.closeModal}>*/}
                {/*    <div className="modal-content-container">*/}
                {/*        <div className="modal-content">*/}
                {/*            <p id="message1"></p>*/}
                {/*            <span id="message2"></span>*/}
                {/*            <p id="message3">(click anywhere to close this popup)</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </React.Fragment>
        );
    }
};

export default Homepage;