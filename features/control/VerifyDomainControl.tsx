import React, {ReactNode, useEffect, useState} from 'react';
import {NativeModules, AppState, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_LINK_UPDATE_KEY} from './defaults';
import {OpenDomainSettingsModal} from '../components/OpenDomainSettingsModal';

export function VerifyDomainControl({children}: {children: ReactNode}) {
  const {DomainVerificationModule} = NativeModules;

  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  useEffect(() => {
    const subscribe = () => {
      if (Platform.OS === 'android' && Platform.Version > 31) {
        DomainVerificationModule.getDomainVerificationUserState()
          .then(async (result: string) => {
            if (result) {
              const {unapprovedDomains} = JSON.parse(result);
              console.log(unapprovedDomains);
              const isUpdated = await AsyncStorage.getItem(APP_LINK_UPDATE_KEY);
              if (unapprovedDomains) {
                if (unapprovedDomains.length > 0 && isUpdated !== 'false')
                  setShowSettingsPopup(true);
                else setShowSettingsPopup(false);
              }
            }
          })
          .catch((error: any) => {
            console.error(error);
          });
      }
    };

    AppState.addEventListener('change', () => {
      subscribe();
    });

    return subscribe();
  });

  return (
    <>
      <OpenDomainSettingsModal
        modalVisible={showSettingsPopup}
        setShowSettingsPopup={setShowSettingsPopup}
      />
      {children}
    </>
  );
}
