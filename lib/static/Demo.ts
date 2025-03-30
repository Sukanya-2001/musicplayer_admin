import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import LanguageIcon from "@mui/icons-material/Language";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import React from "react";

// Define the type for the sidebar items
interface SidebarItem {
  name: string;
  route: string;
  icon: React.ElementType;
}

export const sideFirstItems: SidebarItem[] = [
  { name: "Dashboard", route: "/dashboard", icon: HomeIcon },
  { name: "Users", route: "/dashboard/users", icon: CollectionsOutlinedIcon },
  { name: "Songs", route: "/dashboard/songs", icon: PersonSearchOutlinedIcon },
  { name: "Artists", route: "/dashboard/artists", icon: ExploreIcon },
  { name: "Albums", route: "/dashboard/album", icon: LanguageIcon }
];

export const sideSecondItems: SidebarItem[] = [
  { name: "About", route: "/recent", icon: LibraryAddOutlinedIcon },
  { name: "Contact", route: "/most-played", icon: PlaylistPlayOutlinedIcon }
];

export const sideThirdItems: SidebarItem[] = [
  {
    name: "My Profile",
    route: "javascript:void(0)",
    icon: AccountCircleOutlinedIcon
  },
  { name: "Logout", route: "javascript:void(0)", icon: LogoutOutlinedIcon }
];
export const SongsData = [
  {
    name: "Sei tumi",
    artists: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    albums: "Local train",
    language: "Hindi",
    time: "03:14",
    date: "12 Feb, 2025"
  },
  {
    name: "Sei tumi",
    artists: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    albums: "Local train",
    language: "Hindi",
    time: "03:14",
    date: "12 Feb, 2025"
  },
  {
    name: "Sei tumi",
    artists: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    albums: "Local train",
    language: "Hindi",
    time: "03:14",
    date: "12 Feb, 2025"
  },
  {
    name: "Sei tumi",
    artists: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    albums: "Local train",
    language: "Hindi",
    time: "03:14",
    date: "12 Feb, 2025"
  },
  {
    name: "Sei tumi",
    artists: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    albums: "Local train",
    language: "Hindi",
    time: "03:14",
    date: "12 Feb, 2025"
  }
];

export const songCategories = [
  { value: "romantic", label: "❤️ Romantic" },
  { value: "sad", label: "😢 Sad" },
  { value: "lofi", label: "🎵 Lofi" },
  { value: "happy", label: "😊 Happy" },
  { value: "pop", label: "🎤 Pop" },
  { value: "rock", label: "🎸 Rock" },
  { value: "jazz", label: "🎷 Jazz" },
  { value: "classical", label: "🎼 Classical" },
  { value: "hiphop", label: "🎧 Hip-Hop" },
  { value: "instrumental", label: "🎻 Instrumental" },
  { value: "party", label: "🎉 Party" },
  { value: "chill", label: "🌙 Chill" },
  { value: "motivational", label: "🔥 Motivational" },
  { value: "devotional", label: "🙏 Devotional" },
  { value: "bollywood", label: "🎬 Bollywood" },
  { value: "kpop", label: "🎶 K-Pop" },
  { value: "folk", label: "🌾 Folk" }
];

