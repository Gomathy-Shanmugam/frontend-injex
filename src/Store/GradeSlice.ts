// src/store/gradeSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Category = {
  name: string;
  weight: number;
};

type GradeScale = {
  letter: string;
  range: string;
};

interface GradeState {
  categories: Category[];
  gradingScales: GradeScale[];
}

const initialState: GradeState = {
  categories: [],
  gradingScales: [],
};

const gradeSlice = createSlice({
  name: "grade",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    setGradingScales(state, action: PayloadAction<GradeScale[]>) {
      state.gradingScales = action.payload;
    },
  },
});

export const { setCategories, setGradingScales } = gradeSlice.actions;
export default gradeSlice.reducer;
