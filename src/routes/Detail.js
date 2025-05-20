import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";

//스타일로 컴포넌트 생성
// let YellowBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg == "blue" ? "white" : "black")};
//   padding: 10px;
// `;

// let Box = styled.div`
//   background: grey;
//   padding: 20px;
// `;

//object data
function Detail(props) {
  //let [display, setDisplay] = useState("block");
  let [display, setDisplay] = useState(true);
  let [display2, setDisplay2] = useState("");
  let [count, setCount] = useState(0);
  let { id } = useParams();
  let data = props.shoes.find(function (x) {
    return x.id == id;
  });
  let [tab, setTab] = useState(0);

  useEffect(() => {
    //Detail 컴포넌트가 mount, update될 때 실행
    //html rendering 이 다 끝난 후 실행됨
    // for (var i = 0; i < 10000; i++) {
    //   console.log(1);
    // }
    let timer = setTimeout(() => {
      //setDisplay("none");
      setDisplay(false);
    }, 2000);

    if (isNaN(display2)) {
      alert("숫자만 입력 가능합니다.");
    }

    return () => {
      //useEffect가 동작 전에 실행

      //clean up function 작성 많이 함
      //clean up function은 mount시 실행안됨, unmount시 실행됨
      clearTimeout(timer);
    };
  }, [display2]);
  // [] 만 할경우 mount 됐을 경우에만 코드 실행
  // [...] dependency가 있을 경우 그 state가 변경될때마다 코드 실행

  return (
    <div className="container">
      {display == true ? (
        <div
          className="alert alert-warning"
          //style={{ background: "grey", display: display }}
        >
          2초이내 구매시 할인
        </div>
      ) : null}

      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      {/* 스타일 컴포넌트 사용
      <Box>
        <YellowBtn bg="blue">button</YellowBtn>
      </Box> */}
      <div className="row" style={{ padding: "30px" }}>
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (data.id + 1) +
              ".jpg"
            }
            width="100%"
            alt=""
          />
        </div>
        <input
          onChange={(e) => {
            setDisplay2(e.target.value);
          }}
        />
        <div className="col-md-6">
          <h4 className="pt-5">{data.title}</h4>
          <p>{data.content}</p>
          <p>{data.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}

function TabContent({ tab }) {
  // props 없이 사용 가능
  // if (tab == 0) {
  //   return <div>내용0</div>;
  // } else if (tab == 1) {
  //   return <div>내용1</div>;
  // } else {
  //   return <div>내용2</div>;
  // }
  let array = [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>];
  return array[tab];
}

export default Detail;
