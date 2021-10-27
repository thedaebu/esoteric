import React, { useState, useEffect } from "react";

function SessionForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { action, errors, clearErrors } = props;
    const { formType, formTypeSub, formSubmit, formLink, formLast, formPassword, formTos } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
        clearErrors();
    }, []);

    function handleFormSubmit(e) {
        e.preventDefault();

        const user = Object.assign({}, {username: username, password: password});
        action(user);
    }

    function handleInputChange(type) {
        if (type === "username") {
            return e => setUsername(e.target.value);
        } else {
            return e => setPassword(e.target.value);
        }
    }

    function showErrors() {
        if (errors.length > 0) {
            return (
                <div className="errors-main">
                    <h2>Ruh-roh!</h2>
                    <p>Something is wrong</p>
                    <ul>
                        {errors.map((error, idx) => {
                            return <li className="error-message" key={idx}>{error}</li>
                        })}    
                    </ul>
                </div>
            );
        } else {
            return (
                null
            );
        }
    }

    return (
        <div className="session-form-main">
            {formType}
            {formTypeSub}                   
            <form className="session-form-form" onSubmit={handleFormSubmit}>
                {showErrors()}
                <label htmlFor="session-form-username" >Really Smart Nickname
                    <input 
                        id="session-form-username" 
                        type="text" 
                        value={username} 
                        onChange={handleInputChange("username")}
                    />
                </label>
                <label htmlFor="session-form-password" >Really Smart Password 
                    <a 
                        className="session-form-forgot-password" 
                        href="" >{formPassword}
                    </a>
                    <input 
                        id="session-form-password" 
                        type="password" 
                        value={password} 
                        onChange={handleInputChange("password")}
                    />
                </label>
                {formTos}
                <input 
                    id="session-form-submit" 
                    type="submit" 
                    value={formSubmit}
                />                        
            </form>
            <p className="session-form-bottom" >{formLast} {formLink}</p>                  
        </div>            
    )
}

export default SessionForm;