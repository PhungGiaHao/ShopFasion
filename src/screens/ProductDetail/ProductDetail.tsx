import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import {RouteProp, useRoute} from '@react-navigation/native';
import {IProduct} from '../../interface/product';
import {scale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useItem} from '../../Context/ListItemContext';
import CustomText from '../../components/CustomText';
import ModalCheckout from './ModalCheckout';
type ParamList = {
  productDetail: {
    item: IProduct;
  };
};

export default function ProducDetail() {
  const route = useRoute<RouteProp<ParamList, 'productDetail'>>();
  const {item} = route.params || {};

  const images = [item.image, item.image, item.image];
  // const images = [
  //   'https://pbx2-pbww-prod-pbww-cdn.getprintbox.com/media/productimage/e925de22-44e0-4276-bb92-0b4101f5f834/Blank%20Jacket_thumb_900x900?mt=1583407059.733',
  //   'https://tokyofashion.com/wp-content/uploads/2023/06/2023-06-11-012-002-NK-Harajuku-0771.jpg',
  //   'https://pbx2-pbww-prod-pbww-cdn.getprintbox.com/media/productimage/e925de22-44e0-4276-bb92-0b4101f5f834/Blank%20Jacket_thumb_900x900?mt=1583407059.733',
  // ];
  const {width, height} = Dimensions.get('window');
  const {handleItemToFavorites, isItemFavorite} = useItem();
  const flatListRef = React.useRef<FlatList>(null);
  const [indexFlatlist, setIndexFlatlist] = React.useState(0);
  const [indexStyle, setIndexStyle] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={images}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          ref={flatListRef}
          onMomentumScrollEnd={e => {
            const contentOffsetX = e.nativeEvent.contentOffset.x;
            const index = Math.round(contentOffsetX / width);
            setIndexFlatlist(index);
          }}
          pagingEnabled
          renderItem={({item}) => (
            <View
              style={{
                width: width,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: scale(SPACING.space_12),
                borderRadius: scale(20),
                overflow: 'hidden',
              }}>
              {/* <View
                style={{
                  width: width * 0.6,
                  aspectRatio: 3 / 4,
                  backgroundColor: COLORS.White,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: scale(40),
                }}> */}
              <View>
                <FastImage
                  resizeMode="cover"
                  style={{
                    width: width * 0.6,
                    aspectRatio: 3 / 4,
                    borderRadius: scale(40),
                  }}
                  source={{
                    uri: item,
                  }}
                />
                <TouchableOpacity
                  onPress={() => handleItemToFavorites(item)}
                  style={{
                    position: 'absolute',
                    top: scale(SPACING.space_12),
                    right: scale(SPACING.space_8),

                    padding: scale(SPACING.space_4),
                    borderRadius: scale(BORDERRADIUS.radius_10),
                  }}>
                  <FontAwesome
                    name={isItemFavorite(item.id) ? 'heart' : 'heart-o'}
                    size={scale(FONTSIZE.size_16)}
                    color={COLORS.Black}
                  />
                </TouchableOpacity>
              </View>
              {/* </View> */}
            </View>
          )}
        />
        <View style={{flexDirection: 'row'}}>
          {images.map((_, index) => (
            <View
              key={index}
              style={{
                width: scale(10),
                height: scale(10),
                borderRadius: scale(5),
                backgroundColor:
                  index === indexFlatlist ? COLORS.White : COLORS.Grey,
                margin: scale(5),
              }}
            />
          ))}
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: scale(SPACING.space_24)}}>
        <CustomText
          style={{
            fontSize: scale(32),
            color: COLORS.White,
            fontFamily: 'KoHo-Bold',
            marginTop: scale(SPACING.space_12),
          }}>
          ${30}
        </CustomText>
        <CustomText
          style={{
            fontSize: scale(FONTSIZE.size_18),
            fontFamily: FONTFAMILY.KoHo_SemiBold,
            marginVertical: scale(SPACING.space_12),
            color: ' rgba(255, 255, 255, 0.8)',
          }}>
          Girl T-shirt
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            gap: scale(SPACING.space_12),
          }}>
          {['S', 'M', 'L'].map((size, index) => (
            <TouchableOpacity
              onPress={() => setIndexStyle(index)}
              key={index}
              style={{
                padding: scale(SPACING.space_8),
                borderRadius: scale(BORDERRADIUS.radius_10),
                borderColor: COLORS.White,
                borderWidth: 1,

                backgroundColor:
                  index === indexStyle ? COLORS.White : COLORS.Black,
              }}>
              <CustomText
                style={{
                  color: index === indexStyle ? COLORS.Black : COLORS.White,
                  fontFamily: FONTFAMILY.KoHo_Bold,
                  paddingHorizontal: scale(SPACING.space_8),
                  fontSize: scale(FONTSIZE.size_18),
                }}>
                {size}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>
        <CustomText
          style={{
            fontFamily: FONTFAMILY.KoHo_Regular,

            fontSize: scale(FONTSIZE.size_18),
            marginTop: scale(SPACING.space_24),
          }}>
          {item.description}
        </CustomText>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: scale(SPACING.space_32),
        }}>
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          style={{
            backgroundColor: COLORS.Yellow,
            padding: scale(SPACING.space_16),
            borderRadius: scale(26),
            marginHorizontal: scale(SPACING.space_24),
            alignItems: 'center',
            marginTop: scale(SPACING.space_24),
          }}>
          <CustomText
            style={{
              color: COLORS.Black,
              fontFamily: FONTFAMILY.KoHo_Bold,
              fontSize: scale(FONTSIZE.size_14),
            }}>
            CheckOut
          </CustomText>
        </TouchableOpacity>
      </View>
      <ModalCheckout isModalVisible={isVisible} setVisiblity={setIsVisible} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
});
