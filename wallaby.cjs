module.exports = function (wallaby) {
    return {
      files: [
        "src/**/*.js"
      ],
  
      tests: [
        "test/models/*.js"
      ],
      testFramework: "mocha"
    };
  };
  