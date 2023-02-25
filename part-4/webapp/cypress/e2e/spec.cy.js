describe("Blogs App", () => {
  beforeEach(() => {
    cy.visit("");
    cy.request("POST", `${Cypress.env("BACKEND_URL")}/api/testing`);
    const user = {
      name: "test",
      username: "test",
      password: "password1337",
    };
    cy.request("POST", `${Cypress.env("BACKEND_URL")}/api/users/`, user);
  });

  it("front page can be opened", () => {
    cy.contains("login");
  });

  it("login form can be opened", () => {
    cy.contains("login").click();
    cy.contains("username:");
    cy.contains("password:");
    cy.contains("login");
    cy.contains("cancel");
  });

  it("user can login", () => {
    cy.contains("login").click();
    cy.get("#login-form__username").type("test");
    cy.get("#login-form__password").type("password1337");
    cy.get("#login-form__login-button").click();
    cy.contains("logout");
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.visit("");
      cy.request("POST", `${Cypress.env("BACKEND_URL")}/api/testing`);
      const user = {
        name: "test",
        username: "test",
        password: "password1337",
      };
      cy.request("POST", `${Cypress.env("BACKEND_URL")}/api/users/`, user);
      cy.login({ username: "test", password: "password1337" });
    });

    it("a new blog can be created and deleted", async () => {
      cy.contains("Add blog").click();
      cy.contains("title :").click();
      cy.contains("author :");
      cy.contains("url :");
      cy.contains("cancel");
      cy.get("input[placeholder='title']").type("a title created by cypress");
      cy.get("input[placeholder='author']").type("cypres");
      cy.get("input[placeholder='url']").type("cypres-url");
      cy.contains(/^add$/).click();
      cy.get(".blog-list-item__title").contains("a title created by cypress");
      cy.contains("Delete").click();
      cy.get(".blog-list-item__title")
        .contains("a title created by cypress")
        .should("not.exist");
    });

    it("a nre blog can be liked and disliked", async () => {
      cy.contains("Add blog").click();
      cy.get("input[placeholder='title']").type("a title created by cypress");
      cy.get("input[placeholder='author']").type("cypres");
      cy.get("input[placeholder='url']").type("cypres-url");
      cy.contains(/^add$/).click();
      cy.get(".blog-list-item__title").contains("a title created by cypress");
      cy.contains("Details").click();
      cy.contains("Votes: 0");
      cy.contains(/^Vote$/).click();
      cy.contains("Votes: 1");
      cy.contains(/^Vote$/).click();
      cy.contains("Votes: 2");
      cy.contains("Remove Vote").click();
      cy.contains("Votes: 1");
      cy.contains("Remove Vote").click();
      cy.contains("Votes: 0");
      cy.contains("Remove Vote").click();
      cy.contains("Votes: 0");
    });
  });
});
