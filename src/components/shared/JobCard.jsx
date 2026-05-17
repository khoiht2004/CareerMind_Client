import CardVariant from "./CardVariant";
import HorizontalVariant from "./HorizontalVariant";

function JobCard({ job, isSaved = false, variant = "card", compact, highlighted, actions }) {
  if (variant === "horizontal") {
    return <HorizontalVariant job={job} isSaved={isSaved} compact={compact} highlighted={highlighted} actions={actions} />;
  }
  return <CardVariant job={job} isSaved={isSaved} />;
}

export default JobCard;
