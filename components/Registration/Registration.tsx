import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import { useRouter } from "expo-router";
import AppTextInput from "@/components/shared/AppTextInput";
import Container from "@/components/shared/Container";
import Label from "@/components/shared/Label";
import AppButton from "../shared/AppButton";
import AppDropdown from "../shared/AppDropDown";
import {  useSetAtom } from "jotai";
import { registrationAtom } from "@/store/registration";
import { FormData } from "@/interfaces/registration";
import AppBirthdayDropdown from "../shared/AppBirthdayDropdown";
import { genderList } from "./constant";

export default function RegisterationForm() {

  const router = useRouter();

  const setFormData = useSetAtom(registrationAtom);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("male");

  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(
    today.getDate().toString().padStart(2, "0"),
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    today.getMonth() + 1,
  );
  const [selectedYear, setSelectedYear] = useState(
    today.getFullYear().toString(),
  );

  const dob = new Date(`${selectedYear}-${selectedMonth}-${selectedDay}`);
  const currentDate = new Date();
  const dateCreated = currentDate.toISOString().split("T")[0];
  const timeCreated = currentDate.toLocaleTimeString();

  const userRegistrationPayload: FormData = {
    firstName,
    lastName,
    userName,
    mobile: Number(mobile),
    email,
    password,
    gender,
    birthday: dob,
    dateCreated,
    timeCreated,
    isLoggedIn: false,
    lastLoggedIn: null,
  };

  const handleRegister = async () => {
    setFormData(userRegistrationPayload);

  };

  return (
    <Container style={styles.containerStyle}>
      <Label
        text="Register"
        customTextStyle={styles.heading}
        lightColor="grey"
      />
      <View style={styles.inputGroup}>
        <AppTextInput
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
 
        />
        <AppTextInput
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
        />
        <AppTextInput
          placeholder="Username"
          value={userName}
          onChangeText={setUsername}
        />
        <AppTextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        
        />
        <AppDropdown
          selectedValue={gender}
          onValueChange={setGender}
          options={genderList}
        />
        <AppBirthdayDropdown
          selectedDay={selectedDay}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onDayChange={setSelectedDay}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
        />
        <AppTextInput
          placeholder="Mobile"
          value={mobile}
          onChangeText={setMobile}
        />
        <AppTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <AppButton title="Register" onPress={handleRegister} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
  },
  heading: {
    fontSize: 22,
    marginBottom: 16,
  },
  inputGroup: {
    width: "100%",
  },
});
