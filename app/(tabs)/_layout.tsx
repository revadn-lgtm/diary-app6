
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#D47596',
        tabBarInactiveTintColor: '#A99AA1',

        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F2D6DF',
          height: 85,
          paddingTop: 8,
          paddingBottom: 10,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },

        headerStyle: {
          backgroundColor: '#FFFFFF',
        },

        headerTintColor: '#4A4045',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={String(color)}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: 'Tambah',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={size}
              color={String(color)}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorit',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={size}
              color={String(color)}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Pengaturan',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={size}
              color={String(color)}
            />
          ),
        }}
      />
    </Tabs>
  );
}
