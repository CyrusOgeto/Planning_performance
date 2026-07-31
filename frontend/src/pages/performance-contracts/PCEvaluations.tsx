// import { createFileRoute } from "@tanstack/react-router";
import PagePlaceholder from "@/components/PagePlaceholder";


// export const Route = createFileRoute("/performance-contracts/evaluations")
// ({
//   component: () => (
//     <PagePlaceholder title="Evaluations" description="Quarterly and annual contract evaluations." />
//   ),
// });

 function PCEvaluations() {
  return <PagePlaceholder title="Evaluations" description="Quarterly and annual contract evaluations." />;
};

export default PCEvaluations;