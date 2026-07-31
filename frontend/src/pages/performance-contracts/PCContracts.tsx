// import { createFileRoute } from "@tanstack/react-router";
import PagePlaceholder from "@/components/PagePlaceholder";

// export const Route = createFileRoute("/performance-contracts/contracts")
// ({
//   component: () => (
//     <PagePlaceholder title="Performance Contracts" description="Manage departmental performance contracts." />
//   ),
// });

function PCContracts() {
  return <PagePlaceholder title="Performance Contracts" description="Manage departmental performance contracts." />;
};

export default PCContracts;