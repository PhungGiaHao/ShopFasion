import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';
import {scale} from 'react-native-size-matters';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {useImagePicker} from '../../hook/UseImagePicker';
import {storage} from '../../storage/Storage';

export default function UserScreen() {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {avatarUri, showActionSheet, handleActionSheet} = useImagePicker();
  const onLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'SignIn'}],
    });
    storage.delete('isLogin');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <TouchableOpacity style={styles.rowAvatar} onPress={showActionSheet}>
          <Image
            source={{uri: avatarUri}}
            resizeMode={'cover'}
            style={styles.avatar}
          />
          <CustomText
            style={{fontSize: scale(20), fontFamily: FONTFAMILY.KoHo_Bold}}>
            Tharo
          </CustomText>
        </TouchableOpacity>
        <View style={styles.containerBox}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PayMent')}
            style={styles.box}>
            <CustomText
              style={{
                fontSize: scale(FONTSIZE.size_16),

                paddingBottom: scale(SPACING.space_8),
              }}>
              PayMent
            </CustomText>
          </TouchableOpacity>
          <View style={styles.boxNoftication}>
            <CustomText
              style={{
                fontSize: scale(FONTSIZE.size_16),

                paddingBottom: scale(SPACING.space_8),
              }}>
              Notification
            </CustomText>
            <Switch
              style={{transform: [{scaleX: 0.7}, {scaleY: 0.6}]}}
              trackColor={{false: 'rgba(52, 51, 51, 1)', true: COLORS.Yellow}}
              thumbColor={true ? COLORS.White : COLORS.White}
              ios_backgroundColor="#3e3e3e"
              value={isEnabled}
              onValueChange={() => setIsEnabled(!isEnabled)}
            />
          </View>
          <TouchableOpacity
            onPress={() => onLogout()}
            style={[
              styles.box,
              {
                borderBottomWidth: 0,
              },
            ]}>
            <CustomText
              style={{
                fontSize: scale(FONTSIZE.size_16),

                paddingBottom: scale(SPACING.space_8),
              }}>
              LogOut
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
      <CustomText
        style={{
          textAlign: 'center',
          fontFamily: FONTFAMILY.KoHo_Bold,
          fontSize: scale(FONTSIZE.size_16),
        }}>
        Version 1.0.0
      </CustomText>
      <ActionSheet id="imagePickerSheet">
        <View
          style={{
            paddingVertical: scale(40),

            backgroundColor: COLORS.Black,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: ' rgba(25, 22, 22, 1)',
              marginHorizontal: scale(SPACING.space_16),
              alignItems: 'center',
              borderTopLeftRadius: scale(SPACING.space_16),
              borderTopRightRadius: scale(SPACING.space_16),
              padding: scale(SPACING.space_4),
            }}
            onPress={() => handleActionSheet(0)}>
            <CustomText
              style={{
                fontSize: scale(FONTSIZE.size_16),
                padding: scale(SPACING.space_8),
                fontFamily: FONTFAMILY.KoHo_Bold,
              }}>
              Take Photo
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: ' rgba(25, 22, 22, 1)',
              marginHorizontal: scale(SPACING.space_16),
              alignItems: 'center',
              padding: scale(SPACING.space_4),
              marginTop: scale(SPACING.space_4),
              borderBottomLeftRadius: scale(SPACING.space_16),
              borderBottomRightRadius: scale(SPACING.space_16),
            }}
            onPress={() => handleActionSheet(1)}>
            <CustomText
              style={{
                fontSize: scale(FONTSIZE.size_16),
                padding: scale(SPACING.space_8),
                fontFamily: FONTFAMILY.KoHo_Bold,
              }}>
              Choose Image
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: ' rgba(25, 22, 22, 1)',
              marginHorizontal: scale(SPACING.space_16),
              alignItems: 'center',
              borderRadius: scale(SPACING.space_12),
              padding: scale(SPACING.space_4),
              marginTop: scale(SPACING.space_12),
            }}
            onPress={() => SheetManager.hide('imagePickerSheet')}>
            <CustomText
              style={{
                fontSize: scale(FONTSIZE.size_18),
                padding: scale(SPACING.space_8),
                fontFamily: FONTFAMILY.KoHo_Regular,
              }}>
              Cancle
            </CustomText>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    paddingHorizontal: scale(SPACING.space_24),
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    marginRight: scale(30),
  },
  box: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    marginVertical: scale(SPACING.space_12),
  },
  containerBox: {
    marginTop: scale(SPACING.space_24),
    paddingHorizontal: scale(SPACING.space_12),
  },
  boxNoftication: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    marginVertical: scale(SPACING.space_12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(SPACING.space_24),
  },
});
