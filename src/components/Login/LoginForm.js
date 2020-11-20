import React from 'react';

const LoginForm = props => (
    <form className="login-form" onSubmit={props.onLogin}>
        <input id="username-input" type="text" name="username" placeholder="username" onClick={props.clear}/>
        <input id="password-input" type="text" name="password" placeholder="password" onClick={props.clear}/>
        <span id="false-msg" className="input-message"></span>

        <button className="login-button">Login</button>
    </form>
);

export default LoginForm;