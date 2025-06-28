import { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Linking,
  Share,
  TouchableOpacity,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
  position: relative;
`;

const Background = styled.Image`
  opacity: 0.6;
`;

const FadeOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  width: 80%;
  margin-left: 15px;
  font-weight: 500;
`;

const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery({
    queryKey: [isMovie ? "movies" : "tv", params.id],
    queryFn: isMovie ? moviesApi.detail : tvApi.detail,
  });
  const shareMedia = async () => {
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}`
      : data.homepage;
    const isAndroid = Platform.OS === "android";
    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\n Check it out: ${homepage}`,
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    } else {
      await Share.share({
        url: homepage,
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    }
  };
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color="white" size={24} />
    </TouchableOpacity>
  );

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
      headerRight: () => <ShareButton />,
    });
  }, []);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);

  //유저를 앱에 머물게하고싶다면 expo-web-browser를 설치해서 주석을 풀고 실행한다
  const openYTLink = async (videoID) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
    await Linking.openURL(baseUrl);
    //await WebBrowser.openBrowserAsync(baseUrl)
  };
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || null) }}
        />
        <Column>
          <FadeOverlay />
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name="logo-youtube" color="white" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
