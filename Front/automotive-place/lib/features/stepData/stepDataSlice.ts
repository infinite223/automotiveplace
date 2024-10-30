import { createSlice } from "@reduxjs/toolkit";

interface IStepData {
  step: number;
  data: any;
}

const initialState: IStepData[] = [];

export const stepDataSlice = createSlice({
  name: "stepData",
  initialState,
  reducers: {
    saveStepData: (state, action) => {
      const { step, data } = action.payload;
      const existingStepData = state.find((item) => item.step === step);
      if (existingStepData) {
        existingStepData.data = data;
      } else {
        state.push({ step, data });
      }
    },
  },
});

export const { saveStepData } = stepDataSlice.actions;
export default stepDataSlice.reducer;
