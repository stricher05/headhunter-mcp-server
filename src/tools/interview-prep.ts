/**
 * Interview Preparation Tool
 * Generates architecture scenarios, business cases, and strategic preparation
 */

import { z } from 'zod';

export interface InterviewPrepArgs {
  company: string;
  role: string;
  interview_type?: 'technical' | 'behavioral' | 'case_study' | 'comprehensive';
  focus_areas?: string[];
}

export interface Plan30_60_90Args {
  company: string;
  role: string;
  team_size?: number;
  key_challenges?: string[];
  focus_style?: 'transformation' | 'growth' | 'optimization' | 'startup';
}

export class InterviewPrepTool {
  async execute(args: InterviewPrepArgs) {
    const { company, role, interview_type = "comprehensive", focus_areas = ["architecture", "leadership", "strategy", "culture"] } = args;

    try {
      const preparation = await this.generateInterviewPreparation(company, role, interview_type, focus_areas);

      return {
        content: [
          {
            type: "text",
            text: preparation
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error generating interview preparation for ${company}: ${error instanceof Error ? error.message : String(error)}`
          }
        ],
        isError: true
      };
    }
  }

  async create30_60_90Plan(args: Plan30_60_90Args) {
    const { company, role, team_size, key_challenges = [], focus_style = "growth" } = args;

    try {
      const plan = await this.generate30_60_90Plan(company, role, team_size, key_challenges, focus_style);

      return {
        content: [
          {
            type: "text",
            text: plan
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error generating 30-60-90 day plan for ${company}: ${error instanceof Error ? error.message : String(error)}`
          }
        ],
        isError: true
      };
    }
  }

  private async generateInterviewPreparation(company: string, role: string, type: string, focusAreas: string[]) {
    const currentDate = new Date().toISOString().split('T')[0];

    const template = `# Interview Preparation Guide: ${role} at ${company}
**Preparation Date**: ${currentDate}
**Interview Type**: ${type}
**Focus Areas**: ${focusAreas.join(", ")}

---

## Executive Summary

This comprehensive interview preparation guide covers technical scenarios, leadership questions, and strategic business cases tailored for the ${role} position at ${company}.

**Preparation Philosophy**: Executive technology leaders must demonstrate technical depth, business acumen, and strategic vision. This guide balances all three areas.

---

## 1. Architecture Lab Scenarios

### Scenario A: Multi-Region Low Latency System
**Prompt**: "Design a globally distributed system with <50ms p99 read latency for ${company}'s core product."

**Key Constraints**:
- CAP theorem trade-offs in distributed environments
- Edge caching strategies and consistency models
- Schema evolution and backward compatibility
- Cross-region data synchronization

**Solution Framework**:
\`\`\`
Architecture Layers:
├── Edge Layer: CDN + Edge Computing (Regional caches)
├── API Gateway: Rate limiting, routing, authentication
├── Application Layer: Stateless microservices
├── Data Layer: Multi-master with conflict resolution
└── Monitoring: Real-time latency tracking across regions

Key Decisions:
1. Eventual consistency model for non-critical data
2. Synchronous replication for financial/critical operations
3. Edge computing for user-specific data processing
4. Circuit breakers for cascade failure prevention
\`\`\`

**Business Context**: "This architecture enables ${company} to expand globally while maintaining user experience quality, directly supporting international revenue growth."

### Scenario B: Cost-Optimized Scale (40% cost reduction, 3x growth)
**Prompt**: "Reduce infrastructure spend by 40% while supporting 3x user growth over 18 months."

**Solution Approach**:
\`\`\`
Cost Optimization Strategy:
├── Compute: Reserved instances + spot instances (30% savings)
├── Storage: Intelligent tiering + lifecycle policies (25% savings)
├── Network: Direct connects + CDN optimization (20% savings)
├── Databases: Read replicas + query optimization (35% savings)
└── Monitoring: Right-sizing + auto-scaling (40% savings)

Scaling Efficiency:
├── Horizontal auto-scaling with predictive algorithms
├── Microservices decomposition for independent scaling
├── Caching layers to reduce database load
└── Event-driven architecture for loose coupling
\`\`\`

**Business Impact**: "This approach improves gross margin from 75% to 82% while supporting aggressive growth targets."

### Scenario C: Governance at Speed
**Prompt**: "Implement comprehensive data governance without blocking development velocity."

**Solution Framework**:
\`\`\`
Governance Architecture:
├── Schema Registry: Centralized schema management
├── Policy Engine: Automated compliance checking
├── Audit Pipeline: Real-time governance monitoring
├── Data Catalog: Self-service data discovery
└── Privacy Controls: Automated PII detection/masking

Developer Experience:
├── Schema-on-read for flexibility
├── Policy-as-code for transparency
├── Automated testing for compliance
└── Self-service governance tools
\`\`\`

**Business Justification**: "Enables SOC 2/ISO compliance for enterprise sales while maintaining developer productivity."

---

## 2. Leadership & Behavioral Preparation

### Team Scaling Scenarios

#### Question: "How would you scale the engineering team from 50 to 150 people?"
**Framework Response**:
\`\`\`
Scaling Strategy:
├── Months 1-3: Structure & Process
│   ├── Define engineering levels and career ladders
│   ├── Implement agile processes and metrics
│   └── Establish hiring and onboarding systems
├── Months 4-9: Team Formation
│   ├── Hire engineering managers and senior ICs
│   ├── Create specialized teams (platform, security, ML)
│   └── Build cross-functional partnerships
└── Months 10-12: Culture & Optimization
    ├── Develop engineering culture and values
    ├── Implement productivity and quality metrics
    └── Optimize team structure and processes
\`\`\`

**Success Metrics**:
- Engineering velocity: Maintain story points per engineer
- Quality: <5% regression rate, 99.9% uptime
- Culture: >4.0 Glassdoor engineering rating
- Retention: <10% annual voluntary turnover

#### Question: "Describe a time you had to make a difficult technical decision under pressure."
**STAR Framework Response**:
- **Situation**: Database performance crisis during Black Friday
- **Task**: Restore service while maintaining data integrity
- **Action**: Implemented read replicas + cache warming strategy
- **Result**: Reduced response time from 5s to 200ms, $0 revenue loss

### Cross-Functional Leadership

#### Question: "How do you work with Product to balance technical debt vs features?"
**Strategic Response**:
\`\`\`
Collaboration Framework:
├── Shared Metrics: Velocity, quality, customer impact
├── Joint Planning: Technical debt as product backlog items
├── Business Cases: ROI models for technical investments
└── Transparent Communication: Regular debt health reports

Decision Matrix:
├── High Customer Impact + Low Tech Debt → Feature priority
├── High Customer Impact + High Tech Debt → Parallel investment
├── Low Customer Impact + High Tech Debt → Debt priority
└── Technical Debt > 20% → Mandatory debt sprints
\`\`\`

---

## 3. Strategic Business Cases

### Case A: Platform Investment for New Revenue Stream
**Scenario**: "Build API platform to enable B2B integrations"

**Business Case**:
\`\`\`
Investment: $2M (12 engineering months)
Revenue Impact: $10M ARR (API-enabled integrations)
Timeline: 18 months to full ROI

Year 1: $2M investment → $2M API revenue (break-even)
Year 2: $0.5M maintenance → $6M API revenue (11x ROI)
Year 3: $0.5M enhancement → $10M API revenue (19x ROI)

Strategic Value:
├── New revenue stream with 90% gross margin
├── Customer stickiness through integration lock-in
├── Platform ecosystem with network effects
└── Competitive differentiation in enterprise segment
\`\`\`

### Case B: Infrastructure Modernization
**Scenario**: "Migrate from monolith to microservices"

**Business Justification**:
\`\`\`
Problem: Monolith limiting development velocity and scaling
Solution: Phased microservices migration with domain boundaries

Investment: $3M over 18 months
Benefits:
├── Developer Productivity: +40% feature velocity
├── System Reliability: 99.9% → 99.99% uptime
├── Scaling Efficiency: Independent service scaling
└── Team Autonomy: Faster decision-making and deployment

ROI Calculation:
├── Productivity Gain: $2M/year (40% of $5M eng cost)
├── Reliability Value: $1M/year (reduced downtime cost)
├── Scaling Savings: $500K/year (infrastructure efficiency)
└── Total ROI: 17 months payback, 2.3x 3-year NPV
\`\`\`

---

## 4. Executive Questions to Ask

### Technical Strategy Questions
1. "What's the biggest technical bet ${company} is making for the next 2 years?"
2. "How do you measure the ROI of platform investments vs feature development?"
3. "What technical constraints are currently limiting business growth?"
4. "How does the engineering strategy align with the product roadmap?"

### Team & Culture Questions
1. "How would you describe the engineering culture and what you want to preserve/change?"
2. "What's the typical career progression for engineers at ${company}?"
3. "How do you handle technical disagreements and decision-making?"
4. "What's your approach to remote/hybrid engineering team management?"

### Business & Strategy Questions
1. "How does engineering contribute to the company's competitive moat?"
2. "What role should technology play in ${company}'s next phase of growth?"
3. "How do you balance innovation with operational excellence?"
4. "What are the key metrics you use to measure engineering success?"

### Company-Specific Questions
1. "What inspired the recent [specific technology choice/architecture decision]?"
2. "How is ${company} thinking about [relevant industry trend - AI/ML, privacy, etc.]?"
3. "What's the biggest technical challenge you expect to face in scaling to [next milestone]?"

---

## 5. Stories & Examples Preparation

### Technical Leadership Stories
**Story 1: Platform Scaling**
- Challenge: 10x traffic growth, system breaking
- Solution: Microservices architecture + caching strategy
- Impact: Handled 100M requests/day, 99.99% uptime
- Learning: Importance of proactive capacity planning

**Story 2: Team Building**
- Challenge: Scaling from 20 to 80 engineers
- Solution: Engineering manager development + culture program
- Impact: Maintained productivity, 95% retention
- Learning: Culture scaling requires intentional investment

**Story 3: Cross-functional Partnership**
- Challenge: Product and engineering misalignment
- Solution: Joint planning process + shared metrics
- Impact: 50% faster feature delivery, higher quality
- Learning: Shared accountability drives collaboration

### Executive Presence Stories
**Story 1: Board-Level Communication**
- Situation: Explaining technical debt to board
- Approach: Revenue impact model + clear mitigation plan
- Result: $2M approved for platform investment
- Learning: Business context transforms technical discussions

**Story 2: Crisis Management**
- Situation: Major security incident during product launch
- Approach: Immediate response + transparent communication
- Result: Zero customer data loss, strengthened trust
- Learning: Leadership visibility crucial during crisis

---

## 6. Cultural Fit Preparation

### ${company} Culture Research
Based on available information about ${company}:

**Values Alignment**:
- Innovation and technical excellence
- Customer-centric decision making
- Collaborative and transparent culture
- Growth mindset and continuous learning

**Cultural Stories to Prepare**:
- Examples of innovative problem solving
- Customer impact focus in technical decisions
- Collaborative leadership across functions
- Personal learning and team development

**Red Flags to Watch For**:
- Unrealistic timeline expectations
- Lack of investment in engineering quality
- Poor work-life balance indicators
- Limited growth and learning opportunities

---

## 7. Salary & Negotiation Preparation

### Market Research
**${role} Compensation Bands**:
- Base Salary: $280K - $350K
- Equity: 0.5% - 1.2% (depending on stage)
- Bonus: 20% - 40% of base
- Total Comp: $400K - $600K

### Negotiation Strategy
**Anchoring Points**:
1. Market data for similar roles
2. Total compensation vs individual components
3. Growth potential and equity upside
4. Non-monetary benefits (flexibility, learning)

**Success Metrics to Propose**:
- Engineering velocity improvement
- System reliability targets
- Team satisfaction scores
- Business impact contributions

---

## 8. Final Preparation Checklist

### 48 Hours Before Interview
- [ ] Review architecture scenarios and practice explanations
- [ ] Prepare specific stories with quantified impact
- [ ] Research interview panel backgrounds
- [ ] Prepare thoughtful questions for each interviewer
- [ ] Review recent ${company} engineering blog posts/news

### Day of Interview
- [ ] Arrive 10 minutes early (or join video call early)
- [ ] Bring notebook for taking notes
- [ ] Have questions prepared for each interview stage
- [ ] Follow up with thank you notes within 24 hours

### Follow-up Strategy
- [ ] Send personalized thank you notes to each interviewer
- [ ] Include specific conversation points and insights
- [ ] Reiterate interest and key qualifications
- [ ] Provide any additional information requested

---

## Success Indicators

### Strong Interview Performance
- Interviewers engage deeply with your technical explanations
- Questions evolve from assessment to collaborative discussion
- You're asked about start date and team preferences
- Follow-up conversations focus on specific projects/challenges

### Areas for Improvement
- Difficulty explaining technical concepts clearly
- Limited business context for technical decisions
- Unclear examples or quantified impact
- Lack of thoughtful questions about the role/company

---

*This preparation guide provides a comprehensive framework for excelling in the ${role} interview at ${company}. Focus on demonstrating technical depth, business acumen, and leadership capability through specific examples and strategic thinking.*

**Generated by HeadHunter MCP Server - Interview Preparation v1.0**
*Combine with company research and LinkedIn intelligence for complete interview readiness*`;

    return template;
  }

  private async generate30_60_90Plan(company: string, role: string, teamSize?: number, challenges: string[] = [], style: string = "growth") {
    const currentDate = new Date().toISOString().split('T')[0];

    const template = `# 30-60-90 Day Plan: ${role} at ${company}
**Plan Date**: ${currentDate}
**Focus Style**: ${style}
**Team Size**: ${teamSize || "TBD"}
**Key Challenges**: ${challenges.join(", ") || "To be assessed"}

---

## Executive Summary

This 30-60-90 day plan outlines strategic priorities for establishing leadership, assessing current state, and delivering early wins while building long-term platform capabilities.

**Philosophy**: Listen first, understand context, build relationships, then drive strategic improvements with measurable impact.

---

## First 30 Days: Assessment & Foundation

### Week 1-2: Deep Listening & Assessment

#### Team & Culture Assessment
**Objectives**: Understand current state, team dynamics, and immediate challenges
- [ ] **1:1 meetings** with all direct reports (2 hours each)
  - Current projects and priorities
  - Team dynamics and collaboration
  - Technical challenges and blockers
  - Career goals and development needs
  - Process pain points and improvement ideas

- [ ] **Skip-level meetings** with key senior engineers (1 hour each)
  - Technical debt and architecture concerns
  - Development workflow efficiency
  - Quality and reliability issues
  - Innovation opportunities

- [ ] **Cross-functional partnership meetings**
  - Product leadership: Roadmap alignment and priorities
  - Sales/Customer Success: Customer impact and technical requirements
  - Finance: Budget, headcount, and infrastructure costs
  - Security/Compliance: Current posture and requirements

#### Technical Landscape Review
- [ ] **Architecture assessment**
  - Review current system architecture and documentation
  - Identify scaling bottlenecks and technical debt
  - Evaluate technology choices and modernization needs
  - Assess monitoring, alerting, and observability

- [ ] **Process evaluation**
  - Development workflow and CI/CD maturity
  - Code review practices and quality gates
  - Incident response and postmortem processes
  - Planning and estimation accuracy

### Week 3-4: Quick Wins & Relationship Building

#### Immediate Impact Opportunities
- [ ] **Process improvements** (0-cost, high-impact)
  - Streamline daily standups and meeting efficiency
  - Improve deployment pipeline reliability
  - Enhance incident response communication
  - Optimize code review turnaround times

- [ ] **Team empowerment**
  - Remove identified blockers and inefficiencies
  - Clarify decision-making authority and ownership
  - Establish clear escalation paths
  - Recognize and celebrate team achievements

#### Strategic Foundation
- [ ] **Establish engineering metrics dashboard**
  - Deployment frequency and lead time
  - Mean time to recovery (MTTR)
  - Code quality metrics and test coverage
  - Developer satisfaction and velocity

- [ ] **Create technical roadmap framework**
  - Platform investment priorities
  - Technical debt paydown strategy
  - Infrastructure scaling plan
  - Innovation and exploration allocation

### 30-Day Success Metrics
- **Team Engagement**: 100% of team members interviewed
- **Process Improvements**: 3+ quick wins implemented
- **Cross-functional Alignment**: Established partnerships with all key stakeholders
- **Technical Assessment**: Complete architecture and debt evaluation
- **Early Impact**: Measurable improvement in 1-2 key metrics

---

## Days 31-60: Strategy & Execution

### Month 2: Strategic Planning & Team Development

#### Platform Strategy Development
- [ ] **Architecture modernization plan**
  - Microservices migration roadmap (if applicable)
  - Cloud optimization and cost reduction strategy
  - API platform development for extensibility
  - Security and compliance enhancement plan

- [ ] **Team scaling strategy**
  - Hiring plan for critical roles and skills gaps
  - Engineering career ladder and promotion criteria
  - Manager development and leadership training
  - Intern and new graduate programs

#### Cross-functional Integration
- [ ] **Product-Engineering alignment**
  - Joint planning process and shared metrics
  - Technical requirement definition workflows
  - Feature flag and A/B testing framework
  - Customer feedback integration into technical decisions

- [ ] **Business impact measurement**
  - Engineering contribution to business KPIs
  - Infrastructure cost per customer/transaction
  - Feature adoption and performance correlation
  - Technical debt impact on delivery velocity

### Process Optimization & Culture Building

#### Engineering Excellence
- [ ] **Quality and reliability program**
  - SLA definition and monitoring implementation
  - Automated testing strategy and coverage goals
  - Performance testing and capacity planning
  - Security scanning and vulnerability management

- [ ] **Developer productivity initiative**
  - Local development environment optimization
  - CI/CD pipeline speed and reliability improvements
  - Documentation standards and knowledge sharing
  - Internal tooling and automation investment

#### Team Culture & Development
- [ ] **Engineering culture definition**
  - Core values and behavioral expectations
  - Technical decision-making processes
  - Learning and development opportunities
  - Innovation time and experimentation framework

- [ ] **Communication and transparency**
  - Regular all-hands meetings and technical talks
  - Architecture decision records (ADRs)
  - Incident postmortem sharing and learning
  - External technical content and conference participation

### 60-Day Success Metrics
- **Strategic Clarity**: Technical roadmap aligned with business goals
- **Team Development**: Career development plans for all team members
- **Process Maturity**: Measurable improvements in quality and velocity
- **Business Partnership**: Established shared metrics with Product and other functions
- **Cultural Foundation**: Engineering values and practices clearly defined

---

## Days 61-90: Platform Investment & Scale

### Month 3: Execution & Optimization

#### Major Initiative Launch
- [ ] **Platform investment execution**
  - Begin highest-ROI architecture modernization project
  - Implement API platform or infrastructure optimization
  - Launch developer productivity improvement program
  - Start technical debt reduction initiative

- [ ] **Team scaling execution**
  - Complete hiring for 2-3 critical roles
  - Promote 1-2 high-performing engineers
  - Launch engineering manager development program
  - Establish mentorship and onboarding programs

#### Business Impact Demonstration
- [ ] **Quantified value delivery**
  - Demonstrate cost savings from infrastructure optimization
  - Show velocity improvements from process changes
  - Measure customer impact from reliability improvements
  - Track team satisfaction and retention improvements

- [ ] **Executive communication**
  - Present quarterly business review with engineering metrics
  - Share success stories and lessons learned
  - Propose budget and headcount for next quarter
  - Align technical strategy with company OKRs

### Advanced Capabilities Development

#### Innovation & Competitive Advantage
- [ ] **Technology exploration**
  - Evaluate AI/ML opportunities for product enhancement
  - Assess emerging technologies for competitive advantage
  - Plan proof-of-concept for next-generation architecture
  - Establish innovation lab or 20% time program

- [ ] **External engagement**
  - Participate in industry conferences and technical communities
  - Publish engineering blog posts about technical achievements
  - Contribute to open source projects relevant to ${company}
  - Build external talent pipeline and brand recognition

### 90-Day Success Metrics
- **Platform Progress**: Major initiative launched with clear milestones
- **Team Performance**: 20% improvement in key engineering metrics
- **Business Impact**: Quantified contribution to company goals
- **Strategic Positioning**: Engineering recognized as competitive advantage
- **Culture Maturity**: High-performing, self-organizing team culture

---

## Key Metrics & Success Indicators

### Technical Metrics
| Metric | Current | 30-Day Target | 60-Day Target | 90-Day Target |
|--------|---------|---------------|---------------|---------------|
| Deploy Frequency | TBD | Baseline + 25% | Baseline + 50% | Baseline + 100% |
| MTTR | TBD | <2 hours | <1 hour | <30 minutes |
| Test Coverage | TBD | >70% | >80% | >85% |
| Performance (p99) | TBD | Baseline | -25% latency | -50% latency |

### Business Metrics
| Metric | Current | 30-Day Target | 60-Day Target | 90-Day Target |
|--------|---------|---------------|---------------|---------------|
| Feature Velocity | TBD | Baseline | +20% | +40% |
| Infrastructure Cost/Customer | TBD | Baseline | -10% | -20% |
| Customer Incident Rate | TBD | Baseline | -25% | -50% |
| Team Satisfaction | TBD | >4.0 | >4.2 | >4.5 |

### Leadership Metrics
| Metric | Current | 30-Day Target | 60-Day Target | 90-Day Target |
|--------|---------|---------------|---------------|---------------|
| Team Retention | TBD | 95% | 97% | 98% |
| Internal Promotions | TBD | 1 promotion | 2 promotions | 3 promotions |
| Cross-functional NPS | TBD | >8.0 | >8.5 | >9.0 |
| Executive Confidence | TBD | Established | Strong | Champion |

---

## Risk Mitigation & Contingencies

### Potential Challenges
| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|-------------------|
| **Team Resistance to Change** | Medium | High | Gradual change, clear communication, early wins |
| **Technical Debt Overwhelming** | High | Medium | Incremental improvement, business case development |
| **Cross-functional Misalignment** | Medium | High | Regular communication, shared metrics |
| **Budget Constraints** | Low | High | ROI-focused proposals, phased implementation |

### Success Enablers
- **Executive Sponsorship**: Clear support from CEO/CTO for strategic initiatives
- **Team Buy-in**: Early wins and transparent communication build trust
- **Cross-functional Partnership**: Shared goals and metrics drive collaboration
- **Customer Focus**: Business impact measurement validates technical investments

---

## Communication Strategy

### Stakeholder Updates

#### Weekly Team Updates
- Progress on key initiatives and blockers
- Wins and recognition for team achievements
- Upcoming priorities and resource needs
- Learning opportunities and knowledge sharing

#### Bi-weekly Executive Updates
- Key metrics and trend analysis
- Strategic initiative progress
- Resource requirements and budget impact
- Risk identification and mitigation plans

#### Monthly All-Hands Presentations
- Engineering achievements and customer impact
- Technical strategy and roadmap updates
- Team growth and development highlights
- Industry trends and competitive positioning

### External Communication
- **Industry Engagement**: Conference talks, blog posts, open source contributions
- **Talent Brand**: Engineering culture content, team spotlights
- **Customer Communication**: Technical capabilities, reliability improvements
- **Investor Updates**: Platform scalability, engineering efficiency metrics

---

## Long-term Vision (Beyond 90 Days)

### 6-Month Objectives
- **Platform Transformation**: Complete major architecture modernization
- **Team Excellence**: Industry-leading engineering culture and practices
- **Business Partnership**: Engineering as strategic growth driver
- **Market Position**: Technical competitive advantage in core areas

### 12-Month Vision
- **Technology Leadership**: Recognized innovator in relevant technical domains
- **Scalable Organization**: Processes and culture that scale to 2x team size
- **Customer Value**: Direct measurable impact on customer satisfaction and growth
- **Industry Influence**: Thought leadership and external recognition

---

*This 30-60-90 day plan provides a structured approach to establishing leadership and driving meaningful impact as ${role} at ${company}. Adjust timelines and priorities based on specific context and organizational needs.*

**Generated by HeadHunter MCP Server - 30-60-90 Day Planning v1.0**
*Recommend reviewing with hiring manager during interview process to demonstrate strategic thinking*`;

    return template;
  }
}