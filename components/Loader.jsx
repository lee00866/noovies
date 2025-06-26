import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { BLACK_COLOR } from "../colors";
import { useColorScheme } from "react-native";
const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor};
`;

const Loader = () => {
  const isDark = useColorScheme() === "dark";
  const backgroundColor = isDark ? BLACK_COLOR : "white";
  return (
    <Wrapper bgColor={backgroundColor}>
      <ActivityIndicator />
    </Wrapper>
  );
};
export default Loader;
