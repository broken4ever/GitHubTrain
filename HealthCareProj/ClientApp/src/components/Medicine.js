import React, { Component } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class Medicine extends Component {
    static displayName = Medicine.name;

    constructor(props) {
        super(props);
        this.state = {
            medicines: [],
            IsApiError: false
        }
    }

    componentDidMount() {
        debugger;
        fetch('https://localhost:44303/api/admin/getallmedicine').then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                this.setState({ medicines: data });
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        
    }
    deleteMedicine(id) {
        debugger;
        const { medicines } = this.state;
        const apiUrl = "https://localhost:44303/api/admin/deleteMedicineById/" + id;

        fetch(apiUrl, { method: 'DELETE' })
            .then(response => {
                const data = response.json();
                // check for error response
                if (!response.ok) {
                    console.log("Delete Error");
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                this.setState({
                    medicines: medicines.filter(medicine => medicine.id !== id)
                });
                alert('Delete successful');
            })
            .catch(error => {
                alert('There was an error!');
                console.error('There was an error!', error);
            });
    }
    render() {
        var medicinelist = this.state.medicines;
        debugger;
        if (medicinelist && medicinelist.length > 0) {
            return (<div>
                <h2>Medicine List</h2>
                <Link variant="primary" to="/addMedicine">Add Medicine</Link>
                <Table className='table table-striped' aria-labelledby="tabelLabel">
                <tr>
                    <td>
                        <thead>
                              <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Company Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                                {medicinelist.map(medicine =>
                                    <tr key={medicine.id}>
                                    <td>{medicine.id}</td>
                                    <td>{medicine.name}</td>
                                    <td>{medicine.companyName}</td>
                                    <td>{medicine.price}</td>
                                    <td>{medicine.quantity}</td>
                                    <td>
                                            <Link variant="primary" to={"/updateMedicine/" + medicine.id}>Edit</Link>
                                        &nbsp;<Button variant="danger" onClick={() => this.deleteMedicine(medicine.id)}>Delete</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </td>
                </tr>
            </Table>
            </div>)
        }
        else {
            return (<div>No Record Found</div>)
        }
    }
}
export default Medicine;
