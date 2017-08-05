const SEARCH_LOAD = 'movie/SEARCH_LOAD';
const SEARCH_PASS = 'movie/SEARCH_PASS';
const SEARCH_FAIL = 'movie/SEARCH_FAIL';
const MODIFY_WATCH = 'movie/MODIFY_WATCH';
const RESET = 'movie/RESET';

const initialState = {
    loading: false,
    movieError: null,
    movieData: null,
    watchedData: []
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SEARCH_LOAD:
            return {
                ...state,
                loading: true,
                movieError: null,
                movieData: null
            };
        case SEARCH_PASS:
            return {
                ...state,
                loading: false,
                movieData: action.result,
                movieError: null
            };
        case SEARCH_FAIL:
            return {
                ...state,
                loading: false,
                movieError: action.error,
                movieData: null
            };
        case MODIFY_WATCH:
            return {
                ...state,
                watchedData: action.value
            };
        case RESET:
            return {
                ...state,
                loading: false,
                movieError: null,
                movieData: null,
                watchedData: []
            };
        default:
            return state;
    }
}

export function search(value) {
    return {
        types: [SEARCH_LOAD, SEARCH_PASS, SEARCH_FAIL],
        promise: (client) => client.searchApi(value)
    };
}
export function addToWatch(value) {
    return {
        type: MODIFY_WATCH, value
    };
}
export function reset() {
    return {
        type: RESET
    };
}
