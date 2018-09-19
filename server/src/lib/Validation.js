const Joi = require('joi');

const validPassword = Joi.extend((joi) => ({
  base: joi.string(),
  name: 'string',
  language: {
    error: 'username can not in to password'
  },
  rules: [
    {
      name: 'validPassword',
      validate(params, value, state, options) {
        const userName = state.parent.userNames;
        let sumLetter = '';
        let isValid = true;

        userName.split('').map((item, index) => {
          if (userName.charCodeAt(index) >= 65 && userName.charCodeAt(index) <= 90 
          || userName.charCodeAt(index) >= 97 && userName.charCodeAt(index) <= 122) {
            sumLetter += item;
          } else {
            sumLetter += ' ';
          }
        });
        
        sumLetter.split(' ').map(item => {
          isValid = value.includes(item);
        });

        if (isValid) {
          return this.createError('string.error', { v: value }, state, options);
        }
      }
    }
  ]
}));

module.exports = {
  request: {
    body: {
      names: Joi.string().options({
        language: {
          string: {
            base: 'must be a string'
          }
        }
      }),
      ages: Joi.number().min(18).max(25).required().options({
        language: {
          number: {
            base: 'must be a number',
            min: 'must be larger than or equal to {{limit}}',
            max: 'must be less than or equal to {{limit}}'
          }
        }
      }),
      passwords: validPassword.string().validPassword(),
      userNames: Joi.string().alphanum().min(3).max(30).required(),
      levels: Joi.number().min(3).max(30).required()
    }
  }
};