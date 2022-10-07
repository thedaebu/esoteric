import { AnyAction, Dispatch } from "redux";
import { IndexTrack, ReceivedTrack, ReceivedTracks } from "../my_types";
import * as TrackAPIUtil from "./../util/api/track_api_util";

export const RECEIVE_TRACKS: string = "RECEIVE_TRACKS";
export const RECEIVE_TRACK: string = "RECEIVE_TRACK";

const receiveTracks: Function = ({ tracks }: {tracks: {[key: number]: IndexTrack}}) => ({
    type: RECEIVE_TRACKS,
    tracks
});
const receiveTrack: Function = (receivedTrack: ReceivedTrack) => ({
    type: RECEIVE_TRACK,
    annotations: receivedTrack.annotations,
    comments: receivedTrack.comments,
    track: receivedTrack.track
});

export const fetchTracks: Function = () => (dispatch: Dispatch<AnyAction>) => (
    TrackAPIUtil.fetchTracks()
        .then((receivedTracks: ReceivedTracks) => dispatch(receiveTracks(receivedTracks)))
);
export const fetchTrack: Function = (trackInfo: Array<string>) => (dispatch: Dispatch<AnyAction>) => (
    TrackAPIUtil.fetchTrack(trackInfo)
        .then((receivedTrack: ReceivedTrack) => dispatch(receiveTrack(receivedTrack)))
);