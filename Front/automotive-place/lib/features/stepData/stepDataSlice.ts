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
    resetStepData: () => {
      return initialState;
    },
  },
});

export const { saveStepData, resetStepData } = stepDataSlice.actions;
export default stepDataSlice.reducer;
