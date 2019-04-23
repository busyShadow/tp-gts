// tp-gts/gulpfile.ts/index.ts
import * as _ from 'lodash'

function taskTest(cb) {
  let str = 'hello typescript gulp!';
  str = _.capitalize(str);
  console.log(`${str}`);
  cb();
};

export { taskTest as default };