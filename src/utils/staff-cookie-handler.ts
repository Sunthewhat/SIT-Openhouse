import cookie from 'js-cookie';

const staffCookieHandler = {
  setCred: (value: string) => {
    cookie.set('staff_cred', value, {
      expires: 1,
    });
  },

  getCred: () => {
    try {
      return cookie.get('staff_cred');
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  isCredExist: () => {
    return !!cookie.get('staff_cred');
  },
};

export { staffCookieHandler };
