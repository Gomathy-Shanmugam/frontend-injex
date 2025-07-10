// src/Store/GradeSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Category = { name: string; weight: number };
type GradeScale = { letter: string; min: number; max: number };

interface GradeState {
  categories: Category[];
  gradingScales: GradeScale[];
}

const initialState: GradeState = {
  categories: [],
  gradingScales: [
    { letter: "A+", min: 95, max: 100 },
    { letter: "A", min: 90, max: 94 },
    { letter: "B+", min: 85, max: 89 },
    { letter: "B", min: 75, max: 84 },
    { letter: "C", min: 65, max: 74 },
    { letter: "D", min: 50, max: 64 },
    { letter: "F", min: 0, max: 49 },
  ],
};

const gradeSlice = createSlice({
  name: "grade",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setGradingScales: (state, action: PayloadAction<GradeScale[]>) => {
      state.gradingScales = action.payload;
    },
    resetGradeState: (state) => {
      state.categories = [];
      state.gradingScales = [];
    },
  },
});

export const {
  setCategories,
  setGradingScales,
  resetGradeState, // ✅ export this
} = gradeSlice.actions;

export default gradeSlice.reducer;