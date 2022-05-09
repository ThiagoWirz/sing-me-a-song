describe("Test app", () => {
  it("should create video recommendation and click like and dislike", () => {
    const recommendation = {
      name: "miajuda",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
    };

    cy.visit("http://localhost:3000/");

    cy.get("input[placeholder=Name]").type(recommendation.name);
    cy.get("input[placeholder='https://youtu.be/...]").type(
      recommendation.link
    );

    cy.intercept("POST", "/recommendations").as("postRecommendations");
    cy.get("button").click();
    cy.wait("@postRecommendations");

    cy.contains(recommendation.name).should("be.visible");

    cy.contains("0").should("be.visible");
    cy.get("#up").click();
    cy.contains("1").should("be.visible");
    cy.get("#down").click();
    cy.contains("0").should("be.visible");
  });
});
