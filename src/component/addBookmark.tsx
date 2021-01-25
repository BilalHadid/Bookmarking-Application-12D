import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button, TextField } from "@material-ui/core";
import "./style.css";

const All_book = gql`
  {
    books {
      url
      desc
      id
    }
  }
`;

const Create_book = gql`
  mutation create($url: String!, $desc: String!) {
    create(url: $url, desc: $desc) {
      url
      desc
    }
  }
`;

const AddBookmark = () => {
  const [bookAdd] = useMutation(Create_book);
  const [urlBook, seturl] = useState("");
  const [descrip, setDesc] = useState("");
  let addRecord = (e) => {
    e.preventDefault();
    console.log(urlBook, descrip);
    try {
      bookAdd({
        variables: {
          url: urlBook,
          desc: descrip,
        },
        refetchQueries: [{ query: All_book }],
      });
    } catch (err) {
      return <div>error</div>;
    }
  };
  const handleChange = (e) => {
    seturl(e.target.value);
  };
  const handledesc = (e) => {
    setDesc(e.target.value);
  };
  return (
    <div className="Adder">
      <TextField
        onChange={handleChange}
        label="Add url"
        variant="outlined"
        color="secondary"
      />
      <TextField
        onChange={handledesc}
        label="Add Description"
        variant="outlined"
        color="secondary"
      />
      <br />
      <Button
        onClick={(e) => addRecord(e)}
        variant="outlined"
        color="secondary"
      >
        Add Bookmark
      </Button>
    </div>
  );
};

export default AddBookmark;
