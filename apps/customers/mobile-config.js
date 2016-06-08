App.info({
    id: 'org.himate.customer',
    name: 'HiMate',
    description: 'The HiMate Android App',
    version: '0.0.1'
});

App.icons({
    // // iOS
    'iphone': '../../build/customers/resources/ios/icon/icon-60.png',
    'iphone_2x': '../../build/customers/resources/ios/icon/icon-60@2x.png',
    'iphone_3x': '../../build/customers/resources/ios/icon/icon-60@3x.png',
    'ipad': '../../build/customers/resources/ios/icon/icon-76.png',
    'ipad_2x': '../../build/customers/resources/ios/icon/icon-76@2x.png',

    // Android
    'android_ldpi': '../../build/customers/resources/android/icon/drawable-mdpi-icon.png',
    'android_mdpi': '../../build/customers/resources/android/icon/drawable-hdpi-icon.png',
    'android_hdpi': '../../build/customers/resources/android/icon/drawable-hdpi-icon.png',
    'android_xhdpi': '../../build/customers/resources/android/icon/drawable-xhdpi-icon.png'
    // 'android_xxhdpi': '../../build/customers/resources/android/icon/drawable-xxhdpi-icon.png',
    // 'android_xxxhdpi': '../../build/customers/resources/android/icon/drawable-xxxhdpi-icon.png'
});

App.launchScreens({
    // iOS
    'iphone': '../../build/customers/resources/ios/splash/Default~iphone.png',
    'iphone_2x': '../../build/customers/resources/ios/splash/Default@2x~iphone.png',
    'iphone5': '../../build/customers/resources/ios/splash/Default-568h@2x~iphone.png',
    'iphone6': '../../build/customers/resources/ios/splash/Default-667h.png',
    'iphone6p_portrait': '../../build/customers/resources/ios/splash/Default-736h.png',
    'iphone6p_landscape': '../../build/customers/resources/ios/splash/Default-Landscape-736h.png',

    'ipad_portrait': '../../build/customers/resources/ios/splash/Default-Portrait~ipad.png',
    'ipad_portrait_2x': '../../build/customers/resources/ios/splash/Default-Portrait@2x~ipad.png',
    'ipad_landscape': '../../build/customers/resources/ios/splash/Default-Landscape~ipad.png',
    'ipad_landscape_2x': '../../build/customers/resources/ios/splash/Default-Landscape@2x~ipad.png',

    // Android
    'android_ldpi_portrait': '../../build/customers/resources/android/splash/drawable-port-ldpi-screen.png',
    'android_mdpi_portrait': '../../build/customers/resources/android/splash/drawable-port-mdpi-screen.png',
    'android_hdpi_portrait': '../../build/customers/resources/android/splash/drawable-port-hdpi-screen.png',
    'android_xhdpi_portrait': '../../build/customers/resources/android/splash/drawable-port-xhdpi-screen.png',
    // 'android_xxhdpi_portrait': '../../build/customers/resources/android/splash/drawable-port-xxhdpi-screen.png',
    // 'android_xxxhdpi_portrait': '../../build/customers/resources/android/splash/drawable-port-xxxhdpi-screen.png',
    'android_ldpi_landscape': '../../build/customers/resources/android/splash/drawable-land-ldpi-screen.png',
    'android_mdpi_landscape': '../../build/customers/resources/android/splash/drawable-land-mdpi-screen.png',
    'android_hdpi_landscape': '../../build/customers/resources/android/splash/drawable-land-hdpi-screen.png',
    'android_xhdpi_landscape': '../../build/customers/resources/android/splash/drawable-land-xhdpi-screen.png'
    // 'android_xxhdpi_landscape': '../../build/customers/resources/android/splash/drawable-land-xxhdpi-screen.png',
    // 'android_xxxhdpi_landscape': '../../build/customers/resources/android/splash/drawable-land-xxxhdpi-screen.png'
});

App.accessRule('*://maps.google.com/*');
App.accessRule('*://himate.org/*');