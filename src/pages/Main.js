import React, { useState, useEffect } from "react";
import "./style.css";
import store from "../assets/Store.js";

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

  useEffect(() => {
    const keyword = store.getKeywordList();
    setKeywordList(keyword);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    search(searchKeyword);
  };

  const search = (searchKeyword) => {
    const result = store.search(searchKeyword);
    setSearchResult(result);
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
        // TODO
        <li key={id}>
          <span className="number">{index + 1}</span>
          <span>{keyword}</span>
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
      {selectedTab === TabType.HISTORY && <>{`TODO: 최근 검색어`}</>}
    </>
  );

  return (
    <>
      <header>
        <h2 className="container">검색</h2>
      </header>
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
