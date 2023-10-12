import { TransactionResponse } from "@ethersproject/providers";
import { expect } from "chai";
import { parseUnits } from "ethers/lib/utils";
import { ethers } from "hardhat";

import { expectEvents } from "../../src/utils";
import { forking, testVip } from "../../src/vip-framework";
import { vip180 } from "../../vips/vip-180";
import { LIQUID_STAKED_BNB_COMPTROLLER, STABLECOIN_COMPTROLLER, VAGEUR, VSNBNB, vip183 } from "../../vips/vip-183";
import COMPTROLLER_ABI from "./abi/COMPTROLLER_ABI.json";

forking(32403700, () => {
  let stableCoinComptroller: ethers.Contract;
  let liquidStakeBnbComptroller: ethers.Contract;

  const provider = ethers.provider;

  before(async () => {
    stableCoinComptroller = await new ethers.Contract(STABLECOIN_COMPTROLLER, COMPTROLLER_ABI, provider);
    liquidStakeBnbComptroller = await new ethers.Contract(LIQUID_STAKED_BNB_COMPTROLLER, COMPTROLLER_ABI, provider);
  });

  describe("Pre-VIP behaviour", async () => {
    it("Supply cap of agEUR equals 100,000", async () => {
      const oldSupplyCap = await stableCoinComptroller.supplyCaps(VAGEUR);
      expect(oldSupplyCap).to.equal(parseUnits("100000", 18));
    });

    it("Borrow cap of agEUR equals 50,000", async () => {
      const oldBorrowCap = await stableCoinComptroller.borrowCaps(VAGEUR);
      expect(oldBorrowCap).to.equal(parseUnits("50000", 18));
    });

    it("Supply cap of snBNB equals 2000", async () => {
      const oldSupplyCap = await liquidStakeBnbComptroller.supplyCaps(VSNBNB);
      expect(oldSupplyCap).to.equal(parseUnits("2000", 18));
    });

    it("Borrow cap of snBNB equals 100", async () => {
      const oldBorrowCap = await liquidStakeBnbComptroller.borrowCaps(VSNBNB);
      expect(oldBorrowCap).to.equal(parseUnits("400", 18));
    });
  });

  testVip("VIP-180 Risk Parameters Update", vip183(), {
    callbackAfterExecution: async (txResponse: TransactionResponse) => {
      await expectEvents(txResponse, [COMPTROLLER_ABI], ["NewSupplyCap", "NewBorrowCap", "Failure"], [2, 2, 0]);
    },
  });

  describe("Post-VIP behavior", async () => {
    it("Supply cap of agEUR equals 8,000,000", async () => {
      const newSupplyCap = await stableCoinComptroller.supplyCaps(VAGEUR);
      expect(newSupplyCap).to.equal(parseUnits("8000000", 18));
    });

    it("Borrow cap of agEUR equals 3,000,000", async () => {
      const newBorrowCap = await stableCoinComptroller.borrowCaps(VAGEUR);
      expect(newBorrowCap).to.equal(parseUnits("3000000", 18));
    });

    it("Supply cap of snBNB equals 3,000", async () => {
      const newSupplyCap = await liquidStakeBnbComptroller.supplyCaps(VSNBNB);
      expect(newSupplyCap).to.equal(parseUnits("3000", 18));
    });

    it("Borrow cap of snBNB equals 800", async () => {
      const newBorrowCap = await liquidStakeBnbComptroller.borrowCaps(VSNBNB);
      expect(newBorrowCap).to.equal(parseUnits("800", 18));
    });
  });
});
