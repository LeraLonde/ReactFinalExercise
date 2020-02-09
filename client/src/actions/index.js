import streams from '../apis/streams';
import history from '../history';

import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
};

// Do some programmatic navigation to 
// get the user back to the root route
// Not ideal solution : [BrowserRouter] --> [History] --> [props] --> [component] --> [action-creator]
// We are going to create the history object instead of having BrowserRouter creating the history object
// History object - basically the thing that looks at the url and decide which content to be rendered.
// BrowserRouter is created by the History
// history.push('[path]')
export const createStream = (formValues) => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post('/streams', { ...formValues, userId });

    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push('/');
};

export const fetchStreams = () => async (dispatch) => {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
};

// PUT request :- the actual thing that happen, what ever thing that you place in the request
// it will completely replace the entire object. (so your user id disappears).
// PATCH request :- update some properties of an existing object.
export const editStream = (id, formValues) => async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
};

export const deleteStream = (id) => async (dispatch) => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
    history.push('/');
};