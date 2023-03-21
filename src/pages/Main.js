import React, { useState, useEffect } from "react";
import "./style.css";
import store from "../assets/Store.js";
import Header from "../components/Header.js";
import SearchForm from "../components/SearchForm.js";
import SearchResult from "../components/SearchResult.js";
import Tabs, { TabType } from "../components/Tabs.js";
import KeywordList from "../components/KeywordList.js";
import HistoryList from "../components/HistoryList.js";

const Main = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TabType.KEYWORD);

  const search = (searchKeyword) => {
    const result = store.search(searchKeyword);

    setSearchKeyword(searchKeyword);
    setSearchResult(result);
    setSubmitted(true);
  };

  const handleChangeInput = (keyword) => {
    if (keyword.length <= 0) {
      handleReset();
    }
    setSearchKeyword(keyword);
    console.log(searchKeyword);
  };

  const handleReset = () => {
    setSearchKeyword("");
    setSearchResult([]);
    setSubmitted(false);
  };

  return (
    <>
      <Header title="검색" />
      <div className="container">
        <SearchForm
          value={searchKeyword}
          onChange={(value) => handleChangeInput(value)}
          onSubmit={() => search(searchKeyword)}
          onReset={() => handleReset()}
        />
        <div className="content">
          {submitted ? (
            <SearchResult data={searchResult} />
          ) : (
            <>
              <Tabs
                selectedTab={selectedTab}
                onChange={(selectedTab) => setSelectedTab(selectedTab)}
              />
              {selectedTab === TabType.KEYWORD && (
                <KeywordList onClick={(keyword) => search(keyword)} />
              )}
              {selectedTab === TabType.HISTORY && (
                <HistoryList onClick={(keyword) => this.search(keyword)} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
