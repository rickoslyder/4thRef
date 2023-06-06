import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/chakra-ui";

import { ChakraProvider } from "@chakra-ui/react";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import {
  SportCreate, SportEdit, SportList, SportShow
} from "./pages/sports";
import { EventCreate, EventEdit, EventList, EventShow } from "./pages/events";
import { MatchCreate, MatchEdit, MatchList, MatchShow } from "./pages/matches";
import { ScoreCreate, ScoreEdit, ScoreList, ScoreShow } from "./pages/scores";
import { VoteCreate, VoteEdit, VoteList, VoteShow } from "./pages/votes";
import { supabaseClient } from "./utility";

const SITE_RESOURCES = [
  {
    name: "sports",
    list: "/sports",
    create: "/sports/create",
    edit: "/sports/edit/:id",
    show: "/sports/show/:id",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "events",
    list: "/events",
    create: "/events/create",
    edit: "/events/edit/:id",
    show: "/events/show/:id",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "matches",
    list: "/matches",
    create: "/matches/create",
    edit: "/matches/edit/:id",
    show: "/matches/show/:id",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "scores",
    list: "/scores",
    create: "/scores/create",
    edit: "/scores/edit/:id",
    show: "/scores/show/:id",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "votes",
    list: "/votes",
    create: "/votes/create",
    edit: "/votes/edit/:id",
    show: "/votes/show/:id",
    meta: {
      canDelete: true,
    },
  },
]

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        {/* You can change the theme colors here. example: theme={RefineThemes.Magenta} */}
        <ChakraProvider theme={RefineThemes.Blue}>
          <Refine
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerBindings}
            notificationProvider={notificationProvider}
            i18nProvider={i18nProvider}
            resources={SITE_RESOURCES}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2
                      Header={() => <Header sticky />}
                      Title={({ collapsed }) => (
                        <ThemedTitleV2
                          collapsed={collapsed}
                          text="4thRef: CrowdScoring Sports App"
                          icon={<AppIcon />}
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="blog_posts" />}
                />
                <Route path="/blog-posts">
                  <Route index element={<BlogPostList />} />
                  <Route path="create" element={<BlogPostCreate />} />
                  <Route path="edit/:id" element={<BlogPostEdit />} />
                  <Route path="show/:id" element={<BlogPostShow />} />
                </Route>
                <Route path="/categories">
                  <Route index element={<CategoryList />} />
                  <Route path="create" element={<CategoryCreate />} />
                  <Route path="edit/:id" element={<CategoryEdit />} />
                  <Route path="show/:id" element={<CategoryShow />} />
                </Route>
                <Route path="/sports">
                  <Route index element={<SportList />} />
                  <Route path="create" element={<SportCreate />} />
                  <Route path="edit/:id" element={<SportEdit />} />
                  <Route path="show/:id" element={<SportShow />} />
                </Route>
                <Route path="/events">
                  <Route index element={<EventList />} />
                  <Route path="create" element={<EventCreate />} />
                  <Route path="edit/:id" element={<EventEdit />} />
                  <Route path="show/:id" element={<EventShow />} />
                </Route>
                <Route path="/matches">
                  <Route index element={<MatchList />} />
                  <Route path="create" element={<MatchCreate />} />
                  <Route path="edit/:id" element={<MatchEdit />} />
                  <Route path="show/:id" element={<MatchShow />} />
                </Route>
                <Route path="/scores">
                  <Route index element={<ScoreList />} />
                  <Route path="create" element={<ScoreCreate />} />
                  <Route path="edit/:id" element={<ScoreEdit />} />
                  <Route path="show/:id" element={<ScoreShow />} />
                </Route>
                <Route path="/votes">
                  <Route index element={<VoteList />} />
                  <Route path="create" element={<VoteCreate />} />
                  <Route path="edit/:id" element={<VoteEdit />} />
                  <Route path="show/:id" element={<VoteShow />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      title={
                        <ThemedTitleV2
                          collapsed={false}
                          text="4thRef: CrowdScoring Sports App"
                          icon={<AppIcon />}
                        />
                      }
                      formProps={{
                        defaultValues: {
                          email: "info@refine.dev",
                          password: "refine-supabase",
                        },
                      }}
                    />
                  }
                />
                <Route
                  path="/register"
                  element={<AuthPage type="register" />}
                />
                <Route
                  path="/forgot-password"
                  element={<AuthPage type="forgotPassword" />}
                />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ChakraProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
