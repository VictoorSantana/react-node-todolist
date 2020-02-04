import React, { Component } from 'react';

import { LOCAL_STORAGE_VAR } from '../../properties/setup';

class TopNav extends Component {


    logout = () => {
        localStorage.removeItem(LOCAL_STORAGE_VAR);
        window.location.reload();
    }


    render() {
        return (
            <div className="d-flex shadow w-100 p-2 justify-content-between">
                <button type="button" className="btn btn-primary"> <i className="fas fa-bars"></i> </button>
                <button type="button" className="btn btn-link" onClick={this.logout}> <i class="fas fa-sign-out-alt"></i>  </button>
            </div>
        );
    }
}

export default TopNav;