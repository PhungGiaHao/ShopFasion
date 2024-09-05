import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import CategoryContext, {useCategory} from '../../Context/CategoryContext';
import CustomText from '../../components/CustomText';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import {scale} from 'react-native-size-matters';
import {useItem} from '../../Context/ListItemContext';

export default function Category() {
  const {listCategory, fetchCategory} = useCategory();
  const {fetchItemsByCategory, fetchItems} = useItem();
  const [active, setActive] = React.useState(0);
  useEffect(() => {
    fetchCategory();
  }, []);
  const selectedCategory = (index: number, name: string) => {
    setActive(index);
    scrollToIndex(index);
    if (index === 0) {
      fetchItems();
    } else {
      fetchItemsByCategory(name);
    }
  };

  //SCroll to index
  const flatListRef = React.useRef<FlatList>(null);
  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({index: index, animated: true});
  };
  return (
    <View style={{
        marginVertical: scale(SPACING.space_16),
    }}>
      <FlatList
        data={listCategory}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => selectedCategory(index, item)}>
            <View
              style={[styles.containerText, active === index && styles.active]}>
              <CustomText
                style={[styles.text, , active === index && styles.active]}>
                {item}
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerText: {
   
    paddingHorizontal: scale(SPACING.space_16),
    marginHorizontal: scale(SPACING.space_8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(BORDERRADIUS.radius_10),
  },
  text: {
    fontFamily: FONTFAMILY.KoHo_Bold,
    fontSize: scale(FONTSIZE.size_18),
    padding: scale(SPACING.space_8),
  },
  active: {
    backgroundColor: COLORS.White,
    color: COLORS.Black,
  },
});
