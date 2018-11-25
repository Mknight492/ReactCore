export const ADD_TEST = "ADD_TEST"

export const addTestGenerator = (test) =>({
    type: ADD_TEST,
    test
})