const fs = require('fs');

// function closure() {
//   const underlyingPath = module.paths.slice(0,3);
//   return function customizedRequire(filePath) {
//     module.paths = underlyingPath.concat(module.paths);
//     console.log(module.paths);
//     console.log(filePath);
//     if (filePath[0] !== '.' && filePath[0] !== '/') {
//       console.log('i am here');
//       const requiredModule = require(filePath);
//       return requiredModule;
//     }
//     console.log('i am there');
//     const requiredModule = require(filePath);
//     return requiredModule;
//   };
// }

// const customizedRequire = closure();

// function injectRequire(filePath) {
//   if (filePath[0] !== '.' && filePath[0] !== '/') return customizedRequire(filePath);
//   console.log(filePath);
//   const newPath = require.resolve(filePath);

//   const data = fs.readFileSync(newPath, 'utf8');

//   const thisPath = module.filename;
//   // console.log(thisPath);
//   const injection = `const injectRequire = require('${thisPath}');\n`;
//   const modifyData = data.replaceAll('require(', 'injectRequire(');
//   const newData = injection + modifyData;
//   fs.writeFileSync(newPath, newData);
//   const requiredModule = customizedRequire(newPath);
//   console.log('I am there twice');
//   fs.writeFileSync(newPath, data);
//   return requiredModule;
// }


const underlyingPath = module.paths.slice(0,3);

function injectRequire(filePath) {
  // if it is not a relative path/absolute path, require and return the module
  if (filePath[0] !== '.' && filePath[0] !== '/') {
    console.log(filePath, require.resolve(filePath));
    const module = require(filePath);
    return module;
  }

  // get the absolute file path
  const newPath = require.resolve(filePath);

  // read the file and store it's content in data
  const data = fs.readFileSync(newPath, 'utf8');

  // create the injections lines 
  const createPath = `const underlyingPath = ['${underlyingPath[0]}', '${underlyingPath[1]}', '${underlyingPath[2]}']; \n`;
  const addPathToModule = 'module.paths = underlyingPath.concat(module.paths); \n';
  const injectFunction = `const fs = require('fs'); \n${injectRequire} \n`;
  const modifyData = data.replaceAll('require(', 'injectRequire(');

  // update the file with the injection lines attach at the beginning
  const newData = createPath + addPathToModule + injectFunction + modifyData;
  fs.writeFileSync(newPath, newData);

  // require the updated file 
  const requiredModule = require(newPath);

  // revert the changes made to the file
  fs.writeFileSync(newPath, data);

  // return the required file
  return requiredModule;
}

module.exports = {
  injectRequire
};