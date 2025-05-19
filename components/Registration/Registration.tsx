// app/register.tsx
import React, { useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import AppTextInput from "@/components/shared/AppTextInput";
import Container from "@/components/shared/Container";
import Label from "@/components/shared/Label";
import AppButton from "../shared/AppButton";
import AppDropdown from "../shared/AppDropDown";
import { useAtom, useSetAtom } from "jotai";
import { registrationAtom } from "@/store/registration";
import { FormData } from "@/interfaces/registration";

export default function Register() {
  const router = useRouter();

  const [formUserData, setFormData] = useAtom(registrationAtom);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [dob, setDob] = useState(new Date());


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
    <Container>
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
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
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
  heading: {
    fontSize: 22,
    marginBottom: 16,
  },
  inputGroup: {
    gap: 12,
    marginTop: 12,
    width: 300,
  },
});
