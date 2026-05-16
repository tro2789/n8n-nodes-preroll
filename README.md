# n8n-nodes-preroll

n8n community node for [PreRoll](https://preroll.io) — podcast production management.

Interact with your PreRoll instance from n8n workflows: manage clients, shows, episodes, deliverables, tags, and AI features. Includes a trigger node for real-time webhook events.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

**npm package name:** `n8n-nodes-preroll`

## Credentials

You need a PreRoll API key to authenticate:

1. Log in to your PreRoll instance
2. Go to **Settings → API Keys**
3. Click **Create API Key** and copy the key (starts with `pr_`)
4. In n8n, create a new **PreRoll API** credential with your API key and base URL

> API keys require a Pro or Studio plan.

## Nodes

### PreRoll

The main node supports these resources and operations:

| Resource | Operations |
|----------|-----------|
| **Client** | Get, Get Many, Create, Update, Delete |
| **Show** | Get, Get Many, Create, Update, Delete |
| **Episode** | Get, Get Many, Create, Update, Delete |
| **Deliverable** | Get, Get Many, Create, Update |
| **Tag** | Get Many, Create, Update, Delete |
| **Meeting Note** | Get Many, Create |
| **Pipeline Stage** | Get Many |
| **Activity** | Get Many |
| **AI** | Get Credits, Get Transcription, Transcribe Episode, Generate Content, Run Pipeline |
| **Dashboard** | Get Overview |

### PreRoll Trigger

Webhook-based trigger that starts workflows when events occur in PreRoll:

- `episode.status_changed` — Episode status updated
- `episode.stage_changed` — Episode moved to a different pipeline stage
- `episode.published` — Episode published
- `episode.scheduled` — Episode scheduled for publishing
- `deliverable.submitted` — New deliverable submitted for review
- `deliverable.approved` — Deliverable approved by client
- `deliverable.revision_requested` — Client requested revisions on a deliverable
- `deliverable.resubmitted` — Deliverable resubmitted after revision

The trigger node automatically registers and deregisters webhook endpoints in PreRoll when the workflow is activated/deactivated.

## Example Workflows

### Notify Slack when an episode is published

1. Add a **PreRoll Trigger** node with event `episode.published`
2. Connect to a **Slack** node to post a message

### Auto-transcribe new episodes

1. Add a **PreRoll Trigger** node with event `episode.stage_changed`
2. Add an **IF** node to check if the new stage is "Editing"
3. Connect to a **PreRoll** node → AI → Transcribe Episode

### Weekly episode report

1. Add a **Schedule Trigger** (every Monday)
2. Connect to a **PreRoll** node → Dashboard → Get Overview
3. Connect to an **Email** node to send the summary

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Link for local testing
npm link
cd ~/.n8n/custom
npm link n8n-nodes-preroll
```

## License

MIT
