import React, { useEffect, useState } from "react";
import DiaryEditor from "../components/DiaryEditor";

function New() {
  useEffect(() => {
    const titleEm = document.getElementsByTagName("title")[0];
    titleEm.innerHTML = `감정 일기장 새 일기`;
  }, []);
  return (
    <>
      <DiaryEditor />
    </>
  );
}

export default New;
