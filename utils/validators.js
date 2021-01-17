module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  if(username.trim() === '') {
    errors.username = 'Username is required';
  }
  if(email.trim() === '') {
    errors.email = 'Email is required';
  } else {
    const regEx = /^([0-9A-Z]([-.\w]*[0-9A-Z])*@([0-9A-Z][-\w]*[0-9A-Z]\.)+[A-Z]{2,9})$/i;
    if(!email.match(regEx)){
      errors.email = 'Email is invalid';
    }
  }
  if(password === '') {
    errors.password = 'Password is required'
  } else if (password !== confirmPassword){
    errors.confirmPassword = "Passwords don't match"
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0
  }
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username is required';
  }
  if (password === '') {
    errors.password = 'Password is required';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0
  }
}