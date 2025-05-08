import React from "react";
import { Button } from "react-native";

interface OrderButtonProps {
  title: string;
  onPress: () => void;
  disabled: boolean;
}

const AppButton: React.FC<OrderButtonProps> = ({ title, onPress, disabled }) => {
  return (
    <Button
      title={title}
      onPress={onPress}
      disabled={disabled}
    />
  );
};

export default AppButton;
