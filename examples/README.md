# Example Workflows

Ready-to-import n8n workflows that demonstrate common PreRoll.io automation patterns.

## Workflows

### Slack Notifications

**File:** [`slack-notifications.json`](./slack-notifications.json)

Get real-time Slack updates when things happen in PreRoll — episode status changes, publishes, deliverable submissions, approvals, and revision requests. Messages are formatted with context-appropriate emoji and details.

**Nodes used:** PreRoll.io Trigger → Code → Slack

**Setup:**
1. Import the workflow into n8n (Settings → Import from File)
2. Configure your PreRoll.io API credentials
3. Configure your Slack OAuth2 credentials
4. Change `#podcast-updates` to your Slack channel name
5. Activate the workflow

---

### Todoist Episode Tasks

**File:** [`todoist-episode-tasks.json`](./todoist-episode-tasks.json)

Automatically creates a Todoist task when a new episode is created in PreRoll (enters "submitted" status). Keeps your task list in sync with your production pipeline.

**Nodes used:** PreRoll.io Trigger → IF (filter new episodes) → Code → Todoist

**Setup:**
1. Import the workflow into n8n
2. Configure your PreRoll.io API credentials
3. Configure your Todoist OAuth2 credentials
4. Select your Todoist project in the "Create Todoist Task" node
5. Activate the workflow

**Customization ideas:**
- Change the IF condition to trigger on different statuses (`editing`, `review`, etc.)
- Add a due date based on the episode's scheduled publish date
- Create subtasks for each production step (record, edit, review, publish)

---

## Webhook Payload Reference

The PreRoll.io Trigger receives payloads in this format:

```json
{
  "id": "delivery-uuid",
  "event": "episode.status_changed",
  "created_at": "2026-05-18T12:00:00.000Z",
  "data": { ... }
}
```

### Episode Events

**`episode.status_changed`**
```json
{
  "episode_id": "uuid",
  "show_id": "uuid",
  "title": "Episode Title",
  "old_status": "submitted",
  "new_status": "editing"
}
```

**`episode.stage_changed`**
```json
{
  "episode_id": "uuid",
  "show_id": "uuid",
  "title": "Episode Title",
  "old_stage_id": "uuid",
  "new_stage_id": "uuid",
  "stage_name": "Stage Name"
}
```

**`episode.published` / `episode.scheduled`**
```json
{
  "episode_id": "uuid",
  "show_id": "uuid",
  "title": "Episode Title",
  "provider": "transistor",
  "transistor_episode_id": "12345",
  "media_url": "https://...",
  "share_url": "https://...",
  "scheduled_at": "2026-06-01T10:00:00Z"
}
```

### Deliverable Events

**`deliverable.submitted`**
```json
{
  "deliverable_id": "uuid",
  "show_id": "uuid",
  "episode_id": "uuid",
  "title": "Deliverable Title",
  "type": "rough_cut"
}
```

**`deliverable.approved` / `deliverable.revision_requested`**
```json
{
  "deliverable_id": "uuid",
  "show_id": "uuid",
  "episode_id": "uuid",
  "title": "Deliverable Title",
  "type": "rough_cut",
  "status": "approved",
  "reviewer_notes": "Looks great!"
}
```

**`deliverable.resubmitted`**
```json
{
  "deliverable_id": "uuid",
  "show_id": "uuid",
  "episode_id": "uuid",
  "title": "Deliverable Title",
  "type": "rough_cut"
}
```
