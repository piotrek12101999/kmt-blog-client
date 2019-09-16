import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { ILoginFieldValuesState } from "./Login";

interface ILoginFormProps {
  fieldsState: ILoginFieldValuesState;
  setFieldsState: Dispatch<SetStateAction<ILoginFieldValuesState>>;
}

interface ILoginFormErrorState {
  emailError: boolean;
  passwordError: boolean;
}

const LoginForm: React.FC<ILoginFormProps> = ({
  fieldsState,
  setFieldsState
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setStateErros] = useState<ILoginFormErrorState>({
    emailError: false,
    passwordError: false
  });
  const togglePassword = (): void =>
    setShowPassword(prevShowValue => !prevShowValue);

  const validateEmail = (emailInputValue: string): boolean => {
    const regexp: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;

    return regexp.test(emailInputValue);
  };

  const setErrors = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "email") {
      setStateErros({
        ...errors,
        emailError: !validateEmail(fieldsState.email)
      });
    } else {
      setStateErros({
        ...errors,
        passwordError: fieldsState.password.length < 8
      });
    }
  };

  const manageFields = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "email") {
      setFieldsState({
        ...fieldsState,
        email: event.target.value,
        emailValid: validateEmail(event.target.value)
      });
    } else {
      setFieldsState({
        ...fieldsState,
        password: event.target.value,
        passwordValid: event.target.value.length >= 8
      });
    }
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
        value={fieldsState.email}
        onBlur={setErrors}
        error={errors.emailError}
        helperText={errors.emailError ? "Email niepoprawny" : null}
      />
      <TextField
        label="hasło"
        name="password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        margin="normal"
        required={true}
        fullWidth={true}
        onChange={manageFields}
        value={fieldsState.password}
        onBlur={setErrors}
        error={errors.passwordError}
        helperText={
          errors.passwordError ? "Hasło musi mieć minimum 8 znaków" : null
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
    </>
  );
};

export default LoginForm;
