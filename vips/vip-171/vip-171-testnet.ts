import { ethers } from "hardhat";

import { ProposalType } from "../../src/types";
import { makeProposal } from "../../src/utils";

const NEW_VBEP20_DELEGATE_IMPL = "0xAC5CFaC96871f35f7ce4eD2b46484Db34B548b40";
const ACCESS_CONTROL_MANAGER = "0x45f8a08F534f34A97187626E05d4b6648Eeaa9AA";
const NORMAL_TIMELOCK = "0xce10739590001705F7FF231611ba4A48B2820327";
const FAST_TRACK_TIMELOCK = "0x3CFf21b7AF8390fE68799D58727d3b4C25a83cb6";
const CRITICAL_TIMELOCK = "0x23B893a7C45a5Eb8c8C062b9F32d0D2e43eD286D";
const PROTOCOL_SHARE_RESERVE = "0x8b293600c50d6fbdc6ed4251cc75ece29880276f";
const COMPTROLLER = "0x94d1820b2D1c7c7452A163983Dc888CEC546b77D";

interface AssetConfig {
  name: string;
  address: string;
  reduceReservesBlockDelta: number;
  acceptAdmin: boolean;
  isMock: boolean; // Defines underlying is MockToken
}

export const CORE_MARKETS: AssetConfig[] = [
  {
    name: "vETH",
    address: "0x162D005F0Fff510E54958Cfc5CF32A3180A84aab",
    reduceReservesBlockDelta: 840000,
    acceptAdmin: true,
    isMock: false,
  },

  {
    name: "vLTC",
    address: "0xAfc13BC065ABeE838540823431055D2ea52eBA52",
    reduceReservesBlockDelta: 840000,
    acceptAdmin: true,
    isMock: false,
  },

  {
    name: "VBTC",
    address: "0xb6e9322C49FD75a367Fcb17B0Fcd62C5070EbCBe",
    reduceReservesBlockDelta: 840000,
    acceptAdmin: true,
    isMock: false,
  },

  {
    name: "vXRP",
    address: "0x488aB2826a154da01CC4CC16A8C83d4720D3cA2C",
    reduceReservesBlockDelta: 840000,
    acceptAdmin: true,
    isMock: false,
  },
  {
    name: "vSXP",
    address: "0x74469281310195A04840Daf6EdF576F559a3dE80",
    reduceReservesBlockDelta: 840000,
    acceptAdmin: true,
    isMock: true,
  },
  {
    name: "vTRX",
    address: "0x369Fea97f6fB7510755DCA389088d9E2e2819278",
    reduceReservesBlockDelta: 840000,
    acceptAdmin: false,
    isMock: true,
  },
  {
    name: "vTUSD",
    address: "0xEFAACF73CE2D38ED40991f29E72B12C74bd4cf23",
    reduceReservesBlockDelta: 840000,
    acceptAdmin: false,
    isMock: true,
  },
  {
    name: "vUSDC",
    address: "0xD5C4C2e2facBEB59D0216D0595d63FcDc6F9A1a7",
    reduceReservesBlockDelta: 840000,
    acceptAdmin: true,
    isMock: true,
  },
  {
    name: "vUSDT",
    address: "0xb7526572FFE56AB9D7489838Bf2E18e3323b441A",
    reduceReservesBlockDelta: 840000,
    acceptAdmin: false,
    isMock: true,
  },
  {
    name: "vWBETH",
    address: "0x35566ED3AF9E537Be487C98b1811cDf95ad0C32b",
    reduceReservesBlockDelta: 840000,
    acceptAdmin: false,
    isMock: true,
  },
];

function filterAssets(assets: AssetConfig[]) {
  return assets.filter(asset => asset.acceptAdmin);
}

const MARKETS_WITH_ACCEPT_ADMIN = filterAssets(CORE_MARKETS);

export const vip171Testnet = () => {
  const meta = {
    version: "v2",
    title: "VIP-171 VToken Upgrade of AIA",
    description: `upgrade the implementation of the Vtoken core supportimg Automatic income allocation feature.`,
    forDescription: "I agree that Venus Protocol should proceed with VToken Upgrade of AIA",
    againstDescription: "I do not think that Venus Protocol should proceed with VToken Upgrade of AIA",
    abstainDescription: "I am indifferent to whether Venus Protocol proceeds with VToken Upgrade of AIA or not",
  };

  return makeProposal(
    [
      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [ethers.constants.AddressZero, "setReduceReservesBlockDelta(uint256)", NORMAL_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [ethers.constants.AddressZero, "setReduceReservesBlockDelta(uint256)", FAST_TRACK_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [ethers.constants.AddressZero, "setReduceReservesBlockDelta(uint256)", CRITICAL_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [ethers.constants.AddressZero, "_setReserveFactor(uint256)", NORMAL_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [ethers.constants.AddressZero, "_setReserveFactor(uint256)", FAST_TRACK_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [ethers.constants.AddressZero, "_setReserveFactor(uint256)", CRITICAL_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [ethers.constants.AddressZero, "_setInterestRateModel(address)", NORMAL_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [ethers.constants.AddressZero, "_setInterestRateModel(address)", FAST_TRACK_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [ethers.constants.AddressZero, "_setInterestRateModel(address)", CRITICAL_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [ethers.constants.AddressZero, "_reduceReserves(uint256)", NORMAL_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [ethers.constants.AddressZero, "_reduceReserves(uint256)", FAST_TRACK_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [ethers.constants.AddressZero, "_reduceReserves(uint256)", CRITICAL_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [COMPTROLLER, "_setCollateralFactor(address,uint256)", FAST_TRACK_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [COMPTROLLER, "_setCollateralFactor(address,uint256)", CRITICAL_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [COMPTROLLER, "_setMarketBorrowCaps(address[],uint256[])", FAST_TRACK_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [COMPTROLLER, "_setMarketBorrowCaps(address[],uint256[])", CRITICAL_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [COMPTROLLER, "_setMarketSupplyCaps(address[],uint256[])", FAST_TRACK_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [COMPTROLLER, "_setMarketSupplyCaps(address[],uint256[])", CRITICAL_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [COMPTROLLER, "_setProtocolPaused(bool)", FAST_TRACK_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [COMPTROLLER, "_setProtocolPaused(bool)", CRITICAL_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [COMPTROLLER, "_setActionsPaused(address[],uint256[],bool)", FAST_TRACK_TIMELOCK],
      },

      {
        target: ACCESS_CONTROL_MANAGER,
        signature: "giveCallPermission(address,string,address)",
        params: [COMPTROLLER, "_setActionsPaused(address[],uint256[],bool)", CRITICAL_TIMELOCK],
      },

      ...MARKETS_WITH_ACCEPT_ADMIN.map(asset => {
        return {
          target: asset.address,
          signature: "_acceptAdmin()",
          params: [],
        };
      }),
      ...CORE_MARKETS.map(asset => {
        return {
          target: asset.address,
          signature: "_setImplementation(address,bool,bytes)",
          params: [NEW_VBEP20_DELEGATE_IMPL, false, "0x"],
        };
      }),

      ...CORE_MARKETS.map(asset => {
        return {
          target: asset.address,
          signature: "setAccessControlManager(address)",
          params: [ACCESS_CONTROL_MANAGER],
        };
      }),

      ...CORE_MARKETS.map(asset => {
        return {
          target: asset.address,
          signature: "setReduceReservesBlockDelta(uint256)",
          params: [asset.reduceReservesBlockDelta],
        };
      }),

      ...CORE_MARKETS.map(asset => {
        return {
          target: asset.address,
          signature: "setProtocolShareReserve(address)",
          params: [PROTOCOL_SHARE_RESERVE],
        };
      }),
    ],
    meta,
    ProposalType.REGULAR,
  );
};
