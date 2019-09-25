import {
  Button,
  IconButton,
  InputAdornment,
  TextField
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { IRegisterStepperState } from "../RegisterStepper";

interface IEmailAndPasswordProps {
  goToNextStep: () => void;
  fieldsState: IRegisterStepperState;
  setFieldsState: Dispatch<SetStateAction<IRegisterStepperState>>;
}

interface IFieldsErrorsState {
  emailValid: boolean;
  passwordValid: boolean;
  passwordsValid: boolean;
}

const EmailAndPassword: React.FC<IEmailAndPasswordProps> = ({
  goToNextStep,
  fieldsState,
  setFieldsState
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setStateErrors] = useState<IFieldsErrorsState>({
    emailValid: true,
    passwordValid: true,
    passwordsValid: true
  });

  const togglePassword = (): void =>
    setShowPassword(prevShowValue => !prevShowValue);

  const validateEmail = (emailInputValue: string): boolean => {
    const regexp: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;

    return regexp.test(emailInputValue);
  };

  const validateFields = (
    event: React.ChangeEvent<HTMLInputElement>,
    { password, passwordRepeat }: IRegisterStepperState
  ) => {
    switch (event.target.name) {
      case "email":
        return {
          emailValid: validateEmail(event.target.value)
        };
      case "password":
        return {
          passwordValid: event.target.value.length >= 8,
          passwordsValid: event.target.value === passwordRepeat
        };
      case "passwordRepeat":
        return {
          passwordsValid: event.target.value === password
        };
      default:
        return {};
    }
  };

  const manageFields = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFieldsState({
      ...fieldsState,
      [event.target.name]: event.target.value,
      ...validateFields(event, fieldsState)
    });
  };

  const setErrors = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setStateErrors({
      ...errors,
      ...validateFields(event, fieldsState)
    });
  };

  return (
    <>
      <TextField
        label="email"
        name="email"
        type="email"
        variant="outlined"
        margin="normal"
        required={true}
        fullWidth={true}
        onChange={manageFields}
        onBlur={setErrors}
        value={fieldsState.email}
        error={!errors.emailValid}
        helperText={!errors.emailValid ? "Email niepoprawny" : null}
      />
      <TextField
        label="password"
        name="password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        margin="normal"
        required={true}
        fullWidth={true}
        onChange={manageFields}
        onBlur={setErrors}
        value={fieldsState.password}
        error={!errors.passwordValid}
        helperText={
          !errors.passwordValid ? "Hasło musi mieć minimum 8 znaków" : null
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="toggle password visibility"
                onClick={togglePassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <TextField
        label="repeat password"
        name="passwordRepeat"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        margin="normal"
        required={true}
        fullWidth={true}
        onChange={manageFields}
        onBlur={setErrors}
        value={fieldsState.passwordRepeat}
        error={!errors.passwordsValid}
        helperText={!errors.passwordsValid ? "Hasła nie są takie same" : null}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="toggle password visibility"
                onClick={togglePassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button
        style={{
          marginTop: 10
        }}
        variant="contained"
        color="primary"
        onClick={goToNextStep}
        disabled={
          !fieldsState.emailValid ||
          !fieldsState.passwordValid ||
          !fieldsState.passwordsValid
        }
      >
        Następny krok
      </Button>
    </>
  );
};

export default EmailAndPassword;
