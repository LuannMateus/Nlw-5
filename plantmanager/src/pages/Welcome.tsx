import * as React from "react";
import { Image, Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";

import wateringImg from "../assets/watering.png";

type Props = {};

const Welcome: React.FunctionComponent<Props> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Manage {'\n'}your plants{'\n'} easily</Text>

      <Image source={wateringImg} style={styles.image}/>

      <Text style={styles.subtitle}>
        Don't forget to water your plants more. We careful to remind you
        whenever you need.
      </Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Text style={styles.buttonText}>
          &gt;
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export { Welcome };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 52,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 18,
    height: 56,
    width: 56,
  },
  image: {
    width: 292,
    height: 284,
  },
  buttonText: {
    color: colors.white,
    fontSize: 24,
  }

});
