import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ReceivedSearches } from "../my_types";
import * as SearchAPIUtil from "./../util/api/search_api_util";

export const RECEIVE_SEARCHES = "RECEIVE_SEARCHES";
export const CLEAR_SEARCHES = "CLEAR_SEARCHES";

const receiveSearches = (receivedSearches: ReceivedSearches) => {
    return ({
        type: RECEIVE_SEARCHES,
        searches: receivedSearches.searches
    });
};

export const fetchSearches = (search: string) => (dispatch: Dispatch<AnyAction>) => {
    return (
        SearchAPIUtil.fetchSearches(search)
            .then((receivedSearches: ReceivedSearches) => dispatch(receiveSearches(receivedSearches)))
    );
};
export const clearSearches = () => {
    return ({
        type: CLEAR_SEARCHES
    });
};