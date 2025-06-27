import styled from "styled-components/native";

import { useColorScheme } from "react-native";
import { BLACK_COLOR } from "../colors";
import { useState } from "react";

const Container = styled.ScrollView``;
const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const onChangeText = (text) => setQuery(text);
  const isDark = useColorScheme() === "dark";
  const backgroundColor = isDark ? BLACK_COLOR : "white";

  return (
    <Container style={{ backgroundColor }}>
      <SearchBar
        placeholder="Search for Movie or Tv Show"
        placeholderTextColor="grey"
        onChangeText={onChangeText}
      />
    </Container>
  );
};

export default Search;
