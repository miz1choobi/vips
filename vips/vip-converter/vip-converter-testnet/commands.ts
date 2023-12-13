import {
  ACM,
  BTCBPrimeConverterTokenOuts,
  BaseAssets,
  CONVERTER_NETWORK,
  ETHPrimeConverterTokenOuts,
  GUARDIAN,
  RiskFundConverterTokenOuts,
  TimelocksArray,
  USDCPrimeConverterTokenOuts,
  USDTPrimeConverterTokenOuts,
  XVSVaultConverterTokenOuts,
  converters,
} from "./Addresses";

type IncentiveAndAccessibility = [number, number];

interface AcceptOwnership {
  target: string;
  signature: string;
  params: [];
}

interface AddTokenConverter {
  target: string;
  signature: string;
  params: [string];
}

interface AddConverterNetwork {
  target: string;
  signature: string;
  params: [string];
}

interface CallPermission {
  target: string;
  signature: string;
  params: [string, string, string];
}

export const grant = (target: string, signature: string, caller: string): CallPermission => {
  const config: CallPermission = {
    target: ACM,
    signature: "giveCallPermission(address,string,address)",
    params: [target, signature, caller],
  };

  return config;
};

function getIncentiveAndAccessibility(tokenIn: string, tokenOut: string): IncentiveAndAccessibility {
  const validTokenIns = [BaseAssets[2], BaseAssets[3], BaseAssets[4], BaseAssets[5]];

  if (validTokenIns.includes(tokenIn) && tokenOut === BaseAssets[0]) {
    return [0, 2];
  } else {
    return [0, 1];
  }
}

function generateAcceptOwnershipCommands(ConvertersArray: string[]): AcceptOwnership[] {
  const acceptOwnershipCommandsArray: AcceptOwnership[] = [];

  for (const converter of ConvertersArray) {
    const config: AcceptOwnership = {
      target: converter,
      signature: "acceptOwnership()",
      params: [],
    };

    acceptOwnershipCommandsArray.push(config);
  }

  return acceptOwnershipCommandsArray;
}

function generateAddTokenConverterCommands(ConvertersArray: string[]): AddTokenConverter[] {
  const addTokenConverterCommandsArray: AddTokenConverter[] = [];

  for (const converter of ConvertersArray) {
    const config: AddTokenConverter = {
      target: CONVERTER_NETWORK,
      signature: "addTokenConverter(address)",
      params: [converter],
    };

    addTokenConverterCommandsArray.push(config);
  }
  return addTokenConverterCommandsArray;
}

function generateAddConverterNetworkCommands(ConvertersArray: string[]): AddConverterNetwork[] {
  const addConverterNetworkCommandsArray: AddConverterNetwork[] = [];

  for (const converter of ConvertersArray) {
    const config: AddConverterNetwork = {
      target: converter,
      signature: "setConverterNetwork(address)",
      params: [CONVERTER_NETWORK],
    };

    addConverterNetworkCommandsArray.push(config);
  }
  return addConverterNetworkCommandsArray;
}

function generateCallPermissionCommands(ConvertersArray: string[]): CallPermission[] {
  const callPermissionCommandsArray: CallPermission[] = [];

  for (const converter of ConvertersArray) {
    for (let i = 0; i < 3; i++) {
      const config1 = grant(converter, "setConversionConfig(address,address,ConversionConfig)", TimelocksArray[i]);
      const config2 = grant(converter, "pauseConversion()", TimelocksArray[i]);
      const config3 = grant(converter, "resumeConversion()", TimelocksArray[i]);
      const config4 = grant(converter, "setMinAmountToConvert(uint256)", TimelocksArray[i]);

      callPermissionCommandsArray.push(config1);
      callPermissionCommandsArray.push(config2);
      callPermissionCommandsArray.push(config3);
      callPermissionCommandsArray.push(config4);
    }

    const config = grant(converter, "pauseConversion()", GUARDIAN);
    callPermissionCommandsArray.push(config);
  }
  return callPermissionCommandsArray;
}

export const incentiveAndAccessibilityForRiskFundConverter: IncentiveAndAccessibility[] = [];
export const incentiveAndAccessibilityForUSDTPrimeConverter: IncentiveAndAccessibility[] = [];
export const incentiveAndAccessibilityForUSDCPrimeConverter: IncentiveAndAccessibility[] = [];
export const incentiveAndAccessibilityForBTCBPrimeConverter: IncentiveAndAccessibility[] = [];
export const incentiveAndAccessibilityForETHPrimeConverter: IncentiveAndAccessibility[] = [];
export const incentiveAndAccessibilityForXVSVaultConverter: IncentiveAndAccessibility[] = [];

for (let i = 0; i < RiskFundConverterTokenOuts.length; i++) {
  incentiveAndAccessibilityForRiskFundConverter.push(
    getIncentiveAndAccessibility(BaseAssets[0], RiskFundConverterTokenOuts[i]),
  );
  incentiveAndAccessibilityForUSDTPrimeConverter.push(
    getIncentiveAndAccessibility(BaseAssets[1], USDTPrimeConverterTokenOuts[i]),
  );
  incentiveAndAccessibilityForUSDCPrimeConverter.push(
    getIncentiveAndAccessibility(BaseAssets[2], USDCPrimeConverterTokenOuts[i]),
  );
  incentiveAndAccessibilityForBTCBPrimeConverter.push(
    getIncentiveAndAccessibility(BaseAssets[3], BTCBPrimeConverterTokenOuts[i]),
  );
  incentiveAndAccessibilityForETHPrimeConverter.push(
    getIncentiveAndAccessibility(BaseAssets[4], ETHPrimeConverterTokenOuts[i]),
  );
  incentiveAndAccessibilityForXVSVaultConverter.push(
    getIncentiveAndAccessibility(BaseAssets[5], XVSVaultConverterTokenOuts[i]),
  );
}

export const acceptOwnershipCommandsAllConverters: AcceptOwnership[] = generateAcceptOwnershipCommands(converters);

export const addTokenConverterCommandsAllConverters: AddTokenConverter[] =
  generateAddTokenConverterCommands(converters);

export const addConverterNetworkCommandsAllConverters: AddConverterNetwork[] =
  generateAddConverterNetworkCommands(converters);

export const callPermissionCommandsAllConverter: CallPermission[] = generateCallPermissionCommands(converters);
