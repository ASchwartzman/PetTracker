const Adoption = artifacts.require("Adoption");

contract("Adoption", (accounts) => {
  let adoption;
  let expectedAdopter;

  before(async () => {
    adoption = await Adoption.deployed();
  });

  describe("adopting a pet and retrieving account addresses", async () => {
    before("adopt a pet using accounts[0]", async () => {
      await adoption.adopt(8, { from: accounts[0] });
      expectedAdopter = accounts[0];
    });

    it("should fetch the address of an owner by pet id", async () => {
      const adopter = await adoption.adopters(8);
      assert.equal(
        expectedAdopter,
        adopter,
        "The owner of the adopted pet should be the first account."
      );
    });

    it("should fetch the collection of all pet owners", async () => {
      const adopters = await adoption.getAdopters();
      assert.equal(
        adopters[8],
        expectedAdopter,
        "The owner of the adopted pet should be in the collection"
      );
    });
  });
});
