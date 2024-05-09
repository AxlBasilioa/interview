import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isVisible: false,
    id:0,
    mail:'',
    body:'',
}
const editSlice = createSlice({
    name:'edit',
    initialState,
    reducers:{
        saveEdit:(state,action)=>{
            state.isVisible = action.payload.isVisible;
            state.id = action.payload.id;
            state.mail = action.payload.mail;
            state.body = action.payload.body;
        },
        clearData:(state,action)=>{
            state.mail = '';
            state.body = '';
            state.id = 0;
            state.isVisible = false;
        },
        saveEditMail: (state, action) => {
            state.mail = action.payload.mail;
        }
    }
});
export const { saveEdit, clearData, saveEditMail } = editSlice.actions;
export default editSlice.reducer;