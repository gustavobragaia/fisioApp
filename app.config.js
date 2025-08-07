export default {
  expo: {
    name: "Alivio",
    slug: "fisioApp",
    scheme: "alivio",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#001417",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.fisioapp",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#001417",
      },
    },
    web: {
      favicon: "./assets/images/adaptive-icon.png",
    },
    extra: {
      supabaseUrl: "https://pvkclefvimdgafmyyffg.supabase.co",
      supabaseAnonKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2a2NsZWZ2aW1kZ2FmbXl5ZmZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMDA0MzAsImV4cCI6MjA2NDY3NjQzMH0.pL8ylfZqrSIB0XL93zMMsb6Yc2LSZn9IBUxnOGvQdOQ",
      // Add your service role key here - you'll need to get this from your Supabase dashboard
      // Go to Project Settings > API > Project API keys > service_role key
      supabaseServiceKey: "YOUR_SUPABASE_SERVICE_ROLE_KEY",
      eas: {
        projectId: "126b4377-8bc8-4dd0-98a0-c6a8d4c33e4c"
      }
    },
    updates: {
      url: "https://u.expo.dev/126b4377-8bc8-4dd0-98a0-c6a8d4c33e4c",
    },
    runtimeVersion: {
      policy: "appVersion"
    }
  },
};
