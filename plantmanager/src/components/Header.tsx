import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import userImg from "../assets/profile.jpeg";

type Props = {};

export const Header = (props: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Hello</Text>
        <Text style={styles.userName}>Luan</Text>
      </View>

      <Image source={userImg} style={styles.image}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  greeting: {
    fontSize: 32,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
});
