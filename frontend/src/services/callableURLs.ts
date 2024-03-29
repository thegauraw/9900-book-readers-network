const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const MyCollectionsURL = `${BASE_URL}/collections`;
export const EventsURL = `${BASE_URL}/events`;
export const MyEventsURL = `${BASE_URL}/events/my`;
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
export const verifyTokenURL = `${BASE_URL}/verify`;
export const profileURL = `${BASE_URL}/profile`;
export const recentCollectedBooksURL = `${BASE_URL}/recent_collected_books`;
export const recentCollectedUsersURL = `${BASE_URL}/recent_collected_users`;
