import * as types from '../actions';

import { createList, updateOrAddListItem } from '../utils/store';


export default function notes(state = null, action) {
    if (action.type == types.RETRIEVE_PERSON_NOTES + '_PENDING') {
        return Object.assign({}, state, {
            byPerson: Object.assign({}, state.byPerson, {
                [action.meta.id]: createList([], { isPending: true }),
            }),
        });
    }
    else if (action.type == types.RETRIEVE_PERSON_NOTES + '_REJECTED') {
        return Object.assign({}, state, {
            byPerson: Object.assign({}, state.byPerson, {
                [action.meta.id]: Object.assign({}, state.byPerson[action.meta.id], {
                    isPending: true,
                    error: action.payload.data,
                }),
            }),
        });
    }
    else if (action.type == types.RETRIEVE_PERSON_NOTES + '_FULFILLED') {
        return Object.assign({}, state, {
            byPerson: Object.assign({}, state.byPerson, {
                [action.meta.id]: createList(action.payload.data.data),
            }),
        });
    }
    else if (action.type == types.CREATE_PERSON_NOTE + '_FULFILLED') {
        return Object.assign({}, state, {
            byPerson: Object.assign({}, state.byPerson, {
                [action.meta.id]: updateOrAddListItem(state.byPerson[action.meta.id],
                    action.payload.data.data.id, action.payload.data.data),
            }),
        });
    }
    else {
        return state || {
            byPerson: {},
        };
    }
}
