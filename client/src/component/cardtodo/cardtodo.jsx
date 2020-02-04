import React, { Component } from 'react';

class CardToDo extends Component {
    constructor(props) {
        super(props);
        
    }
    
    getStatus = () => {
        switch(this.props.status) {
            case 1:
                return {status: 'Queue', icon: 'fas fa-stream', color: 'badge-secondary'}
            break;
            case 2:
                return {status: 'Done', icon: 'fas fa-check', color: 'badge-success'}
            break;
            case 3:
                return {status: 'Given up', icon: 'fas fa-times', color: 'badge-warning'}
            break;
            case 4:
                return {status: 'Deleted', icon: 'far fa-trash-alt', color: 'badge-danger'}
            break;
            default:
                return {status: 'Queue', icon: 'fas fa-stream', color: 'badge-secondary'}
            break;
        }
    }

    /*
        IN_QUEUE: 1,
        DONE: 2,
        GIVEN_UP: 3,
        DELETED: 4,
    */

    genButtons = () => {

        const id = this.props.id;

        switch(this.props.status) {
            case 1:
                return (
                    <div>
                        <button type="button" className="btn btn-light text-info mr-1" onClick={() =>  this.props.updateTo( id, 2 )}> <i className="fas fa-check"></i> </button>
                        <button type="button" className="btn btn-light text-info mr-1" onClick={() =>  this.props.updateTo( id, 3 )}> <i className="fas fa-times"></i> </button>
                        <button type="button" className="btn btn-light text-info" onClick={() =>  this.props.updateTo( id, 4 )}> <i className="far fa-trash-alt"></i> </button>                                                
                    </div>                    
                )
            break;
            case 2:
                return (
                    <div>
                        <button type="button" className="btn btn-light text-info mr-1" onClick={() =>  this.props.updateTo( id, 3 )}> <i className="fas fa-times"></i> </button>                        
                        <button type="button" className="btn btn-light text-info mr-1" onClick={() =>  this.props.updateTo( id, 1 )}> <i className="fas fa-stream"></i> </button>                        
                        <button type="button" className="btn btn-light text-info" onClick={() =>  this.props.updateTo( id, 4 )}> <i className="far fa-trash-alt"></i> </button>
                    </div>                    
                )
            break;
            case 3:
                return (
                    <div>
                        <button type="button" className="btn btn-light text-info mr-1" onClick={() =>  this.props.updateTo( id, 2 )}> <i className="fas fa-check"></i> </button>                        
                        <button type="button" className="btn btn-light text-info mr-1" onClick={() =>  this.props.updateTo( id, 1 )}> <i className="fas fa-stream"></i> </button>
                        <button type="button" className="btn btn-light text-info" onClick={() =>  this.props.updateTo( id, 4 )}> <i className="far fa-trash-alt"></i> </button>                        
                    </div>                    
                )
            break;
            case 4:
                return  (
                    <div>                        
                        <button type="button" className="btn btn-light text-info mr-1" onClick={() =>  this.props.updateTo( id, 2 )}> <i className="fas fa-check"></i> </button>
                        <button type="button" className="btn btn-light text-info mr-1" onClick={() =>  this.props.updateTo( id, 1 )}> <i className="fas fa-stream"></i> </button>
                        <button type="button" className="btn btn-light text-info" onClick={() =>  this.props.updateTo( id, 3 )}> <i className="fas fa-times"></i> </button>                        
                    </div>                    
                )
            break;
            default:
                return (
                    <div>
                        <button type="button" className="btn btn-light text-info mr-1" onClick={() =>  this.props.updateTo( id, 4 )}> <i className="far fa-trash-alt"></i> </button>
                        <button type="button" className="btn btn-light text-info mr-1" onClick={() =>  this.props.updateTo( id, 2 )}> <i className="fas fa-check"></i> </button>
                        <button type="button" className="btn btn-light text-info" onClick={() =>  this.props.updateTo( id, 3 )}> <i className="fas fa-times"></i> </button>
                    </div>                    
                )
            break;
        }
    }

    render() {

        return (
            <div className="shadow border rounded p-2 m-3" style={{width: '350px'}}>
                <div className="d-flex justify-content-between">
                    <h4 className="m-0"> { this.props.title } </h4>
                    <span className={`badge ${this.getStatus().color} p-2`}> <i className={this.getStatus().icon}></i> { this.getStatus().status } </span>
                </div>
                <p className="w-100 text-nowrap"> { this.props.text } </p>
                <hr className="my-1"></hr>
                <div className="d-flex justify-content-left">
                    {
                        this.genButtons()
                    }                   
                </div>
            </div>
        );
    }
}

export default CardToDo;