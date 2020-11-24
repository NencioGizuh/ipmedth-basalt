# ipmedth-basalt

## Capacitor instellen

Zorg ervoor dat je de volgende software op je systeem hebt staan.
-   Node v.8.6.0
-   NPM v5.6.0
-   Android Studio met Android SDK
-   Xcode (Kan alleen voor Mac OS X en is dus niet verplicht)

1. npm install
2. npm run build. Hiermee wordt er een dist en node_modules map aangemaakt.
3. npx cap add android. Hiermee wordt er een android en .gradle map aangemaakt.

Nu heb je de basis voor je capacitor klaar staan.

### Live-reload Capacitor instellen
1. Zoek via je ip-adres door een terminal te openen en ipconfig (Voor windows) en ifconfig (Voor Mac). Bij eth0 staat meestal je ipadres. 
2. Verander in je capacitor.config.json de optie "server" 
  "server": {
    "url": "http://EIGEN_IP_ADRES:8080",
    "cleartext": true
  },
3. npx cap copy
4. npx cap open android
5. Maak een build in Android Studio
6. Check of je live kan veranderen

## Project setup
```
Als er een nieuwe feature geïntroduceerd dan onderneem je de volgende stappen
1. docker-compose down
2. docker-compose build
3. docker-compose up
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
