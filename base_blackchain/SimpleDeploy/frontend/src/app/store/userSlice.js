import { createSlice } from '@reduxjs/toolkit';

const initialState = { name: '', age: 0 };//inicializa o estado 

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
  },
});

export const { setName, setAge } = userSlice.actions;
export default userSlice.reducer;
