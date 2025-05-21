import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAge } from "./../store/userSlice.js";
import { increaseCnt } from "./../store.js";
import { useEffect } from "react";
import { Route } from "react-router-dom";

function Cart() {
  let state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    console.log(state);
  }, [state]);
  //console.log(state);

  let dispatch = useDispatch(); //함수 실행 요청

  return (
    <div>
      <h6>
        {state.user.name} {state.user.age}의 장바구니
      </h6>
      <button
        onClick={() => {
          dispatch(changeAge(100));
        }}
      >
        버튼
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((cart, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{cart.name}</td>
              <td>{cart.count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(increaseCnt(cart.id));
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
