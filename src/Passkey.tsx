import { ZeroDevConnector } from "@zerodev/wagmi";
import { createPasskeyOwner, getPasskeyOwner } from "@zerodev/sdk/passkey";
import { useConnect, configureChains, useAccount } from "wagmi";
import { base } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { OnboardingLayout } from "./components/OnboardingLayout";
import { useState } from "react";

export const projectId = "0e94358f-2baf-4766-baf6-7808a46eb2b5";

export const { chains } = configureChains(
  // make sure to specify a chain that corresponds to your ZeroDev project
  [base],
  [publicProvider()]
);

export default function Passkey() {
  const { connect } = useConnect();
  const { isConnected, address } = useAccount();
  const [step, setStep] = useState(0);

  const handleRegister = async () => {
    console.log("called");
    connect({
      connector: new ZeroDevConnector({
        chains,
        options: {
          projectId,
          owner: await createPasskeyOwner({
            name: "Name of your app",
            projectId,
          }),
        },
      }),
    });
  };

  return (
    <>
      {step === 0 && (
        <OnboardingLayout
          image={require("./assets/pig.png")}
          title="Complete control"
          subtitle="Do what you want, when you want and without limits"
          onClick={() => setStep(1)}
          step={step}
        />
      )}
      {step === 1 && (
        <OnboardingLayout
          image={require("./assets/plant.png")}
          title="Total Flexibility"
          subtitle="Send and request funds all over the world instantly"
          onClick={() => setStep(2)}
          step={step}
        />
      )}
      {step === 2 && (
        <OnboardingLayout
          image={require("./assets/paper-plane.png")}
          title="Effortless growth"
          subtitle="All SelfBanks accounts offer up to 4% rewards. Sit back and watch it grow"
          onClick={async () => {
            await handleRegister();
            setStep(3);
          }}
          step={step}
        />
      )}
    </>
  );
}
