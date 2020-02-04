import React, { Component } from 'react';

import './messages.css';

class Messages extends Component {

    constructor(props) {
        super(props);
        
    }
    


    render() {
        return (
            <div>
                {
                    this.props.text.trim().length > 0 ? ( 

                        <div className={`alert alert-${this.props.type} alert-dismissible fade show message-c-alert slide-in-right`} role="alert">
                            <strong>Holy guacamole!</strong> {this.props.text}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.dismiss} >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                     ): ('')                     
                }                
            </div>

            
        );
    }
}

export default Messages;