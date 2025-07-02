import { View, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { FC } from 'react';
import { Colors } from '../../themes/Colors';

const TabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: Colors.lightgrey,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        elevation: 2,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: string =
          options.tabBarLabel !== undefined
            ? String(options.tabBarLabel)
            : options.title !== undefined
            ? String(options.title)
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // ✅ Add Settings icon here
        const Icons: Record<string, string> = {
          Home: 'https://cdn-icons-png.flaticon.com/128/1946/1946436.png',
          List: 'https://cdn-icons-png.flaticon.com/128/1950/1950630.png',
          Profile: 'https://cdn-icons-png.flaticon.com/128/266/266033.png',
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1, // ✅ This ensures equal spacing
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: Icons[label] }}
              style={{
                height: 25,
                width: 25,
                tintColor: isFocused ? Colors.deepBlue : Colors.grey,
                resizeMode: 'contain',
                margin: 5,
              }}
            />

            <Text style={{ color: isFocused ? Colors.deepBlue : Colors.grey }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
