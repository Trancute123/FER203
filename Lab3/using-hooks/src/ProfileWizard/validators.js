export const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passRe = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export function validateAbout(a) {
  return Boolean(a.firstName.trim() && a.lastName.trim() && emailRe.test(a.email));
}
export function validateAccount(a) {
  return Boolean(
    a.username.trim().length >= 6 &&
    passRe.test(a.password) &&
    a.confirm === a.password &&
    a.question && a.answer.trim()
  );
}
export function validateAddress(a) {
  return Boolean(a.streetName.trim() && a.streetNumber.trim() && a.city.trim() && a.country);
}
