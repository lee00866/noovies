import { StyleSheet, useColorScheme, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";

const BgImg = styled.Image``;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

const Votes = styled(Overview)``;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

// interface SlideProps {
//     backdrop_path;
//   poster_path;
//   original_title;
//   overview;
//   vote_average;}

const Slide = ({
  backdropPath,
  posterPath,
  originalTitle,
  overview,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={50}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title>{originalTitle}</Title>
            <Overview>{overview.slice(0, 90)}...</Overview>
            {voteAverage > 0 ? <Votes>⭐️ {voteAverage}/10</Votes> : null}
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
