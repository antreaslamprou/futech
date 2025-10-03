'use client';

import Image from 'next/image';

export default function AuthButtons() {
  const providers = [
    { name: "google", color: "#000000"}, 
    { name: "github", color: "#0c7600"}, 
    { name: "facebook", color: "#3a559e"}, 
  ];

  function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  function onProviderClick(providerName){
    if (isMobile()) {
      (async () => {
        await signIn(providerName, { callbackUrl: "/account" });
      })();
    } else {
      const width = 500;
      const height = 600;

      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        `/auth/provider-signin?provider=${providerName}`,
        "LoginWithProvider",
        `width=${width},height=${height},top=${top},left=${left},popup`
      );
    }
  }

  return (<>
    <hr className="h-0.5 bg-gray-500 w-full md:w-8/10 mt-10" />
    <h4 className="w-min bg-futech-black px-8 md:px-10 -mt-3 mb-10">OR</h4>
    <div className="auth-buttons">
      { providers.map((provider) => (
        <button 
          key={provider.name} 
          style={{ backgroundColor: provider.color }}
          onClick={() => onProviderClick(provider.name)} 
        >
          <Image 
            src={`icons/${provider.name}.svg`} 
            alt={provider.name} 
            width={30}
            height={30}
            className="mr-3" 
          />
            Sign in with {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
        </button>
      ))}
    </div>
  </>);
}