import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    // Desktop header: title left, controls right
    Component.DesktopOnly(
      Component.Flex({
        components: [
          { Component: Component.PageTitle(), grow: true },
          { Component: Component.Search() },
          { Component: Component.Darkmode() },
        ],
      }),
    ),

    // Mobile header: stack for better responsiveness
    Component.MobileOnly(
      Component.Flex({
        components: [{ Component: Component.PageTitle(), grow: true }],
      }),
    ),
    Component.MobileOnly(Component.Spacer()),
    Component.MobileOnly(
      Component.Flex({
        components: [
          { Component: Component.Search(), grow: true },
          { Component: Component.Darkmode() },
        ],
      }),
    ),
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

    // Meta + tags stay near title (good on mobile)
    Component.ContentMeta(),
    Component.TagList(),

    // Mobile-only TOC: navigation without a right sidebar
    Component.MobileOnly(Component.Spacer()),
    Component.MobileOnly(Component.TableOfContents()),
    Component.MobileOnly(Component.Spacer()),
  ],

  // Left column: navigation; keep lightweight for mobile
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer(),
    Component.RecentNotes(),
    Component.MobileOnly(Component.Spacer()),
  ],

  // Right column: make these desktop-only to avoid mobile jank
  right: [
    Component.DesktopOnly(Component.Graph()),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.Backlinks()),
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),

    // Mobile-only TOC can still help on long list pages (optional but nice)
    Component.MobileOnly(Component.Spacer()),
    Component.MobileOnly(Component.TableOfContents()),
    Component.MobileOnly(Component.Spacer()),
  ],

  left: [
    // On list pages, keep title/search/darkmode as a mobile-friendly cluster too
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer(),
    Component.MobileOnly(Component.Spacer()),
  ],

  right: [],
}
