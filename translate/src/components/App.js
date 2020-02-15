import React from 'react';
import UserCreate from '../components/UserCreate';
import LanguageSelector from '../components/LanguageSelector';
import LanguageContext, { LanguageStore } from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';

class App extends React.Component {
    // UserCreate is the only component that need to know the value
    // of the current context.
    render() {
        return (
            <div className="ui container">
                <LanguageStore>
                    <LanguageSelector />
                    <ColorContext.Provider value="primary">
                        <UserCreate />
                    </ColorContext.Provider>
                </LanguageStore>
            </div>
        );
    }
}

export default App;