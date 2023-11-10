import { ZeroDevConnector } from "@zerodev/wagmi";
import { createPasskeyOwner, getPasskeyOwner } from "@zerodev/sdk/passkey";
import { useConnect, configureChains, useAccount } from "wagmi";
import { base } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const projectId = "b5486fa4-e3d9-450b-8428-646e757c10f6";

export const { chains } = configureChains(
  // make sure to specify a chain that corresponds to your ZeroDev project
  [base],
  [publicProvider()]
);

export default function Passkey() {
  const { connect } = useConnect();
  const { isConnected, address } = useAccount();

  console.log({ isConnected, address });

  const handleRegister = async () => {
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

  const handleLogin = async () => {
    connect({
      connector: new ZeroDevConnector({
        chains,
        options: {
          projectId,
          owner: await getPasskeyOwner({ projectId }),
        },
      }),
    });
  };

  return (
    <div>
      <button onClick={handleRegister}> Register </button>
      <button onClick={handleLogin}> Login </button>
    </div>
  );
}
