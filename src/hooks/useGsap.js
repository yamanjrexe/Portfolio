// GSAP & plugins are loaded from <script> tags in public/index.html.
const gsap = typeof window !== "undefined" ? window.gsap : undefined;
const ScrollTrigger = typeof window !== "undefined" ? window.ScrollTrigger : undefined;
const ScrollToPlugin = typeof window !== "undefined" ? window.ScrollToPlugin : undefined;
const ScrollSmoother = typeof window !== "undefined" ? window.ScrollSmoother : undefined;
const SplitText = typeof window !== "undefined" ? window.SplitText : undefined;

if (gsap) {
    const plugins = [ScrollTrigger, ScrollToPlugin, ScrollSmoother, SplitText].filter(Boolean);
    if (plugins.length) gsap.registerPlugin(...plugins);
} else {
}

export { gsap, ScrollTrigger, ScrollToPlugin, ScrollSmoother, SplitText };