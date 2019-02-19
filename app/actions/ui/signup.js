export const UPDATE_FIRSTNAME = 'UPDATE_FIRSTNAME';
export const UPDATE_LASTNAME = 'UPDATE_LASTNAME';
export const UPDATE_DATE_OF_BIRTH = 'UPDATE_DATE_OF_BIRTH';
export const UPDATE_GENDER = 'UPDATE_GENDER';
export const UPDATE_MUSIC = 'UPDATE_MUSIC';
export const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';
export const UPDATE_SMOKING = 'UPDATE_SMOKING';
export const FORM_FILLED = 'FORM_FILLED';
export const CREATE_USER = 'CREATE_USER';

export const updateFirstName = (firstName) => ({
    type: UPDATE_FIRSTNAME,
    firstName
})

export const updateLastName = (lastName) => ({
    type: UPDATE_LASTNAME,
    lastName
})

export const updateDateOfBirth = (dateOfBirth) => ({
    type: UPDATE_DATE_OF_BIRTH,
    dateOfBirth
})

export const updateGender = (gender) => ({
    type: UPDATE_GENDER,
    gender
})

export const updateMusic = (music) => ({
    type: UPDATE_MUSIC,
    music
})

export const updateConversation = (conversation) => ({
    type: UPDATE_CONVERSATION,
    conversation
})

export const updateSmoking = (smoking) => ({
    type: UPDATE_SMOKING,
    smoking
})

export const createUser = (user) => ({
    type: CREATE_USER,
    user
})

export const setFormFilled = (formFilled) => ({
    type: FORM_FILLED,
    formFilled
})