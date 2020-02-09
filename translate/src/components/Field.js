import React from 'react';
import Languagecontext from '../contexts/LanguageContext';

class Field extends React.Component {
    static contextType = Languagecontext;

    render() {
        const text = this.context === 'english' ? 'Name' : 'Naam';

        return (
            <div className="ui field">
                <label>{text}</label>
                <input />
            </div>
        );
    }
}

export default Field;