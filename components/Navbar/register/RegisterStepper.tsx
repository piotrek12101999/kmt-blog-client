import {
  QueryLazyOptions,
  useApolloClient,
  useMutation
} from "@apollo/react-hooks";
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography
} from "@material-ui/core";
import { ApolloClient } from "apollo-boost";
import cookie from "cookie";
import gql from "graphql-tag";
import { Dispatch, SetStateAction, useState } from "react";
import firebase from "../../../lib/getFirebase";
import { IAuthPayload } from "../../../models/user.model";
import FirstStep from "./RegisterSteps/EmailAndPassword";
import SecondStep from "./RegisterSteps/NameAndDescription";
import ThirdStep from "./RegisterSteps/UploadPicture";

const REGISTER = gql`
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
      }
    }
  }
`;

interface IRegisterStepperProps {
  closeRegister: () => void;
  getUserThatHasLoggedIn: (
    options?: QueryLazyOptions<Record<string, any>> | undefined
  ) => void;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export interface IRegisterStepperState {
  name: string;
  email: string;
  emailValid: boolean;
  password: string;
  passwordRepeat: string;
  passwordValid: boolean;
  passwordsValid: boolean;
  description: string;
  profilePicture: File | null;
}

function getSteps() {
  return ["Email i hasło", "Spersonalizuj swoje konto", "Almost there!"];
}

function getStepContent(
  step: number,
  goToNextStep: () => void,
  goToPreviousStep: () => void,
  fieldsState: IRegisterStepperState,
  setFieldsState: Dispatch<SetStateAction<IRegisterStepperState>>,
  handleRegister: () => void
) {
  switch (step) {
    case 0:
      return (
        <FirstStep
          goToNextStep={goToNextStep}
          fieldsState={fieldsState}
          setFieldsState={setFieldsState}
        />
      );
    case 1:
      return (
        <SecondStep
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
          fieldsState={fieldsState}
          setFieldsState={setFieldsState}
        />
      );
    case 2:
      return (
        <ThirdStep
          goToPreviousStep={goToPreviousStep}
          fieldsState={fieldsState}
          setFieldsState={setFieldsState}
          registerUser={handleRegister}
        />
      );
    default:
      return "Unknown step";
  }
}

const RegisterStepper: React.FC<IRegisterStepperProps> = ({
  getUserThatHasLoggedIn,
  closeRegister,
  setIsLoggedIn
}) => {
  const client: ApolloClient<object> = useApolloClient();
  const [fieldsState, setFieldsState] = useState<IRegisterStepperState>({
    description: "",
    email: "",
    emailValid: false,
    name: "",
    password: "",
    passwordRepeat: "",
    passwordValid: false,
    passwordsValid: false,
    profilePicture: null
  });
  const [activeStep, setActiveStep] = useState<number>(0);
  const [pictureDownloadURL, setPictureDownloadURL] = useState<null | string>(
    null
  );
  const steps: string[] = getSteps();

  const handleNext = (): void =>
    setActiveStep(prevActiveStep => prevActiveStep + 1);

  const handleBack = (): void =>
    setActiveStep(prevActiveStep => prevActiveStep - 1);

  const onCompleted = async (data: {
    createUser: IAuthPayload;
  }): Promise<void> => {
    document.cookie = cookie.serialize("token", data.createUser.token, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      sameSite: true
    });

    document.cookie = cookie.serialize("uid", data.createUser.user.id, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      sameSite: true
    });

    await client.cache.reset();

    client.writeData({ data: { UserLocalData: data.createUser.user.id } });
    getUserThatHasLoggedIn({ variables: { id: data.createUser.user.id } });
    closeRegister();
  };

  const [registerUser, { loading, error }] = useMutation(REGISTER, {
    onCompleted
  });

  setIsLoggedIn(loading);

  const renderError = (): JSX.Element | null =>
    error ? <Typography color="error"> {error.message} </Typography> : null;

  const uploadProfilePicture = (profilePicture: File): void => {
    const uploadedImage: firebase.storage.UploadTask = firebase
      .storage()
      .ref()
      .child(`profile-pictures/${profilePicture.name}`)
      .put(profilePicture);

    uploadedImage.on("state_changed", null, null, async () => {
      const downloadURL: string = await uploadedImage.snapshot.ref.getDownloadURL();

      setPictureDownloadURL(downloadURL);
    });
  };

  const registerVariables = ({
    email,
    name,
    password,
    description
  }: IRegisterStepperState) => ({
    variables: {
      data: {
        email,
        name,
        password,
        ...(description !== "" ? { description } : null),
        ...(pictureDownloadURL !== null
          ? { profile_picture: pictureDownloadURL }
          : null)
      }
    }
  });

  const handleRegister = (): void => {
    const { profilePicture } = fieldsState;

    if (profilePicture) {
      uploadProfilePicture(profilePicture);

      if (pictureDownloadURL) {
        registerUser(registerVariables(fieldsState));
      }
    } else {
      registerUser(registerVariables(fieldsState));
    }
  };

  return (
    <>
      {renderError()}
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(
                index,
                handleNext,
                handleBack,
                fieldsState,
                setFieldsState,
                handleRegister
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default RegisterStepper;
