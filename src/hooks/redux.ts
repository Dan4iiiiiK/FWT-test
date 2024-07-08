import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
