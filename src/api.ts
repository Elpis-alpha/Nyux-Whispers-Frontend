import { backendLocation } from './__env'


// User Routes
export const createUser = () => `${backendLocation}/api/users/create`

export const getUser = () => `${backendLocation}/api/users/user`

export const editUser = () => `${backendLocation}/api/users/update`

export const deleteUser = () => `${backendLocation}/api/users/delete`

export const getUserbyID = (userID: string) => `${backendLocation}/api/users/find?_id=${userID}`

export const getUserbyEmail = (email: string) => `${backendLocation}/api/users/find?email=${email}`

export const changePassword = () => `${backendLocation}/api/users/change-password`

export const sendVerificationEmail = () => `${backendLocation}/api/users/verify`

export const uploadAvatar = () => `${backendLocation}/api/users/avatar/upload`

export const deleteAvatar = () => `${backendLocation}/api/users/avatar/remove`

export const getUserPicture = (userID: string, size = 'small') => `${backendLocation}/api/users/avatar/view?_id=${userID}&size=${size}`

export const userExistence = (email: string) => `${backendLocation}/api/users/exists?email=${email}`

export const userExistenceUID = (UID: string) => `${backendLocation}/api/users/exists?uniqueName=${UID}`

export const userFindNames = (sample: string) => `${backendLocation}/api/users/look-for-available-unique-names?sample=${sample}`

export const loginUser = () => `${backendLocation}/api/users/login`

export const logoutUser = (all?: boolean) => `${backendLocation}/api/users/logout${all ? "?all=true" : ""}`



// Preuser
export const verifyPreUser = () => `${backendLocation}/api/test-user/test`

export const getPreUser = () => `${backendLocation}/api/test-user/retreive`

export const createPreUser = () => `${backendLocation}/api/test-user/create`



// Conversation
export const createConversation = () => `${backendLocation}/api/conversation/create`

export const createConversationGroup = () => `${backendLocation}/api/conversation/create-group`

export const getAllConversations = () => `${backendLocation}/api/conversation/get-all`
