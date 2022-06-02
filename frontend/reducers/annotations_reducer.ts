import { RECEIVE_ANNOTATION, REMOVE_ANNOTATION } from "../actions/annotation_actions";
import { RECEIVE_TRACK, RECEIVE_TRACKS } from "../actions/track_actions";
import { Action, Annotation } from "../my_types";

const annotationsReducer = (state: {[key: number]: Annotation} = {}, action: Action) => {
    Object.freeze(state);
    const newState: {[key: number]: Annotation} = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_TRACKS:
            return {};
        case RECEIVE_TRACK:
            return action.annotations;
        case RECEIVE_ANNOTATION:
            return {...state, [action.annotation.id]: action.annotation};
        case REMOVE_ANNOTATION:
            delete newState[action.annotationId];
            return newState;
        default:
            return state;
    }
};

export default annotationsReducer;