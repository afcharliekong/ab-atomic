const { types } = require("@algo-builder/web");
const { convert } = require("@algo-builder/algob");

async function run(runtimeEnv, deployer) {
  const deployerAcc = deployer.accountsByName.get("deployer");
  const appName = "myApp";
  const approvalProgramFilename = "approval.py";
  const clearProgramFilename = "clearstate.py";
  const MIN_TXN_FEE = 1000;

  // deploy app
  await deployer.deployApp(
    deployerAcc,
    {
      approvalProgramFilename,
      clearProgramFilename,
      metaType: types.MetaType.FILE,
      appName,
      localInts: 0,
      localBytes: 0,
      globalInts: 0,
      globalBytes: 2,
      appArgs: [convert.stringToBytes("test")],
      accounts: [deployerAcc.addr]
    },
    {
      totalFee: MIN_TXN_FEE,
    }
  );
}

module.exports = { default: run };

