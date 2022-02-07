import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
class Student extends Component 
{
    state = {
        students: [],
        loading: true,
    }
    async componentWillMount() {
        const res = await axios.get('http://localhost:8000/api/students');
        // console.log(res);
        if(res.data.status === 200)
        {
            this.setState({
                students: res.data.students,
                loading: false,
            });
        }
    }

    deleteStudent = async (e,id) => {

        const thidClickedFunda = e.currentTarget;
        thidClickedFunda.innerText = "Deleting"
        const res = await axios.delete(`http://localhost:8000/api/delete-student/${id}`);
        if(res.data.status === 200)
        {
            thidClickedFunda.closest("tr").remove();
            // console.log(res.data.message);
            swal({
                title: "You're student delete Success!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
              });
        }
    }

    render(){

        var student_HTMLTABLE = "";
        if(this.state.loading)
        {
            student_HTMLTABLE = <tr><td colSpan="7"><h2>Loading...</h2></td></tr>
        }
        else
        {
            student_HTMLTABLE = 
            this.state.students.map( (item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                            <Link to={`edit-student/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                        </td>
                        <td>
                            <button type="button" onClick={(e)=> this.deleteStudent(e, item.id) }className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                    )
            })
        }
        return(
            <div className="container">
                <div className="rom">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Student Data</h4>
                                <Link to={'add-student'}className="btn btn-primary btn-sm float-end"> Add </Link>
                            </div>
                            <div className="card-body">
                                


                                <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <td>Id</td>
                                                <td>Name</td>
                                                <td>Course</td>
                                                <td>Email Id</td>
                                                <td>Phone</td>
                                                <td>Edit</td>
                                                <td>Delete</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {student_HTMLTABLE}
                                        </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Student;