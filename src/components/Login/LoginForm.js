import React from 'react';

const LoginForm = props => (
    <form className="login-form" onSubmit={props.onLogin}>
        <input id="account-input" type="text" name="account" placeholder="account" onClick={props.clear}/>
        <span id="false-account-msg" className="input-message"></span>

        <button className="login-button">Login</button>
    </form>
);

export default LoginForm;