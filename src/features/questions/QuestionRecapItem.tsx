import { Link } from "react-router-dom";
import { copyToClipboard } from "../../helpers/clipboard";

interface Props {
  description: string;
  linkToShare: string;
  linkButtonText: string;
}

function QuestionRecapItem({
  linkButtonText,
  linkToShare,
  description,
}: Props) {
  function handleCopyLink() {
    copyToClipboard(`${window.location.origin}${linkToShare}`);
  }
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-half">
        <Link to={linkToShare}>{description}</Link>
      </div>
      <div className="column is-half">
        <button className="button is-link" onClick={(_e) => handleCopyLink()}>
          {linkButtonText}
        </button>
      </div>
    </div>
  );
}

export default QuestionRecapItem;
