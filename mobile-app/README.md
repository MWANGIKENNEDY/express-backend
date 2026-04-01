# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Clerk Authentication Setup

This app uses Clerk for authentication with an Express backend. Both frontend and backend must share the **same Clerk publishable key** from the same Clerk project.

**Frontend `.env`:**
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZHJpdmluZy10aWdlci05OC5jbGVyay5hY2NvdW50cy5kZXYk
```

**Backend `.env`:**
```env
CLERK_PUBLISHABLE_KEY=pk_test_ZHJpdmluZy10aWdlci05OC5jbGVyay5hY2NvdW50cy5kZXYk  # Same as frontend
CLERK_SECRET_KEY=sk_test_your_secret_here    # Backend only
```

**Why this works:** Clerk issues JWT tokens scoped to a specific project (identified by the publishable key). When the mobile app authenticates, it gets a token from that project. The backend uses the secret key from the same project to verify those tokens. If the keys don't match the same Clerk project, the backend rejects the tokens with 401 Unauthorized.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
