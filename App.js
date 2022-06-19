import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  TouchableOpacity
} from 'react-native';
import Torch from  'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    //Liga flash do celular
    Torch.switchState(toggle);
    console.log('Trocou estado do flash')
  }, [toggle]);

  useEffect(() => {
    /**
     * Quando o celular for chacoalhado, mudaremos o toggle
     */
    const subscription = RNShake.addListener(() =>{
      setToggle(oldToggle => !oldToggle)
    });
    
    //Essa função vai ser chamada quando o componente
    //For desmontado
    return () => subscription.remove();
  },[]);


  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightImgOn : style.lightImgOff}
          source={
            toggle
              ? require('./assets/icons/eco-light.png')
              : require('./assets/icons/eco-light-off.png')
          }
        />
        <Image
          style={style.dioLogo}
          source={
            toggle
              ? require('./assets/icons/dio-logo.png')
              : require('./assets/icons/dio-logo-white.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightImgOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightImgOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});