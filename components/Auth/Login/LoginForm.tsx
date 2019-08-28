import { TextField } from "@material-ui/core";

interface ILoginFormProps {
  emailValue: string;
  passwordValue: string;
  handleEmailChange: any;
  handlePasswordChange: any;
}

const LoginForm: React.FC<ILoginFormProps> = ({
  emailValue,
  passwordValue,
  handleEmailChange,
  handlePasswordChange
}) => (
  <>
    <TextField
      label="email"
      value={emailValue}
      onChange={handleEmailChange}
      margin="normal"
      variant="outlined"
      fullWidth={true}
    />
    <TextField
      label="hasło"
      value={passwordValue}
      onChange={handlePasswordChange}
      margin="normal"
      type="password"
      variant="outlined"
      fullWidth={true}
    />
  </>
);

export default LoginForm;
