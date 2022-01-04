import React, { useEffect } from "react";
import { Track, Window } from "../../my_types";
import LyricsShowContainer from "../lyrics/lyrics_show_container";
import NavBar from "../navbar/navbar";
import TrackShowHeader from "./track_show_header";

declare const window: Window;

type Props = {
    fetchTrack: Function,
    track: Track,
    trackId: string
}

function TrackShow(props: Props) {
    const { fetchTrack, track, trackId } = props;

    useEffect(() => {
        fetchTrack(trackId);
        window.scrollTo(0, 0);
    }, [trackId]);

    if (track) {
        return (
            <div>
                <NavBar />
                <TrackShowHeader
                    track={track}
                />
                <div className="track-show-bottom-main">
                    <LyricsShowContainer
                        track={track}
                    />
                </div>
            </div>
        );
    } else {
        return (
            null
        );
    }
}

export default TrackShow;