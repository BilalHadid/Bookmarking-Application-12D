import React from "react";
import { useQuery, ApolloError, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button } from "@material-ui/core";
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
const Rmove_book = gql`
  mutation removeBook($id: ID!) {
    removeBook(id: $id) {
      id
    }
  }
`;
const AllBook = () => {
  const { loading, error, data } = useQuery(All_book);
  const [removTask] = useMutation(Rmove_book);

  const dltTask = async (e) => {
    console.log(e);
    removTask({
      variables: {
        id: e,
      },
      refetchQueries: [{ query: All_book }],
    });
  };

  return (
    <div>
      {loading && <h1>Loading....</h1>}
      {error && <p>Error: ${error.graphQLErrors}</p>}

      {data && data.books && (
        <div>
          {data.books.map((d, i) => {
            return (
              <div className="BookList" key={i}>
                <h3>{d.desc}</h3>
                <h3>{d.url}</h3>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={() => dltTask(d.id)}
                >
                  Delete
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllBook;
