import { Button, TextField } from "@material-ui/core";
import { Dispatch, SetStateAction, useState } from "react";
import { IRegisterStepperState } from "../RegisterStepper";

interface INameAndDescriptionProps {
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  fieldsState: IRegisterStepperState;
  setFieldsState: Dispatch<SetStateAction<IRegisterStepperState>>;
}

const NameAndDescription: React.FC<INameAndDescriptionProps> = ({
  goToPreviousStep,
  goToNextStep,
  fieldsState,
  setFieldsState
}) => {
  const [showNameError, setShowNameError] = useState<boolean>(false);
  const manageFields = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setFieldsState({
      ...fieldsState,
      [event.target.name]: event.target.value
    });

  const handleNameBlur = () => setShowNameError(fieldsState.name === "");

  return (
    <>
      <TextField
        label="Imie i nazwisko"
        name="name"
        type="text"
        variant="outlined"
        margin="normal"
        required={true}
        fullWidth={true}
        onChange={manageFields}
        onBlur={handleNameBlur}
        value={fieldsState.name}
        error={showNameError}
        helperText={
          showNameError ? "Imie i nazwisko albo nick jest wymagany" : null
        }
      />
      <TextField
        label="Opis"
        name="description"
        multiline={true}
        rows="4"
        rowsMax="6"
        margin="normal"
        variant="outlined"
        fullWidth={true}
        helperText="opcjonalne"
        onChange={manageFields}
        value={fieldsState.description}
      />
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
        disabled={fieldsState.name === ""}
        onClick={goToNextStep}
      >
        Następny krok
      </Button>
    </>
  );
};

export default NameAndDescription;
