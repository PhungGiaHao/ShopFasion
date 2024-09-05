import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SPACING, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import Modal from 'react-native-modal';
interface ModalCheckoutProps {
  isModalVisible: boolean;
  onCloseModal: () => void;
}
export default function ModalSuccess(props: ModalCheckoutProps) {
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
        <AntDesign name="checkcircleo" size={scale(80)} color={COLORS.Yellow} />
        <CustomText
          style={{
            marginTop: scale(16),
            textAlign: 'center',
            fontFamily: FONTFAMILY.KoHo_Bold,
            fontSize: scale(FONTSIZE.size_16),
          }}>
          Add Payment Success
        </CustomText>
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
});
