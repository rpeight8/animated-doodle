/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogListItem from "./BlogListItem";

test("renders content", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Vanya",
    url: "https://github.com/testing-library/react-testing-library",
    userId: {
      username: "vanya",
    },
  };

  const mockHandler = jest.fn();

  const currentUser = {
    username: "vanya",
    name: "Vanya",
  };

  const { container } = render(
    <BlogListItem blog={blog} currentUser={currentUser} />
  );

  const user = userEvent.setup();

  const h3 = container.querySelector(".blog-list-item__title");
  const p = container.querySelector(".blog-list-item__author");
  const p2After = container.querySelector(".blog-list-item__user");
  const detailButton = container.querySelector(
    ".blog-list-item__detail-button"
  );
  expect(h3).toHaveTextContent(blog.title);
  expect(p).toHaveTextContent(blog.author);
  expect(p2After).toBeNull();
  expect(detailButton).toBeDefined();

  await user.click(detailButton);
  const p2Before = container.querySelector(".blog-list-item__user");

  expect(p2Before).toBeDefined();
  expect(p2Before).toHaveTextContent(blog.userId.username);
});
