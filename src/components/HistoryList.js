import React, { useState, useEffect } from "react";
import store from "../assets/Store.js";
import List from "./List.js";

const HistoryList = (props) => {
  const [historyList, setHistoryList] = useState([]);
  const { onClick } = props;

  const fetch = () => {
    const history = store.getHistoryList();
    setHistoryList(history);
  };
  useEffect(() => {
    fetch();
  }, []);

  const handleClickRemove = (keyword) => {
    store.removeHistory(keyword);
    fetch();
  };

  return (
    <List
      hasDate
      data={historyList}
      onClick={onClick}
      onRemove={(keyword) => handleClickRemove(keyword)}
    />
  );
};

export default HistoryList;
