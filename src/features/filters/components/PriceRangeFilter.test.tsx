import PriceRangeFilter from "./PriceRangeFilter";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("PriceRangeFilter", () => {
  it("render the compponent with initial values", () => {
    const onApplyMock = vi.fn();
    render(<PriceRangeFilter priceRange={[10, 100]} onApply={onApplyMock} />);
    expect(screen.getByLabelText("Minimum price")).toBeInTheDocument();
    expect(screen.getByLabelText("Maximum price")).toBeInTheDocument();
  });

  it("defaults min to 0 when minInput is left empty", async () => {
    const onApplyMock = vi.fn();
    render(<PriceRangeFilter priceRange={[0, 50]} onApply={onApplyMock} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Apply price filter" }),
    );
    expect(onApplyMock).toHaveBeenCalledWith(0, 50);
  });

  it("defaults max to infinity when maxinput is left empty", async () => {
    const onApplyMock = vi.fn();
    render(
      <PriceRangeFilter priceRange={[10, Infinity]} onApply={onApplyMock} />,
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Apply price filter" }),
    );
    expect(onApplyMock).toHaveBeenCalledWith(10, Infinity);
  });

  it('shows an error when both min and max are negative"', async () => {
    const onApplyMock = vi.fn();
    render(<PriceRangeFilter priceRange={[0, 50]} onApply={onApplyMock} />);
    const minInput = screen.getByLabelText("Minimum price");
    const maxInput = screen.getByLabelText("Maximum price");

    await userEvent.type(minInput, "-10");
    await userEvent.type(maxInput, "-10");

    await userEvent.click(
      screen.getByRole("button", { name: "Apply price filter" }),
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      'Price can"t be negative',
    );
    expect(onApplyMock).not.toHaveBeenCalled();
  });

  it("show an error when min greather than max", async () => {
    const onApplyMock = vi.fn();
    render(<PriceRangeFilter priceRange={[50, 40]} onApply={onApplyMock} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Apply price filter" }),
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      'minimum can"t greater than maximam',
    );
    expect(onApplyMock).not.toHaveBeenCalled();
  });

  it("calls onApply with the entered min and max when both are valid", async () => {
    const onApplyMock = vi.fn();
    render(<PriceRangeFilter priceRange={[10, 40]} onApply={onApplyMock} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Apply price filter" }),
    );

    expect(onApplyMock).toHaveBeenCalledWith(10, 40);
  });

  it("No error shown on initial render", () => {
    const onApplyMock = vi.fn();
    render(<PriceRangeFilter priceRange={[0, 50]} onApply={onApplyMock} />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("updates the displayed value when typing into an input", async () => {
    const user = userEvent.setup();
    const onApplyMock = vi.fn();
    render(<PriceRangeFilter priceRange={[0, 50]} onApply={onApplyMock} />);

    const minInput = screen.getByLabelText("Minimum price");
    await user.type(minInput, "25");

    expect(minInput).toHaveValue(25);
  });

  it("clears the error after a successful apply following a previous error", async () => {
    const user = userEvent.setup();
    const onApplyMock = vi.fn();
    render(<PriceRangeFilter priceRange={[0, 50]} onApply={onApplyMock} />);

    const minInput = screen.getByLabelText("Minimum price");

    // trigger the error first
    await user.type(minInput, "-10");
    await user.click(
      screen.getByRole("button", { name: "Apply price filter" }),
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    // fix the input and apply again

    await user.clear(minInput);
    await user.type(minInput, "10");
    await user.click(
      screen.getByRole("button", { name: "Apply price filter" }),
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(onApplyMock).toHaveBeenCalledWith(10, 50);
  });
});
