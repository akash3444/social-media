import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const SEARCH_USER = gql`
  query SearchUser($token: String!, $query: String!) {
    searchUser(token: $token, query: $query) {
      results {
        id
        username
      }
    }
  }
`;

export const Search = ({ searchDisplay, query }) => {
  const [searchUser, { data, loading, error }] = useLazyQuery(SEARCH_USER);
  const { token } = JSON.parse(localStorage.getItem("x-auth-token"));
  console.log("token", token);
  useEffect(() => {
    if (query) searchUser({ variables: { token, query } });
  }, [query, token]);
  return (
    <>
      <h1
        className={`absolute border border-gray-100 -left-2 w-full bg-white shadow-lg rounded-md p-2 divide-y ${
          searchDisplay && query ? "block" : "hidden"
        }`}
        style={{ top: "calc(100% + .4rem)" }}
      >
        {loading && "Loading..."}
        {error && "Error :(" + error.message}
        {!loading &&
          !error &&
          data &&
          data.searchUser.results.map((r) => (
            <div key={r.id} className="py-2 font-semibold">
              <Link to={`/${r.username}`}>{r.username}</Link>
            </div>
          ))}
      </h1>
    </>
  );
};
