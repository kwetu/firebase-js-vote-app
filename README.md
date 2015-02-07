# Simple Ionic Voting App. Firebase in server side.

1. cordova build --release android
2. keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 1000
3. jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore AGTPlusApp-release-unsigned.apk  alias_name
4. /home/nik/Android/Sdk/build-tools/21.1.2/zipalign -v 4 AGTPlusApp-release-unsigned.apk   AGTPlus.apk
