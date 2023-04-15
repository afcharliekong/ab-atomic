const { convert } = require("@algo-builder/algob");
const { types } = require("@algo-builder/web");
const algosdk = require("algosdk");

const MIN_TXN_FEE = algosdk.ALGORAND_MIN_TX_FEE;

const deployContract = (appName, approvalProgramFilename, clearProgramFilename, adminAddr, pkey) => {
    //convert base64 public key to bytes
    pkey_bytes = new Uint8Array(Buffer.from(pkey, "base64"));

    return {
        approvalProgramFilename,
        clearProgramFilename,
        metaType: types.MetaType.FILE,
        appName,
        localInts: 0,
        localBytes: 0,
        globalInts: 0,
        globalBytes: 4,
        appArgs: [pkey_bytes],
        accounts: [adminAddr],
    }
};

const transferAlgos = (fromAccount, toAccountAddr, amountMicroAlgos) => {
    return {
        type: types.TransactionType.TransferAlgo,
        sign: types.SignType.SecretKey,
        fromAccount,
        toAccountAddr,
        amountMicroAlgos,
        payFlags: { totalFee: MIN_TXN_FEE },
    }
}

const noop = (fromAccount, appID, txnnote) => {
    return {
        type: types.TransactionType.CallApp,
        sign: types.SignType.SecretKey,
        fromAccount,
        appID,
        appArgs: [convert.stringToBytes("OpcodeCost"), convert.stringToBytes(txnnote)],
        payFlags: { totalFee: MIN_TXN_FEE }
    }
}

const createCert = (appID, fromAccount, metadataURL, signedMetadataURL, courseName) => {
    return {
        type: types.TransactionType.CallApp,
        sign: types.SignType.SecretKey,
        fromAccount,
        appID,
        appArgs: [
            convert.stringToBytes("CreateCert"),
            convert.stringToBytes(metadataURL),
            signedMetadataURL,
            convert.stringToBytes(courseName)
        ],
        payFlags: { totalFee: MIN_TXN_FEE },
    }
};


const updateAdmin = (appID, fromAccount, adminAddr) => {
    return {
        type: types.TransactionType.CallApp,
        sign: types.SignType.SecretKey,
        fromAccount,
        appID,
        appArgs: [convert.stringToBytes("UpdateAdmin")],
        accounts: [adminAddr],
        payFlags: { totalFee: MIN_TXN_FEE },
    };
};

const updatePkey = (appID, fromAccount, pkey) => {
    //convert base64 public key to bytes
    pkey_bytes = new Uint8Array(Buffer.from(pkey, "base64"));

    return {
        type: types.TransactionType.CallApp,
        sign: types.SignType.SecretKey,
        fromAccount,
        appID,
        appArgs: [convert.stringToBytes("UpdatePkey"), pkey_bytes],
        payFlags: { totalFee: MIN_TXN_FEE },
    };
};

const optIntoAsset = (fromAccount, assetID) => {
    return {
        type: types.TransactionType.OptInASA,
        sign: types.SignType.SecretKey,
        fromAccount,
        assetID,
        payFlags: { totalFee: MIN_TXN_FEE },
    };
}

const issueCert = (appID, fromAccount, assetID) => {
    return {
        type: types.TransactionType.CallApp,
        sign: types.SignType.SecretKey,
        fromAccount,
        appID,
        foreignAssets: [assetID],
        appArgs: [convert.stringToBytes("IssueCert")],
        payFlags: { totalFee: MIN_TXN_FEE },
    };
};

module.exports = {
    deployContract,
    transferAlgos,
    noop,
    createCert,
    updateAdmin,
    updatePkey,
    optIntoAsset,
    issueCert
};