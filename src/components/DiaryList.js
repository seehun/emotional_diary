import React, { useState } from "react";
import MyButton from "./Mybutton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <>
      <select
        className="ControlMenu"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {optionList.map((e, idx) => (
          <option value={e.value} key={idx}>
            {e.name}
          </option>
        ))}
      </select>
    </>
  );
};

const optionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

const filterOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "나쁜 감정만" },
];

function DiaryList({ diaryList }) {
  const navigate = useNavigate();
  //   console.log(diaryList);
  const [sortedType, setSortedType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortedType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filterdList =
      filter === "all"
        ? copyList
        : copyList.filter((e) => {
            if (filter === "good") {
              return parseInt(e.emotion) <= 3;
            } else {
              return parseInt(e.emotion) > 3;
            }
          });

    const sortedList = filterdList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortedType}
            onChange={setSortedType}
            optionList={optionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            text={"새 일기 쓰기"}
            type={"positive"}
            onClick={() => {
              navigate("/new");
            }}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((e) => (
        <DiaryItem key={e.id} {...e} />
      ))}
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
