import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  NativeModules,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_LINK_UPDATE_KEY} from '../control/defaults';

export function OpenDomainSettingsModal({
  modalVisible,
  setShowSettingsPopup,
}: {
  modalVisible: boolean;
  setShowSettingsPopup: (val: boolean) => void;
}) {
  const {DomainVerificationModule} = NativeModules;
  return (
    <>
      <Modal animationType="fade" visible={modalVisible} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontSize: 16,
                color: '#133125',
                textAlign: 'center',
                marginBottom: 20,
              }}>
              The app needs extra configuration
            </Text>
            <Text
              style={{
                textAlign: 'left',
              }}>
              The application is not setup as the default link handler. Click on
              "Open Settings" below and then on "+ Link" in settings to add them
              all.
            </Text>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 8}}>
              <Pressable
                onPress={async () => {
                  setShowSettingsPopup(false);
                  await AsyncStorage.setItem(APP_LINK_UPDATE_KEY, 'false');
                }}
                style={[styles.button, styles.buttonOpen]}>
                <Text style={styles.textStyle}>Not Now</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  DomainVerificationModule.openAppSettings();
                }}
                style={[styles.button, styles.buttonClose]}>
                <Text style={styles.textStyle}>Open Settings</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {paddingTop: 30, backgroundColor: '#ffffff'},
  accountLinkText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#10221B',
    alignSelf: 'center',
    marginLeft: 10,
  },
  linkItem: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomRightRadius: 15,
  },
  containerMain: {
    padding: 10,
    backgroundColor: Colors.primary,
    width: 200,
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: 20,
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    width: 330,
    padding: 14,
    paddingBottom: 20,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonOpen: {
    backgroundColor: 'gray',
  },
  buttonClose: {
    backgroundColor: 'teal',
    borderColor: 'teal',
    borderWidth: 1,
  },
  textStyle: {
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    paddingHorizontal: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
