import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isCodeValid } from "../helpers/validationHelpers";
import Button from "./Button";

const VerificationForm = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, e) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    if (!isCodeValid(e.target.value)) {
      setError("Please enter only digits.");
    } else {
      setError(""); // clear the error
    }

    if (index < 5 && isCodeValid(e.target.value)) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData("text");
    const clipboardDigits = clipboardData.split("").filter(isCodeValid); // remove the non digit values

    const newCode = [...code];
    clipboardDigits.forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit;
      }
    });

    setCode(newCode);
  };

  const handleSubmit = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const verificationCode = code.join("");

    try {
      const response = await axios.post(
        "/api/verify",
        { code: verificationCode },
        config
      );

      if (response.status === 200) {
        navigate("/success");
      } else {
        const errorData = response.data;
        setError(errorData.error);
      }
    } catch (error) {
      setError("Verification Error");
    } finally {
      setSubmitted(true);
    }
  };

  const handleRetry = () => {
    setCode(["", "", "", "", "", ""]);
    setError("");
    setSubmitted(false);
  };

  return (
    <div>
      <h1>Verification Code:</h1>

      <div>
        {code.map((value, index) => (
          <input
            key={index}
            id={`input-${index}`}
            data-testid={`input-${index}`}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(index, e)}
            onPaste={handlePaste}
            className={submitted && !isCodeValid(value) ? "input-error" : ""}
          />
        ))}
      </div>

      <Button onClick={handleSubmit} label="SUBMIT" />

      {error && (
        <div>
          <p className="error">{error}</p>
          <Button onClick={handleRetry} label="RETRY" />
        </div>
      )}
    </div>
  );
};

export default VerificationForm;
