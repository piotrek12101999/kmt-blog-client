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
}

const Register: React.FC<IRegisterProps> = ({ open, closeRegister }) => {
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
          closeRegister={closeRegister}
          setIsLoggedIn={setIsLoggedIn}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Register;
