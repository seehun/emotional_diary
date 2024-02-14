import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const mode = searchParams.get("mode");

  console.log(id);
  console.log(mode);
  return (
    <>
      <div>Edit</div>
      <button onClick={() => setSearchParams({ name: "sehun" })}>
        QS change
      </button>
      <button onClick={() => navigate("/")}>home으로 가기</button>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
    </>
  );
}

export default Edit;
