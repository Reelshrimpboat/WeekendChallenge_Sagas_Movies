import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';

// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects'

// Import axios
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield(takeEvery("GET_MOVIES", getMovies))
    yield(takeEvery("EDIT_DETAILS", editMovie))
}

//SAGAS

//Saga to get movies from database
function* getMovies(action) {
    try {
        //defines an array from an axios request to movie database
        const moviesResponse = yield axios.get(`/api/movies/`);
        console.log('moviesResponse:', moviesResponse);

        //sends database response to movies reducer for storage
        yield put({
            type: 'SET_MOVIES',
            payload: moviesResponse.data
        });
    } catch (error) {
        console.log('Error with Movies GET', error);
    };
}

//Saga to edit movie on database
function* editMovie(action) {
    console.log('editMovie, action.payload', action.payload)
    try {
        yield axios.put(`/api/movies/${action.payload.id}`, action.payload )
        yield put({
            type: 'GET_MOVIES'
        })
    } catch (error) {
        console.log('Error with Edit POST', error);
    };
}


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


//REDUCERS


// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the details of the selected movie
const movieDetails = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            console.log('SET_DETAILS, payload:', action)
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
