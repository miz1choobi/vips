import { parseUnits } from "ethers/lib/utils";

import { ProposalType } from "../src/types";
import { makeProposal } from "../src/utils";

export const LIQUID_STAKED_BNB_COMPTROLLER = "0xd933909A4a2b7A4638903028f44D1d38ce27c352";
export const VSNBNB = "0xd3CC9d8f3689B83c91b7B59cAB4946B063EB894A";
export const SNBNB_NEW_SUPPLY_CAP = parseUnits("2000", 18);
export const SNBNB_NEW_BORROW_CAP = parseUnits("400", 18);

export const CORE_POOL_COMPTROLLER = "0xfD36E2c2a6789Db23113685031d7F16329158384";
export const VMATIC = "0x5c9476fcd6a4f9a3654139721c949c2233bbbbc8";
export const MATIC_NEW_SUPPLY_CAP = parseUnits("8000000", 18);
export const MATIC_NEW_BORROW_CAP = parseUnits("3000000", 18);

export const vip181 = () => {
  const meta = {
    version: "v2",
    title: "VIP-181 Risk Parameters Adjustments",
    description: `#### Summary

This VIP will perform the following Risk Parameters actions as per Chaos Labs latest recommendations in this Venus community forum publication

- Increase supply cap of **snBNB** to 2,000 snBNB
- Increase borrow cap of **snBNB** to 400 snBNB
- Increase supply cap of **MATIC** to 8,000,000 MATIC
- Increase borrow cap of **MATIC** to 3,000,000 MATIC
`,
    forDescription: "I agree that Venus Protocol should proceed with this proposal",
    againstDescription: "I do not think that Venus Protocol should proceed with this proposal",
    abstainDescription: "I am indifferent to whether Venus Protocol proceeds or not",
  };

  return makeProposal(
    [
      {
        target: LIQUID_STAKED_BNB_COMPTROLLER,
        signature: "setMarketSupplyCaps(address[],uint256[])",
        params: [[VSNBNB], [SNBNB_NEW_SUPPLY_CAP]],
      },

      {
        target: LIQUID_STAKED_BNB_COMPTROLLER,
        signature: "setMarketBorrowCaps(address[],uint256[])",
        params: [[VSNBNB], [SNBNB_NEW_BORROW_CAP]],
      },
      {
        target: CORE_POOL_COMPTROLLER,
        signature: "_setMarketSupplyCaps(address[],uint256[])",
        params: [[VMATIC], [MATIC_NEW_SUPPLY_CAP]],
      },

      {
        target: CORE_POOL_COMPTROLLER,
        signature: "_setMarketBorrowCaps(address[],uint256[])",
        params: [[VMATIC], [MATIC_NEW_BORROW_CAP]],
      },
    ],
    meta,
    ProposalType.REGULAR,
  );
};
