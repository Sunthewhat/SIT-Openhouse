import cookie from 'js-cookie';

const workshopCookieHandler = {
  setPDPA: (value: boolean) => {
    cookie.set('PDPA', value.toString(), {
      expires: 1,
    });
  },

  getPDPA: () => {
    try {
      return cookie.get('PDPA') === 'true';
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};

export { workshopCookieHandler };
