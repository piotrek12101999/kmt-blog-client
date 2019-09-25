import { Button, Fab } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { createRef, Dispatch, RefObject, SetStateAction } from "react";
import { IRegisterStepperState } from "../RegisterStepper";

interface IUploadPictureProps {
  goToPreviousStep: () => void;
  fieldsState: IRegisterStepperState;
  setFieldsState: Dispatch<SetStateAction<IRegisterStepperState>>;
  registerUser: () => void;
}

const UploadPicture: React.FC<IUploadPictureProps> = ({
  goToPreviousStep,
  fieldsState,
  setFieldsState,
  registerUser
}) => {
  const inputRef: RefObject<HTMLInputElement> = createRef();

  const handleFabClick = (): void | null =>
    inputRef.current ? inputRef.current.click() : null;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // @ts-ignore
    const [file] = event.target.files;
    setFieldsState({
      ...fieldsState,
      profilePicture: file
    });
  };

  const renderFileDetails = (): JSX.Element | undefined => {
    const { profilePicture } = fieldsState;
    if (profilePicture) {
      return (
        <p style={{ fontSize: 13, display: "flex", justifyContent: "center" }}>
          {profilePicture.name}
        </p>
      );
    }
  };

  return (
    <div className="upload-picture">
      <p>
        Wybierz zdjęcie aby
        <span className="upload-picture__indicate-text">
          <b>
            <i> wyróżniać </i>
          </b>
        </span>
        się pośród użytkowników!
      </p>
      <input
        accept="image/*"
        className="upload-picture__input-hidden"
        id="icon-button-file"
        ref={inputRef}
        type="file"
        onChange={handleInputChange}
      />
      <label
        htmlFor="icon-button-file"
        className="upload-picture__fab-container"
      >
        <Fab
          className="upload-picture__fab"
          variant="extended"
          color="primary"
          aria-label="delete"
          onClick={handleFabClick}
        >
          <CloudUpload style={{ marginRight: 10 }} />
          Upload!
        </Fab>
      </label>
      {renderFileDetails()}
      <Button
        style={{
          marginTop: 10
        }}
        variant="contained"
        color="primary"
        onClick={goToPreviousStep}
      >
        Poprzedni krok
      </Button>
      <Button
        style={{
          marginLeft: 10,
          marginTop: 10
        }}
        variant="contained"
        color="primary"
        onClick={registerUser}
      >
        Zarejestruj się
      </Button>
      <style jsx={true}>
        {`
          .upload-picture {
            width: 465px;
          }
          .upload-picture__indicate-text {
            color: #0070f3;
          }
          .upload-picture__input-hidden {
            display: none;
          }
          .upload-picture__fab-container {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 15px;
          }
        `}
      </style>
    </div>
  );
};

export default UploadPicture;
