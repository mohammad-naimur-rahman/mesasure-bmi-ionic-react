import {
  IonAlert,
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { calculatorOutline, refreshOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useRef, useState } from "react";

const App = () => {
  const [BMI, setBMI] = useState();

  const [error, seterror] = useState();

  const heightRef = useRef(null);
  const weightRef = useRef(null);

  const calculateBMI = () => {
    const weight = weightRef.current.value;
    const height = heightRef.current.value;

    if (!height || !weight || +height <= 0 || +weight <= 0) {
      seterror("Please enter a valid input value");
      return;
    }

    const bmi = (+weight / (+height * +height)).toFixed(2);

    setBMI(Number(bmi));
  };

  const reset = () => {
    weightRef.current.value = "";
    heightRef.current.value = "";
    setBMI(undefined);
  };

  return (
    <>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[
          {
            text: "Okay",
            handler: () => {
              seterror("");
            },
          },
        ]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Your Height</IonLabel>
                  <IonInput
                    type="number"
                    placeholder="(In meter)"
                    ref={heightRef}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Your Weight</IonLabel>
                  <IonInput
                    type="number"
                    placeholder="(In kg)"
                    ref={weightRef}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-left">
                <IonButton onClick={calculateBMI}>
                  <IonIcon slot="start" icon={calculatorOutline} />
                  Calculate
                </IonButton>
              </IonCol>
              <IonCol className="ion-text-right">
                <IonButton onClick={reset}>
                  <IonIcon slot="start" icon={refreshOutline} />
                  Reset
                </IonButton>
              </IonCol>
            </IonRow>
            {BMI && (
              <IonRow>
                <IonCol>
                  <IonCard>
                    <IonCardContent className="ion-text-center">
                      <h2>Your Body Mass Index</h2>
                      <h2>{BMI}</h2>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
        </IonContent>
      </IonApp>
    </>
  );
};

export default App;
