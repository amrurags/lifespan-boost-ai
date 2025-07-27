import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d42844103ddc488cb0b7e7297690a527',
  appName: 'LifeSpan Boost',
  webDir: 'dist',
  server: {
    url: 'https://d4284410-3ddc-488c-b0b7-e7297690a527.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#22c55e",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffffff"
    },
    Camera: {
      androidRequestPermissions: true
    }
  }
};

export default config;