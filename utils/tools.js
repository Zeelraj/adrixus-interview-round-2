const ContactPattern = /[6-9][0-9]{9}/;
const EmailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

exports.isValidContact = (contact) => {
  if (!contact) {
    return false;
  }
  if (contact.length !== 10) {
    return false;
  }
  return ContactPattern.test(contact);
};

exports.isValidEmail = (email) => {
  if (!email) {
    return false;
  }
  return EmailPattern.test(String(email).toLowerCase());
};
