package com.awesomeproject.wifi

import android.content.Context
import android.net.wifi.WifiManager
import android.net.wifi.WifiInfo
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class WifiModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "WifiModule"
    }

    @ReactMethod
    fun getSSID(promise: Promise) {
        try {
            val wifiManager = reactApplicationContext.getSystemService(Context.WIFI_SERVICE) as WifiManager
            val wifiInfo: WifiInfo = wifiManager.connectionInfo
            val ssid: String = wifiInfo.ssid
            promise.resolve(ssid)
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }
}