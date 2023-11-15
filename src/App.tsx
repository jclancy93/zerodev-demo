import { Dashboard } from "./Dashboard";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { SponsoredGasExample } from "./examples/SponsoredGasExample";
import { BatchExample } from "./examples/BatchExample";
import Passkey from "./Passkey";

import { TamaguiProvider } from "tamagui";

import config from "./tamagui.config";

const links = [
  {
    path: "/gas-free",
    label: "Pay Gas for Users",
    element: <SponsoredGasExample />,
  },
  { path: "/bundle", label: "Bundle Transactions", element: <BatchExample /> },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard children={<Outlet />} links={links} />,
    errorElement: <Navigate to={"/"} replace />,
    children: [
      {
        index: true,
        element: <Navigate to={links[0].path} replace />,
      },
      ...links,
    ],
  },
]);

function App() {
  return (
    <TamaguiProvider config={config}>
      <Passkey />
    </TamaguiProvider>
  );
}

export default App;
