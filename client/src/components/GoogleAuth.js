import React, { Component } from 'react';
import { signIn, signOut } from '../actions';
import { connect } from 'react-redux';

class GoogleAuth extends Component {

    componentDidMount() {
        // within window scope :- window is required
        // Callback after the lib have been successfully load - so that you can initiate the client.
        // Any function that returns a promise you can chain it with then()
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '622287730258-kqojicm48p96nbt71rjsbdh3hol4jmc8.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={() => { this.auth.signOut() }}>
                    <i className="google icon" /> Sign Out
                </button>
            );
        } else {
            return (
                <button className="ui red google button" onClick={() => { this.auth.signIn() }}>
                    <i className="google icon" /> Sign In with Google
                </button>
            );
        }
    }

    render() {
        return this.renderAuthButton();
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);