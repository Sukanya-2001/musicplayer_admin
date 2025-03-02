import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
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
  { name: "Albums", route: "/dashboard/albums", icon: LanguageIcon }
];

export const sideSecondItems: SidebarItem[] = [
  { name: "Recently Added", route: "/recent", icon: LibraryAddOutlinedIcon },
  { name: "Most Played", route: "/most-played", icon: PlaylistPlayOutlinedIcon }
];

export const sideThirdItems: SidebarItem[] = [
  { name: "Favourite", route: "/favourite", icon: FavoriteOutlinedIcon },
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
