var grunt = require('grunt');
var fs = require('fs');

exports['grunt-dust-compiler'] = {
  setUp: function(done) {
    done();
  },
  'main': function(test) {
    test.expect(1);

    var actual = fs.readdirSync('tmp/').sort();
    var expected = fs.readdirSync('test/expected/').sort();

    test.deepEqual(expected, actual, 'should compile several dust files');
    test.done();
  }
};