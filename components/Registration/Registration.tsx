import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AppTextInput from "@/components/shared/AppTextInput";
import Label from "@/components/shared/Label";
import AppButton from "../shared/AppButton";
import AppDropdown from "../shared/AppDropDown";
import { useSetAtom } from "jotai";
import { registrationAtom } from "@/store/registration";
import { FormData } from "@/interfaces/registration";
import AppBirthdayDropdown from "../shared/AppBirthdayDropdown";
import { genderList } from "./constant";
import { registrationSchema } from "@/validation/registrationSchema";

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
  const [confirmPassword, setConfirmPassword] = useState("");
  const dob = new Date(`${selectedYear}-${selectedMonth}-${selectedDay}`);
  const currentDate = new Date();
  const dateCreated = currentDate.toISOString().split("T")[0];
  const timeCreated = currentDate.toLocaleTimeString();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleRegister = async () => {
    const userRegistrationPayload: FormData = {
      firstName,
      lastName,
      userName,
      mobile: Number(mobile),
      email,
      password,
      confirmPassword,
      gender,
      birthday: dob,
      dateCreated,
      timeCreated,
      isLoggedIn: false,
      lastLoggedIn: null,
    };

    const result = registrationSchema.safeParse(userRegistrationPayload);

    if (!result.success) {
      const rawErrors = result.error.flatten().fieldErrors;

      const formattedErrors: Record<string, string> = Object.fromEntries(
        Object.entries(rawErrors).map(([key, value]) => [
          key,
          value?.[0] ?? "",
        ]),
      );

      setFormErrors(formattedErrors);
      return;
    }

    setFormData(userRegistrationPayload);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      style={{ flex: 1, marginTop: 60 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerStyle}
      >
        <View style={styles.formWrapper}>
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
              error={formErrors.firstName}
            />
            <AppTextInput
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
              error={formErrors.lastName}
            />
            <AppTextInput
              placeholder="Username"
              value={userName}
              onChangeText={setUsername}
              error={formErrors.userName}
            />
            <AppTextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={formErrors.password}
            />
            <AppTextInput
              placeholder="Re-type Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={formErrors.confirmPassword}
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
              error={formErrors.mobile}
              keyboardType="phone-pad"
            />
            <AppTextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              error={formErrors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <AppButton title="Register" onPress={handleRegister} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingVertical: 20,
    flexGrow: 1,
  },
  formWrapper: {
    width: "100%",
    maxWidth: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    marginBottom: 16,
  },
  inputGroup: {
    width: "100%",
  },
});
