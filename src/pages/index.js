import * as React from "react";
import "../component/style.css";
import AddBookmark from "../component/addBookmark";
import AllBook from "../component/AllBook";

const IndexPage = () => {
  return (
    <div className="App">
      <AddBookmark />
      <AllBook />
    </div>
  );
};

export default IndexPage;
