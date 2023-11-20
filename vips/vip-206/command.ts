import users from "./users";

const PRIME = "0xBbCD063efE506c3D42a0Fa2dB5C08430288C71FC";

const addresses: any = [];
const stakedAt: any = [];
const finalUsers = {
  ...users.stakeUsers,
  ...users.unstakeUsers,
}

const buildList = () => {
  for (const address in finalUsers) {
    addresses.push(address);
    stakedAt.push(finalUsers[address]);
  }
};

buildList();

export default {
  target: PRIME,
  signature: "setStakedAt(address[],uint256[])",
  params: [addresses, stakedAt],
};
