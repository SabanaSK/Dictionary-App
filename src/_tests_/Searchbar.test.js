import Searchbar from "../component/Search/Searchbar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("should show warning if form is submitted with empty query", async () => {
  const mockSetSearchQuery = jest.fn();
  render(<Searchbar setSearchQuery={mockSetSearchQuery} />);
  const user = userEvent.setup();

  const searchButton = screen.getByRole("button", { name: /search/i });
  await user.click(searchButton);

  expect(
    await screen.findByText("Please enter a word to search for its definition.")
  ).toBeInTheDocument();
});

