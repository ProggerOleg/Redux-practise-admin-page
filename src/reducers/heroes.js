import { createReducer } from "@reduxjs/toolkit"
import {
    heroesFetched, 
    heroesFetching,
    heroesFetchingError,
    heroAdded,
    heroDeleted
} from '../actions/index';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroAdded, (state, action) => {
            state.heroes.push(action.payload)
        }) 
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        })
        .addDefaultCase(() => {});
})

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HERO_DELETED': 
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload),
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HERO_ADDED':
//             let newCreatedHeroList = [...state.heroes, action.payload];

//             return {
//                 ...state,
//                 heroes: newCreatedHeroList,
//                 heroesLoadingStatus: 'idle'
//             }
//         default: return state
//     }
// }

export default heroes;