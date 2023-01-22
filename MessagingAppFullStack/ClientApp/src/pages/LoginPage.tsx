import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
} from "@chakra-ui/react";
import * as React from "react";
import useFetch from "../hooks/useQuery";

interface LoginRequest {
  username: string;
  password: string;
}

export const LoginPage = () => {
  const [formData, setFormData] = React.useState<LoginRequest>({
    username: "",
    password: "",
  });

  const [errorText, setErrorText] = React.useState<string | null>(null);

  const hasError = React.useMemo(() => !!errorText, [errorText]);

  const loginQuery = useFetch<{ token: string }>("/api/Authentication/token", {
    method: "POST",
    body: formData,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText(null);
    loginQuery.fetch({
      onComplete: console.log,
      onError: (error) => {
        if (error.status === 400)
          setErrorText("Username and password are required");
        else
          setErrorText("The username and/or password provided was incorrect");
      },
    });
  };

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasError) setErrorText(null);

    if (!e.target.name) return;

    setFormData((currentData) => ({
      ...currentData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Box>
        <form onSubmit={handleLogin}>
          <FormControl isInvalid={hasError}>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              onChange={updateFormData}
              disabled={loginQuery.loading}
            />
          </FormControl>
          <FormControl isInvalid={hasError}>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              onChange={updateFormData}
              disabled={loginQuery.loading}
            />
          </FormControl>
          {hasError && <Text color="red">{errorText}</Text>}
          <Button
            value="Login"
            colorScheme="blue"
            type="submit"
            disabled={loginQuery.loading}
            isLoading={loginQuery.loading}
            loadingText={"Logging you in..."}
          >
            Login
          </Button>
        </form>
      </Box>
    </>
  );
};
