const path = require("path");
const vueSrc = "./src";

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // Needed to use SCSS tokens
        additionalData: `
          @import "~@nosto/design-system/dist/system/all.scss";
        `
      }
    }
  },
  configureWebpack: {  
    resolve: {  
      alias: {  
        "@": path.resolve(__dirname, vueSrc)
      },
      extensions: ['.js', '.vue', '.json']
    },  
}
};