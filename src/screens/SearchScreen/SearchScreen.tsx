import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import {COLORS} from '../../theme/theme';
import CustomTextInput from '../../components/CustomInput';
import {useForm, useWatch} from 'react-hook-form';
import Header from '../../components/AppHeader';
import {IProduct} from '../../interface/product';
import {useItem} from '../../Context/ListItemContext';
type FormValues = {
  search: string;
};
export default function SearchScreen() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      search: '',
    },
    mode: 'onSubmit',
  });

  const search = useWatch({
    control,
    name: 'search',
  });
  const {fetchItems} = useItem();
  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        input={true}
        children={
          <CustomTextInput
            placeholder="Search"
            control={control}
            name="search"
            inputContainerStyle={{
              borderColor: 'transparent',
            }}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
});
