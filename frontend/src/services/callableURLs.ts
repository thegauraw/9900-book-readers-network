const BASE_URL = 'http://127.0.0.1:5000';
export const getCollectionListApi = `https://australia-southeast1-daydayup-9900.cloudfunctions.net/rs/v1/get?col=collections`;
export const MyCollectionsURL = `${BASE_URL}/collections`;
export const LoginApiURL = `${BASE_URL}/login`;
export const RegisterApiURL = `${BASE_URL}/readers`;
export const UserApiURL = `${BASE_URL}/reader`;
export const ReadingsURL = `${BASE_URL}/readings`;
export const OwnedReadingsURL = `${BASE_URL}/owned_readings`;
export const GoalsURL = `${BASE_URL}/goals`;
export const searchBooksURL = `${BASE_URL}/search`;
export const recommendationBooksURL = `${BASE_URL}/recommendation`;
export const myCollectedBooks = (collectionId: number) =>
  `${BASE_URL}/collections/${collectionId}/books`;
export const topRatedURL = `${BASE_URL}/ranking`;
export const achievementURL = `${BASE_URL}/achievements`;
export const ownedAchievementURL = `${BASE_URL}/owned_achievements`;
