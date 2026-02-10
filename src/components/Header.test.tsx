import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("should display the title", () => {
    render(<Header />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("heading").textContent).toMatch(/word ladder/i);
  });
  
  it("should display the logo", () => {
    render(<Header />);
    const logo = screen.getByAltText(/rough step ladder/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/assets/images/RoughStepLadder.png");
  });
});