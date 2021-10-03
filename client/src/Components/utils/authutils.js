function getAuthHeader() {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const data = {
        'Authorization': `Token ${token}`
    }
    return data;
}

export {getAuthHeader};