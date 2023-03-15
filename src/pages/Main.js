import React, { useState } from "react";
import "./style.css";

const Main = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleChangeInput = (event) => {
    if (event.target.value.length <= 0) {
      return handleReset();
    }
    setSearchKeyword(event.target.value);
    console.log(searchKeyword);
  };

  const handleReset = () => {
    console.log("Todo: handleReset", searchKeyword);
    setSearchKeyword("");
  };

  return (
    <>
      <header>
        <h2 className="container">검색</h2>
      </header>
      <div className="container">
        <form
          id="search-form-view"
          onSubmit={(event) => handleChangeInput(event)}
          onReset={handleReset}
        >
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            autoFocus
            value={searchKeyword}
            onChange={handleChangeInput}
          />
          {searchKeyword.length > 0 ? (
            <button type="reset" className="btn-reset"></button>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default Main;
