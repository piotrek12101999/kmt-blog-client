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
import gql from "graphql-tag";
import Cookies from "js-cookie";
import { useState } from "react";
import {
  ILoginFieldValuesState,
  ILoginProps,
  ILoginResponse,
  ILoginVars
} from "./login.models";
import LoginForm from "./LoginForm";

const LOG_IN_MUTATION = gql`
  mutation logIn($data: UserLoginInput!) {
    logIn(data: $data) {
      token
      user {
        id
      }
    }
  }
`;

const Login: React.FC<ILoginProps> = ({ open, handleLoginClose }) => {
  const theme: Theme = useTheme();
  const fullScreen: boolean = useMediaQuery(theme.breakpoints.down("xs"));
  const [values, setValue] = useState<ILoginFieldValuesState>({
    email: "",
    password: ""
  });
  const [fieldsValid, setFieldValidity] = useState<boolean>(false);
  const client: ApolloClient<object> = useApolloClient();

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setValue({ ...values, email: event.target.value });
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setValue({ ...values, password: event.target.value });
  };

  const [logIn, { loading, error }] = useMutation<
    { logIn: ILoginResponse },
    { data: ILoginVars }
  >(LOG_IN_MUTATION);

  const handleLogin = async (): Promise<void> => {
    const { email, password } = values;

    const { data } = await logIn({
      variables: {
        data: {
          email,
          password
        }
      }
    });
    if (data) {
      const {
        token,
        user: { id }
      } = data.logIn;

      Cookies.set("token", token);
      Cookies.set("id", id);

      await client.resetStore();
      client.writeData({ data: { auth: true } });
      handleLoginClose();
    }
  };

  const renderLoading = (): JSX.Element | null =>
    loading ? <LinearProgress /> : null;

  const renderError = (): JSX.Element | null =>
    error ? (
      <>
        <br />
        <Typography component="span" variant="body1" color="secondary">
          {error.message ? error.message : "Nieznany błąd, spróbuj później!"}
        </Typography>
      </>
    ) : null;

  return (
    <Dialog open={open} onClose={handleLoginClose} fullScreen={fullScreen}>
      {renderLoading()}
      <DialogTitle>Zaloguj sie </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Zaloguj się aby śledzić autorów i tematy które lubisz, wchodzić w
          interakcje z postami oraz wiele więcej!
          {renderError()}
        </DialogContentText>
        <LoginForm
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          emailValue={values.email}
          passwordValue={values.password}
          setFieldsValidity={setFieldValidity}
        />
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLoginClose}
          >
            Anuluj
          </Button>
          <Button
            variant="outlined"
            disabled={!fieldsValid}
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
