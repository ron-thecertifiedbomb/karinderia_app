import React from "react";
import Login from "@/components/Login/Login";
import RegisterLinkButton from "@/components/Registration/RegitrationLink";
import Container from "@/components/shared/Container";

const LoginScreen: React.FC = () => {
  return (
    <Container>
      <Login />
      <RegisterLinkButton />
    </Container>
  );
};

export default LoginScreen;
