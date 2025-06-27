import styled from "styled-components/native";

import { useColorScheme } from "react-native";
import { BLACK_COLOR } from "../colors";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/Hlist";

const Container = styled.ScrollView``;
const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const Search = () => {
  const isDark = useColorScheme() === "dark";
  const backgroundColor = isDark ? BLACK_COLOR : "white";

  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery({
    queryKey: ["searchMovies", query],
    queryFn: moviesApi.search,
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery({
    queryKey: ["searchTv", query],
    queryFn: tvApi.search,
    enabled: false,
  });
  const onChangeText = (text) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };

  return (
    <Container style={{ backgroundColor }}>
      <SearchBar
        placeholder="Search for Movie or Tv Show"
        placeholderTextColor="grey"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}

      {tvData ? <HList title="Tv Results" data={tvData.results} /> : null}
      {moviesData ? (
        <HList title="Movie Results" data={moviesData.results} />
      ) : null}
    </Container>
  );
};

export default Search;
