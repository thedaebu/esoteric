import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Track } from "../my_types";
import * as SearchApiUtil from "./../util/search_api_util";

export const RECEIVE_SEARCHES = "RECEIVE_SEARCHES";
export const CLEAR_SEARCHES = "CLEAR_SEARCHES";

const receiveSearches = (searches: Array<Track>) => {
    return ({
        type: RECEIVE_SEARCHES,
        searches
    });
};

export const fetchSearches = (search: string) => (dispatch: Dispatch<AnyAction>) => {
    return (
        SearchApiUtil.fetchSearches(search)
            .then((searches: Array<Track>) => dispatch(receiveSearches(searches)))
    );
};
export const clearSearches = () => {
    return ({
        type: CLEAR_SEARCHES
    });
};