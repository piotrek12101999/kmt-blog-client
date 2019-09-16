import { useApolloClient, useMutation } from "@apollo/react-hooks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Theme,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { ApolloClient } from "apollo-boost";
import cookie from "cookie";
import gql from "graphql-tag";
import { useState } from "react";
import LoginForm from "./LoginForm";

const LOG_IN = gql`
  mutation logIn($data: UserLoginInput!) {
    logIn(data: $data) {
      token
      user {
        id
      }
    }
  }
`;

interface ILoginProps {
  open: boolean;
  closeLogin: () => void;
}

export interface ILoginFieldValuesState {
  email: string;
  emailValid: boolean;
  password: string;
  passwordValid: boolean;
}

const Login: React.FC<ILoginProps> = ({ open, closeLogin }) => {
  const client: ApolloClient<object> = useApolloClient();
  const theme: Theme = useTheme();
  const fullScreen: boolean = useMediaQuery(theme.breakpoints.down("xs"));
  const [fieldsState, setFieldsState] = useState<ILoginFieldValuesState>({
    email: "",
    emailValid: false,
    password: "",
    passwordValid: false
  });
  const onError = (error: Error): void => {
    console.error(error);
  };
  const onCompleted = async (data: any): Promise<void> => {
    document.cookie = cookie.serialize("token", data.logIn.token, {
      sameSite: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    document.cookie = cookie.serialize("uid", data.logIn.user.id, {
      sameSite: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    await client.cache.reset();

    client.writeData({ data: { UserLocalData: data.logIn.user.id } });
    closeLogin();
  };
  const [loginUser] = useMutation(LOG_IN, {
    onCompleted,
    onError
  });

  const handleCloseLogin = (): void => {
    setFieldsState({
      email: "",
      emailValid: false,
      password: "",
      passwordValid: false
    });

    closeLogin();
  };

  const handleLogin = () => {
    const { email, password } = fieldsState;

    loginUser({
      variables: {
        data: {
          email,
          password
        }
      }
    });
  };

  return (
    <Dialog fullScreen={fullScreen} onClose={handleCloseLogin} open={open}>
      <DialogTitle>Zaloguj się </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Zaloguj się aby śledzić autorów i tematy które lubisz, wchodzić w
          interakcje z postami oraz wiele więcej!
        </DialogContentText>
        <LoginForm fieldsState={fieldsState} setFieldsState={setFieldsState} />
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseLogin}
          >
            Anuluj
          </Button>
          <Button
            disabled={!fieldsState.emailValid || !fieldsState.passwordValid}
            variant="outlined"
            color="primary"
            onClick={handleLogin}
          >
            Zaloguj się
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
