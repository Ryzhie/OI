import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Shared components across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.Flex({
      components: [
        { Component: Component.PageTitle(), grow: true },
        { Component: Component.Search() },
        { Component: Component.Darkmode() },
      ],
    }),
  ],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/c2NmGqYCR6",
    },
  }),
}

// Layout for single notes
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.DesktopOnly(Component.Explorer()), // Keep explorer tucked on the left for desktop
    Component.MobileOnly(Component.Spacer()),
  ],
  right: [
    Component.DesktopOnly(Component.Graph()),      // Visual overview
    Component.DesktopOnly(Component.TableOfContents()), // Sticky nav for long reads
    Component.Backlinks(),                         // Show connections on both mobile/desktop
    Component.RecentNotes({ limit: 5 }),           // Discovery
  ],
}

// Layout for list pages (tags, folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [Component.Explorer()],
  right: [],
}