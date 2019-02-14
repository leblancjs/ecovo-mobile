export const UPDATE_FIRSTNAME = 'UPDATE_FIRSTNAME';
export const UPDATE_LASTNAME = 'UPDATE_LASTNAME';
export const UPDATE_BIRTHDATE = 'UPDATE_BIRTHDATE';
export const UPDATE_SEXE = 'UPDATE_SEXE';
export const FORM_FILLED = 'FORM_FILLED';

export const updateFirstName = (firstName) => ({
    type: UPDATE_FIRSTNAME,
    firstName
})

export const updateLastName = (lastName) => ({
    type: UPDATE_LASTNAME,
    lastName
})

export const updateBirthdate = (birthdate) => ({
    type: UPDATE_BIRTHDATE,
    birthdate
})

export const updateSexe = (sexe) => ({
    type: UPDATE_SEXE,
    sexe
})

export const setFormFilled = (formFilled) => ({
    type: FORM_FILLED,
    formFilled
})