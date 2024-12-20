import React from 'react';
function AppleSignInApi() {
    document.title = "Apple Sign In";
    const REDIRECT_URI = 'https://scotth.tech/appleSignInRedirect';
    const [searchParams] = useSearchParams();
    // Read CLIENT_ID and SCOPES from URL params, with fallbacks
    const CLIENT_ID = searchParams.get('client_id') || 'default-client-id';
    const SCOPES = searchParams.get('scopes') || 'email name';

    const APPLE_AUTH_URL = `https://appleid.apple.com/auth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&response_type=code%20id_token&scope=${encodeURIComponent(SCOPES)}`;

    useEffect(() => {
        // Redirect to Apple's sign-in page as soon as the component loads
        window.location.href = APPLE_AUTH_URL;
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-xl font-semibold">Redirecting to Apple Sign-In...</h1>
        </div>
    );
}

export default AppleSignInApi;
