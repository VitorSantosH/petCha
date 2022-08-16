export function setStore(newStoreValue) {

    return {
        type: 'SET_STORE',
        payload: newStoreValue
    }
}