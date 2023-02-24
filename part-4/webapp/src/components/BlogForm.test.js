/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("renders content", async () => {
  const createBlog = jest.fn();

  const { container } = render(<BlogForm onAddPressHandler={createBlog} />);

  const user = userEvent.setup();

  const titleInput = screen.getByPlaceholderText("title");
  const authorInput = screen.getByPlaceholderText("author");
  const urlInput = screen.getByPlaceholderText("url");

  await user.type(titleInput, "test title");
  await user.type(authorInput, "test author");
  await user.type(urlInput, "test url");

  const detailButton = screen.getByText("add");
  await user.click(detailButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("test title");
  expect(createBlog.mock.calls[0][0].author).toBe("test author");
  expect(createBlog.mock.calls[0][0].url).toBe("test url");
});
