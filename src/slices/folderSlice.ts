import { AppState } from "</store/store>";
import storage from "</store/sync_storage>";
import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  folders: [],
} as any;

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state, { payload }) => {
      state.folders = payload;
    },
    updateFolder: (state, { payload }) =>  {
      state.folders.map((folder:any) => {
        if (folder.id === payload.id) {
          folder.name = payload.name;
        }
        if(folder.parentId === payload.oldName) {
          folder.parentId = payload.newName;
        }
      });
    },
    deleteFolder: (state, action)=>{
        state.folders = state.folders.filter((item:any) => item.id !== action.payload.id);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      storage.removeItem(state);
    });
  },
});

export const { addFolder,updateFolder,deleteFolder } = folderSlice.actions;
export const selectFolderState = (state: AppState) => state.folders;
export default folderSlice.reducer;
