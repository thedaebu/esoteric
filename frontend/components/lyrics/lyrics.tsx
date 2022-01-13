import React, { MouseEvent, useState, useEffect } from "react";
import { Annotation, Track, User, Window } from "../../my_types";
import AnnotationShowContainer from "../annotations/annotation_show_container";
import CommentShowContainer from "../comments/comment_show_container";

declare const window: Window;
type Props = {
    annotations: {[key: number]: Annotation},
    closeAnnotationModal: Function,
    currentUser: User,
    fetchAnnotation: Function,
    fetchComment: Function,
    openAnnotationModal: Function,
    track: Track
}
type Highlighted = {
    anchorNode: HighlightedNode,
    anchorOffset: number,
    focusNode: HighlightedNode,
    focusOffset: number
}
type HighlightedNode = {
    parentNode: ParentNode
}
type ParentNode = {
    dataset: Dataset
}
type Dataset = {
    add: string,
    name: string
}

function LyricsShow(props: Props) {
    const { annotations, closeAnnotationModal, currentUser, fetchAnnotation, fetchComment, openAnnotationModal, track } = props;
    
    const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(null);
    const [annotationCreateStatus, setAnnotationCreateStatus] = useState<boolean>(false);
    const [endIndex, setEndIndex] = useState<number>(0);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [yCoord, setYCoord] = useState<number>(-367);

    useEffect(() => {
        track.annotation_ids.forEach((annotationId: number) => {
            fetchAnnotation(annotationId);
        });
        track.comment_ids.forEach((commentId: number) => {
            fetchComment(commentId);
        });
        window.scrollTo(0, 0);
    }, [])

    function annotatedLyrics() {
        const currentAnnotations: Array<Annotation> = track.annotation_ids.map((id: number) => {
            return annotations[id];
        });
        if (validAnnotations(currentAnnotations) === true && currentAnnotations.length > 0) {
            return (
                annotateLyrics(track.lyrics, currentAnnotations)
            );
        } else {
            return (
                <span
                    className="lyrics__not-annotation"
                    data-add="0"
                    data-name={"not-anno-0"}
                    onMouseUp={handleTextSelect}
                >
                    {track.lyrics}
                </span>
            );
        }
    }

    function validAnnotations(currentAnnotations: Array<Annotation>) {
        let isValid = true;
        for (let annotation of currentAnnotations) {
            if (annotation === undefined) {
                isValid = false;
            }
        }
        return isValid;
    }

    function annotateLyrics(lyrics: string, currentAnnotations: Array<Annotation>) {
        const sortedAnnotations: Array<Annotation> = currentAnnotations.sort((a: Annotation, b: Annotation) => (a.start_index > b.start_index
            ? 1
            : -1));
        const lyricsParts: Array<JSX.Element> = Array();
        let currentIndex: number = 0;

        sortedAnnotations.forEach((annotation: Annotation, idx: number) => {
            const addIndex: number = idx === 0
                ? 0
                : sortedAnnotations[idx-1].end_index;
            const startIndex: number = annotation.start_index;
            const endIndex: number = annotation.end_index;

            if (currentIndex === startIndex) {
                lyricsParts.push(
                    <span
                        className="lyrics__is-annotation"
                        data-name={`is-anno-${annotation.id}`}
                        data-id={`${annotation.id}`}
                        id={`is-anno-${annotation.id}`}
                        key={`is-anno-${annotation.id}`}
                        onClick={() => openAnnotation(annotation)}
                        >
                        {lyrics.slice(currentIndex, endIndex + 1)}
                    </span>
                )
            } else {
                lyricsParts.push(
                    <span
                        className="lyrics__not-annotation"
                        data-add={addIndex}
                        data-name={`not-anno-${idx}`}
                        id={`not-anno-${idx}`}
                        key={`not-anno-${idx}`}
                        >
                        {lyrics.slice(currentIndex, startIndex)}
                    </span>
                )
                lyricsParts.push(
                    <span
                        className="lyrics__is-annotation"
                        data-name={`is-anno-${annotation.id}`}
                        data-id={`${annotation.id}`}
                        id={`is-anno-${annotation.id}`}
                        key={`is-anno-${annotation.id}`}
                        onClick={() => openAnnotation(annotation)}
                        >
                        {lyrics.slice(startIndex, endIndex+1)}
                    </span>
                )
            }
            if (idx === sortedAnnotations.length - 1) {
                lyricsParts.push(
                    <span
                        className="lyrics__not-annotation"
                        data-add={endIndex}
                        data-name={`not-anno-${idx + 1}`}
                        id={`not-anno-${idx + 1}`}
                        key={`not-anno-${idx + 1}`}
                        >
                        {lyrics.slice(endIndex +1, lyrics.length + 1)}
                    </span>
                )
            }
            currentIndex = endIndex + 1;
        })

        return lyricsParts;
    }

    function openAnnotation(annotation: Annotation) {
        setCurrentAnnotation(annotation);
    }

    function handleTextSelect(e: MouseEvent<HTMLElement>) {
        e.preventDefault();

        setYCoord(e.pageY-(e.pageY % 30)-367);

        const highlighted: Highlighted = window.getSelection()
        if (highlighted !== null) {
            if (highlighted.anchorOffset !== highlighted.focusOffset) {
                const newIndices: Array<number> = makeNewIndices(highlighted);
                const min: number = Math.min(...newIndices) < 0
                    ? 0
                    : Math.min(...newIndices);
                const max: number = Math.max(...newIndices);

                setStartIndex(min);
                setEndIndex(max);
                openAnnotationModal();
            }
        }
    }

    function makeNewIndices(highlighted: Highlighted) {
        const anchorName: string = highlighted.anchorNode.parentNode.dataset.name;
        const focusName: string = highlighted.focusNode.parentNode.dataset.name;
        const add: number = parseInt(highlighted.focusNode.parentNode.dataset.add);
        let beginning: number = 0;
        let end: number = 0;

        if (anchorName.includes("not-anno") && anchorName === focusName) {
            beginning = highlighted.anchorOffset + add;
            end = highlighted.focusOffset + add;
        } 
        if (anchorName.includes("not-anno-0")) {
            end -= 1;
        } else {
            beginning += 1;
        }

        return [beginning, end];
    }

    function handleTextDeselect() {
        setCurrentAnnotation(null);
        closeAnnotationModal();
        setAnnotationCreateStatusFalse();
    }

    function setAnnotationCreateStatusTrue() {
        setAnnotationCreateStatus(true);
    }

    function setAnnotationCreateStatusFalse() {
        setAnnotationCreateStatus(false);
    }

    return (
        <div className="lyrics">
            <div className="lyrics__shade">
                <div className="lyrics__text" onMouseDown={handleTextDeselect} >
                    <p className="lyrics__top">{track.title.toUpperCase()} LYRICS</p>
                    <pre className="lyrics__body" onMouseUp={handleTextSelect}>
                        {annotatedLyrics()}
                    </pre> 
                    <CommentShowContainer
                        commentableType="Track"
                        currentUser={currentUser}
                        parent={track}
                    />
                </div>
                <div className="lyrics__right">
                    <AnnotationShowContainer
                        annotation={currentAnnotation}
                        annotationCreateStatus={annotationCreateStatus}
                        currentUser={currentUser}
                        endIndex={endIndex}
                        setAnnotationCreateStatusFalse={setAnnotationCreateStatusFalse}
                        startIndex={startIndex}
                        track={track}
                        setAnnotationCreateStatusTrue={setAnnotationCreateStatusTrue}
                        yCoord={yCoord}
                    />
                </div>
            </div>
        </div>
    );
}

export default LyricsShow;