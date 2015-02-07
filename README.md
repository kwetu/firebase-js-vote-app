# Simple Ionic Voting App. Firebase in server side.

Release notes:
*v.0.2.1 -  add user feedback*


# How to build
1. Generate a release build for Android `cordova build --release android`
2. Generate our private key using the keytool `keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 1000`
3. Sign the unsigned APK, run the jarsigner tool `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore AGTPlusApp-release-unsigned.apk  alias_name`
4. This signs the apk in place. Finally, we need to run the zip align tool to optimize the APK: `/home/nik/Android/Sdk/build-tools/21.1.2/zipalign -v 4 AGTPlusApp-release-unsigned.apk   AGTPlus.apk`
