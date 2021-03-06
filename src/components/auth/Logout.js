import React,{Component,Fragment} from 'react';
import {NavLink} from 'reactstrap';
import {logout} from '../../actions/authActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }
    render() {
        return(
            <Fragment>
                <div onClick={this.props.logout} href="#">
                    Logout
                </div>
            </Fragment>
        )   
    }
}

export default connect(null,{logout})(Logout);