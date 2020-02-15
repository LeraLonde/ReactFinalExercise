import React from 'react';
import LanguageContext from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';

class Button extends React.Component {
    // Hook up React context to a component
    // static contextType = [context]; -- it has to be named contextType
    // static keyword = setting a property directly.
    // static contextType = LanguageContext; -- single react context
    // when we are using a consumer we dont need a context type.
    // consumer will be used whenever we need to consume information from multiple context
    // you always pass in a function for a consumer.

    renderSubmit = (language) => {
        return language === 'english' ? 'Submit' : 'Voorleggen'
    }

    render() {
        return (
            <ColorContext.Consumer>
                {(color) =>
                    <button className={`ui button ${color}`}>
                        <LanguageContext.Consumer>
                            {({ language }) => this.renderSubmit(language)}
                        </LanguageContext.Consumer>
                    </button>
                }
            </ColorContext.Consumer>
        );
    }
}

export default Button;