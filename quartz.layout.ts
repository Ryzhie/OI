import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    // Mobile header: stacks everything nicely in a smaller view
    Component.MobileOnly(
      Component.Flex({
        components: [
          { Component: Component.PageTitle(), grow: true },
          { Component: Component.Search() },
          { Component: Component.Darkmode() },
        ],
      }),
    ),

    // Desktop header: keeps search, darkmode on the right side (more spacious)
    Component.DesktopOnly(
      Component.Flex({
        components: [
          { Component: Component.PageTitle(), grow: true },
          { Component: Component.Search() },
          { Component: Component.Darkmode() },
        ],
      }),
    ),
    Component.MobileOnly(Component.Spacer()),
  ],
  afterBody: [],
  footer: Component.Footer({
    links: {},
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),

    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),

    // Mobile-only TOC: helps users navigate through content (compact and mobile-friendly)
    Component.MobileOnly(Component.TableOfContents()),

    Component.MobileOnly(Component.Spacer()), // Gives extra space for mobile content
  ],

  // Left column: keep light items like Explorer, but hide recent notes on mobile
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer(),
    Component.DesktopOnly(Component.RecentNotes()), // Keep RecentNotes for Desktop only
    Component.MobileOnly(Component.Spacer()),
  ],

  // Right column: include Graph in mobile view and hide bulky items on mobile
  right: [
    Component.MobileOnly(Component.Graph()),  // Graph is now visible on mobile
    Component.DesktopOnly(Component.Backlinks()), // Hide on mobile for smoother experience
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),

    // Mobile TOC for long lists of content
    Component.MobileOnly(Component.TableOfContents()),
  ],

  left: [
    // Keep the Explorer visible and accessible on mobile, but avoid extra elements
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer(),
    Component.MobileOnly(Component.Spacer()),
  ],

  right: [],
}
