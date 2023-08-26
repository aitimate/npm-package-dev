
// 填写参数生成项目的package.json文件
(function () {
    generate("", "aitimate", "", "");
})();































































function generate(projectName, author, github, description) {
    const fs = require('fs');
    try {
        const updatedPackage = {
            "name": projectName,
            "version": "0.0.0-dev",
            "description": description,
            "exports": {
                ".": {
                    "import": {
                        "types": "./lib/esm/types/index.d.ts",
                        "default": "./lib/esm/index.mjs"
                    },
                    "require": {
                        "types": "./lib/cjs/types/index.d.ts",
                        "default": "./lib/cjs/index.js"
                    }
                }
            },
            "types": "./lib/cjs/types/index.d.ts",
            "main": "./lib/cjs/index.js",
            "files": [
                "lib/**/*"
            ],
            "scripts": {
                "clean": "del-cli ./lib",
                "build": "npm run clean && npm run build:esm && npm run build:cjs",
                "build:esm": "tsc -p ./configs/tsconfig.esm.json && move-file lib/esm/index.js lib/esm/index.mjs",
                "build:cjs": "tsc -p ./configs/tsconfig.cjs.json",
                "test": "mocha",
                "semantic-release": "semantic-release",
                "prepack": "npm run build"
            },
            "release": {
                "branches": [
                    "main"
                ]
            },
            "publishConfig": {
                "access": "public"
            },
            "repository": {
                "type": "git",
                "url": `${github}.git`
            },
            "keywords": [],
            "author": author,
            "license": "MIT",
            "bugs": {
                "url": `${github}/issues`
            },
            "homepage": `${github}#readme`,
            "devDependencies": {
                "@types/chai": "^4.3.3",
                "@types/mocha": "^9.1.1",
                "chai": "^4.3.6",
                "del-cli": "^5.0.0",
                "mocha": "^10.0.0",
                "move-file-cli": "^3.0.0",
                "semantic-release": "^19.0.3",
                "ts-node": "^10.9.1",
                "typescript": "^4.7.4"
            }
        };
        const updatedPackageJson = JSON.stringify(updatedPackage, null, 2);
        fs.writeFile('./package.json', updatedPackageJson, 'utf8', (err) => {
            if (err) {
                console.error('Error writing updated package.json:', err);
            } else {
                console.log('package.json updated successfully.');
            }
        });
    } catch (parseError) {
        console.error('Error parsing package.json:', parseError);
    }
}
