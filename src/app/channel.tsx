import { View, Text, Image } from 'react-native';

const channel = {
  input:{"url":"https://www.youtube.com/@jaidenanimations/about"},
  url:"https://www.youtube.com/@jaidenanimations/about",
  handle:"@jaidenanimations",
  handle_md5:"4e2083f32de8c4dca0e500600bd36486",
  banner_img:"https://yt3.googleusercontent.com/9b5DW0WsoUtzke1Q54ARDE26FqU4FXAgjnWKEihmDCgYAu2ZLN8qLhvD1WjQT-lFjDbg43HsHQ=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
  profile_image:"https://yt3.googleusercontent.com/6uDu4HmbcorfDWch6L4FAzv-DFMOstOwhTks-5VUm-kY5puZ_oU4EeA1YOqEM_EDvCTj3UPUW68=s160-c-k-c0x00ffffff-no-rj",
  name:"JaidenAnimations",
  subscribers:14300000,
  Description:"hi it's jaiden and bird\n\nchannel profile picture made by: me\nchannel banner art made by: https://twitter.com/motiCHIKUBI\n",
  videos_count:167,
  created_date:"2014-02-16T00:00:00.000Z",
  views:2798105165,
  Details:{"location":"United States"},
  Links:["jaidenanimations.com","twitch.tv/jaidenanimations","twitter.com/JaidenAnimation","instagram.com/jaiden_animations"],
  identifier:"UCGwu0nbY2wSkW8N-cghnLpA",
  id:"UCGwu0nbY2wSkW8N-cghnLpA",
  timestamp:"2025-02-22T05:10:47.421Z"
}

export default function Channel() {
  return (
    <View className="flex-1">
      {/* Banner Image */}
      <Image 
        source={{ uri: channel.banner_img }}
        className="w-full h-48 object-cover"
      />
      
      <View className="p-4">
        {/* Profile Section */}
        <View className="flex-row items-center gap-4">
          <Image 
            source={{ uri: channel.profile_image }}
            className="w-20 h-20 rounded-full"
          />
          <View className="flex-1">
            <Text className="text-2xl font-bold">{channel.name}</Text>
            <Text className="text-gray-600">{channel.handle}</Text>
            <Text className="text-gray-600">
              {(channel.subscribers / 1000000).toFixed(1)}M subscribers • {channel.videos_count.toLocaleString()} videos
            </Text>
          </View>
        </View>

        {/* Description */}
        <View className="mt-6">
          <Text className="text-gray-800 whitespace-pre-line">{channel.Description}</Text>
        </View>

        {/* Stats */}
        <View className="mt-6 flex-row gap-6">
          <View>
            <Text className="text-gray-600">Joined</Text>
            <Text className="font-semibold">
              {new Date(channel.created_date).getFullYear()}
            </Text>
          </View>
          <View>
            <Text className="text-gray-600">Total Views</Text>
            <Text className="font-semibold">
              {(channel.views / 1000000000).toFixed(1)}B
            </Text>
          </View>
          <View>
            <Text className="text-gray-600">Location</Text>
            <Text className="font-semibold">{channel.Details.location}</Text>
          </View>
        </View>

        {/* Links */}
        <View className="mt-6">
          <Text className="font-semibold mb-2">Links</Text>
          {channel.Links.map((link, index) => (
            <Text key={index} className="text-blue-600">{link}</Text>
          ))}
        </View>
      </View>
    </View>
  );
}
