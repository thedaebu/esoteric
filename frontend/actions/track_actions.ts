import { AnyAction, Dispatch } from "redux";
import { ReceivedTrack, ReceivedTracks } from "../my_types";
import * as TrackAPIUtil from "./../util/api/track_api_util";

export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_TRACK = "RECEIVE_TRACK";

const receiveTracks = (receivedTracks: ReceivedTracks) => {
    return ({
        type: RECEIVE_TRACKS,
        tracks: receivedTracks.tracks
    });
};
const receiveTrack = (receivedTrack: ReceivedTrack) => {
    return ({
        type: RECEIVE_TRACK,
        annotations: receivedTrack.annotations,
        comments: receivedTrack.comments,
        track: receivedTrack.track,
        votes: receivedTrack.votes
    });
};

export const fetchTracks = () => (dispatch: Dispatch<AnyAction>) => {  
    return (
        TrackAPIUtil.fetchTracks()
            .then((receivedTracks: ReceivedTracks) =>
                dispatch(receiveTracks(receivedTracks)))
    );
};
export const fetchTrack = (trackId: string) => (dispatch: Dispatch<AnyAction>) => {
    return (
        TrackAPIUtil.fetchTrack(trackId)
            .then((receivedTrack: ReceivedTrack) => dispatch(receiveTrack(receivedTrack)))
    );
};