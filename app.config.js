export default {
  expo: {
    name: "fisioApp",
    slug: "fisioApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      supabaseUrl: "https://pvkclefvimdgafmyyffg.supabase.co",
      supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2a2NsZWZ2aW1kZ2FmbXl5ZmZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMDA0MzAsImV4cCI6MjA2NDY3NjQzMH0.pL8ylfZqrSIB0XL93zMMsb6Yc2LSZn9IBUxnOGvQdOQ",
      // Add your service role key here - you'll need to get this from your Supabase dashboard
      // Go to Project Settings > API > Project API keys > service_role key
      supabaseServiceKey: "YOUR_SUPABASE_SERVICE_ROLE_KEY"
    }
  }
}
