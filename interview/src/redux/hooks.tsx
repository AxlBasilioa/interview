import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store";
import { RootState } from "./store";
export const useAppDispatch = ()=>{return useDispatch<AppDispatch>()}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;