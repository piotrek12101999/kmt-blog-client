import { Button } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { Dispatch, SetStateAction } from "react";
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
        type="file"
        onChange={handleInputChange}
      />
      <label
        htmlFor="icon-button-file"
        className="upload-picture__fab-container"
      >
        <div className="upload-picture__fab-container__fab">
          <CloudUpload style={{ marginRight: 15 }} /> Upload
        </div>
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
          .upload-picture__fab-container__fab {
            height: 40px;
            width: 128px;
            border-radius: 24px;
            background-color: #0070f3;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
              0px 2px 2px 0px rgba(0, 0, 0, 0.14),
              0px 3px 1px -2px rgba(0, 0, 0, 0.12);
          }
        `}
      </style>
    </div>
  );
};

export default UploadPicture;
