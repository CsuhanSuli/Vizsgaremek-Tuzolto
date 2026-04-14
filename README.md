# Telepítési útmutató
Ez az útmutató végigvezeti a weboldal, a szerver és az Android alkalmazás telepítésének alaplépésein.
## Android
Az alkalmazás Android verziójának beállításához kövesse az alábbi lépéseket:
1. Nyissa meg az `android` mappát [<b>Android Studio</b>](https://developer.android.com/studio) segíségével
2. Navigáljon az `app` mappába
3. Nyissa meg a `build.gradle.kts` fájlt
4. Keresse meg a `buildTypes` szekciót, majd állítsa be a backend (szerver) elérési címét:
   - adjon meg egy <b>IP-címet</b> vagy <b>domain nevet</b>
5. Buildelje le az alkalmazást

## Megjegyzés
Győződjön meg róla, hogy a megadott szervercím:
- elérhető az eszközről vagy emulátorból
  - `localhost` helyett használja a `10.0.2.2` címet Android emulátor esetén
- megfelelően konfigurált (pl. port, protokoll)
