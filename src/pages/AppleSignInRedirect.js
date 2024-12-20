import React from 'react';
function AppleSignInRedirect() {
    document.title = "Apple Sign In Redirect";
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const idToken = params.get('id_token');
        const code = params.get('code');

        if (idToken) {
            try {
                const user = jwtDecode(idToken);
                console.log('User Info:', user);
                alert(`Welcome, ${user.email}`);
            } catch (error) {
                console.error('Error decoding ID token:', error);
            }
        } else if (code) {
            console.log('Authorization Code:', code);
            alert('Authorization code received. Exchange this for an ID token on the backend.');
        } else {
            console.error('No authorization data found.');
        }
    }, []);
    return (
        <>
            <span className='text-lg'>Redirecting Back to App...</span>
        </>
    );
}

export default AppleSignInRedirect;
