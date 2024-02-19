import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import Header from "../components/Header";
import { getStringDate } from "../util/date";
import MyButton from "../components/Mybutton";
import { emotionList } from "../util/emotion";

function Diary() {
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (e) => parseInt(e.id) === parseInt(id)
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">loading...</div>;
  } else {
    //data 로딩 되면
    const curEmotion = emotionList.find(
      (e) => parseInt(e.emotion_id) === parseInt(data.emotion)
    );
    console.log(curEmotion);
    return (
      <div className="DiaryPage">
        <Header
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => {
                navigate(`/edit/${data.id}`);
              }}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `emotion_img_wrapper_${curEmotion.emotion_id}`,
              ].join(" ")}
            >
              <img src={curEmotion.emotion_img} />
              <div className="img_descriptor">{curEmotion.emotion_desc}</div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

export default Diary;
