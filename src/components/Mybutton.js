import React from "react";

function MyButton({ text, type, onClick }) {
  const BtnType = ["positive", "negative"].includes(type) ? type : "default"; //positive, negative 외에는 default취급 하겠다.

  return (
    <>
      <button className={`MyButton MyButton_${BtnType}`} onClick={onClick}>
        {text}
      </button>
    </>
  );
}

//type prop을 주지 않았을 경우 처리
MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
