import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        //@ts-ignore
        const { email, password } = credentials;
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(
          "https://ws1.russelservicos.com/api/jwt/login",
          {
            method: "POST",
            body: JSON.stringify({ login: email, password }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return { email_sent: email, ...user };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      //console.log("signUSER: ", user);
      const isAllowedToSignIn =
        user.email_sent === "designer@empresa.russelservico.com.br" ||
        user.email_sent === "pamella.cristina@russelservico.com.br" ||
        user.email_sent === "admin@russelservico.com.br";

      if (isAllowedToSignIn) {
        account.token = user.token;
        return account;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, account, profile }: any) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        const tokenDecodablePart = account.token.split(".")[1];
        const decoded = JSON.parse(
          Buffer.from(tokenDecodablePart, "base64").toString()
        );
        if (decoded) {
          token.user_name = decoded.first;
          token.id = decoded.id;
        }
      }
      return token;
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.name = token.user_name;
      session.user.id = token.id;

      return session;
    },
    authorized({ req, token }: any) {
      if (token) return true; // If there is a token, the user is authenticated
    },
  },
};
export default NextAuth(authOptions);
