import SortDropdown from "./SortDropdown";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("sortDropDown", () => {
  it("close the dropdown outside click", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <SortDropdown sortOrder={null} onChange={vi.fn()} />
        <button>outside element</button>
      </div>,
    );

    await user.click(screen.getByRole("button", { name: /Best match/i }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /outside element/ }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("it close by default", () => {
    render(<SortDropdown sortOrder={null} onChange={vi.fn()} />);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it('show "Best match" when sortOrder is null', () => {
    render(<SortDropdown sortOrder={null} onChange={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: /Best match/i }),
    ).toBeInTheDocument();
  });

  it('show "price: Low to High" when sortorder is price-asc', () => {
    render(<SortDropdown sortOrder={"price-asc"} onChange={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: /Price: Low to High/i }),
    ).toBeInTheDocument();
  });

  it('show "price: Hight to Low" when sortorder is price-asc', () => {
    render(<SortDropdown sortOrder={"price-desc"} onChange={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: /Price: High to Low/i }),
    ).toBeInTheDocument();
  });

  it("open the dropdown click on toogle", async () => {
    const user = userEvent.setup();
    render(<SortDropdown sortOrder={null} onChange={vi.fn()} />);

    const toggle = screen.getByRole("button", { name: /Best match/i });
    await user.click(toggle);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("close the  dropdown click on toogle again ", async () => {
    const user = userEvent.setup();
    render(<SortDropdown sortOrder={null} onChange={vi.fn()} />);

    const toggle = screen.getByRole("button", { name: /Best match/i });
    await user.click(toggle);
    await user.click(toggle);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("marks the currently selected option with a areal-selected", async () => {
    const user = userEvent.setup();
    render(<SortDropdown sortOrder={"price-asc"} onChange={vi.fn()} />);

    await user.click(
      screen.getByRole("button", { name: /Price: Low to High/i }),
    );

    expect(
      screen.getByRole("option", { name: /Price: Low to High/i }),
    ).toHaveAttribute("aria-selected", "true");

    expect(screen.getByRole("option", { name: /Best match/i })).toHaveAttribute(
      "aria-selected",
      "false",
    );

    expect(
      screen.getByRole("option", { name: /Price: High to Low/i }),
    ).toHaveAttribute("aria-selected", "false");
  });

  it("calls onChange with price-asc when that option is clicked", async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    render(<SortDropdown sortOrder={null} onChange={onChangeMock} />);

    await user.click(screen.getByRole("button", { name: /Best match/i }));

    const listbox = screen.getByRole("listbox");
    await user.click(
      within(listbox).getByRole("button", { name: /Price: Low to High/i }),
    );

    expect(onChangeMock).toHaveBeenCalledWith("price-asc");
  });

  it("calls onChange with price-desc when that option is clicked", async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    render(<SortDropdown sortOrder={null} onChange={onChangeMock} />);

    await user.click(screen.getByRole("button", { name: /Best match/i }));

    const listbox = screen.getByRole("listbox");
    await user.click(
      within(listbox).getByRole("button", { name: /Price: High to Low/i }),
    );

    expect(onChangeMock).toHaveBeenCalledWith("price-desc");
  });
});
