# Telepítési útmutató

Ez az útmutató végigvezeti a weboldal, a szerver és az Android alkalmazás telepítésének alaplépésein.

## kötelező programok

1. Xampp https://www.apachefriends.org/download.html
2. Composer https://getcomposer.org/ verzió (2.8.12)
3. Node js https://nodejs.org/en verzió (11.6.1)
4. Android Studio https://developer.android.com/studio

5. Töltse le a zippet a https://github.com/CsuhanSuli/Vizsgaremek-Tuzolto oldalon
6. Csomagolja ki a letöltött fájlt

## adatbázis feltöltése

1. Töltse le a xamppot
2. Windowson nyissa meg a xampp controller alkalmazást és indítsa el az Apache-t és a Mysql-t (ennek elindítva kell lennie majd a többi dolog működéséhez) (ehhez le kell töltve lennie a xamppnak) (Linuxon írja be a terminálba, hogy "sudo xampp start" ahhoz,hogy elindítsa)
3. Nyissa meg ezt a linket: http://localhost/phpmyadmin/
4. NYomjon rá a felső navigációs mezőn a Importálás ablakra
5. A kicsomagolt projektben az adatbázis mappát megnyitva lehet majd látni egy sql fájlt aminek a neve "firedepartmentfinnished.sql" és azt a fájl kiválasztásnál tegye be
6. Ha minden jól működött, akkor sikeresen megjelenik az adatbázis a baloldali részen

## Backend elindítása - csak az adatbázissal fog adatokat kimutatni

1. Töltse le a Composert
2. Nyissa meg a parancssorban a Tuzolto-Backend mappát
3. És ha a Composer-t letöltötte, akkor írja be a parancsot, hogy "composer install"
4. Ezután el tudja indítani a backendet. Utasítás: "php artisan servere"

## Frontend elindítása - csak a backenddel fog működni

1. Töltse le a node js
2. Nyissa meg a parancssorban a Tuzolto_Frontend\Tuzoltosag_Frontend (Tuzolto_Frontend be a Tuzoltosag_Frontend mappát)
3. Írja be azt a parancsot, hogy "npm install"
4. Kérem írja be a parancsot, hogy "npm audit"
5. Ha mindent jól csinált, akkor a "npm run dev" paranccsal el tudja indítani a frontendet

## Android - Kell hozzá a backend, hogy működjön

Az alkalmazás Android verziójának beállításához kövesse az alábbi lépéseket:

1. Nyissa meg az `android` mappát [<b>Android Studio</b>](https://developer.android.com/studio) segíségével
2. Navigáljon az `app` mappába
3. Nyissa meg a `build.gradle.kts` fájlt
4. Keresse meg a `buildTypes` szekciót, majd állítsa be a backend (szerver) elérési címét:
   - adjon meg egy <b>IP-címet</b> vagy <b>domain nevet</b>
5. Buildelje le az alkalmazást

## Megjegyzés

A teszt fiókok a Vizsgaremek-Tuzolto\documentation\testfiokok.md útvonalon találhatók

Győződjön meg róla, hogy a megadott szervercím:

- Elérhető az eszközről vagy emulátorból
  - `localhost` helyett használja a `10.0.2.2` címet Android emulátor esetén
- Megfelelően konfigurált (pl. port, protokoll)
- A "cd" paranccsal lehet mappákat válltozatni
- Ahhoz, hogy tudja, hogy hol van a "dir" paranccsal megnézheti, hogy milyen mappákat tud a "cd" paranccsal megnyitni
