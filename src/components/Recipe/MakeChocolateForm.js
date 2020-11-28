import React from 'react';

const MakeChocolateForm = props => (
    <form className="add-chocolate-form" onSubmit={props.onLogin}>
        <input id="amount-input" type="number" name="amount" placeholder="amount" onClick={props.clear}/>
        <span id="false-msg" className="input-message"></span>
        <button className="add-button">Make Chocolate</button>
    </form>
);

export default MakeChocolateForm;