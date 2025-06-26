import { useQuery } from "@tanstack/react-query";
import { View, Text, ScrollView, FlatList } from "react-native";
import { useColorScheme } from "react-native";
import { BLACK_COLOR } from "../colors";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import HList, { HListSeparator } from "../components/Hlist";

const Tv = () => {
  const isDark = useColorScheme() === "dark";
  const backgroundColor = isDark ? BLACK_COLOR : "white";

  const { isLoading: todayLoading, data: todayData } = useQuery({
    queryKey: ["tv", "today"],
    queryFn: tvApi.airingToday,
  });
  const { isLoading: topLoading, data: topData } = useQuery({
    queryKey: ["tv", "top"],
    queryFn: tvApi.topRated,
  });
  const { isLoading: trendingLoading, data: trendingData } = useQuery({
    queryKey: ["tv", "trending"],
    queryFn: tvApi.trending,
  });

  const loading = todayLoading || topLoading || trendingLoading;

  if (loading) {
    return <Loader />;
  }
  return (
    <ScrollView
      style={{ backgroundColor }}
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
