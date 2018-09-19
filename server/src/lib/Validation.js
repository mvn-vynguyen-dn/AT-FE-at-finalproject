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
        const userName = state.parent.userName;
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
      name: Joi.string().alphanum().min(3).max(25).required().options({
        language: {
          string: {
            base: 'must be a string',
            alphanum: 'must only contain alpha-numeric characters',
            min: 'must be large than or equal to {{limit}}',
            max: 'must be less than or equal to {{limit}}'
          }
        }
      }),
      userName: Joi.string().min(5).max(20).required().options({
        language: {
          string: {
            base: 'must be a string',
            min: 'must be larger than or equal to {{limit}}',
            max: 'must be less than or equal to {{limit}}'
          }
        }
      }),
      role: Joi.number().required().options({
        language: {
          number: {
            base: 'must be a number',
          }
        }
      }),
      password: validPassword.string().min(8).max(20).validPassword().options({
        language: {
          string: {
            base: 'must be a string',
            min: 'must be larger than or equal to {{limit}}',
            max: 'must be less than or equal to {{limit}}'
          }
        }
      }),
    }
  }
};
