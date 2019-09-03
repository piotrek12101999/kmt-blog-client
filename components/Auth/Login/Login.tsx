import { useMutation, useQuery } from "@apollo/react-hooks";
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
import gql from "graphql-tag";
import Cookies from "js-cookie";
import { useState } from "react";
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

const test = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

interface ILoginProps {
  open: boolean;
  handleLoginClose: any;
}

interface ILoginFieldValuesState {
  email: string;
  password: string;
}

const Login: React.FC<ILoginProps> = ({ open, handleLoginClose }) => {
  const theme: Theme = useTheme();
  const fullScreen: boolean = useMediaQuery(theme.breakpoints.down("xs"));
  const [values, setValue] = useState<ILoginFieldValuesState>({
    email: "",
    password: ""
  });
  const [fieldsValid, setFieldValidity] = useState<boolean>(false);

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

  const [logIn, { loading, error, data, called }] = useMutation(
    LOG_IN_MUTATION
  );

  const handleLogin = (): void => {
    const { email, password } = values;

    logIn({
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
    error ? (
      <Typography color="secondary">
        {error.message ? error.message : "Nieznany błąd, spróbuj później!"}
      </Typography>
    ) : null;

  const onLoginActionBeingCalled = () => {
    if (called && data) {
      const {
        logIn: {
          token,
          user: { id }
        }
      } = data;

      Cookies.set("uid", id);
      Cookies.set("token", token);
    }
    const test2 = useQuery(test);
    console.log(test2);
  };

  onLoginActionBeingCalled();

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
