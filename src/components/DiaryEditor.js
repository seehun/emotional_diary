import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import MyButton from "./Mybutton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_desc: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_desc: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_desc: "보통",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_desc: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_desc: "완전 나쁨",
  },
];

function DiaryEditor({ isEdit, originData }) {
  const navigate = useNavigate();

  const contentRef = useRef();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (isEdit) {
      onEdit(originData.id, date, content, emotion);
    } else {
      onCreate(date, content, emotion);
    }

    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      //edit일 때 , originData를 초기화면에 뿌려준다
      setDate(getStringDate(new Date(originData.date)));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <Header
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={<MyButton text={"뒤로가기"} onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((e) => (
              <EmotionItem
                key={e.emotion_id}
                {...e}
                onClick={handleClickEmotion}
                isSelected={e.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="how's today"
              ref={contentRef}
              value={content}
              onChange={handleContent}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;
