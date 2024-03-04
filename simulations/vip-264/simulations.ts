import { expect } from "chai";
import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { ethers } from "hardhat";

import { expectEvents } from "../../src/utils";
import { forking, testVip } from "../../src/vip-framework";
import {
  BNB_DEBT_BORROWER_3,
  BORROWER_1,
  BORROWER_2,
  BORROWER_3,
  BRIDGE_XVS_AMOUNT,
  TOKEN_REDEEMER,
  TREASURY,
  TUSD_OLD,
  TUSD_OLD_DEBT_BORROWER_1,
  TUSD_OLD_DEBT_BORROWER_2,
  USDT,
  USDT_DEBT_BORROWER_1,
  VBNB,
  VTUSD_OLD,
  VUSDT,
  XVS,
  XVS_BRIDGE,
  vip264,
} from "../../vips/vip-264/bscmainnet";
import IERC20_ABI from "./abi/IERC20UpgradableAbi.json";
import REWARD_FACET_ABI from "./abi/RewardFacet.json";
import VTOKEN_ABI from "./abi/VBep20Abi.json";
import VTreasurey_ABI from "./abi/VTreasury.json";
import XVS_BRIDGE_ABI from "./abi/XVSProxyOFTSrc.json";

forking(36670852, () => {
  let vUSDT: ethers.Contract;
  let vTusdOld: ethers.Contract;
  let vBNB: ethers.Contract;
  let usdt: ethers.Contract;
  let tusdOld: ethers.Contract;
  let xvsBridge: ethers.Contract;
  let xvs: ethers.Contract;
  let treasuryTusdBalPrev: BigNumber;
  let treasuryVUsdtBalPrev: BigNumber;
  let treasuryBnbBalPrev: BigNumber;
  let borrower1TusdDebtPrev: BigNumber;
  let borrower1UsdtDebtPrev: BigNumber;
  let borrower2TusdDebtPrev: BigNumber;
  let borrower3BnbDebtPrev: BigNumber;
  let oldCirculatingSupply: BigNumber;
  let oldXVSBalance: BigNumber;

  before(async () => {
    vUSDT = new ethers.Contract(VUSDT, VTOKEN_ABI, ethers.provider);
    vTusdOld = new ethers.Contract(VTUSD_OLD, VTOKEN_ABI, ethers.provider);
    vBNB = new ethers.Contract(VBNB, VTOKEN_ABI, ethers.provider);
    usdt = new ethers.Contract(USDT, IERC20_ABI, ethers.provider);
    tusdOld = new ethers.Contract(TUSD_OLD, IERC20_ABI, ethers.provider);
    xvs = new ethers.Contract(XVS, IERC20_ABI, ethers.provider);
    xvsBridge = new ethers.Contract(XVS_BRIDGE, XVS_BRIDGE_ABI, ethers.provider);

    treasuryTusdBalPrev = await tusdOld.balanceOf(TREASURY);
    treasuryVUsdtBalPrev = await vUSDT.balanceOf(TREASURY);
    treasuryBnbBalPrev = await ethers.provider.getBalance(TREASURY);

    borrower1TusdDebtPrev = await vTusdOld.borrowBalanceStored(BORROWER_1);
    borrower2TusdDebtPrev = await vTusdOld.borrowBalanceStored(BORROWER_2);
    borrower1UsdtDebtPrev = await vUSDT.borrowBalanceStored(BORROWER_1);
    borrower3BnbDebtPrev = await vBNB.borrowBalanceStored(BORROWER_3);

    oldCirculatingSupply = await xvsBridge.circulatingSupply();
    oldXVSBalance = await xvs.balanceOf(XVS_BRIDGE);
  });

  testVip("VIP-264", vip264(), {
    callbackAfterExecution: async txResponse => {
      await expectEvents(txResponse, [VTreasurey_ABI], ["WithdrawTreasuryBEP20"], [2]);
      await expectEvents(txResponse, [VTreasurey_ABI], ["WithdrawTreasuryBNB"], [1]);
      await expectEvents(txResponse, [VTOKEN_ABI], ["Redeem"], [1]);
      await expectEvents(txResponse, [VTOKEN_ABI], ["RepayBorrow"], [4]);
      await expectEvents(txResponse, [REWARD_FACET_ABI], ["VenusGranted"], [1]);
      await expectEvents(txResponse, [XVS_BRIDGE_ABI], ["SendToChain"], [1]);
    },
  });

  describe("Post-VIP behavior", async () => {
    it("Treasury balance checks", async () => {
      const treasuryTusdBalNew = await tusdOld.balanceOf(TREASURY);
      const treasuryVUsdtBalNew = await vUSDT.balanceOf(TREASURY);
      const treasuryBnbBalNew = await ethers.provider.getBalance(TREASURY);

      expect(treasuryTusdBalPrev).equals(
        treasuryTusdBalNew.add(TUSD_OLD_DEBT_BORROWER_1.add(TUSD_OLD_DEBT_BORROWER_2)),
      );
      const exchangeRateStored = await vUSDT.exchangeRateStored();
      const redeemedTokens = USDT_DEBT_BORROWER_1.mul(parseUnits("1", 18)).div(exchangeRateStored);
      expect(treasuryVUsdtBalPrev).equals(treasuryVUsdtBalNew.add(redeemedTokens));
      expect(treasuryBnbBalPrev).equals(treasuryBnbBalNew.add(BNB_DEBT_BORROWER_3));
    });

    it("Borrower's balance checks", async () => {
      const borrower1TusdDebtNew = await vTusdOld.borrowBalanceStored(BORROWER_1);
      const borrower2TusdDebtNew = await vTusdOld.borrowBalanceStored(BORROWER_2);
      const borrower1UsdtDebtNew = await vUSDT.borrowBalanceStored(BORROWER_1);
      const borrower3BnbDebtNew = await vBNB.borrowBalanceStored(BORROWER_3);

      expect(borrower1TusdDebtPrev).equals(borrower1TusdDebtNew.add(TUSD_OLD_DEBT_BORROWER_1));
      expect(borrower2TusdDebtPrev).equals(borrower2TusdDebtNew.add(TUSD_OLD_DEBT_BORROWER_2));
      expect(borrower1UsdtDebtPrev).to.closeTo(borrower1UsdtDebtNew.add(USDT_DEBT_BORROWER_1), parseUnits("56", 18));
      expect(borrower3BnbDebtPrev).to.closeTo(borrower3BnbDebtNew.add(BNB_DEBT_BORROWER_3), parseUnits("0.15", 18));
    });

    it("Redeemer's balance checks", async () => {
      const redeemerVUsdtBalance = await vUSDT.balanceOf(TOKEN_REDEEMER);
      const redemmerUsdtBalance = await usdt.balanceOf(TOKEN_REDEEMER);
      expect(redeemerVUsdtBalance).equals(0);
      expect(redemmerUsdtBalance).equals(0);
    });

    it("Should decrease circulating supply", async () => {
      const currCirculatingSupply = await xvsBridge.circulatingSupply();
      expect(oldCirculatingSupply.sub(currCirculatingSupply)).equals(BRIDGE_XVS_AMOUNT);
    });

    it("Should increase number of locked tokens on bridge", async () => {
      const currXVSBal = await xvs.balanceOf(XVS_BRIDGE);
      expect(currXVSBal.sub(oldXVSBalance)).equals(BRIDGE_XVS_AMOUNT);
    });
  });
});
