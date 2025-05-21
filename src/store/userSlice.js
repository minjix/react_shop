import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  //useState 역할
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      //state는 기존 state를 의미
      state.name = "park";
    },
    changeAge(state, a) {
      state.age += a.payload;
    },
  },
});

export let { changeName, changeAge } = user.actions;

export default user;
