import { render, screen, waitFor } from "@testing-library/react";
import App from "../App.jsx";
import React, { act } from "react";

describe(`App`, () => {
  beforeEach(async () => {
    // Pre-Arrange
    await act(async () => await render(<App />));
  });

  it("renders the mocked API data (Ditto) instead of the real default data (Zapdos)", async () => {
    const pokeElement = await screen.findByText(/ditto/i);
    expect(pokeElement).toBeInTheDocument();
  });
});
