import React from 'react';
import ReactDOM from 'react-dom';

// Javascript event propagation 
// if the event was generated by the child event and if the child does not handle it
// that event will propagate to the parent. so you need to prevent the child from propagating the event
const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;