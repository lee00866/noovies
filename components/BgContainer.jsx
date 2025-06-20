import styled from "styled-components/native";
import { useColorScheme } from "react-native";
import { BLACK_COLOR } from "../colors";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.bgColor};
`;

const BgContainer = ({ children }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <Container bgColor={isDark ? BLACK_COLOR : "white"}>{children}</Container>
  );
};

export default BgContainer;
