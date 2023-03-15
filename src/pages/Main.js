import React, { useState } from "react";
import "./style.css";

const Main = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleChangeInput = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <>
      <header>
        <h2 class="container">검색</h2>
      </header>
      <div class="container">
        <form id="search-form-view">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            autofocus
            value={searchKeyword}
            onChange={handleChangeInput}
          />
          <button type="reset" class="btn-reset"></button>
        </form>
      </div>
    </>
  );
};

export default Main;
