import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  // console.log(id, diaryList);

  const [originData, setOriginData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (e) => parseInt(e.id) === parseInt(id)
      );
      // console.log(targetDiary);
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        //알맞은 일기가 없을 때
        navigate("/", { replace: true });
      }
    }
  }, []);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
}

export default Edit;
