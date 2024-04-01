import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import VerificationForm from "../components/VerificationForm";
import { BrowserRouter } from "react-router-dom";

describe("ValidationPage", () => {
  test("renders verification inputs", () => {
    render(
      <BrowserRouter>
        <VerificationForm />
      </BrowserRouter>
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(6);
  });

  test("displays error message for non-numeric input", async () => {
    render(
      <BrowserRouter>
        <VerificationForm />
      </BrowserRouter>
    );
    const input = screen.getByTestId("input-0");
    fireEvent.change(input, { target: { value: "a" } });
    const errorMessage = await screen.findByText(/Please enter only digits./i);
    expect(errorMessage).toBeInTheDocument();
  });
});
