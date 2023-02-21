const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    statusFilters: 'idle',
    activeFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED': 
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload),
                heroesLoadingStatus: 'idle'
            }
        case 'HERO_ADDED':
            let newCreatedHeroList = [...state.heroes, action.payload];

            return {
                ...state,
                heroes: newCreatedHeroList,
                heroesLoadingStatus: 'idle'
            }
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

export default reducer;