import {
  createContext,
  useEffect,
  useState,
  lazy,
  Suspense,
  useTransition,
  useDeferredValue,
} from "react";
import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
// import imgUrl from "./img/bg-1.png"; style={{ backgroundImage: "url(" + imgUrl + ")" }}
import data from "./data.js";
//import Detail from "./routes/Detail.js";
//import Cart from "./routes/Cart.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";

const Detail = lazy(() => import("./routes/Detail.js"));
const Cart = lazy(() => import("./routes/Cart.js"));

export let ConText1 = createContext();

function App() {
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  let obj = { name: "kim" };
  localStorage.setItem("data", JSON.stringify(obj));
  let jsonToObj = JSON.parse(localStorage.getItem("data")).name;
  console.log(jsonToObj);

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [stock] = useState([10, 11, 12]);

  // let result = useQuery("name", () => {
  //   axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
  //     return a.data;
  //   });
  // });

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate(-1);
              }}
            >
              뒤로가기
            </Nav.Link>
          </Nav>
          {/* <Nav className="ms-auto">
            {result.isLoading ? "로딩중" : result.data.name}
          </Nav> */}
        </Container>
      </Navbar>

      {/* <Link
        to="/"
        style={{ padding: 20, textDecoration: "none", color: "black" }}
      >
        홈
      </Link>
      <Link
        to="detail"
        style={{ padding: 20, textDecoration: "none", color: "black" }}
      >
        상세페이지
      </Link> */}

      <Suspense fallback={<div>로딩중..</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main-bg"></div>
                <div className="container">
                  <div className="row">
                    {shoes.map((shoe, i) => {
                      return <Item shoes={shoe} index={i} />;
                    })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    axios
                      .get("https://codingapple1.github.io/shop/data2.json")
                      .then((result) => {
                        let copy = [...shoes, ...result.data];
                        setShoes(copy);
                      })
                      .catch(() => {
                        console.log("fail");
                      });
                  }}
                >
                  button
                </button>
              </>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <ConText1.Provider value={{ stock }}>
                <Detail shoes={shoes} />
              </ConText1.Provider>
            }
          />

          <Route path="/cart" element={<Cart />} />

          <Route path="/test" element={<Test />} />

          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>member</div>} />
            <Route path="location" element={<div>location</div>} />
          </Route>
          {/* 404페이지 */}
          {/* <Route path="*" element={<div>미존재 페이지</div>} /> */}

          <Route path="/event" element={<Event />}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

function Item(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" +
          (props.index + 1) +
          ".jpg"
        }
        width="80%"
        alt=""
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사 정보</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Test() {
  let [name, setName] = useState("");
  let [isPending, startTransition] = useTransition();
  let state = useDeferredValue(name);

  let a = new Array(10000).fill(0);
  return (
    <div>
      <input
        onChange={(e) => {
          startTransition(() => {
            setName(e.target.value);
          });
        }}
      ></input>
      {isPending
        ? "로딩중"
        : a.map(() => {
            return <div>{state}</div>;
          })}
    </div>
  );
}

export default App;
