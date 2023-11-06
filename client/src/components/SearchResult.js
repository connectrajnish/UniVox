import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Content from './Content';

const API_URL = process.env.API_URL;

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      // Perform a search based on the query parameter
      axios.get(`${API_URL}/post/search?q=${query}`).then((response) => {
        setSearchResults(response.data);
        setIsLoading(false); // Set isLoading to false when data is fetched
      });
    }
  }, [query]);

  console.log(searchResults)

  return (
    <div>
      {isLoading ? (
        // Show a loading indicator while fetching data
        <div>Loading...</div>
      ) : (
        // Display search results when data is fetched
        <Content posts={searchResults}/>
      )}
    </div>
  );
};

export default SearchResults;
