import React, { Fragment } from "react";
import { DataContext } from "./dataContext";
import { useContext } from "react";

function ReviewScreen(props) {
  const { data } = useContext(DataContext);

  return (
    <Fragment>
      <div className="reviewStyleTitle">Review Screen</div>

      <div className="reviewContainer">
        <div className="mainWrapper">
          <div>
            <span className="reviewTextStyle">Username</span>
            <span className="reviewTextStyle">Email</span>
            <span className="reviewTextStyle">Country</span>
          </div>
          <div>
            <span className="textDisplayStyle">{data.userName}</span>
            <span className="textDisplayStyle">{data.email}</span>
            <span className="textDisplayStyle">{data.countryName}</span>
          </div>
        </div>
        <div>
          <button className="completeButton">
            <span className="completeButtonText">Complete</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default ReviewScreen;
