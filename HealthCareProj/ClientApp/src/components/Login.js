import React, { Component } from "react";
import "./Login.css";

export class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        console.log(e.target.email.value);

        if (!e.target.email.value) {
            alert("Email is required");
        } else if (!e.target.email.value) {
            alert("Valid email is required");
        } else if (!e.target.password.value) {
            alert("Password is required");
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Email: e.target.email.value, Password: e.target.password.value, Type: '' })
            };

            fetch('https://localhost:44303/api/user/login', requestOptions).then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    if (data.error) {
                        console.log('Failure')
                    }
                    else {
                        console.log('Success')
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };
    handleClick = e => {
        e.preventDefault();

        alert("Goes to registration page");
    };
 
    render() {
        return (
            <div class="container">
                <form onSubmit={this.handleSubmit}>
                    <div class="row">
                        <div class="col-2">
                            <label htmlFor="email">Email</label>
                        </div>
                        <div class="col-4">
                            <input type="email" name="email" placeholder="nome@email.com" />
                        </div>
                    </div>
                        <div class="row">
                            <div class="col-2">
                                <label htmlFor="password">Password</label>
                            </div>
                            <div class="col-4">
                                <input type="password" name="password" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-2">
                                <button class="btn btn-primary">Login</button> &nbsp;
                                <button class="btn btn-success" onClick={this.handleClick}>Submit</button>
                            </div>
                        </div>
                </form>
            </div>
        );
    }
}

export default Login;
