import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Home from "./pages/home";

//components
import MyButton from "./components/Mybutton";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header
          headText={"App"}
          leftChild={<MyButton text={"왼쪽 버튼"} onClick={() => alert("a")} />}
          rightChild={
            <MyButton text={"오른쪽 버튼"} onClick={() => alert("a")} />
          }
        />
        <h2>app</h2>
        <MyButton text={"btn"} onClick={() => alert("a")} type={"positive"} />
        <MyButton text={"btn"} onClick={() => alert("a")} type={"negative"} />
        <MyButton text={"btn"} onClick={() => alert("a")} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/new" element={<New />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
