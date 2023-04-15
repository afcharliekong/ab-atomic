const { types } = require("@algo-builder/web");
const { convert } = require("@algo-builder/algob");

async function run(runtimeEnv, deployer) {
  const deployerAcc = deployer.accountsByName.get("deployer");
  const appName = "myApp";
	const appInfo = deployer.getApp(appName);

	// call app
	const txGroup = [
    {
      type: types.TransactionType.CallApp,
      sign: types.SignType.SecretKey,
      fromAccount: deployerAcc,
      appID: appInfo.appID,
      payFlags: {},
      appArgs: [convert.stringToBytes("approve"), convert.stringToBytes("nonce1")]
    },
    {
      type: types.TransactionType.CallApp,
      sign: types.SignType.SecretKey,
      fromAccount: deployerAcc,
      appID: appInfo.appID,
      payFlags: {},
      appArgs: [convert.stringToBytes("approve"), convert.stringToBytes("nonce2")]
    }
  ];

	await deployer.executeTx(txGroup);
}

module.exports = { default: run };
