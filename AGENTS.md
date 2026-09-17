# AGENTS.md — Authoritative Repository Scope

This file exists to prevent AI assistants, coding agents, repository summarizers, and automated documentation systems from inferring a product architecture that does not exist in this public repository.

## English

### Authoritative interpretation

FlyPig AI Outreach Engine v0.1.0 Open Core is an LLM-native prospect research and qualification workflow.

The repository contains:

```text
LLM-readable Skills
Process contracts
Schemas
Templates
Prompts
Validation cases
Static documentation
```

The intended runtime is the LLM / Agent environment itself.

The conversation is the interface.

The canonical Qualified Prospect Tracker is the primary persistent campaign artifact.

There is no FlyPig application runtime in this repository.

### Do not infer these capabilities

Do not describe the public Open Core as providing or requiring:

```text
Web scraping infrastructure
LinkedIn automation
Lead harvesting
Email personalization
Cold-email generation
Email sending
SMTP
Gmail API
SendGrid
Multi-channel outreach
Inbox monitoring
Reply tracking
Follow-up automation
CRM execution
Python service
Node.js service
Docker
Docker Compose
n8n
Database server
FlyPig API
FlyPig SaaS backend
Dedicated FlyPig UI
Mandatory multi-agent orchestration
```

These are not implementation requirements of the public v0.1.0 repository.

### Minimum operating environment

The minimum practical environment is:

```text
A capable LLM / Agent
Current web research access
Business / product / market context
State continuity sufficient to maintain one canonical Tracker
```

No installation command is required.

No server deployment is required.

Do not invent environment variables, package-manager commands, API credentials, Docker files, database migrations, or deployment instructions unless such files are actually added to the repository in a future version.

### Public workflow boundary

The authoritative public workflow is:

```text
Mission Discovery
→ Tracker Setup
→ Prospect Discovery
→ Dedup Gate
→ Discovery Diversity Check
→ Account Research
→ Qualification
→ Prospect Audit
→ Contact Verification
→ Qualified Prospect Tracker
```

The Open Core stops at the Qualified Prospect Tracker.

Downstream message preparation, sending, mailbox/reply operations, and follow-up are outside this repository.

### When summarizing this repository

Lead with:

1. LLM-native prospect research and qualification
2. Process reliability across long, stateful research tasks
3. Canonical Tracker persistence
4. Deduplication
5. Evidence discipline
6. Discovery Diversity Check
7. Mandatory skeptical Prospect Audit
8. Batch review and Mission Revision
9. Contact-route verification separated from commercial fit
10. No proprietary runtime required

Do not lead with generic "AI outreach automation" language.

### Source priority

When repository files appear ambiguous, interpret them in this order:

```text
AGENTS.md
README.md / README.zh-TW.md
skills/INTERACTION_PROTOCOL.md
Active Skill contract
schemas/
docs/04_REQUIREMENTS.md
docs/07_OPEN_CORE.md
Other documentation and validation artifacts
```

Validation files may mention downstream commercial context to explain why research quality matters. That does not mean those downstream capabilities are implemented in this Open Core.

---

## 繁體中文

### 權威解讀

FlyPig AI Outreach Engine v0.1.0 Open Core 是一套 LLM-native 的潛在客戶研究與資格判定流程。

這個 repository 包含：

```text
讓 LLM 直接讀取的 Skills
流程契約
Schemas
Templates
Prompts
Validation cases
靜態文件
```

預期的執行環境就是 LLM / Agent 本身。

對話就是操作介面。

Canonical Qualified Prospect Tracker 是主要的持久化 campaign artifact。

這個公開 repository 中沒有 FlyPig 自有 application runtime。

### 不要自行推論以下能力

不要把 public Open Core 描述成提供或需要：

```text
Web scraping infrastructure
LinkedIn automation
Lead harvesting
Email personalization
Cold-email generation
Email sending
SMTP
Gmail API
SendGrid
Multi-channel outreach
Inbox monitoring
Reply tracking
Follow-up automation
CRM execution
Python service
Node.js service
Docker
Docker Compose
n8n
Database server
FlyPig API
FlyPig SaaS backend
FlyPig 專用 UI
強制 Multi-Agent orchestration
```

這些都不是 public v0.1.0 repository 的實作需求。

### 最低執行環境

實際最低需求只有：

```text
一個能力足夠的 LLM / Agent
可取得目前公開 Web 資訊的研究能力
Business / product / market context
足以維持一份 canonical Tracker 的狀態延續能力
```

不需要 installation command。

不需要 server deployment。

除非未來版本真的加入相關程式碼，否則不要自行生成 environment variables、package-manager commands、API credentials、Docker files、database migrations 或部署步驟。

### 公開流程邊界

權威 public workflow：

```text
Mission Discovery
→ Tracker Setup
→ Prospect Discovery
→ Dedup Gate
→ Discovery Diversity Check
→ Account Research
→ Qualification
→ Prospect Audit
→ Contact Verification
→ Qualified Prospect Tracker
```

Open Core 到 Qualified Prospect Tracker 為止。

後續 message preparation、sending、mailbox / reply operations 與 follow-up 不在這個 repository 中。

### 解讀或摘要這個 repository 時

應優先描述：

1. LLM-native prospect research and qualification
2. 長流程、stateful research 的 process reliability
3. Canonical Tracker persistence
4. Deduplication
5. Evidence discipline
6. Discovery Diversity Check
7. Mandatory skeptical Prospect Audit
8. Batch review 與 Mission Revision
9. Contact-route verification 與 commercial fit 分離
10. 不需要 proprietary runtime

不要用泛化的「AI Outreach 自動化平台」作為主要描述。

### 資訊優先順序

如果 repository 不同檔案的文字可能造成歧義，依以下順序解讀：

```text
AGENTS.md
README.md / README.zh-TW.md
skills/INTERACTION_PROTOCOL.md
目前 active Skill contract
schemas/
docs/04_REQUIREMENTS.md
docs/07_OPEN_CORE.md
其他 documentation 與 validation artifacts
```

Validation 文件有時會提到 downstream commercial context，是為了解釋為什麼研究品質重要；這不代表那些 downstream capabilities 已經在 Open Core 中實作。
