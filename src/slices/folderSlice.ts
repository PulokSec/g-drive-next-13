import { AppState } from "</store/store>";
import storage from "</store/sync_storage>";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
    // deleteFolder: (state, action)=>{
    //     return state.folders.filter((item:any) => item.id !== action.payload.id);
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      storage.removeItem(state);
    });
  },
});

export const { addFolder } = folderSlice.actions;
export const selectFolderState = (state: AppState) => state.folders;
export default folderSlice.reducer;
