import React from 'react';
import { Router, Route } from 'react-router-dom';
import StreamCreate from '../components/streams/StreamCreate';
import StreamEdit from '../components/streams/StreamEdit';
import StreamList from '../components/streams/StreamList';
import StreamShow from '../components/streams/StreamShow';
import StreamDelete from '../components/streams/StreamDelete';
import Header from './Header';
import history from '../history';

// BAD Practice!!
// Do not use anchor tag with react-router
// <a href="">link</a> - is invoked
// you will get a fresh copy of index.html - which you will lose all the
// existing state/js objects, means u need to re-fetch all the data again.
/*const PageOne = () => {
    return (
        <div>
            PageOne
            <Link to="/pagetwo">Navigate to PageTwo</Link>
        </div>
    );
};*/

// <LINK>
// Even after you Link tag - the DOM is using an anchor tag.
// React Router will prevent the browser from navigating to the new page and fetch a new index.html
// 'History' will see the request and send it to BrowserRouter
// URL still changes - BrowserRouter will communicate with the Route component - and show the right component
/*const PageTwo = () => {
    return (
        <div>
            PageTwo
            <Link to="/">Navigate to PageOne</Link>
        </div>
    );
};*/

// if you take the exact keyword away, both component for pageOne and pageTwo will appear
// exact => exact={true}
// it is due to the matching logic behind react-router:- extractedPath.contains(path)
// '/pagetwo' contains '/' and also '/pagetwo'
/*
<BrowserRouter>
    <div>
        <Route path="/" exact component={PageOne} />
        <Route path="/pagetwo" component={PageTwo} />
    </div>
</BrowserRouter>
*/

// Side topic for React Router - relevant when u deploy your application
// 3 types of routers - see the parts of the URL
// BrowserRouter - everything after TLD (.com, .net) based on string pattern matching
// HashRouter - add a '#' into your URL - localhost/#/pagetwo
// MemoryRouter - URL is not used at all.

// BrowserRouter - deployment with BrowserRouter is extremely difficult.
// On a dev server - if they cant find a page then it will return the index.js
// traditional server - if they cant find a page then it will return 404.
// - configure it to return index.html by default

// HashRouter - We can make request to localhost:3000 - so that it will always return index.html
// Server will not look at anything after the '#'.
// Application will look at anything that is after the '#' and determine which component to load.
// if you are doing a deployment to github pages (e.g.)
const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <Header />
                <div>
                    <Route path="/" exact component={StreamList} />
                    <Route path="/stream/new" exact component={StreamCreate} />
                    <Route path="/stream/edit/:id" exact component={StreamEdit} />
                    <Route path="/stream/delete" exact component={StreamDelete} />
                    <Route path="/stream/show" exact component={StreamShow} />
                </div>
            </Router>
        </div>
    );
}

export default App;
