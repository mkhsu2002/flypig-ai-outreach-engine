# FlyPig AI Outreach Engine v0.1.0

[English](README.md) | 繁體中文

一套讓 LLM 更有紀律地執行潛在客戶研究與資格判定的開源、LLM-native Skill 系統。

> LLM knows how. FlyPig makes sure the process actually requires it.
>
> LLM 本來就知道怎麼做；FlyPig 確保流程真的要求它去做。

## 先看這裡：這個 Repository 到底是什麼

FlyPig AI Outreach Engine Open Core 是一組讓 LLM 直接讀取與執行的 operating instructions、Skills、schemas、templates 與 validation cases。

它的預設使用方式，是讓 ChatGPT、Claude、OpenClaw、Hermes Agents 或其他能力足夠的 LLM / Agent 環境直接讀取這個 repository，並依照流程執行。

沒有需要安裝或部署的服務。

最低需求只有：

```text
一個能力足夠的 LLM / Agent
可使用目前公開 Web 資訊進行研究
你的公司 / 產品 / 市場背景
足以維持一份 canonical Tracker 的狀態延續能力
```

主要公開產出：

```text
Qualified Prospect Tracker
```

公開版流程就在這裡停止。

## 這個 Repository 不是什麼

這個 Open Core 不是：

```text
Web scraper
LinkedIn automation tool
Lead-harvesting crawler
Email personalization engine
Cold-email sender
Multi-channel outreach platform
Inbox / reply tracking system
CRM execution service
Python service
n8n workflow
Docker application
SaaS runtime
```

Open Core 不需要：

```text
Python
Node.js
Docker
Docker Compose
n8n
SMTP
SendGrid
Apollo
SerpAPI
Apify
特定的 OpenAI API Key
FlyPig API
FlyPig server
FlyPig 專用 UI
Multi-Agent Framework
```

如果某個 AI 把這個 repository 解讀成需要部署的 Python / n8n / Docker Outreach 系統，或聲稱它會自動抓 LinkedIn、產生個人化冷郵件、寄信或追蹤回覆，那都不是 public v0.1.0 Open Core 的正確解讀。

Authoritative scope boundary 也請參考 `AGENTS.md` 與 `docs/04_REQUIREMENTS.md`。

## 為什麼會有這個專案

FlyPig 很早就開始大量使用通用 LLM 來進行海外市場開發、合作夥伴研究、潛在客戶搜尋與 Business Outreach。

而實際成果經常比預期更好。

真正的問題，是當同一個任務需要持續很多輪研究之後才開始出現。

隨著 context 越來越長，工作可能逐漸發生漂移：

```text
原本鎖定的目標角色慢慢被放寬
Evidence 標準開始不一致
原本找 distributor，後來 retailer 也被放進來
Manufacturer 被當成可能的 buyer
已經排除過的公司又重新被找到
Fact 和 hypothesis 開始混在一起
最初的市場開發目標變得越來越模糊
```

這種研究漂移也會一路污染後續商務溝通。即使文字本身寫得很流暢，如果底層研究把 distributor、retailer、manufacturer、integrator 或 buyer 搞錯，整個商業語境仍然可能錯誤。

FlyPig 因此被建立出來，用來讓重要的研究檢查持續存在，而不是期待模型在一個很長的任務中自己一直記得。

詳見 `docs/15_WHY_FLYPIG_EXISTS.md`。

## 公開版工作流程

```text
Free-form Business Intent
        ↓
Mission Discovery
        ↓
Tracker Setup
        ↓
Prospect Discovery
        ↓
Dedup Gate
        ↓
Discovery Diversity Check
        ↓
Account Research
        ↓
Qualification
        ↓
Prospect Audit
        ↓
Contact Verification
        ↓
Qualified Prospect Tracker
```

任何 prospect 在沒有取得 `AUDIT_PASS` 前，都不能進入 `SHORTLIST_READY`。

## 主要產出：Qualified Prospect Tracker

Open Core 在整個 campaign 中維持一份 canonical Tracker。

流程一開始，LLM 應該提供一個簡單的儲存方式選擇：

```text
Google Sheets  有連線時建議使用
Local CSV      預設
Other          可選
```

如果使用者沒有選擇，就以：

`templates/PROSPECT_TRACKER.csv`

作為 local CSV 的預設結構。

Tracker 不是最後才匯出的一份一次性報告。Prospect Discovery 一開始就會建立／更新資料，後續 Skills 持續修改同一批 canonical records。

PASS、HOLD、SECONDARY 也會保留成研究記憶，不會只留下漂亮的 shortlist。

詳見 `docs/13_PROSPECT_TRACKER.md`。

## 強制可靠性控制

Open Core 要求以下行為：

1. 每個 campaign 維持一份 canonical Tracker
2. 建立新的 canonical prospect row 前必須先 Dedup
3. Qualification 前必須先有 Evidence
4. Verified facts、hypotheses、unknowns、contradictory evidence 必須分開保存
5. Search space 過早收斂前必須執行 Discovery Diversity Check
6. 每一個 `QUALIFIED` prospect 都必須執行 skeptical Prospect Audit
7. Audit 必須主動嘗試推翻前一次 Qualification，而不是替它辯護
8. 預設每研究完 5 個新 prospects 就執行一次 batch review
9. Commercial fit 與 contact-route suitability 必須分開判斷
10. 必須有明確 stop conditions
11. Stage gate 採 fail-closed 原則
12. Validation run 使用詳細 Execution Log

同一個 LLM 可以依序執行所有角色。Multi-Agent orchestration 是可選，不是必要條件。

## 公開 Skills

```text
mission-discovery
prospect-discovery
account-research
qualification
prospect-audit
contact-verification
```

`mission-planner` 僅保留作為舊版本引用的 compatibility alias。

所有 Skills 都遵循 `skills/INTERACTION_PROTOCOL.md`。

## Prospect Audit

Qualification 刻意不是最終決策。

當 prospect 被標記為 `QUALIFIED` 後，Audit Skill 會切換判斷立場：

```text
Qualification:
Why is this account strong enough to continue?
為什麼這家公司值得繼續？

Prospect Audit:
Assume that decision may be wrong. What would break it?
假設剛才的決定可能是錯的，什麼證據會推翻它？
```

Audit outcomes 包含：

```text
AUDIT_PASS
RESEARCH_REPAIR
DOWNGRADE_SECONDARY
HOLD
PASS
DUPLICATE_MERGE
```

## Adaptive collaboration

LLM 在每個階段從以下四種行動中選擇：

```text
RESEARCH
INFER
ASK
PROCEED
```

但這四種模式不能覆蓋或略過 mandatory gates。

- RESEARCH：如果公開資訊可以查到，就先研究，而不是要求使用者自己提供。
- INFER：可以建立有用的 working hypothesis，但不能把推論偷偷變成 verified fact。
- ASK：只有當答案取決於人的意圖、偏好、private context，或研究無法安全解決的重要歧義時才詢問。
- PROCEED：只有在目前 stage 已經 decision-ready 且必要檢查都完成後才往下走。

## 為什麼不直接叫 LLM 給我一份名單？

當然可以。

一個強大的 LLM 即使完全不用 FlyPig，也可以做出非常好的 prospect research。

我們真的做過對照測試。

一個全新的 GPT-5.6 Sol session，在正常 Web Research 環境下、完全不能讀 FlyPig Skills 的情況下，仍然做出了品質很好的加拿大市場策略與 15 家實用 prospect 名單。它甚至在 accelerator、community、amplification channel 的策略想像力上，比原本的 FlyPig Test 03 更廣。

但同一個 control run 的 Execution Notes 也明確記錄：它沒有執行正式 deduplication procedure、mandatory skeptical audit、state-transition process，也沒有維護包含 rejected prospects 的 persistent Tracker。

這正是 FlyPig 想解決的差異：

```text
Naked LLM
→ 可以做出很優秀的一次性研究成果

FlyPig
→ 把關鍵研究習慣變成流程強制要求的 operating discipline
```

Control Test 的結果也直接促使 Core 加入新的 Discovery Diversity Check。

詳見 `validation/control-test-03-naked-llm/COMPARISON.md`。

## 真實 Validation

Core 使用真實、當前的市場資訊進行測試。公開的 Golden Test artifacts 會在適當情況下遮蔽 prospect identifiers；完整 verification records 則保留在 private audit 中。

### Golden Test 01 — 日本戶外市場

測試：角色分類、Dedup、skeptical audit、contact-policy separation，以及長流程中的一致性。

強化版 v2 結果：

```text
44 material candidate mentions
34 unique canonical candidates
20 fully researched
15 QUALIFIED before audit
12 AUDIT_PASS
3 audit downgrades
12 final QUALIFIED / SHORTLIST_READY
```

### Golden Test 02 — 德國工業水質監測

測試市場證據是否能推翻／修正使用者最初的 route-to-market 假設。

```text
Mission v1: DISTRIBUTOR_FIRST
        ↓ evidence
Mission v2: CHANNEL_PLUS_INTEGRATION
```

最終結果：

```text
20 fully researched
12 QUALIFIED before audit
7 AUDIT_PASS
5 audit downgrades
7 final QUALIFIED / SHORTLIST_READY
```

### Golden Test 03 — FlyPig 用 FlyPig 找自己的採用者

測試在沒有預先定義 channel taxonomy 的情況下，系統能否自己找出有意義的 ICP。

```text
Mission v1: BROAD_ADOPTER_DISCOVERY
        ↓ evidence
Mission v2: SERVICE_MULTIPLIER_FIRST
```

最終結果：

```text
20 fully researched
18 QUALIFIED before audit
13 AUDIT_PASS
5 audit downgrades
13 final QUALIFIED / SHORTLIST_READY
```

### Naked LLM Control — Test 03

另外使用一個全新的 LLM session，處理相同商業問題，但在完成研究前禁止讀取 FlyPig methodology。

Control result 原樣保留，沒有事後硬套回 FlyPig 的格式。

結果很好，而且同時暴露了 FlyPig 的價值，以及原本 Discovery breadth 的一個弱點。

完整 Execution Logs、masked Trackers、case studies、limitations 與 control comparison，請見 `validation/README.md`。

## 五分鐘開始使用

沒有任何 installation step。

讓相容的 LLM 讀取這個 repository，接著可以直接這樣說：

```text
Use FlyPig AI Outreach Engine.

We sell commercial water-monitoring equipment. I want to explore Southeast Asia, but I am not sure whether the right targets are distributors, engineering partners, or direct industrial customers.

Help me clarify the mission.
Research public facts before asking me questions.
Build and maintain a Qualified Prospect Tracker.
Follow every mandatory dedup, diversity, evidence, audit, and batch-review gate.
Do not write or send outreach messages.
```

如果需要可以直接複製使用的 launcher，請用 `prompts/START_HERE.md`。

## 一筆好的 Tracker record 應保存什麼

```text
Organization identity
Canonical domain and aliases
Duplicate-check status
Business role
Discovery reason
Evidence
Verified facts
Working hypotheses
Contradictory evidence
Qualification status and reason
Confidence
Audit result and reason
Counter-evidence summary
Contact-policy precheck
Recommended contact function
Verified / unresolved / do-not-use contact route
Current state
Key uncertainty
Next recommended human action
```

## 跨 Chat、跨 Agent 的延續

一個 campaign 可以在不同 chats、models 或 agent environments 之間移動。

Handoff record 會保留 mission version、Tracker location、verified facts、evidence、hypotheses、contradictory evidence、之前的 user decisions、current decision，以及 next best action。

下一個 LLM 應該繼續使用同一份 Tracker，而不是重新做一遍研究。

詳見 `schemas/handoff.schema.yaml` 與 `prompts/HANDOFF.md`。

## Optional Knowledge Packs

Knowledge Packs 可以加入特定市場、產業或通路的 intelligence。

它們是可選的，而且不是主要的 Free / Paid boundary。

即使完全沒有 Knowledge Pack，Open Core 本身仍然應該可以獨立產生實際價值。

詳見 `docs/10_KNOWLEDGE_PACK_INTERFACE.md`。

## Open Core 邊界

public v0.1.0 repository 的終點，是完成研究、Audit、並保留 contact-route 狀態的 Qualified Prospect Tracker。

後續 message preparation、sending、mailbox / reply operations、follow-up 都不屬於這個 Open Core，也沒有在這個 repository 中實作。

產品邊界詳見 `docs/07_OPEN_CORE.md`。

## Landing Page 與 Test 分頁

靜態網站原始檔：

```text
docs/index.html
docs/test-01.html
docs/test-02.html
docs/test-03.html
```

網站只使用 HTML / CSS / JavaScript，不需要任何 build environment。

## Repository 結構

```text
QUICK_START.md
AGENTS.md

skills/
  INTERACTION_PROTOCOL.md
  mission-discovery/
  prospect-discovery/
  account-research/
  qualification/
  prospect-audit/
  contact-verification/

schemas/
  campaign.schema.yaml
  prospect.schema.yaml
  handoff.schema.yaml
  state-machine.yaml

docs/
  index.html
  test-01.html
  test-02.html
  test-03.html
  00_OVERVIEW.md
  01_NO_CODE_GUIDE.md
  02_ARCHITECTURE.md
  03_WORKFLOW.md
  04_REQUIREMENTS.md
  05_RESPONSIBLE_OUTREACH.md
  06_INTEGRATIONS.md
  07_OPEN_CORE.md
  08_GLOSSARY.md
  09_FAQ.md
  10_KNOWLEDGE_PACK_INTERFACE.md
  11_LLM_COWORK_MODE.md
  12_LLM_CONFORMANCE.md
  13_PROSPECT_TRACKER.md
  14_PROCESS_RELIABILITY.md
  15_WHY_FLYPIG_EXISTS.md

prompts/
  START_HERE.md
  HANDOFF.md
  LOAD_KNOWLEDGE_PACK.md

templates/
  CAMPAIGN_BRIEF.md
  PROSPECT_TRACKER.csv
  EXECUTION_LOG.md
  CAMPAIGN_REPORT.md
  KNOWLEDGE_PACK_MANIFEST.yaml

validation/
  README.md
  golden-test-01-japan-outdoor/
  golden-test-01-japan-outdoor-v2/
  golden-test-02-germany-water/
  golden-test-03-flypig-canada/
  control-test-03-naked-llm/
```

## Responsible Use

這個專案用於合法的商業研究與專業市場開發。

使用者必須自行遵守其所在司法管轄區適用的 privacy、communications、anti-spam、platform 及 industry rules。

不得虛構身份或關係、蒐集 private contact data、猜測 private email、繞過已公開的 contact restrictions，或錯誤陳述研究結果。

詳見 `docs/05_RESPONSIBLE_OUTREACH.md`。

## License

Core 採用 Apache License 2.0。詳見 `LICENSE` 與 `NOTICE`。

FlyPig AI 名稱、Logo 與產品識別屬於獨立的 trademark boundary。詳見 `TRADEMARKS.md`。

## 從這裡開始

Business user：`QUICK_START.md`

LLM / Agent operator：`prompts/START_HERE.md`

AI interpretation boundary：`AGENTS.md`

為什麼有 FlyPig：`docs/15_WHY_FLYPIG_EXISTS.md`

Process reliability：`docs/14_PROCESS_RELIABILITY.md`

Tracker behavior：`docs/13_PROSPECT_TRACKER.md`

Validation：`validation/README.md`

Version: 0.1.0
