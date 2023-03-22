import chai from 'chai';

import searchSelector from '../../searchSelector';

describe('serchSelector test', function () {
  it('ID無し、フィルター無し', function () {
    const text = `
    <div class="hogehoge js-hoge"></div>
    <div id="abc" class="hogehoge js-hoge"></div>
    `;

    const isIncludeId = false;
    const excludeRegex = '';

    const result = searchSelector({ text, isIncludeId, excludeRegex });
    const expectArray = ['.hogehoge', '.js-hoge'];

    chai.expect(result).to.eql(expectArray);
  });

  it('ID有り、フィルター無し', function () {
    const text = `
    <div class="hogehoge js-hoge"></div>
    <div id="abc" class="hogehoge js-hoge"></div>
    `;

    const isIncludeId = true;
    const excludeRegex = '';

    const result = searchSelector({ text, isIncludeId, excludeRegex });
    const expectArray = ['.hogehoge', '.js-hoge', '#abc'];

    chai.expect(result).to.eql(expectArray);
  });

  it('ID有り、フィルター有り', function () {
    const text = `
    <div class="hogehoge js-hoge is-abc"></div>
    <div id="abc" class="hogehoge js-hoge"></div>
    `;

    const isIncludeId = true;
    const excludeRegex = '.js-|.is-';

    const result = searchSelector({ text, isIncludeId, excludeRegex });
    const expectArray = ['.hogehoge', '#abc'];

    chai.expect(result).to.eql(expectArray);
  });

  it('空', function () {
    const text = `
    <div ></div>
    <div ></div>
    `;

    const isIncludeId = true;
    const excludeRegex = '.js-|.is-';

    const result = searchSelector({ text, isIncludeId, excludeRegex });
    const expectArray: string[] = [];

    chai.expect(result).to.eql(expectArray);
  });
});
