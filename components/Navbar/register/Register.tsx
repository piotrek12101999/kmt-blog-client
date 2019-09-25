import { QueryLazyOptions } from "@apollo/react-hooks";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Theme,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { useState } from "react";
import RegisterStepper from "./RegisterStepper";

interface IRegisterProps {
  open: boolean;
  closeRegister: () => void;
  getUserThatHasLoggedIn: (
    options?: QueryLazyOptions<Record<string, any>> | undefined
  ) => void;
}

const Register: React.FC<IRegisterProps> = ({
  open,
  closeRegister,
  getUserThatHasLoggedIn
}) => {
  const [isLoading, setIsLoggedIn] = useState<boolean>(false);
  const theme: Theme = useTheme();
  const fullScreen: boolean = useMediaQuery(theme.breakpoints.down("xs"));

  const renderLoading = (): JSX.Element | null =>
    isLoading ? <LinearProgress /> : null;

  return (
    <Dialog fullScreen={fullScreen} onClose={closeRegister} open={open}>
      {renderLoading()}
      <DialogTitle>Zarejestruj się </DialogTitle>
      <DialogContent>
        <RegisterStepper
          getUserThatHasLoggedIn={getUserThatHasLoggedIn}
          closeRegister={closeRegister}
          setIsLoggedIn={setIsLoggedIn}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Register;
