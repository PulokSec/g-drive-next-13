import { AppState } from "</store/store>";
import storage from "</store/sync_storage>";
import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  folders: [],
  files:[]
} as any;

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state, { payload }) => {
      state.folders = payload;
    },
    updateFolder: (state, { payload }) =>  {
      const newPathName = payload.newName?.replaceAll(" ","-");
      const oldPathName = payload.oldName?.replaceAll(" ","-");
      state.folders?.map((folder:any) => {
        if (folder.id === payload.id) {
          folder.name = payload.newName;
          const newPath = folder?.path.replaceAll(`${oldPathName}`,`${newPathName}`)
          folder.path = newPath;
        }
        if(folder?.parentId === payload.oldName) {
          folder.parentId = payload.newName;
          const newPath = folder?.path.replaceAll(`${oldPathName}`,`${newPathName}`)
          folder.path = newPath;
        }
      });
      state.files && state.files?.map((file:any) => {
        if(file?.parentId === payload.oldName) {
          file.parentId = payload.newName;
          const newPath = file?.path.replaceAll(`${oldPathName}`,`${newPathName}`)
          file.path = newPath;
        }
      });
    },
    deleteFolder: (state, action)=>{
        state.folders = state.folders && state.folders?.filter((item:any) => item.id !== action.payload.id && item.parentId !== action.payload.parentName);
        state.files = state.files && state.files?.filter((item:any) => item.parentId !== action.payload.parentName);
    },
    addFile: (state, { payload }) => {
      state.files = payload;
    },
    updateFile: (state, { payload }) =>  {
      state.files?.map((file:any) => {
        if (file?.id === payload.id) {
          file.name = payload.newName;
        }
      });
    },
    deleteFile: (state, action)=>{
      state.files = state.files && state.files?.filter((item:any) => item?.id !== action.payload.id);
  },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      storage.removeItem(state);
    });
  },
});

export const { addFolder,updateFolder,deleteFolder,addFile,updateFile,deleteFile } = folderSlice.actions;
export const selectFolderState = (state: AppState) => state.folders;
export default folderSlice.reducer;
