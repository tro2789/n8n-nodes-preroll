# n8n-nodes-preroll

n8n community node package for PreRoll (preroll.io) — podcast production management.

## Architecture

Thin typed wrapper around the PreRoll REST API. All operations use `httpRequestWithAuthentication` with the `preRollApi` credential type (Bearer token auth).

## Structure

```
src/
├── credentials/
│   └── PreRollApi.credentials.ts    # API key + base URL + test connection
└── nodes/PreRoll/
    ├── PreRoll.node.ts              # Main node (10 resources, ~25 operations)
    ├── PreRollTrigger.node.ts       # Webhook trigger (8 event types)
    ├── preroll.svg                  # Node icon
    └── resources/                   # Field definitions per resource
        ├── ClientDescription.ts
        ├── ShowDescription.ts
        ├── EpisodeDescription.ts
        ├── DeliverableDescription.ts
        ├── TagDescription.ts
        ├── MeetingNoteDescription.ts
        ├── PipelineStageDescription.ts
        ├── ActivityDescription.ts
        ├── AiDescription.ts
        └── DashboardDescription.ts
```

## Build

```bash
npm run build    # tsc + copy icons
```

## API Response Envelope

PreRoll wraps all responses in `{ data: ... }`. The `apiRequest` helper in `PreRoll.node.ts` unwraps this automatically.

## Testing

Test against dev PreRoll at `dev.preroll.io` with a dev API key. The local n8n instance is at `https://n8n.tohareprod.com`.
