type setSignupStage = React.Dispatch<React.SetStateAction<"initial"|"stage-1"|"stage-2"|"stage-3"|"stage-4"|"average">>;

interface signupData {

  name: string;

  emailCode: string;

  email: string;

  uniqueName: string;

  password: string;

};

type setSignupData = React.Dispatch<React.SetStateAction<{

  name: string;

  email: string;

  emailCode: string;

  uniqueName: string;

  password: string;

}>>;

interface SignUpIntro {

  setSignupStage: setSignupStage

}

interface SignUpStages {

  signupData: signupData

  setSignupData: setSignupData

  setSignupStage: setSignupStage

}

interface SignUpAverage {

  signupData: signupData

  setSignupData: setSignupData

  setSignupStage: setSignupStage

}