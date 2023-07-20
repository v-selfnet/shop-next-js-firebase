

const createJWT = async (payload) => {
    try {
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        console.log('createJWT:', data)
        return data;
    } catch (error) {
        console.error(error)
    }
};

export default createJWT;