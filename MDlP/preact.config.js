let path = require('path')

export default (config, env, helpers) => {
  delete config.entry.polyfills;
 
  config.resolve.alias['preact-cli-entrypoint'] = path.resolve('./src/index.jsx')

  config.output.filename = "[name].js";

  let { plugin } = helpers.getPluginsByName(config, "ExtractTextPlugin")[0];
  plugin.options.disable = true;

  if (env.production) {
    config.output.libraryTarget = "umd";
  }
};
