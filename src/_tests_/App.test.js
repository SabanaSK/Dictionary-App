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
      let data = mockWordData.filter((item) => item.word === req.params.word);
      if (data.length) {
        return res(ctx.json(data));
      }
      return res(ctx.status(400), ctx.json({ error: "Invalid word" }));
    }
  )
);

beforeAll(() => server.listen());

afterAll(() => server.close());

describe("Test with no user interaction", () => {
  test("should render the correct header", () => {
    render(<App />);
    expect(screen.getByText("Welcome to Dictionary App")).toBeInTheDocument();
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
});

describe("Test user interaction", () => {
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

    expect(
      await screen.findByText(
        "Example: Jones is a possible for the new opening in sales."
      )
    ).toBeInTheDocument();
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

    expect(await screen.findByText("Synonyms: futurable")).toBeInTheDocument();
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

    expect(await screen.findByText("Antonyms: impossible")).toBeInTheDocument();
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

    expect(
      await screen.findByText(
        "Error: No definition found. Refresh the page and try again with new words."
      )
    ).toBeInTheDocument();
  });

  test("should get audio element when searching", async () => {
    render(<App />);
    const user = userEvent.setup();

    const input = screen.getByRole("textbox");
    await user.type(input, "hello");

    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
    const audioElement = screen.getByTestId("audio");
    expect(audioElement).toBeInTheDocument();

    const sourceElement = within(audioElement).getByTestId("source");
    expect(sourceElement).toHaveProperty(
      "src",
      "http://ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3"
    );
  });
});
