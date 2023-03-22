import _assert from 'assert';

import setCssSelectors from '../../setCssSelectors';

describe('serchSelector test', function () {
  it('空', function () {
    const classes: string[] = [];
    const insertString: string[] = [];

    const result = setCssSelectors({ classes, insertString });
    const expect = ``;
    _assert.equal(result, expect);
  });
  it('idとclass,挿入無し', function () {
    const classes: string[] = ['.p-abc', '#body'];
    const insertString: string[] = [];

    const result = setCssSelectors({ classes, insertString });
    const expect = `.p-abc {

}

#body {

}

`;
    _assert.equal(result, expect);
  });

  it('idとclass,挿入あり', function () {
    const classes: string[] = ['.p-abc', '#body', '.p-xxx'];
    const insertString: string[] = ['  @include pc() {', '', '  }'];

    const result = setCssSelectors({ classes, insertString });
    const expect = `.p-abc {
  @include pc() {

  }
}

#body {
  @include pc() {

  }
}

.p-xxx {
  @include pc() {

  }
}

`;
    _assert.equal(result, expect);
  });
});
