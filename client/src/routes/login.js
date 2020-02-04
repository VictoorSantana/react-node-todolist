import React, { Component } from 'react';
import Messages  from '../component/messages/messages';

import Api from '../helper/Api';
import { SERVICE_LOGIN, LOCAL_STORAGE_VAR } from '../properties/setup';

class Login extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        err: '',
        loadingMode: false
    }

    onSubmit  = async (event) =>  {
        event.preventDefault();
        this.setState({ loadingMode: true });
        var object = {};
        const formData = new FormData(event.target);

        formData.forEach(function(value, key) {
            object[key] = value;
        }); 

        //console.log(object);
        
        const result = await Api.postBody( SERVICE_LOGIN, object );

        if(result.fail) {
            this.setState({ err: result.message, loadingMode: false  });            
        } else {
            localStorage.setItem(LOCAL_STORAGE_VAR, result.data);
            this.props.history.push('/todo');
        }

    }

    onDismiss = () => {
        this.setState({err: ''});
    }    

    render() {
        return (
        <section className="custom-section bg-secondary border-top border-secondary overflow-hidden">

            <Messages type="danger" text={this.state.err} dismiss={this.onDismiss}></Messages>
      
            <div className="mx-auto p-4 shadow rounded bg-white mt-5 scale-in-center" style={{width:'300px'}}>
              <div className="form-group d-flex justify-content-center">
                <h4 className="text-center bg-info text-white d-inline-block p-4 rounded"> <i className="fas fa-lock"></i> </h4>
              </div>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fas fa-user"></i></div>
                      </div>
                      <input type="text" className="form-control" name="username" disabled={this.state.loadingMode} placeholder="Username"></input>
                    </div>
                  </div>
      
                  <div className="form-group">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fas fa-key"></i></div>
                      </div>
                      <input type="password" className="form-control" name="password" disabled={this.state.loadingMode} placeholder="Password"></input>
                    </div>
                  </div>
                  <div className="form-group">
                      <input type="checkbox" value="" className="mr-1"></input>
                      <label className="text-muted">Remember password</label>
                  </div>
                  <div className="form-group">
                      {
                          this.state.loadingMode ? (
                          <div className="spinner-border text-primary m-auto d-block" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>): (
                            <button type="submit" className="btn btn-primary btn-block">Sign In </button>
                            )
                      }                
                  </div>
              
              </form>        
            </div>
          </section>
        );
    }
}

export default Login;