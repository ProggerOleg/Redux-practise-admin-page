const initialState = {
    filters: [],
    statusFilters: 'idle',
    activeFilter: 'all'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHING':
            return {
                ...state,
                statusFilters: 'loading'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                statusFilters: 'error'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                statusFilters: 'idle',
                filters: action.payload
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state, 
                activeFilter: action.payload
            }
        default: return state
    }
}

export default filters;