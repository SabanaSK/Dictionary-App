/* eslint-disable testing-library/prefer-find-by */
import { render, screen, waitFor, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import mockWordData from "./mockDictionary.json";

const server = setupServer(
  rest.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/:word`,
    (req, res, ctx) => {
      if (req.params.word === "possible" || req.params.word === "hello") {
        return res(ctx.json(mockWordData));
      }
      return res(ctx.status(400), ctx.json({ error: "Invalid word" }));
    }
  )
);

beforeAll(() => server.listen());

afterAll(() => server.close());

test("should render the correct header", () => {
  render(<App />);
  expect(screen.getByText("Welcome to Dictionary App")).toBeInTheDocument();
});

test("should display data of dictionary via click and remove loading", async () => {
  render(<App />);
  const user = userEvent.setup();

  await waitFor(() =>
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
  );

  const input = screen.getByRole("textbox");
  await user.type(input, "possible");

  const searchButton = screen.getByRole("button", { name: /search/i });
  await user.click(searchButton);

  expect(
    await screen.findByText("Definition: A particular event that may happen.")
  ).toBeInTheDocument();
});

test("should display data of example via click", async () => {
  render(<App />);
  const user = userEvent.setup();

  await waitFor(() =>
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
  );

  const input = screen.getByRole("textbox");
  await user.type(input, "possible");

  const searchButton = screen.getByRole("button", { name: /search/i });
  await user.click(searchButton);

  await waitFor(() =>
    expect(
      screen.getByText(
        "Example: Jones is a possible for the new opening in sales."
      )
    ).toBeInTheDocument()
  );
});

test("should display data of synonyms via click", async () => {
  render(<App />);
  const user = userEvent.setup();

  await waitFor(() =>
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
  );

  const input = screen.getByRole("textbox");
  await user.type(input, "possible");

  const searchButton = screen.getByRole("button", { name: /search/i });
  await user.click(searchButton);

  await waitFor(() =>
    expect(screen.getByText("Synonyms: futurable")).toBeInTheDocument()
  );
});

test("should display data of Antonyms via click", async () => {
  render(<App />);
  const user = userEvent.setup();

  await waitFor(() =>
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
  );

  const input = screen.getByRole("textbox");
  await user.type(input, "possible");

  const searchButton = screen.getByRole("button", { name: /search/i });
  await user.click(searchButton);

  await waitFor(() =>
    expect(screen.getByText("Antonyms: impossible")).toBeInTheDocument()
  );
});

test("should be able to see error when sumbit something not a words", async () => {
  render(<App />);
  const user = userEvent.setup();

  await waitFor(() =>
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
  );

  const input = screen.getByRole("textbox");
  await user.type(input, "swtr");

  const searchButton = screen.getByRole("button", { name: /search/i });
  await user.click(searchButton);

  await waitFor(() =>
    expect(
      screen.getByText(
        "Error: No definition found. Refresh the page and try again with new words."
      )
    ).toBeInTheDocument()
  );
});

test("should render search bar", () => {
  render(<App />);
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
});

test("should start with no definition or error", () => {
  render(<App />);
  expect(screen.queryByText(/definition:/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/error:/i)).not.toBeInTheDocument();
});

test.only("should get audio element when searching", async () => {
  render(<App />);
  const user = userEvent.setup();

  const input = screen.getByRole("textbox");
  await user.type(input, "hello");

  const searchButton = screen.getByRole("button", { name: /search/i });
  await user.click(searchButton);

  await waitFor(() => {
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
  const audioElement = screen.getByRole("audio");
  expect(audioElement).toBeInTheDocument();
  const sourceElement = within(audioElement).getByTestId("source");
  expect(sourceElement).toHaveProperty("src", "asd");
});
