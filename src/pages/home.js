import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import MyButton from "../components/Mybutton";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

function Home() {
  const diaryList = useContext(DiaryStateContext);
  // console.log(diaryContext);
  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());

  const headerText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    const titleEm = document.getElementsByTagName("title")[0];
    titleEm.innerHTML = `감정 일기장`;
  }, []);

  useEffect(() => {
    //달별로 보여줘야 하는 데이터가 달라야 하기 때문에 이를 가공
    if (diaryList.length >= 1) {
      setData(
        diaryList.filter((e) => {
          const month = new Date(e.date).getMonth() + 1;
          return month === curDate.getMonth() + 1;
        })
      );
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    // console.log(data);
  }, [data]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <>
      <Header
        headText={headerText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </>
  );
}

export default Home;
