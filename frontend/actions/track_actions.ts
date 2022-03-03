import { AnyAction, Dispatch } from "redux";
import { ReceivedTrack, ReceivedTracks } from "../my_types";
import * as TrackApiUtil from "./../util/track_api_util";

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
        TrackApiUtil.fetchTracks()
            .then((receivedTracks: ReceivedTracks) =>
                dispatch(receiveTracks(receivedTracks)))
    );
};
export const fetchTrack = (trackId: string) => (dispatch: Dispatch<AnyAction>) => {
    return (
        TrackApiUtil.fetchTrack(trackId)
            .then((receivedTrack: ReceivedTrack) => dispatch(receiveTrack(receivedTrack)))
    );
};