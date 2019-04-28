const dataFolder = './data/';
const fs = require('fs');
const compiler = require('../scripts/compiler');

const getFilesList = (dir) => {
    let files = [];

    return new Promise(function (resolve, reject) {
        fs.readdirSync(dir).forEach(folder => {
            fs.readdirSync(dir + folder).forEach(file => {
                files.push({ category: folder, filePath: dir + folder + '/' + file });
            });
        });

        resolve(files);
    });
}

const getContents = (fileName) => {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, 'utf8', (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}

const readData = async () => {
    let data = {};

    const files = await getFilesList(dataFolder);

    for (var i = 0; i < files.length; i++) {
        const filePath = files[i].filePath;
        const fileCategory = files[i].category;
        const content = await getContents(filePath);
        const compiledResult = compiler(content);

        if (!data[fileCategory]) {
            data[fileCategory] = [];
        }

        data[fileCategory].push(compiledResult);
    }

    return data;
}

module.exports = readData;