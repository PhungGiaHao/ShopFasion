import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import CustomProductItem from '../../components/CustomProductItem';
import {scale} from 'react-native-size-matters';
import {IProduct} from '../../interface/product';
import {SPACING} from '../../theme/theme';
import {useItem} from '../../Context/ListItemContext';

export default function ListSearch() {
  const renderItem = ({item, index}: {item: IProduct; index: number}) => {
    return <CustomProductItem item={item} index={index} />;
  };
  const {itemSearch} = useItem();

  return (
    <FlatList
      data={itemSearch}
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
