import React, { useState, useEffect } from "react";
import { formatRelativeDate } from "../assets/helpers.js";
import "./style.css";
import store from "../assets/Store.js";
import Header from "../components/Header.js";

const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};

const TabLabel = {
  [TabType.KEYWORD]: "추천 검색어",
  [TabType.HISTORY]: "최근 검색어",
};

const Main = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TabType.KEYWORD);
  const [keywordList, setKeywordList] = useState([]);
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    const keyword = store.getKeywordList();
    const history = store.getHistoryList();
    setKeywordList(keyword);
    setHistoryList(history);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    search(searchKeyword);
  };

  const search = (searchKeyword) => {
    const result = store.search(searchKeyword);
    const history = store.getHistoryList();

    setSearchKeyword(searchKeyword);
    setSearchResult(result);
    setHistoryList(history);
    setSubmitted(true);
  };

  const handleChangeInput = (event) => {
    const keyword = event.target.value;

    if (keyword.length <= 0 && submitted) {
      return handleReset();
    }
    setSearchKeyword(keyword);
    console.log(searchKeyword);
  };

  const handleClickRemoveHistory = (event, keyword) => {
    event.stopPropagation();

    store.removeHistory(keyword);
    const history = store.getHistoryList();
    setHistoryList(history);
  };

  const handleReset = () => {
    setSearchKeyword("");
    setSearchResult([]);
    setSubmitted(false);
  };

  const searchView =
    searchResult.length > 0 ? (
      <ul className="result">
        {searchResult.map((item) => (
          <li key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    ) : (
      <div className="empty-box">검색 결과가 없습니다.</div>
    );

  const keywordListView = (
    <ul className="list">
      {keywordList.map(({ id, keyword }, index) => (
        <li key={id} onClick={() => search(keyword)}>
          <span className="number">{index + 1}</span>
          <span>{keyword}</span>
        </li>
      ))}
    </ul>
  );

  const historyListView = (
    <ul className="list">
      {historyList.map(({ id, keyword, date }) => (
        <li key={id} onClick={() => search(keyword)}>
          <span>{keyword}</span>
          <span className="date">{formatRelativeDate(date)}</span>
          <button
            className="btn-remove"
            onClick={(event) => handleClickRemoveHistory(event, keyword)}
          />
        </li>
      ))}
    </ul>
  );

  const tabView = (
    <>
      <ul className="tabs">
        {Object.values(TabType).map((tabType) => (
          <li
            key={tabType}
            className={selectedTab === tabType ? "active" : ""}
            onClick={() => setSelectedTab(tabType)}
          >
            {TabLabel[tabType]}
          </li>
        ))}
      </ul>
      {selectedTab === TabType.KEYWORD && keywordListView}
      {selectedTab === TabType.HISTORY && historyListView}
    </>
  );

  return (
    <>
      <Header title="검색" />
      <div className="container">
        <form
          id="search-form-view"
          onSubmit={(event) => handleSubmit(event)}
          onReset={handleReset}
        >
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            autoFocus
            value={searchKeyword}
            onChange={(event) => handleChangeInput(event)}
          />
          {searchKeyword.length > 0 ? (
            <button type="reset" className="btn-reset"></button>
          ) : null}
        </form>
        <div className="content">{submitted ? searchView : tabView}</div>
      </div>
    </>
  );
};

export default Main;
