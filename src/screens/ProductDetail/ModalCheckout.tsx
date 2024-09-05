import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {s, scale} from 'react-native-size-matters';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';
import CustomText from '../../components/CustomText';
interface ModalCheckoutProps {
  isModalVisible: boolean;
  setVisiblity: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ModalCheckout(props: ModalCheckoutProps) {
  return (
    <Modal
      onSwipeComplete={() => props.setVisiblity(false)}
      swipeDirection={['down']}
      onBackdropPress={() => props.setVisiblity(false)}
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
          Thanks for your order
        </CustomText>
        <CustomText
          style={{
            marginTop: scale(4),
            textAlign: 'center',

            fontSize: scale(FONTSIZE.size_12),
          }}>
          We will deliver it to you soon
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
