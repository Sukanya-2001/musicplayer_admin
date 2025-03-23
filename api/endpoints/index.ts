export const baseUrl = process.env.NEXT_APP_BASE_URL;
export const baseUrlApi = `${process.env.NEXT_APP_BASE_URL}/`;
export const baseUrlMedia = process.env.NEXT_APP_BASE_URL;

// api doc => https://militarymoves-admin.dedicateddevelopers.us/apidoc

export const mediaUrl = (url: string) => {
  return `${baseUrlMedia}/uploads/${url}`;
};

export const endpoints = {
  auth: {
    login: "user/login",
    forgotEmail: "",
    otpValidation: "",
    resetPassword: "",

    signup: "user/existence",
    signUpProfile: "user/signup",
    profileDetails: "user/profile/get",
    profileUpdate: "user/profile/update"
  },
  artist: {
    add: "admin/artist/create",
    edit: "admin/artist/artist-field-update",
    delete: "admin/artist/delete-artist",
    get: "admin/artist/get-artists",
    change_status: "admin/artist/artist-status-update",
    getArtistInfo: "admin/artist/get-artist-info"
  },
  cms: {
    about: "aboutpolicy/details",
    faq: "faq/all"
  }
};

export const sucessNotificationEndPoints = [
  endpoints.auth.login,
  endpoints.auth.signUpProfile,
  endpoints.auth.login,
  endpoints.auth.profileUpdate,

  endpoints.artist.add,
  endpoints.artist.edit,
  endpoints.artist.delete
];
