import axios from "../services/api";
import React, { FunctionComponent, useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { EnvironmentButton } from "../components/EnvironmentButton";
import { Header } from "../components/Header";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { Load } from "../components/Load";

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

export const PlantSelect: FunctionComponent<EnvironmentProps> = (_props) => {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filterPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState("all");

  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  async function fetchEnvironment() {
    const { data } = await axios.get(
      "plants_environments?_sort=title&_order=asc"
    );

    setEnvironments([
      {
        key: "all",
        title: "Todos",
      },
      ...data,
    ]);
  }

  async function fetchPlants() {
    const { data } = await axios.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!data) return setIsLoading(true);

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setIsLoading(false);
    setLoadingMore(false);
  }

  const handleEnvironmentSelected = (environment: string) => {
    setEnvironmentSelected(environment);

    if (environment == "all") return setFilteredPlants(plants);

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  };

  const handleFetchMore = (distance: number) => {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  };

  useEffect(() => {
    fetchEnvironment();
    fetchPlants();
  }, []);

  if (isLoading) return <Load />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>In which environment</Text>
        <Text style={styles.subtitle}>do you want to place your plant?</Text>
      </View>

      <View>
        <FlatList
          data={environments}
          renderItem={({ item }) => {
            return (
              <EnvironmentButton
                title={item.title}
                active={item.key === environmentSelected}
                onPress={() => handleEnvironmentSelected(item.key)}
              />
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>
      <View style={styles.plants}>
        <FlatList
          data={filterPlants}
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  environmentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});
