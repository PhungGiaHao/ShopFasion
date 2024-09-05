import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useItem} from '../../Context/ListItemContext';
import CustomText from '../../components/CustomText';
import {IProduct} from '../../interface/product';
import FastImage from 'react-native-fast-image';
import {scale} from 'react-native-size-matters';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomProductItem from '../../components/CustomProductItem';

export default function Product() {
  const {items, fetchItems,handleItemToFavorites,isItemFavorite} = useItem();
  const {width, height} = Dimensions.get('window');
  useEffect(() => {
    fetchItems();
  }, []);

  const renderItem = ({item, index}: {item: IProduct; index: number}) => {
    return (
    <CustomProductItem  item={item} index={index} />
    );
  };
  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      numColumns={2}
      keyExtractor={item => item.id.toString()}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        gap: scale(SPACING.space_24),
      }}
    />
  );
}

const styles = StyleSheet.create({});
