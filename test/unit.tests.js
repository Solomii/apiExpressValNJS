process.env.NODE_ENV = 'test';
const assert = require('assert');
// const expect = require('expect')
const { encryptPassword } = require('../app');


const bcrypt = require('bcrypt');

describe('encryptPassword',  () => {
  it('encrypted password should start with $2b$10$', async () => {
    let encrypedPassword = await encryptPassword("12345")
    assert.match(encrypedPassword, /\$2b\$10\$/);
  });
});


