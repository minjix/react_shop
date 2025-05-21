import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice.js";

// let user = createSlice({
//   //useState 역할
//   name: "user",
//   initialState: { name: "kim", age: 20 },
//   reducers: {
//     changeName(state) {
//       //state는 기존 state를 의미
//       state.name = "park";
//     },
//     changeAge(state, a) {
//       state.age += a.payload;
//     },
//   },
// });

//함수 export
//export let { changeName, changeAge } = user.actions;

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    increaseCnt(state, id) {
      //   state.map((cart) => {
      //     if (cart.id == id.payload) {
      //       cart.count += 1;
      //     }
      //   });
      let i = state.findIndex((a) => {
        return a.id == id.payload;
      });
      state[i].count++;
    },
    addItem(state, item) {
      state.push(item.payload);
    },
  },
});

export let { increaseCnt, addItem } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
