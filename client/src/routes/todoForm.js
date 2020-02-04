import React, { Component } from 'react';

import { Link } from "react-router-dom";
import Message from '../component/messages/messages';
import TopNav from '../component/topnav/topnav';

import Api from '../helper/Api';

import { SERVICE_TODO } from '../properties/setup';

class ToDoForm extends Component {


    /*
        id: Joi.number().integer().min(0), 
        title: Joi.string().required(),
        about: Joi.string().required(),
        guest_user: Joi.string().required(),
        status: Joi.number().required(),
    */


    state = {
        message: {
            type: '',
            text: ''
        }
    }

   submitHandle = async (event) => {
        event.preventDefault();

        var object = {};            
        const formData = new FormData(event.target);

        formData.forEach(function(value, key) {
            object[key] = value;
        }); 

        object.guest_user = 'any';
        object.status = 1;

        const result = await Api.postBodyUsingToken(SERVICE_TODO, object);

        //console.log(result);

        if(result.fail) {
           this.setState({ message: { type: 'danger', text: result.message } });
        } else {
           this.setState({ message: { type: 'success', text: result.message } });
        }
   }

   onDismiss = () => {
       this.setState({ message: { type: '', text: '' } });
   }
    
    render() {
        return (
            <section className="overflow-hidden">

                <TopNav></TopNav>

                <Message type={this.state.message.type}  text={this.state.message.text} dismiss={this.onDismiss}></Message>

                <div className="container"> 
                    <div className="p-3 border m-auto" style={{width: '350px'}}>
                        <h4 className="text-center text-secondary"> ToDo Form </h4>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"> <Link to="/todo"> List todo </Link> </li>
                                <li className="breadcrumb-item active" aria-current="page">ToDo Form</li>
                            </ol>
                        </nav>

                        <hr></hr>

                       

                        <form onSubmit={ this.submitHandle }>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" name="title"></input>                                
                            </div>
                            <div className="form-group">
                                <label>Resume</label>
                                <input type="text" className="form-control" name="about"></input>
                            </div>                            
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>

                    </div>
                </div>

            </section>
        );
    }
}

export default ToDoForm;