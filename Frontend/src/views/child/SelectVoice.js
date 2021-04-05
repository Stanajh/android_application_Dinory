import React, {useState, useEffect, useCallback} from 'react';
import SelectLayout from '../../components/elements/SelectLayout';
import Header from '../../components/elements/Header';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Sound from 'react-native-sound';
import voiceOne from '../../assets/sound/0hellonicetomeetyou.wav';
import voiceTwo from '../../assets/sound/1hellonicetomeetyou.wav';
import voiceThr from '../../assets/sound/2hellonicetomeetyou.wav';
import voiceFou from '../../assets/sound/3hellonicetomeetyou.wav';
import voiceFiv from '../../assets/sound/4hellonicetomeetyou.wav';
import AlertModal from '../../components/elements/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {editChildVoice} from '../../api/accounts/childSettings';
import {StyleSheet, View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const dimensions = Dimensions.get('window');
const height = dimensions.height;

export default function SelectVoice() {
  const [modalVisible, setModalVisible] = useState(false);
  const [fmodalVisible, setfModalVisible] = useState(false);
  const [nomodalVisible, setNoModalVisible] = useState(false);
  const [child, setChild] = useState('');
  const [voice, setVoice] = useState('');
  const navigation = useNavigation();
  const url = require('../../assets/images/background2.png');
  const [imgNumber, setImageNumber] = useState(-1);

  let soundf = new Sound(voiceOne, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
    }
  });
  let sounds = new Sound(voiceTwo, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
    }
  });
  let soundt = new Sound(voiceThr, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
    }
  });
  let soundfo = new Sound(voiceFou, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
    }
  });
  let soundfi = new Sound(voiceFiv, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
    }
  });

  const getProfileInfo = useCallback(async () => {
    await AsyncStorage.getItem('profile').then((profile) => {
      const data = JSON.parse(profile);
      setChild(data.profile_pk);
    });
  }, []);

  useEffect(() => {
    getProfileInfo();
  }, [getProfileInfo]);

  const submitVoice = () => {
    const formData = new FormData();
    formData.append('voice', Number(voice));
    editChildVoice(
      child,
      formData,
      (res) => {
        if (res.status === 200) {
          const profileData = {
            voice_pk: voice,
          };
          AsyncStorage.mergeItem('profile', JSON.stringify(profileData));
          changeModalState();
          setTimeout(() => {
            navigation.navigate('Main');
          }, 2000);
        } else {
          fchangeModalState();
        }
      },
      (err) => {
        console.log('selectVoice error : ', err);
        noChangeModalState();
      },
    );
  };
  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 1500);
  };
  const changeModalState = () => {
    setModalVisible(!modalVisible);
  };
  const fcloseModal = () => {
    setTimeout(() => {
      setfModalVisible(!fmodalVisible);
    }, 1500);
  };
  const fchangeModalState = () => {
    setfModalVisible(!fmodalVisible);
  };
  const noCloseModal = () => {
    setTimeout(() => {
      setNoModalVisible(!nomodalVisible);
    }, 1500);
  };
  const noChangeModalState = () => {
    setNoModalVisible(!nomodalVisible);
  };
  return (
    <View style={styles.container}>
      <BackgroundAbsolute imageSrc={url}>
        <Header />
        <View style={styles.body}>
          <SelectLayout
            title={'원하는 목소리를 선택해주세요'}
            btnText={'변경완료'}
            imgNumber={imgNumber}
            onHandlePressC1={() => {
              soundf.setVolume(0.5);
              setVoice(0);
              setImageNumber(0);
              soundf.play();
            }}
            onHandlePressC2={() => {
              sounds.setVolume(0.5);
              setVoice(1);
              setImageNumber(1);
              sounds.play();
            }}
            onHandlePressC3={() => {
              soundt.setVolume(0.5);
              setVoice(2);
              setImageNumber(2);
              soundt.play();
            }}
            onHandlePressC4={() => {
              soundfo.setVolume(0.5);
              setVoice(3);
              setImageNumber(3);
              soundfo.play();
            }}
            onHandlePressC5={() => {
              soundfi.setVolume(0.5);
              setVoice(4);
              setImageNumber(4);
              soundfi.play();
            }}
            onHandlePressBasic={() => submitVoice()}
          />
          <AlertModal
            modalVisible={modalVisible}
            onHandleCloseModal={() => changeModalState()}
            text={'목소리가 변경되었어요!'}
            iconName={'smileo'}
            color={'green'}
            setTimeFunction={() => closeModal()}
          />
          <AlertModal
            modalVisible={fmodalVisible}
            onHandleCloseModal={() => fchangeModalState()}
            text={'다시 시도해주세요!'}
            iconName={'frowno'}
            color={'red'}
            setTimeFunction={() => fcloseModal()}
          />
          <AlertModal
            modalVisible={nomodalVisible}
            onHandleCloseModal={() => noChangeModalState()}
            text={'목소리를 선택해주세요!'}
            iconName={'frowno'}
            color={'red'}
            setTimeFunction={() => noCloseModal()}
          />
        </View>
      </BackgroundAbsolute>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 6,
    alignItems: 'center',
    marginTop: height * 0.17,
    backgroundColor: 'transparent',
  },
});
