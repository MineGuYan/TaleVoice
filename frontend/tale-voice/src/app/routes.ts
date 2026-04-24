import { createBrowserRouter } from "react-router";
import { HomeModalDismiss } from "./components/HomeModalDismiss";
import { LoginCentered } from "./components/LoginCentered";
import { RegisterCentered } from "./components/RegisterCentered";
import { CreateStoryWideClean } from "./components/CreateStoryWideClean";
import { StoryDetailLogoSynced } from "./components/StoryDetailLogoSynced";
import { VoiceSelectionFixed } from "./components/VoiceSelectionFixed";
import { VoiceLab } from "./components/VoiceLab";
import { ImageGenerate } from "./components/ImageGenerate";
import { VideoFromImage } from "./components/VideoFromImage";
import { VideoMerge } from "./components/VideoMerge";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeModalDismiss,
  },
  {
    path: "/login",
    Component: LoginCentered,
  },
  {
    path: "/register",
    Component: RegisterCentered,
  },
  {
    path: "/create",
    Component: CreateStoryWideClean,
  },
  {
    path: "/story/:id",
    Component: StoryDetailLogoSynced,
  },
  {
    path: "/voice/:id",
    Component: VoiceSelectionFixed,
  },
  {
    path: "/voice-lab",
    Component: VoiceLab,
  },
  {
    path: "/image-generate/:id",
    Component: ImageGenerate,
  },
  {
    path: "/video-from-image/:id",
    Component: VideoFromImage,
  },
  {
    path: "/video-merge/:id",
    Component: VideoMerge,
  },
]);
