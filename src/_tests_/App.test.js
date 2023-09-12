import { render, screen } from "@testing-library/react";
import App from "../App";

test("should render the correct header", () => {
  render(<App />);
  expect(screen.getByText("Welcome to Dictionary App")).toBeInTheDocument();
});

