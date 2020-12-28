import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  pages : {
    signIn: "/login",
  },
  callbacks: {
    redirect: async (url, _) => {
      return Promise.resolve('/');
    }
  },
  site: process.env.NEXTAUTH_URL
}

export default function Api(req, res) {
  return NextAuth(req, res, options);
}