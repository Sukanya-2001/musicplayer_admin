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
  album: {
    add: "admin/album/create",
    edit: "admin/album/album-field-update",
    delete: "admin/album/delete-album",
    get: "admin/album/get-albums",
    change_status: "admin/album/album-status-update",
    getAlbumInfo: "admin/album/get-album-info"
  },
  song: {
    add: "admin/song/create",
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
  endpoints.artist.delete,
  endpoints.artist.change_status,

  endpoints.album.add,
  endpoints.album.edit,
  endpoints.album.delete,
  endpoints.album.change_status,
  
];
