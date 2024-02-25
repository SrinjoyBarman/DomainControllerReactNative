package app.zigwheels.modules;

import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.content.pm.verify.domain.DomainVerificationManager;
import android.content.pm.verify.domain.DomainVerificationUserState;
import android.content.pm.PackageManager.NameNotFoundException;

import android.content.Intent;
import android.provider.Settings;
import android.net.Uri;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DomainVerificationModule extends ReactContextBaseJavaModule {

    public DomainVerificationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DomainVerificationModule";
    }

    @ReactMethod
    public void getDomainVerificationUserState(Promise promise) {
        Context context = getReactApplicationContext();
        DomainVerificationManager manager = context.getSystemService(DomainVerificationManager.class);
        if (manager == null) {
            promise.reject("DOMAIN_VERIFICATION_SERVICE_NOT_FOUND", "Domain Verification Manager not found");
            return;
        }

        try {
            DomainVerificationUserState userState = manager.getDomainVerificationUserState(context.getPackageName());
            Map<String, Integer> hostToStateMap = userState.getHostToStateMap();

            List<String> verifiedDomains = new ArrayList<>();
            List<String> selectedDomains = new ArrayList<>();
            List<String> unapprovedDomains = new ArrayList<>();

            for (String key : hostToStateMap.keySet()) {
                Integer stateValue = hostToStateMap.get(key);
                if (stateValue == DomainVerificationUserState.DOMAIN_STATE_VERIFIED) {
                    verifiedDomains.add(key);
                } else if (stateValue == DomainVerificationUserState.DOMAIN_STATE_SELECTED) {
                    selectedDomains.add(key);
                } else {
                    unapprovedDomains.add(key);
                }
            }

            // Create a JSONObject to hold the domain verification state
            JSONObject result = new JSONObject();
            result.put("verifiedDomains", new JSONArray(verifiedDomains));
            result.put("selectedDomains", new JSONArray(selectedDomains));
            result.put("unapprovedDomains", new JSONArray(unapprovedDomains));

            promise.resolve(result.toString());
        } catch (NameNotFoundException | JSONException e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void openAppSettings() {
        Context context = getReactApplicationContext();
        Intent intent = new Intent(Settings.ACTION_APP_OPEN_BY_DEFAULT_SETTINGS,
            Uri.parse("package:" + context.getPackageName()));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }
}
