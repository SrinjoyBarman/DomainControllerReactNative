package app.zigwheels;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactApplicationContext;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import app.zigwheels.modules.DomainVerificationModule;

public class CustomReactPackage implements ReactPackage {
    @Override
    public List<com.facebook.react.bridge.NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<com.facebook.react.bridge.NativeModule> modules = new ArrayList<>();
        modules.add(new DomainVerificationModule(reactContext));
        return modules;
    }

    @Override
    public List<com.facebook.react.uimanager.ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}

