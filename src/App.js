import React, { useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Home from "./pages/home";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [...action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

const dummyData = [
  {
    id: 1,
    emotion: 1,
    date: 1708163220553, //new Date().getTime()의 값    이후 이 값을 new Date(1708163220553) 로 활용
    content: "1번째 일기",
  },
  {
    id: 2,
    emotion: 2,
    date: 1708163220554,
    content: "2번째 일기",
  },
  {
    id: 3,
    emotion: 3,
    date: 1708163220555,
    content: "3번째 일기",
  },
  {
    id: 4,
    emotion: 4,
    date: 1708163220556,
    content: "4번째 일기",
  },
  {
    id: 5,
    emotion: 5,
    date: 1708163220557,
    content: "5번째 일기",
  },
];

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(0);

  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={(onCreate, onEdit, onRemove)}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
