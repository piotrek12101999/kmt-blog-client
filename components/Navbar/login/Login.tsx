import { useApolloClient, useMutation } from "@apollo/react-hooks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Theme,
  Typography,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { ApolloClient } from "apollo-boost";
import cookie from "cookie";
import gql from "graphql-tag";
import { useState } from "react";
import { SET_LOGGED_IN_USER } from "../../../lib/clientQueries";
import { IAuthPayload } from "../../../models/user.model";
import LoginForm from "./LoginForm";

const LOG_IN = gql`
  mutation logIn($data: UserLoginInput!) {
    logIn(data: $data) {
      token
      user {
        id
        name
        email
        profile_picture
        description
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

interface ILoginVars {
  email: string;
  password: string;
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

  const onCompleted = async (data: { logIn: IAuthPayload }): Promise<void> => {
    document.cookie = cookie.serialize("token", data.logIn.token, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      sameSite: true
    });

    document.cookie = cookie.serialize("uid", data.logIn.user.id, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      sameSite: true
    });

    await client.cache.reset();
    await client.resetStore();
    setUser({
      variables: {
        loggedInUser: data.logIn.user
      }
    });
    setFieldsState({
      email: "",
      emailValid: false,
      password: "",
      passwordValid: false
    });
    closeLogin();
  };

  const [loginUser, { loading, error }] = useMutation<
    { logIn: IAuthPayload },
    { data: ILoginVars }
  >(LOG_IN, {
    onCompleted
  });
  const [setUser] = useMutation(SET_LOGGED_IN_USER);

  const handleCloseLogin = (): void => {
    setFieldsState({
      email: "",
      emailValid: false,
      password: "",
      passwordValid: false
    });

    closeLogin();
  };

  const handleLogin = (): void => {
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

  const renderLoading = (): JSX.Element | null =>
    loading ? <LinearProgress /> : null;

  const renderError = (): JSX.Element | null =>
    error ? <Typography color="error"> {error.message} </Typography> : null;

  return (
    <Dialog fullScreen={fullScreen} onClose={handleCloseLogin} open={open}>
      {renderLoading()}
      <DialogTitle>Zaloguj się </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Zaloguj się aby śledzić autorów i tematy które lubisz, wchodzić w
          interakcje z postami oraz wiele więcej!
        </DialogContentText>
        {renderError()}
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
