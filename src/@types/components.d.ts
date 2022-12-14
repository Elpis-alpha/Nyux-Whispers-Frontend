interface SignUpIntro {

  setSignupStage: React.Dispatch<React.SetStateAction<string>>;

}
interface SignUpStages {

  signupData: {

    name: string;

    email: string;

    uniqueName: string;

    password: string;

  };

  setSignupData: React.Dispatch<React.SetStateAction<{

    name: string;

    email: string;

    uniqueName: string;

    password: string;

  }>>;

  setSignupStage: React.Dispatch<React.SetStateAction<string>>;

}