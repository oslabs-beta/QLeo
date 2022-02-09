const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

function updatePackageJson(filePath) {
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const { dependencies, devDependencies } = JSON.parse(data);

    const currFile = fs.readFileSync(path.resolve('./package.json'), 'utf-8');
    const parsedCurrFile = JSON.parse(currFile);

    const dependenciesArr = Object.keys(dependencies);
    const devDependenciesArr = Object.keys(devDependencies);
    const currDependencies = Object.keys(parsedCurrFile.dependencies);
    const currDevDependencies = Object.keys(parsedCurrFile.devDependencies);

    const newDependencies = dependenciesArr.filter(item => {
      if (!currDependencies.includes(item)) return item;
    });

    const newDevDependencies = devDependenciesArr.filter(item => {
      if (!currDevDependencies.includes(item)) return item;
    });

    const npmInstallStr = 'npm install ' + newDependencies.join(' ');
    const npmDevInstallStr = 'npm install -D ' + newDevDependencies.join(' ');

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