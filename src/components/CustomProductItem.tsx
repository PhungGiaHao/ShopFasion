import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {scale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  SPACING,
  COLORS,
  BORDERRADIUS,
  FONTSIZE,
  FONTFAMILY,
} from '../theme/theme';
import CustomText from './CustomText';
import {IProduct} from '../interface/product';
import {useItem} from '../Context/ListItemContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
interface CustomProductItemProps {
  item: IProduct;
  index: number;
}
export default function CustomProductItem(props: CustomProductItemProps) {
  const {item, index} = props;
  const {width, height} = Dimensions.get('window');
  const {handleItemToFavorites, isItemFavorite} = useItem();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', {item})}
      style={{
        marginTop: index % 2 === 0 ? 0 : scale(SPACING.space_24),
      }}>
      <View
        style={{
          marginVertical: scale(8),
          borderRadius: scale(30),
          backgroundColor: COLORS.Black,
          justifyContent: 'center',
          width: width / 3,
          alignItems: 'center',
        }}>
        <FastImage
          style={{
            width: width / 3,
            aspectRatio: 2 / 3,
            marginHorizontal: scale(2),
            backgroundColor: 'white',
            borderRadius: scale(BORDERRADIUS.radius_20),
          }}
          source={{
            uri: item.image,
          }}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={() => handleItemToFavorites(item)}
          style={{
            position: 'absolute',
            top: scale(SPACING.space_8),
            right: scale(SPACING.space_4),

            padding: scale(SPACING.space_4),
            borderRadius: scale(BORDERRADIUS.radius_10),
          }}>
          <FontAwesome
            name={isItemFavorite(item.id) ? 'heart' : 'heart-o'}
            size={scale(FONTSIZE.size_16)}
            color={COLORS.Black}
          />
        </TouchableOpacity>
        <CustomText
          style={{
            fontSize: scale(22),
            color: COLORS.White,
            marginLeft: scale(SPACING.space_12),
            alignSelf: 'flex-start',
            fontFamily: FONTFAMILY.KoHo_Bold,
          }}>
          ${item.price}
        </CustomText>
        <CustomText
          style={{
            fontSize: scale(FONTSIZE.size_16),
            color: COLORS.White,
            marginTop: scale(SPACING.space_4),
          }}>
          {item.title}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
}
