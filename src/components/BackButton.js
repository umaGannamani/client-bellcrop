import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: "20px",
        fontSize: "18px",
        fontWeight: "500",
      }}
      onClick={() => navigate(-1)}
    >
      <IoArrowBack style={{ marginRight: "8px" }} />
      Back
    </div>
  );
}

export default BackButton;
