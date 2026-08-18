---
name: Expo preview startup
description: Startup timing behavior for Expo web previews in this workspace.
---

The first Expo web preview capture may show a blank page while Metro is still producing the initial router bundle, even when the workflow is healthy and there are no browser errors.

**Why:** The preview can be requested before the first full bundle is ready; a later capture after the bundle-complete log renders normally without code changes.

**How to apply:** For a new Expo artifact, start the managed workflow, wait for the initial `Web Bundled ...` log, then use the preview capture as the visual check. Do not change app routing based only on an early blank capture.

For large source writes through the durable JavaScript helper, avoid nested template-literal interpolation in the generator script; use concatenation or a direct patch when the source itself contains template strings.

**Why:** Nested interpolation can fail before any file is written, making the implementation appear partially applied even though the workspace is unchanged.

**How to apply:** Keep generated source strings interpolation-free where possible, then run the package typecheck immediately after the write.