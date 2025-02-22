import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';

import { Container } from '~/components/Container';
import { supabase } from '~/lib/supabase';

const popularChannels = [
  {
    id: '1',
    name: 'MKBHD',
    handle: '@MKBHD',
    image: 'https://yt3.googleusercontent.com/lkH37D712tiyphnu0Id0D5MwwQ7IRuwgQLVD05iMXlDWO-kDHut3uI4MgIEAQ9StK1b66O24=s176-c-k-c0x00ffffff-no-rj',
  },
  {
    id: '2',
    name: 'Fireship',
    handle: '@Fireship',
    image: 'https://yt3.googleusercontent.com/ytc/AIf8zZTUVa5AeFd3YYJmg6nKn2QjT2_QIxgHHi2P8ejWig=s176-c-k-c0x00ffffff-no-rj',
  },
  // Add more popular channels as needed
];

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const [url, setUrl] = useState('');


  const startAnalyzing = async () => {
    const {error, data} = await supabase.functions.invoke('trigger_collection_api',
    { body: {url}
  });
  console.log('error: ', error);
  console.log('data: ', data);
};

  const [recentSearches, setRecentSearches] = useState([
    { name: 'Theo - t3.gg', handle: '@t3dotgg', timestamp: '2h ago' },
    { name: 'Vercel', handle: '@vercel', timestamp: '1d ago' },
  ]);

  const handleSearch = () => {
    if (searchInput.trim()) {
      router.push('/channel');
      // Add to recent searches logic here
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <Stack.Screen options={{ title: 'YouTube Analysis' }} />
      <Container>
        {/* Hero Section */}
        <View className="py-16">
          <Text className="text-4xl font-bold text-center mb-3">
            YouTube Channel Analysis
          </Text>
          <Text className="text-gray-600 text-center text-lg mb-12">
            Get detailed insights about any YouTube channel
          </Text>

          {/* Enhanced Search Input */}
          <View className="shadow-2xl">
            <View className="bg-white rounded-2xl p-6 border border-gray-100">
              <Text className="text-gray-700 font-medium mb-2">
                Enter channel details
              </Text>
              <View className="bg-gray-50 rounded-xl p-4 flex-row items-center border border-gray-100">
                <TextInput
                  placeholder="Paste YouTube channel URL or @handle"
                  value={url}
                  onChangeText={setUrl}
                  onSubmitEditing={startAnalyzing}
                  className="flex-1 text-base"
                  placeholderTextColor="#666"
                />
                <Pressable
                  onPress={startAnalyzing}
                  className={`px-8 py-3 rounded-lg ml-2 ${
                    isLoading ? 'bg-gray-400' : 'bg-red-600'
                  }`}
                >
                  <Text className="text-white font-semibold text-base">
                    {isLoading ? 'Analyzing...' : 'Analyze'}
                  </Text>
                </Pressable>
              </View>
              {error && (
                <Text className="text-red-500 mt-2 text-sm">
                  {error}
                </Text>
              )}
            </View>
          </View>

          {/* Popular Channels */}
          <View className="mt-12">
            <Text className="text-xl font-semibold mb-4">Popular Channels</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {popularChannels.map((channel) => (
                <Pressable
                  key={channel.id}
                  className="mr-4 items-center"
                  onPress={() => router.push('/channel')}
                >
                  <Image
                    source={{ uri: channel.image }}
                    className="w-20 h-20 rounded-full mb-2"
                  />
                  <Text className="font-medium text-center">{channel.name}</Text>
                  <Text className="text-gray-600 text-sm">{channel.handle}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Recent Searches */}
          <View className="mt-12">
            <Text className="text-xl font-semibold mb-4">Recent Searches</Text>
            {recentSearches.map((search, index) => (
              <Pressable
                key={index}
                className="flex-row items-center py-3 border-b border-gray-100"
                onPress={() => router.push('/channel')}
              >
                <View className="flex-1">
                  <Text className="font-medium">{search.name}</Text>
                  <Text className="text-gray-600 text-sm">{search.handle}</Text>
                </View>
                <Text className="text-gray-400 text-sm">{search.timestamp}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Container>
    </ScrollView>
  );
}
