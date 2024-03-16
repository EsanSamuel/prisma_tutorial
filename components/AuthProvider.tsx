"use client";
import { getProviders, signIn } from "next-auth/react";
import React from "react";

type Provider = {
  id: string;
  type: string;
  name: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

const AuthProvider = () => {
  const [providers, setProviders] = React.useState<Providers | null>(null);
  React.useEffect(() => {
    const setUpProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProvider();
  }, []);

  return (
    <div>
      {providers &&
        Object.values(providers).map((provider: Provider) => (
          <button key={provider.name} onClick={() => signIn(provider.id)}>
            Signin
          </button>
        ))}
    </div>
  );
};

export default AuthProvider;
