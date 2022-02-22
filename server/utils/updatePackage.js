const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// function for updating our npm packages according to the end user's need
function updatePackageJson(filePath) {
  try {
    // read the passed in package.json file
    const data = fs.readFileSync(filePath, 'utf8');
    // get the dependencies and devdependencies object
    const { dependencies, devDependencies } = JSON.parse(data);

    // read our own package.json file
    const currFile = fs.readFileSync(path.resolve('./package.json'), 'utf-8');
    // turn it into an object
    const parsedCurrFile = JSON.parse(currFile);

    // get all the keys of the previously defined objects
    const dependenciesArr = Object.keys(dependencies);
    const devDependenciesArr = Object.keys(devDependencies);
    const currDependencies = Object.keys(parsedCurrFile.dependencies);
    const currDevDependencies = Object.keys(parsedCurrFile.devDependencies);

    // get all the npm packges under dependencies that are in user's package.json file but not in ours  
    const newDependencies = dependenciesArr.filter(item => {
      if (!currDependencies.includes(item)) return item;
    });

    // get all the npm packges under devDependencies that are in user's package.json file but not in ours 
    const newDevDependencies = devDependenciesArr.filter(item => {
      if (!currDevDependencies.includes(item)) return item;
    });

    // create the terminal command to install all of the missing dependencies/devDependencies
    const npmInstallStr = 'npm install ' + newDependencies.join(' ');
    const npmDevInstallStr = 'npm install -D ' + newDevDependencies.join(' ');

    // execute the commands
    exec(npmInstallStr);
    exec(npmDevInstallStr);

  } catch (err) {
    console.error(err);
  }
  return;
}

module.exports = {
  updatePackageJson
};