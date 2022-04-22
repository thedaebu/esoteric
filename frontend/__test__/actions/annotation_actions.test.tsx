import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as AnnotationActions from "../../actions/annotation_actions";
import * as AnnotationAPIUtil from "../../util/api/annotation_api_util";
import { testAnnotationsData } from "../test_store_data";
import { Middleware } from "redux";
import { Annotation, CreatedAnnotation, UpdatedAnnotation } from "../../my_types";

const middlewares: Array<Middleware> = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("annotation actions", () => {
    describe("constants", () => {
        test("exports a RECEIVE_ANNOTATION constant", () => {
            expect(AnnotationActions.RECEIVE_ANNOTATION).toEqual("RECEIVE_ANNOTATION");
        });
        test("exports a RECEIVE_ANNOTATION_ERRORS constant", () => {
            expect(AnnotationActions.RECEIVE_ANNOTATION_ERRORS).toEqual("RECEIVE_ANNOTATION_ERRORS");
        });
        test("exports a REMOVE_ANNOTATION constat", () => {
            expect(AnnotationActions.REMOVE_ANNOTATION).toEqual("REMOVE_ANNOTATION");
        });
    });
    describe("functions", () => {
        const annotation: Annotation = testAnnotationsData[1];
        let store: any;
        beforeEach(() => {
            store = mockStore({ annotations: {} });
        });
        afterEach(() => {
            store.clearActions();
        });
        describe("fetchAnnotation", () => {
            test("is exported", () => {
                expect(typeof AnnotationActions.fetchAnnotation).toEqual("function");
            });
            test("dispatches RECEIVE_ANNOTATION when fetchAnnotation is called", () => {
                const data = { annotation: annotation };
                AnnotationAPIUtil.fetchAnnotation = jest.fn((annotationId: number) => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_ANNOTATION", annotation: data.annotation }];
                return store.dispatch(AnnotationActions.fetchAnnotation(1)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("createAnnotation", () => {
            test("is exported", () => {
                expect(typeof AnnotationActions.createAnnotation).toEqual("function");
            });
            test("dispatches RECEIVE_ANNOTATION when createAnnotation is called", () => {
                const createdAnnotation: CreatedAnnotation = {
                        annotator_id: 1,
                        annotator_name: "reallysmart",
                        body: "annotation body",
                        end_index: 1,
                        start_index: 1,
                        track_id: 1
                };
                const data = { annotation: annotation };
                AnnotationAPIUtil.createAnnotation = jest.fn((createdAnnotation: CreatedAnnotation) => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_ANNOTATION", annotation: data.annotation }];
                return store.dispatch(AnnotationActions.createAnnotation(createdAnnotation)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("updateAnnotation", () => {
            test("is exported", () => {
                expect(typeof AnnotationActions.updateAnnotation).toEqual("function");
            });
            test("dispatches RECEIVE_ANNOTATION when updateAnnotation is called", () => {
                const updatedAnnotation: UpdatedAnnotation = {
                        annotator_id: 1,
                        annotator_name: "reallysmart",
                        body: "annotation body",
                        end_index: 1,
                        id: 1,
                        start_index: 1,
                        track_id: 1
                };
                const data = { annotation: annotation };
                AnnotationAPIUtil.updateAnnotation = jest.fn((updatedAnnotation: UpdatedAnnotation) => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_ANNOTATION", annotation: data.annotation }];
                return store.dispatch(AnnotationActions.updateAnnotation(updatedAnnotation)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("deleteAnnotation", () => {
            test("is exported", () => {
                expect(typeof AnnotationActions.deleteAnnotation).toEqual("function");
            });
            test("dispatched REMOVE_ANNOTATION when deleteAnnotation is called", () => {
                const data = { annotation: annotation };
                AnnotationAPIUtil.deleteAnnotation = jest.fn((annotationId: number) => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "REMOVE_ANNOTATION", annotationId: 1 }];
                return store.dispatch(AnnotationActions.deleteAnnotation(1)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
    });
});