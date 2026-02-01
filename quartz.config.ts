import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Iridescent",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-GB",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Bitcount Single",
        body: "Bitcount Single",
        code: "Bitcount Single",
      },
      colors: {
        lightMode: {
          // Surfaces
          light: "#FCFCFD",       // page background (clean, slightly cool)
          lightgray: "#EEF1F4",   // cards / separators
          gray: "#C7CDD6",        // borders / subtle UI
          darkgray: "#4B5563",    // muted text
          dark: "#111827",        // main text (high contrast)

          // Accents
          secondary: "#2563EB",   // links / primary actions (blue)
          tertiary: "#06B6D4",    // accents / tags (cyan)

          // Highlights
          highlight: "rgba(37, 99, 235, 0.10)",   // hover bg / block highlight
          textHighlight: "#FDE68A",               // text marker highlight
        },
        darkMode: {
          // Surfaces
          light: "#0B1220",       // page background (deep navy)
          lightgray: "#111B2E",   // cards / elevated surfaces
          gray: "#22304A",        // borders / separators
          darkgray: "#C7D2E0",    // muted text (still readable)
          dark: "#F3F4F6",        // main text

          // Accents
          secondary: "#60A5FA",   // links / primary actions (soft blue)
          tertiary: "#22D3EE",    // accents / tags (bright cyan)

          // Highlights
          highlight: "rgba(96, 165, 250, 0.14)",  // hover bg / block highlight
          textHighlight: "#FBBF24AA",             // translucent warm marker
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
