// used for action files
export type CreatedAnnotation = {
    annotator_id: number,
    annotator_name: string,
    body: string,
    end_index: number,
    start_index: number,
    track_id: number
};
export type CreatedComment = {
    body: string,
    commentable_id: number
    commentable_type: "Track" | "Annotation",
    commenter_id: number,
    commenter_name: string
};
export type CreatedVote = {
    voteable_type: "Annotation" | "Comment",
    voteable_id: number,
    voter_id: number
};
export type ReceivedAnnotation = {
    annotation: Annotation
};
export type ReceivedComment = {
    comment: Comment
};
export type ReceivedSearches = {
    searches: {[key: number]: IndexTrack}
};
export type ReceivedTrack = {
    annotations: {[key:number]: Annotation},
    comments: {[key:number]: Comment},
    track: {[key:number]: Track}
};
export type ReceivedTracks = {
    tracks: {[key: number]: IndexTrack}
};
export type ReceivedUser = {
    user: User
};
export type UpdatedAnnotation = {
    annotator_id: number,
    annotator_name: string,
    body: string,
    end_index: number,
    id: number,
    start_index: number,
    track_id: number
};
export type UpdatedComment = {
    body: string,
    commentable_id: number
    commentable_type: "Track" | "Annotation",
    commenter_id: number,
    commenter_name: string,
    id: number
};

// used for redux store
export type PreloadedState = {
    entities: { user: {[key: number]: User} },
    session: { id: number }
};
export type State = {
    entities: Entities,
    session: SessionId
};
type Entities = {
    annotations: {[key:number]: Annotation},
    comments: {[key:number]: Comment},
    indexTracks: {[key: number]: IndexTrack},
    searches: {[key:number]: IndexTrack},
    track: Track,
    user: {[key:number]: User}
};
type SessionId = {
    id: number | null
};

// used for reducer files
export type Action = {
    annotation: Annotation,
    annotationId: number,
    annotations: {[key: number]: Annotation},
    comment: Comment,
    commentId: number,
    comments: {[key: number]: Comment},
    errors: Array<string>,
    searches: {[key: number]: IndexTrack},
    track: Track,
    tracks: {[key: number]: IndexTrack},
    type: string,
    user: User
};

// main feature types
export type Annotation = {
    annotator_id: number,
    annotator_name: string,
    body: string,
    end_index: number,
    id: number,
    start_index: number,
    track_id: number,
    votes: {[key: number]: Vote}
};
export type Comment = {
    body: string,
    commentable_id: number,
    commentable_type: "Track" | "Annotation",
    commenter_id: number,
    commenter_name: string,
    id: number,
    votes: {[key: number]: Vote},
    updated_at: string
};
export type IndexTrack = {
    artist: string,
    artwork_path: string,
    id: number,
    title: string
};
export type SessionUser = {
    password: string,
    username: string
};
export type Track = {
    artist: string,
    artwork_path: string,
    id: number,
    lyrics: string,
    spotify_path: string,
    title: string
};
export type User = {
    id: number,
    username: string
};
export type Vote = {
    id: number,
    voteable_id: number,
    voteable_type: "Annotation" | "Comment",
    voter_id: number
};

// used for Window
export type Window = {
    angellist: string,
    currentUser: User,
    eyeIcon: string,
    fireIcon: string,
    getSelection: Function,
    github: string,
    linkedin: string,
    scrollTo: Function,
    website: string
};