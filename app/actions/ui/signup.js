export const UPDATE_FIRSTNAME = 'UPDATE_FIRSTNAME';
export const UPDATE_LASTNAME = 'UPDATE_LASTNAME';
export const UPDATE_DATE_OF_BIRTH = 'UPDATE_DATE_OF_BIRTH';
export const UPDATE_GENDER = 'UPDATE_GENDER';
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

export const createUser = (user) => ({
    type: CREATE_USER,
    user
})

export const setFormFilled = (formFilled) => ({
    type: FORM_FILLED,
    formFilled
})