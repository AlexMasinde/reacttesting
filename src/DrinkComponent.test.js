import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DrinksComponent from "./DrinksComponent";
import { mockServer } from "./server";
import { rest } from "msw";

beforeAll(() => {
  mockServer.listen();
});

afterEach(() => {
  mockServer.resetHandlers();
});

afterAll(() => {
  mockServer.close();
});

describe("mocks drink data API call", () => {
  it("fetches and displays test drink", async () => {
    render(<DrinksComponent />);
    const searchInput = screen.getByLabelText(/search/i);
    userEvent.type(searchInput, "test drink, {enter}");
    expect(
      await screen.findByRole("img", { name: /test drink/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /test drink/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/test ingredient/i)).toBeInTheDocument();
    expect(screen.getByText(/test instructions/i)).toBeInTheDocument();
  });

  it("renders no drink results", async () => {
    mockServer.use(
      rest.get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php",
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ drinks: null }));
        }
      )
    );

    render(<DrinksComponent />);

    const searchInput = screen.getByLabelText(/search/i);
    userEvent.type(searchInput, "test drink, {enter}");
    expect(await screen.findByText(/no drinks found/i)).toBeInTheDocument();
    screen.debug();
  });

  it("renders error message", async () => {
    mockServer.use(
      rest.get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php",
        (req, res, ctx) => {
          return res(ctx.status(503));
        }
      )
    );

    render(<DrinksComponent />);
    const input = screen.getByLabelText(/search/i);
    userEvent.type(input, "test drink, {enter}");
    expect(await screen.findByText(/service unavailable/i)).toBeInTheDocument();
  });

  it("does not serach when query is empty", async () => {
    render(<DrinksComponent />);
    const input = screen.getByLabelText(/search/i);
    userEvent.type(input, "{enter}");
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
