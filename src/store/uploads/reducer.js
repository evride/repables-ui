import * as UploadTypes from './types';

const initialState = {
    dropDepth: 0,
    inDropZone: false,
    fileList: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case UploadTypes.SET_DROP_DEPTH:
        return { ...state, dropDepth: action.dropDepth }
      case UploadTypes.SET_IN_DROP_ZONE:
        return { ...state, inDropZone: action.inDropZone };
      case UploadTypes.ADD_FILE_TO_LIST:
        return { ...state, fileList: state.fileList.concat(action.files) };
      case UploadTypes.CLEAR_FILE_LIST:
        return { ...state, fileList: []}
      default:
        return state;
    }
  };

export default reducer;