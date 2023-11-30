import bscmainnet_deployed_contracts from "@venusprotocol/venus-protocol/deployments/bscmainnet.json";
import bsctestnet_deployed_contracts from "@venusprotocol/venus-protocol/deployments/bsctestnet.json";
import sepolia_deployed_contracts from "@venusprotocol/venus-protocol/deployments/sepolia.json";
import { ethers } from "ethers";

export const ZERO_ADDRESS = ethers.constants.AddressZero;

export const NETWORK_ADDRESSES = {
  bscmainnet: {
    DEFAULT_PROPOSER_ADDRESS: "0x97a32D4506F6A35De68e0680859cDF41D077a9a9",
    GOVERNOR_PROXY: "0x2d56dC077072B53571b8252008C60e945108c75a",
    NORMAL_TIMELOCK: bscmainnet_deployed_contracts.contracts.NormalTimelock.address,
    ETH_CHAINLINK_FEED: "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e",
    USDT_CHAINLINK_FEED: "0xB97Ad0E74fa7d920791E90258A6E2085088b4320",
    CHAINLINK_ORACLE: "0x1B2103441A0A108daD8848D8F5d790e4D402921F",
    GENERIC_TEST_USER_ACCOUNT: "0x5a52E96BAcdaBb82fd05763E25335261B270Efcb",
    XVS_VAULT_PROXY: bscmainnet_deployed_contracts.contracts.XVSVaultProxy.address,
    XVS: bscmainnet_deployed_contracts.contracts.XVS.address,
  },
  bsctestnet: {
    DEFAULT_PROPOSER_ADDRESS: "0x2Ce1d0ffD7E869D9DF33e28552b12DdDed326706",
    GOVERNOR_PROXY: "0x5573422a1a59385c247ec3a66b93b7c08ec2f8f2",
    NORMAL_TIMELOCK: bsctestnet_deployed_contracts.contracts.NormalTimelock.address,
    ETH_CHAINLINK_FEED: "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7",
    USDT_CHAINLINK_FEED: "0xEca2605f0BCF2BA5966372C99837b1F182d3D620",
    CHAINLINK_ORACLE: "0xCeA29f1266e880A1482c06eD656cD08C148BaA32",
    COMPTROLLER_LENS: "0x350d56985A269C148648207E4Cea9f87656E762a",
    GENERIC_TEST_USER_ACCOUNT: "0x80dd0cB9c1EB88356bA5dd39161E391ACcF3FbCa",
    XVS_VAULT_PROXY: bsctestnet_deployed_contracts.contracts.XVSVaultProxy.address,
    XVS: bsctestnet_deployed_contracts.contracts.XVS.address,
  },
  ethereum: {
    NORMAL_TIMELOCK: "0x285960C5B22fD66A736C7136967A3eB15e93CC67",
    GUARDIAN: "0x285960C5B22fD66A736C7136967A3eB15e93CC67",
    VTREASURY: "0xfd9b071168bc27dbe16406ec3aba050ce8eb22fa",
  },
  sepolia: {
    NORMAL_TIMELOCK: "0x94fa6078b6b8a26F0B6EDFFBE6501B22A10470fB", // Sepolia Multisig
    GUARDIAN: "0x94fa6078b6b8a26F0B6EDFFBE6501B22A10470fB",
    CHAINLINK_ORACLE: "0x102F0b714E5d321187A4b6E5993358448f7261cE",
    RESILIENT_ORACLE: "0x8000eca36201dddf5805Aa4BeFD73d1EB4D23264",
    BOUND_VALIDATOR: "0x60c4Aa92eEb6884a76b309Dd8B3731ad514d6f9B",
    ACM: "0xbf705C00578d43B6147ab4eaE04DBBEd1ccCdc96",
    MOCK_USDC: "0x772d68929655ce7234C8C94256526ddA66Ef641E",
    MOCK_USDT: "0x8d412FD0bc5d826615065B931171Eed10F5AF266",
    MOCK_WETH: "0x700868CAbb60e90d77B6588ce072d9859ec8E281",
    MOCK_WBTC: "0x92A2928f5634BEa89A195e7BeCF0f0FEEDAB885b",
    XVS: "0xdb633c11d3f9e6b8d17ac2c972c9e3b05da59bf9",
    POOL_REGISTRY: "0x22067CF4a23955Ab7b834D4a9336ca624D93485e",
    COMPTROLLER: "0x4e4048b5eb13DD377872A418268b788f672653aa",
    VWBTC: "0x13c15cA5A074E7E1450492D474087b99c7253001",
    VWETH: "0x195D27b4cAfcb543C9104583FA37743ad5E4cEe5",
    VUSDT: "0x2c3Cc8EED38b4d323ce97DB11f98737F3F7421A1",
    VUSDC: "0x6f1089e90C6a14397C20348eE704d596819DFEd4",
    VTREASURY: sepolia_deployed_contracts.contracts.VTreasuryV8.address,
    REDSTONE_ORACLE: "0x4e6269Ef406B4CEE6e67BA5B5197c2FfD15099AE",
    MOCK_CRV: "0x2c78EF7eab67A6e0C9cAa6f2821929351bdDF3d3",
    MOCK_crvUSD: "0x36421d873abCa3E2bE6BB3c819C0CF26374F63b6",
    XVS_VAULT_PROXY: sepolia_deployed_contracts.contracts.XVSVaultProxy.address,
    XVS_STORE: sepolia_deployed_contracts.contracts.XVSStore.address,
  },
};
