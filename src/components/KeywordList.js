import React, { useState, useEffect } from "react";
import store from "../assets/Store.js";
import List from "./List.js";

const KeywordList = (props) => {
  const [keywordList, setKeywordList] = useState([]);
  const { onClick } = props;

  useEffect(() => {
    const keyword = store.getKeywordList();
    setKeywordList(keyword);
  }, []);

  return <List hasIndex data={keywordList} onClick={onClick} />;
};

export default KeywordList;
