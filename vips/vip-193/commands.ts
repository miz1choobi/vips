const PRIME_LIQUIDITY_PROVIDER = "0xce20cACeF98DC03b2e30cD63b7B56B018d171E9c";

const ETH ="0x98f7A83361F7Ac8765CcEBAB1425da6b341958a7";
const BTC = "0xA808e341e8e723DC6BA0Bb5204Bafc2330d7B8e4";
const USDC = "0x16227D60f7a0e586C66B005219dfc887D13C9531";
const USDT = "0xA11c8D9DC9b66E209Ef60F0C8D969D3CD988782c";


export default [
  {
    target: PRIME_LIQUIDITY_PROVIDER,
    signature: "setTokensDistributionSpeed(address[],uint256[])",
    params: [[
      ETH,
      BTC,
      USDC,
      USDT
    ], [
      100,
      10,
      10,
      10
    ]],
  },
]