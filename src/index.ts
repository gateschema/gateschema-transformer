import enum_ from './keywords/enum';
import enumList_ from './keywords/enumList';
import length_ from './keywords/length';
import list_ from './keywords/list';
import map_ from './keywords/map';
import other_ from './keywords/other';
import switch_ from './keywords/switch';

import transformBase from './transformer';

const transformer: typeof transformBase = transformBase.extend({
  transformers: [enum_, enumList_, length_, list_, map_, other_, switch_]
});

export default transformer;
