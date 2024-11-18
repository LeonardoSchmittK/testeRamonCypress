describe("Sample Test", () => {
  it("Visitar página principal", () => {
    cy.visit("/");
    cy.contains("h1", "Pesquise o Pokémon");
  });
});

describe("Pokémon pesquisa", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should search for a Pokémon and display details", () => {
    const pokemonName = "pikachu";

    cy.get("#pokemonName").type(pokemonName);

    cy.get("button").click();

    cy.get("#pokemonDetails").should("be.visible");
    cy.get("#pokemonNameDisplay").should("contain.text", pokemonName);
    cy.get("#pokemonHeight").should("exist");
    cy.get("#pokemonWeight").should("exist");
  });

  it("Checar por pokémon incorreto", () => {
    const invalidPokemonName = "nonexistentpokemon";

    cy.get("#pokemonName").type(invalidPokemonName);

    cy.get("button").click();

    cy.on("window:confirm", (text) => {
      expect(text).to.contains("Pokémon incorreto");
    });
  });
});
