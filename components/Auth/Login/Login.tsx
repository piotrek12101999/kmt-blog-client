import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Theme,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import gql from "graphql-tag";
import { useState } from "react";
import LoginForm from "./LoginForm";

interface ILoginProps {
  open: boolean;
  handleLoginClose: any;
}

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
  const fullScreen: boolean = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.target.value);
  };

  const [logIn, { loading }] = useMutation(LOG_IN_MUTATION);

  const handleLogin = (): void => {
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

  return (
    <>
      <Dialog open={open} fullScreen={fullScreen}>
        {renderLoading()}
        <DialogTitle>Zaloguj sie </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui dicta
            voluptatem excepturi a nihil molestiae velit incidunt nostrum nemo
            eaque. Debitis praesentium assumenda at, explicabo corrupti
            voluptate! Numquam, unde dolor!
          </DialogContentText>
          <LoginForm
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            emailValue={email}
            passwordValue={password}
          />
          <DialogActions>
            <Button color="secondary" onClick={handleLoginClose}>
              Anuluj
            </Button>
            <Button
              disabled={!email || !password}
              color="primary"
              onClick={handleLogin}
            >
              Zaloguj się
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login;
