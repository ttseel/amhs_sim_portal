import React from "react";
import { Link } from "react-router-dom";

const EmptyPage = () => {
  return (
    <div>
      <h3>잘못된 접근입니다.</h3>
      <Link to="/">돌아가기</Link>
    </div>
  );
};

export default EmptyPage;
