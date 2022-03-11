import React, { Component } from "react";
import { Row, Form, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
export class UpdateMedicine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            companyName: '',
            price: '',
            quantity: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })

    }
    componentDidMount(props) {
        debugger;
        console.log(this.props.match.params.id);
        var id = this.props.match.params.id;
        this.GetMedicineById(id);
    }
    GetMedicineById(id) {
        const apiUrl = "https://localhost:44303/api/admin/getMedicineById/" + id;
        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    debugger;
                    if (result) {
                        this.setState({
                            name: result.name,
                            companyName: result.companyName,
                            price: result.price,
                            quantity: result.quantity
                        });
                    }
                    else {
                        alert("medicine record not found!")
                    }
                },
                (error) => {
                    this.setState({ IsApiError: true });
                }
            )
    }

    UpdateMedicine() {
        debugger;
        if (this.state.name == "" || this.state.name == undefined) {
            alert("Name is required");
        } else if (this.state.companyName == "" || this.state.companyName == undefined) {
            alert("Company Name is required");
        } else if (this.state.price == "" || this.state.price == undefined) {
            alert("Price is required");
        } else if (this.state.quantity == "" || this.state.quantity == undefined) {
            alert("Quantity is required");
        }

        let MeetingToken = Math.floor(Math.random() * 100000000 + 1);
        let body = {
            Id: this.props.match.params.id,
            name: this.state.name,
            companyName: this.state.companyName,
            price: this.state.price,
            quantity: this.state.quantity
        };

        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
        };

        let baseurl = "https://localhost:44303/api/admin/updateMedicine/";
        fetch(baseurl, requestOptions)
            .then((res) => {
                return res.json();
            })
            .then((results) => {
                if (results) {
                    alert("Updated successfully!");
                }
            })
            .catch((e) => {
                alert(e);
            });
    }

    render() {
        return (
            <div>
                <h1>Edit Medicine</h1>
                <Link variant="primary" to="/medicine">View Medicine list</Link>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    placeholder="Name" />
                            </Form.Group>
                            <Form.Group controlId="companyName">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="companyName"
                                    value={this.state.companyName}
                                    onChange={this.handleChange}
                                    placeholder="companyName" />
                            </Form.Group>
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.handleChange}
                                    placeholder="price" />
                            </Form.Group>
                            <Form.Group controlId="quantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="quantity"
                                    value={this.state.quantity}
                                    onChange={this.handleChange}
                                    placeholder="quantity" />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="success" onClick={() => this.UpdateMedicine()}>Save</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        )

    }
}
export default UpdateMedicine;