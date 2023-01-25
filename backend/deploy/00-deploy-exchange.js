module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;
  const CRYPTODEVS_TOKEN_CONTRACT = process.env.CRYPTODEVS_TOKEN_CONTRACT;

  const exchange = await deploy("Exchange", {
    from: deployer,
    log: true,
    args: [CRYPTODEVS_TOKEN_CONTRACT],
  });

  log("--------------------------------------");
};

module.exports.tags = ["all"];
