# Telepítési útmutató
Ez az útmutató végigvezeti a weboldal, a szerver és az Android alkalmazás telepítésének alaplépésein.

## kötelező programok
1. Xampp https://www.apachefriends.org/download.html
2. Composer https://getcomposer.org/ verzió (2.8.12)
3. Node js https://nodejs.org/en verzió (11.6.1)
4. Android Studio https://developer.android.com/studio

1. Letöltöd a zippet a https://github.com/CsuhanSuli/Vizsgaremek-Tuzolto oldalon
2. Kicsomagolód a letöltött fájlt

## adatbázis feltöltése
1. Letöltöd az xamppot
2. Windowson megnyitod a xampp controller alkalmazást és startolod a Apache és a Mysql-t (ennek elindítva kell lennie majd a többi dolog működéséhez) (ehhez le kell töltve lennie a xamppnak) (Linuxon írd be a terminálba hogy "sudo xampp start" hogy elindítsd)
3. Megnyitod ezt a linket http://localhost/phpmyadmin/
4. Rányomsz a felső navigációs mezőn a Importálás ablakra
5. A kicsomagolt projektben az adatbázis mappát megnyitva lehet majd látni egy sql fájlt aminek a neve "firedepartmentfinnished.sql" és azt a fájl kiválasztásánál beteszed
6. Ha minden jól működött, akkor sikeresen megjelent az adatbázis a baloldali részen

## Backend elindítása - csak az adatbázissal fog adatokat kimutatni
1. Letöltöd a Composert
2. Megnyitod a parancsorban a Tuzolto-Backend mappát
3. És ha a Composer letöltötted, akkor írd be a parancsot hogy "composer install"
4. Aztán el tudod indítani a backendet php artisan serverell

## Frontend elindítása - csak a backendel fog működni
1. Letöltöd a node js
2. Megnyitod parancssorban a Tuzolto_Frontend\Tuzoltosag_Frontend (Tuzolto_Frontend be a Tuzoltosag_Frontend mappát)
3. Beírod azt a parancsot hogy "npm install"
4. Ha mindent jól csináltál, akkor a "npm run dev" paranccsal el tudod majd indítani a frontendet

## Android - Kell hozzá a backend, hogy működjön
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
- a "cd" parancsal lehet mappákat válltozatni
- hogy tudjad, hogy hol vagy akkor a dir paranccsal megnézheted, hogy milyen mappákat tudsz a cd parancsal megnyitni
