import React, { Component } from 'react';
import CardToDo from '../component/cardtodo/cardtodo.jsx';
import TopNav from '../component/topnav/topnav';


import Api from '../helper/Api';
import { SERVICE_TODO } from '../properties/setup';

import { Link } from "react-router-dom";

class ToDo extends Component {


    state = {
        data: [],
        errText: '',
        selectedFilter: 0
    };

    componentWillMount = async () => {              
        this.setToDoList(0);
    }

    setToDoList = async (value) => {                
        const result = await Api.getAllUsingToken(value > 0 ? (SERVICE_TODO + '/status/' + value) : (SERVICE_TODO + '/all'));        

        if(result.fail) {
            this.setState({errText: result.message});
        } else {
            this.setState({data: result.data});
        }  
    }


    /*
        IN_QUEUE: 1,
        DONE: 2,
        GIVEN_UP: 3,
        DELETED: 4,
    */
    onChangeFilter = async (event) => {        
        this.setState({ selectedFilter: event.target.value });
        this.setToDoList(event.target.value);
    }

    badgeSettings = () => {
        switch(this.state.selectedFilter) {
            case 1:
                return {status: 'Queue', color: 'secondary'}
            break;
            case 2:
                return {status: 'Done', color: 'success'}
            break;
            case 3:
                return {status: 'Given up', color: 'warning'}
            break;
            case 4:
                return {status: 'Deleted', color: 'danger'}
            break;
            default:
                return {status: 'Queue', color: 'secondary'}
            break;
        }
    }


    onUpdateStatus = async (id, newStatus) => {
        const result = await Api.putRouteUsingToken(SERVICE_TODO + `id/${id}/status/${newStatus}`);        
        this.setToDoList(this.state.selectedFilter);
    }



    render() {
        return (
            <section className="overflow-hidden">

                <TopNav></TopNav>


                <div className="p-3">
                    <h4 className="text-center text-secondary"> ToDo List </h4>


                    <div>
                        <select name="filterBy"  onChange={this.onChangeFilter} className="form-control align-top d-inline-block mr-1" style={{width: '150px'}}>
                            <option value="0">All</option>
                            <option value="1">Queue</option>
                            <option value="2">Done</option>
                            <option value="3">Given Up</option>
                            <option value="4">Deleted</option>                            
                        </select>                                                
                        
                        <Link to="/todoform" className="btn btn-light align-top"> Add new register </Link>
                    </div>
                </div>

                <hr></hr>


                <div className="container">
                    <div className="d-flex justify-content-center flex-row flex-wrap">

                    {
                        this.state.data.length > 0 ? (
                            this.state.data.map((item) =>
                                <CardToDo title={item.title} text={item.about}  updateTo={this.onUpdateStatus} key={item.id} id={item.id} status={item.status}></CardToDo>
                            )
                        ): (<h3>Nothin to show</h3>)                    
                    }


                    </div>
                </div>




            </section>
        );
    }
}

export default ToDo;