import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IObject } from "../../interface/interface";

interface IinitialState {
  title: string;
  author: string;
  location: string;
  from: string;
  to: string;
  filter: IObject;
  limit: number;
}

const initialState: IinitialState = {
  title: "",
  author: "",
  location: "",
  from: "",
  to: "",
  filter: {},
  limit: 6,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTitleFilter: (state, action: PayloadAction<string>) => {
      return { ...state, title: action.payload };
    },
    setAuthorFilter: (state, action: PayloadAction<string>) => {
      return { ...state, author: action.payload };
    },
    setLocationFilter: (state, action: PayloadAction<string>) => {
      return { ...state, location: action.payload };
    },
    setFromFilter: (state, action: PayloadAction<string>) => {
      return { ...state, from: action.payload };
    },
    setToFilter: (state, action: PayloadAction<string>) => {
      return { ...state, to: action.payload };
    },
    setAddFilter: (state, action: PayloadAction<IObject>) => {
      state.filter = action.payload;
    },
    setClearFilter: () => {
      return initialState;
    },
    setClearTitleFilter: (state, action: PayloadAction<string>) => {
      return { ...state, title: action.payload };
    },
    setLimit: (state, action: PayloadAction<number>) => {
      return { ...state, limit: action.payload };
    },
  },
});

export default filterSlice.reducer;

export const {
  setTitleFilter,
  setAuthorFilter,
  setLocationFilter,
  setFromFilter,
  setToFilter,
  setAddFilter,
  setClearFilter,
  setClearTitleFilter,
  setLimit,
} = filterSlice.actions;

export const selectTitleFilter = (state: RootState) => state.filter.title;
export const selectAuthorFilter = (state: RootState) => state.filter.author;
export const selectLocationFilter = (state: RootState) => state.filter.location;
export const selectFromFilter = (state: RootState) => state.filter.from;
export const selectToFilter = (state: RootState) => state.filter.to;
export const selectAddFilter = (state: RootState) => state.filter.filter;
export const selectLimit = (state: RootState) => state.filter.limit;
