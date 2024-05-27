logo: https://app.logomakr.com/3Vujjc

### apk

1. eas:

```shell
npm install -g eas-cli
```

2. authenticate

- login:

```shell
eas login
```

- logout:

```shell
eas logout
```

- check user:

```shell
eas whoami
```

3. creating a configuration file

```shell
eas build:configure
```

4. creating an apk for android:

- open the `eas.json` file and add the following configuration

```json
{
  "cli": {
    "version": ">= 7.8.2"
  },
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },

    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

First try to make sure that all packages have the expected versions by running the command:

```shell
npx expo-doctor
```

If there is any problem with packages or if you see any warning on the terminal you are recommended to run the command:

```shell
npx expo install --check
```

Then you can create an apk by running the following command:

```shell
eas build -p android --profile preview
```
