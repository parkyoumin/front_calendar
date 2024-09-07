import React from "react";
import Card from "./common/Card";

const Aside = () => {
  return (
    <>
      <div className="w-1/4 mr-4">
        <Card iconSrc="event.svg" title={"오늘의 이벤트"}>
          <div></div>
        </Card>
        <Card iconSrc="detail.svg" title={"상세 보기"}>
          <div></div>
        </Card>
      </div>
    </>
  );
};

export default Aside;
