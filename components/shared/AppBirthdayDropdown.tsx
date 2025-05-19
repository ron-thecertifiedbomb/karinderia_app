import React from "react";
import { View, StyleSheet } from "react-native";
import AppDropdown from "./AppDropDown";

interface Props {
  selectedDay: string;
  selectedMonth: number;
  selectedYear: string;
  onDayChange: (day: string) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: string) => void;
}

const generateNumberOptions = (
  start: number,
  end: number,
): { label: string; value: string }[] =>
  Array.from({ length: end - start + 1 }, (_, i) => {
    const value = (start + i).toString();
    return { label: value, value };
  });

const months = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const AppBirthdayDropdown: React.FC<Props> = ({
  selectedDay,
  selectedMonth,
  selectedYear,
  onDayChange,
  onMonthChange,
  onYearChange,
}) => {
  const days = generateNumberOptions(1, 31);
  const currentYear = new Date().getFullYear();
  const years = generateNumberOptions(currentYear - 100, currentYear).reverse();

  // Find the label (month name) for the currently selected month number
  const selectedMonthLabel = months.find(m => Number(m.value) === selectedMonth)?.value || "1";

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <AppDropdown
            label="Month"
            selectedValue={selectedMonth.toString()} // pass the month number as string
            onValueChange={(value) => onMonthChange(Number(value))}
            options={months} // label: month name, value: month number as string
          />
        </View>
        <View style={styles.columnDay}>
          <AppDropdown
            label="Day"
            selectedValue={selectedDay}
            onValueChange={onDayChange}
            options={days}
          />
        </View>
        <View style={styles.column}>
          <AppDropdown
            label="Year"
            selectedValue={selectedYear}
            onValueChange={onYearChange}
            options={years}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  column: {
    flex: 1,
  },
  columnDay: {
    width: 100,
  },
});

export default AppBirthdayDropdown;
