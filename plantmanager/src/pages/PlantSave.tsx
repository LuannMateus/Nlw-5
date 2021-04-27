import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Platform, Alert } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useNavigation, useRoute } from "@react-navigation/core";
import { SvgFromUri } from "react-native-svg";

import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { Button } from "../components/Button";

import {} from "date-fns";

import waterdrop from "../assets/waterdrop.png";
import { format, isBefore } from "date-fns";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { loadPlants, savePlant } from "../repository/storage";

interface Params {
  plant: {
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
  };
}

interface Props {}
export const PlantSave = (_props: Props) => {
  const navigation = useNavigation();

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == "ios");

  const route = useRoute();
  const { plant } = route.params as Params;

  const handleChangeTime = (event: Event, dateTime: Date | undefined) => {
    if (Platform.OS === "android") {
      setShowDatePicker((oldState) => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert("Choose a future time");
    }

    if (dateTime) setSelectedDateTime(dateTime);
  };

  const handleOpenDateTimePickerForAndroid = () => {
    setShowDatePicker((oldState) => !oldState);
  };

  const handleSave = async () => {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate("Confirmation", {
        title: "All very well",
        subtitle:
          "Rest assured that we will always remind you to take care of your plants very carefully!",
        buttonTitle: "Thank you very much :D",
        icon: "hug",
        nextScreen: "MyPlants",
      });
    } catch {
      Alert.alert("Couldn't save");
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} height={150} width={150} />

          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.plantAbout}>{plant.about}</Text>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image source={waterdrop} style={styles.tipImage} />
            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>

          <Text style={styles.alertLabel}>
            Choose the best time to be remembered
          </Text>

          {showDatePicker && (
            // @ts-ignore
            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="clock"
              onChange={handleChangeTime}
            />
          )}

          {Platform.OS === "android" && (
            <TouchableOpacity
              style={styles.dateTimePickerButton}
              onPress={handleOpenDateTimePickerForAndroid}
            >
              <Text style={styles.dateTimePickerText}>{`Change Hour ${format(
                selectedDateTime,
                "HH:mm"
              )}`}</Text>
            </TouchableOpacity>
          )}

          <Button title="Register plant" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: "relative",
    bottom: 60,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: "justify",
  },
  alertLabel: {
    textAlign: "center",
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dateTimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});
