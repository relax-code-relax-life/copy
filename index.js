const glob = require('glob');
const path = require('path');
const utils = require('relax-utils');
const fs = require('fs')

const copy = function (patterns, dest, {cwd} = {}) {
    cwd = path.resolve(cwd || '');
    const opt = {
        cwd,
        absolute: true
    }

    if (!Array.isArray(patterns)) {
        patterns = [patterns + '']
    }

    let files = patterns.map((pattern) => glob.sync(pattern, opt))
        .reduce((files, cur) => files.concat(cur));

    files = utils.uniq(files)


    dest = path.resolve(cwd, dest);

    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }

    files.forEach((src) => {
        const filename = path.basename(src);
        const to = path.join(dest, filename);
        fs.copyFileSync(src, to);
    })
}

module.exports = copy;