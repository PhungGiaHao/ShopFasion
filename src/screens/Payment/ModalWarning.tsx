import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  SPACING,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  BORDERRADIUS,
} from '../../theme/theme';
import Modal from 'react-native-modal';
import {IPayment} from '../../interface/payment';
import {usePayment} from '../../Context/PayMentContext';
import Toast from 'react-native-toast-message';

interface MWarningModalProps {
  isModalVisible: boolean;
  onCloseModal: () => void;
  selected: IPayment | null;
}

export default function WarningModal(props: MWarningModalProps) {
  const {removePayment} = usePayment();
  const deleteItem = () => {
    if (props.selected) {
      removePayment(props.selected);
      props.onCloseModal();
      Toast.show({
        type: 'deletedToast',
        text1: 'Deleted',
        position: 'bottom',
        bottomOffset: 50,
        visibilityTime: 2000,
      });
    }
  };

  return (
    <Modal
      onSwipeComplete={props.onCloseModal}
      swipeDirection={['down']}
      onBackdropPress={props.onCloseModal}
      style={{
        margin: 0,
        paddingHorizontal: scale(SPACING.space_24),
      }}
      isVisible={props.isModalVisible}>
      <View style={styles.modalContainer}>
        <CustomText
          style={{
            textAlign: 'center',
            fontFamily: FONTFAMILY.KoHo_Bold,
            fontSize: scale(FONTSIZE.size_16),
          }}>
          Warning
        </CustomText>
        <CustomText
          style={{
            marginTop: scale(16),
            textAlign: 'center',
            fontSize: scale(FONTSIZE.size_16),
          }}>
          Are you sure you want to delete this payment?
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: scale(SPACING.space_24),
            gap: scale(SPACING.space_16),
            paddingHorizontal: scale(SPACING.space_28),
          }}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: COLORS.Yellow}]}
            onPress={deleteItem}>
            <CustomText
              style={{
                color: COLORS.Black,
                fontFamily: FONTFAMILY.KoHo_Bold,
                fontSize: scale(FONTSIZE.size_14),
              }}>
              OK
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: COLORS.White}]}
            onPress={props.onCloseModal}>
            <CustomText
              style={{
                color: COLORS.Black,
                fontSize: scale(FONTSIZE.size_14),
              }}>
              Cancel
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(25, 22, 22, 1)',
    paddingVertical: scale(SPACING.space_32),
    borderRadius: scale(8),
  },
  button: {
    paddingHorizontal: scale(SPACING.space_32),
    paddingVertical: scale(SPACING.space_8),
    alignItems: 'center',
    marginTop: scale(SPACING.space_24),
    borderRadius: scale(BORDERRADIUS.radius_20),
    flex: 1,
  },
});
