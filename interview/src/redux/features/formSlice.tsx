import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    mail:'',
    body:''
};
const formSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
        setMail:(state,action)=>{
            state.mail = action.payload.mail;
        },
        //body stter is apart, because mail is conditionated by a regex, until it's not matching regex, is not stored
        //body is stored always
        setBody:(state,action)=>{
            state.body = action.payload.body;
        },
        clearData:(state,action)=>{
            state.body = '';
        }
    }
});
export const { setMail, setBody, clearData } = formSlice.actions;
export default formSlice.reducer;