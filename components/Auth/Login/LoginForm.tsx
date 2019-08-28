import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Dispatch, SetStateAction, useState } from "react";

interface ILoginFormProps {
  emailValue: string;
  passwordValue: string;
  handleEmailChange: any;
  handlePasswordChange: any;
  setFieldsValidity: Dispatch<SetStateAction<boolean>>;
}

interface ILoginFormErrorState {
  emailError: boolean;
  passwordError: boolean;
}

const LoginForm: React.FC<ILoginFormProps> = ({
  emailValue,
  passwordValue,
  handleEmailChange,
  handlePasswordChange,
  setFieldsValidity
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setStateErros] = useState<ILoginFormErrorState>({
    emailError: false,
    passwordError: false
  });

  const togglePassword = () => setShowPassword(!showPassword);

  const validateEmail = (emailInputValue: string): boolean => {
    const regex: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;

    if (regex.test(emailInputValue)) {
      return false;
    }

    return true;
  };

  const setErrors = (fieldName: "email" | "password"): void => {
    if (fieldName === "email") {
      setStateErros({
        ...errors,
        emailError: validateEmail(emailValue)
      });
    } else {
      setStateErros({
        ...errors,
        passwordError: passwordValue.length < 8
      });
    }

    setFieldsValidity(!validateEmail(emailValue) && passwordValue.length >= 8);
  };

  return (
    <>
      <TextField
        error={errors.emailError}
        helperText={errors.emailError ? "Email niepoprawny" : null}
        label="email"
        type="email"
        required={true}
        value={emailValue}
        onChange={handleEmailChange}
        // tslint:disable-next-line:jsx-no-lambda
        onBlur={() => {
          setErrors("email");
        }}
        margin="normal"
        variant="outlined"
        fullWidth={true}
      />
      <TextField
        error={errors.passwordError}
        helperText={
          errors.passwordError ? "Hasło musi mieć minimum 8 znaków" : null
        }
        label="hasło"
        value={passwordValue}
        onChange={handlePasswordChange}
        // tslint:disable-next-line:jsx-no-lambda
        onBlur={() => {
          setErrors("password");
        }}
        margin="normal"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        fullWidth={true}
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
