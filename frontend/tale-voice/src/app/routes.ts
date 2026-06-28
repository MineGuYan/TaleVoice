import { createElement } from "react";
import { Navigate, Outlet, createBrowserRouter, useLocation } from "react-router";
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

function RequireAuth() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    const redirect = encodeURIComponent(`${location.pathname}${location.search}`);
    return createElement(Navigate, { replace: true, to: `/login?redirect=${redirect}` });
  }

  return createElement(Outlet);
}

function PublicOnly() {
  const token = localStorage.getItem("token");
  if (token) return createElement(Navigate, { replace: true, to: "/" });
  return createElement(Outlet);
}

export const router = createBrowserRouter([
  {
    Component: RequireAuth,
    children: [
      {
        path: "/",
        Component: HomeModalDismiss,
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
    ],
  },
  {
    Component: PublicOnly,
    children: [
      {
        path: "/login",
        Component: LoginCentered,
      },
      {
        path: "/register",
        Component: RegisterCentered,
      },
    ],
  },
  {
    path: "*",
    Component: () => createElement(Navigate, { replace: true, to: "/" }),
  },
]);
