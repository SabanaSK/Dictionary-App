import Result from "../component/Result/Result";
import { render, screen } from "@testing-library/react";
import mockWordData from "./mockDictionary.json";

test("should receive definition and audioURL", () => {
  render(
    <Result
      definition={mockWordData[1].meanings}
      audioUrl={mockWordData[1].phonetics[0].audio}
    />
  );
  const definitionElement = screen.getByTestId("definition");
  expect(definitionElement).toBeInTheDocument();

  const audioElement = screen.getByTestId("audio");
  expect(audioElement).toBeInTheDocument();
});
