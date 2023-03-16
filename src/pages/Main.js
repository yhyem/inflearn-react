import React, { useState } from "react";
import "./style.css";
import store from "../assets/Store.js";

const Main = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    search(searchKeyword);
  };

  const search = (searchKeyword) => {
    const result = store.search(searchKeyword);
    setSearchResult(result);
  };

  const handleChangeInput = (event) => {
    if (event.target.value.length <= 0) {
      return handleReset();
    }
    setSearchKeyword(event.target.value);
    console.log(searchKeyword);
  };

  const handleReset = () => {
    setSearchKeyword("");
    console.log("Todo: handleReset", searchKeyword);
  };

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
        <div className="content">
          {searchResult.length > 0 ? (
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
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
