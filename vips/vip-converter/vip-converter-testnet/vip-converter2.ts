import { ProposalType } from "../../../src/types";
import { makeProposal } from "../../../src/utils";
import {
  BTCBPrimeConverterTokenOuts,
  BTCB_PRIME_CONVERTER,
  BaseAssets,
  CONVERTER_NETWORK,
  CRITICAL_TIMELOCK,
  ETHPrimeConverterTokenOuts,
  ETH_PRIME_CONVERTER,
  FAST_TRACK_TIMELOCK,
  NORMAL_TIMELOCK,
  RISK_FUND_CONVERTER,
  RiskFundConverterTokenOuts,
  USDCPrimeConverterTokenOuts,
  USDC_PRIME_CONVERTER,
  USDTPrimeConverterTokenOuts,
  USDT_PRIME_CONVERTER,
  XVSVaultConverterTokenOuts,
  XVS_VAULT_CONVERTER,
} from "./Addresses";
import {
  converterCommands,
  grant,
  incentiveAndAccessibilityForBTCBPrimeConverter,
  incentiveAndAccessibilityForETHPrimeConverter,
  incentiveAndAccessibilityForRiskFundConverter,
  incentiveAndAccessibilityForUSDCPrimeConverter,
  incentiveAndAccessibilityForUSDTPrimeConverter,
  incentiveAndAccessibilityForXVSVaultConverter,
} from "./commands";

const DEFAULT_PROXY_ADMIN = "0x7877fFd62649b6A1557B55D4c20fcBaB17344C91";
const RISK_FUND_PROXY = "0x487CeF72dacABD7E12e633bb3B63815a386f7012";
const RISK_FUND_V2_IMPLEMENTATION = "0x217a907B0c6a7Dc67a21F769a915722B98136F82";

const PROTOCOL_SHARE_RESERVE_PROXY = "0x25c7c7D6Bf710949fD7f03364E9BA19a1b3c10E3";
const PROTOCOL_SHARE_RESERVE_NEW_IMPLEMENTATION = "0x194777360f9DFAA147F462349E9bC9002F72b0EE";

const VTREASURY = "0x8b293600C50D6fbdc6Ed4251cc75ECe29880276f";
const XVS_VAULT_TREASURY = "0xab79995b1154433C9652393B7BF3aeb65C2573Bd";

export const vipConverter2 = () => {
  const meta = {
    version: "v2",
    title:
      "VIP-converter2 Upgrades the implementation of RiskFund and ProtocolShareReserve with Adding of converts in ConverterNetwork and vice versa. It also sets conversion configs for the converters",
    description: `
    Gives call permissions to timelock
    Upgrade the implementation of riskfund to riskfund V2
    sets RiskFundConverter in RiskFundV2
    Upgrade the implementation of ProtocolShareReserve and update the distributionConfigs
    update destination address to Riskfund in RiskFundConverter
    Add Converters in ConverterNetwork
    Add ConverterNetwork in Converters
    Sets Conversion configs for the following converters:-
    1. RiskFundConverter
    2. USDTPrimeConverter
    3. USDCPrimeConverter
    4. BTCBPrimeConverter
    5. ETHPrimeConverter
    6. XVSVaultConverter`,

    forDescription: "Execute this proposal",
    againstDescription: "Do not execute this proposal",
    abstainDescription: "Indifferent to execution",
  };

  return makeProposal(
    [
      grant(RISK_FUND_CONVERTER, "setPoolsAssetsDirectTransfer(address[],address[][],bool[][])", NORMAL_TIMELOCK),
      grant(RISK_FUND_CONVERTER, "setPoolsAssetsDirectTransfer(address[],address[][],bool[][])", FAST_TRACK_TIMELOCK),
      grant(RISK_FUND_CONVERTER, "setPoolsAssetsDirectTransfer(address[],address[][],bool[][])", CRITICAL_TIMELOCK),

      grant(CONVERTER_NETWORK, "addTokenConverter(address)", NORMAL_TIMELOCK),
      grant(CONVERTER_NETWORK, "addTokenConverter(address)", FAST_TRACK_TIMELOCK),
      grant(CONVERTER_NETWORK, "addTokenConverter(address)", CRITICAL_TIMELOCK),

      grant(CONVERTER_NETWORK, "removeTokenConverter(address)", NORMAL_TIMELOCK),
      grant(CONVERTER_NETWORK, "removeTokenConverter(address)", FAST_TRACK_TIMELOCK),
      grant(CONVERTER_NETWORK, "removeTokenConverter(address)", CRITICAL_TIMELOCK),

      grant(XVS_VAULT_TREASURY, "fundXVSVault(uint256)", NORMAL_TIMELOCK),
      grant(XVS_VAULT_TREASURY, "fundXVSVault(uint256)", FAST_TRACK_TIMELOCK),
      grant(XVS_VAULT_TREASURY, "fundXVSVault(uint256)", CRITICAL_TIMELOCK),
      {
        target: DEFAULT_PROXY_ADMIN,
        signature: "upgrade(address,address)",
        params: [RISK_FUND_PROXY, RISK_FUND_V2_IMPLEMENTATION],
      },
      {
        target: RISK_FUND_PROXY,
        signature: "setRiskFundConverter(address)",
        params: [RISK_FUND_CONVERTER],
      },
      {
        target: PROTOCOL_SHARE_RESERVE_PROXY,
        signature: "addOrUpdateDistributionConfigs((uint8,uint8,address)[])", // set to 0 every percentage, to allow us to remove them in the next command
        params: [
          [
            [0, 0, RISK_FUND_PROXY],
            [0, 0, VTREASURY],
            [1, 0, RISK_FUND_PROXY],
            [1, 0, VTREASURY],
          ],
        ],
      },
      {
        target: PROTOCOL_SHARE_RESERVE_PROXY,
        signature: "removeDistributionConfig(uint8,address)", // schema 0
        params: [0, RISK_FUND_PROXY],
      },
      {
        target: PROTOCOL_SHARE_RESERVE_PROXY,
        signature: "removeDistributionConfig(uint8,address)", // schema 0
        params: [0, VTREASURY],
      },
      {
        target: PROTOCOL_SHARE_RESERVE_PROXY,
        signature: "removeDistributionConfig(uint8,address)", // schema 1
        params: [1, RISK_FUND_PROXY],
      },
      {
        target: PROTOCOL_SHARE_RESERVE_PROXY,
        signature: "removeDistributionConfig(uint8,address)", // schema 1
        params: [1, VTREASURY],
      },
      {
        target: DEFAULT_PROXY_ADMIN,
        signature: "upgrade(address,address)",
        params: [PROTOCOL_SHARE_RESERVE_PROXY, PROTOCOL_SHARE_RESERVE_NEW_IMPLEMENTATION],
      },
      {
        target: PROTOCOL_SHARE_RESERVE_PROXY,
        signature: "addOrUpdateDistributionConfigs((uint8,uint16,address)[])",
        params: [
          [
            [0, 4000, RISK_FUND_CONVERTER],
            [0, 4000, VTREASURY],
            [0, 1000, XVS_VAULT_CONVERTER],
            [0, 192, USDC_PRIME_CONVERTER],
            [0, 420, USDT_PRIME_CONVERTER],
            [0, 177, BTCB_PRIME_CONVERTER],
            [0, 211, ETH_PRIME_CONVERTER],
            [1, 5000, RISK_FUND_CONVERTER],
            [1, 4000, VTREASURY],
            [1, 1000, XVS_VAULT_CONVERTER],
          ],
        ],
      },
      ...converterCommands,
      {
        target: RISK_FUND_CONVERTER,
        signature: "setConversionConfigs(address,address[],(uint256,uint8)[])",
        params: [BaseAssets[0], RiskFundConverterTokenOuts, incentiveAndAccessibilityForRiskFundConverter],
      },
      {
        target: USDT_PRIME_CONVERTER,
        signature: "setConversionConfigs(address,address[],(uint256,uint8)[])",
        params: [BaseAssets[1], USDTPrimeConverterTokenOuts, incentiveAndAccessibilityForUSDTPrimeConverter],
      },
      {
        target: USDC_PRIME_CONVERTER,
        signature: "setConversionConfigs(address,address[],(uint256,uint8)[])",
        params: [BaseAssets[2], USDCPrimeConverterTokenOuts, incentiveAndAccessibilityForUSDCPrimeConverter],
      },
      {
        target: BTCB_PRIME_CONVERTER,
        signature: "setConversionConfigs(address,address[],(uint256,uint8)[])",
        params: [BaseAssets[3], BTCBPrimeConverterTokenOuts, incentiveAndAccessibilityForBTCBPrimeConverter],
      },
      {
        target: ETH_PRIME_CONVERTER,
        signature: "setConversionConfigs(address,address[],(uint256,uint8)[])",
        params: [BaseAssets[4], ETHPrimeConverterTokenOuts, incentiveAndAccessibilityForETHPrimeConverter],
      },
      {
        target: XVS_VAULT_CONVERTER,
        signature: "setConversionConfigs(address,address[],(uint256,uint8)[])",
        params: [BaseAssets[5], XVSVaultConverterTokenOuts, incentiveAndAccessibilityForXVSVaultConverter],
      },
    ],
    meta,
    ProposalType.REGULAR,
  );
};
