# Simple Ionic Voting App. Firebase in server side.


## How to build
1. Generate a release build for Android `cordova build --release android`
2. CD in folder /data/www/agt-js-vote/platforms/android/ant-build
3. Generate our private key using the keytool `о пот`
4. Sign the unsigned APK, run the jarsigner tool `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore AGTPlusApp-release-unsigned.apk  alias_name`
5. This signs the apk in place. Finally, we need to run the zip align tool to optimize the APK: `/home/nik/Android/Sdk/build-tools/21.1.2/zipalign -v 4 AGTPlusApp-release-unsigned.apk   AGTPlus.apk`
6. `cp /data/www/agt-js-vote/platforms/android/ant-build/AGTPlus.apk /data/www/agt-js-vote/platforms/android/build/`