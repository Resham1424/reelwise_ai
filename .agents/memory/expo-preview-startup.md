---
name: Expo preview startup
description: Startup timing behavior for Expo web previews in this workspace.
---

The first Expo web preview capture may show a blank page while Metro is still producing the initial router bundle, even when the workflow is healthy and there are no browser errors.

**Why:** The preview can be requested before the first full bundle is ready; a later capture after the bundle-complete log renders normally without code changes.

**How to apply:** For a new Expo artifact, start the managed workflow, wait for the initial `Web Bundled ...` log, then use the preview capture as the visual check. Do not change app routing based only on an early blank capture.