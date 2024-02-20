import React from "react";

function EmotionItem({
  emotion_id,
  emotion_img,
  emotion_desc,
  onClick,
  isSelected,
}) {
  return (
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : "EmotionItem_off",
      ].join(" ")}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img} alt="" />
      <span>{emotion_desc}</span>
    </div>
  );
}

export default React.memo(EmotionItem);
