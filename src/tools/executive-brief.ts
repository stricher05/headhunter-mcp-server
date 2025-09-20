/**
 * Executive Brief Tool
 * Generates comprehensive executive summary for target role applications
 */

export interface ExecutiveBriefArgs {
  company: string;
  role: string;
  application_stage?: 'research' | 'application' | 'interview' | 'negotiation';
  include_sections?: string[];
}

export class ExecutiveBriefTool {
  async execute(args: ExecutiveBriefArgs) {
    const {
      company,
      role,
      application_stage = "research",
      include_sections = ["company_overview", "strategic_fit", "key_challenges", "interview_strategy", "next_steps"]
    } = args;

    try {
      const brief = await this.generateExecutiveBrief(company, role, application_stage, include_sections);

      return {
        content: [
          {
            type: "text",
            text: brief
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error generating executive brief for ${company}: ${error instanceof Error ? error.message : String(error)}`
          }
        ],
        isError: true
      };
    }
  }

  private async generateExecutiveBrief(company: string, role: string, stage: string, sections: string[]) {
    const currentDate = new Date().toISOString().split('T')[0];

    const template = `# Executive Brief: ${role} at ${company}
**Brief Date**: ${currentDate}
**Application Stage**: ${stage}
**Status**: Active Opportunity

---

## Executive Summary

**Opportunity**: ${role} position at ${company} represents a strategic career move combining technical leadership with business impact in a high-growth technology environment.

**Strategic Fit**: Aligned with long-term goal of executive technology leadership with direct P&L responsibility and platform-scale technical challenges.

**Key Value Proposition**: Proven ability to scale engineering organizations, drive platform modernization, and align technical strategy with business objectives.

**Recommendation**: Proceed with targeted preparation focusing on revenue engine understanding, team scaling experience, and strategic platform vision.

---

## Company Intelligence Summary

### Business Overview
- **Stage**: [Growth/Scale/Mature] company in [Industry] sector
- **Revenue Model**: [B2B SaaS/Marketplace/Other] with [Revenue] ARR
- **Market Position**: [Competitive position and differentiation]
- **Growth Trajectory**: [Growth rate and key metrics]

### Technical Landscape
- **Architecture**: [Current state and modernization needs]
- **Scale Challenges**: [Current bottlenecks and scaling requirements]
- **Technology Stack**: [Core technologies and evolution path]
- **Team Size**: [Current engineering headcount and growth plans]

### Strategic Challenges
1. **Platform Scaling**: Supporting 3x growth over 18 months
2. **Team Development**: Scaling from 50 to 150+ engineers
3. **Technical Debt**: Balancing velocity with platform investment
4. **Market Competition**: Maintaining technical differentiation

---

## Role Analysis & Strategic Fit

### Position Requirements
| Requirement | Fit Score | Evidence |
|-------------|-----------|----------|
| **Platform Leadership** | 9/10 | Led platform scaling at [Previous Company] supporting 10x growth |
| **Team Scaling** | 8/10 | Scaled engineering from 20 to 80 people in 18 months |
| **Technical Strategy** | 9/10 | Drove microservices migration saving $2M annually |
| **Cross-functional Leadership** | 8/10 | Established Product-Engineering shared metrics |
| **Business Acumen** | 7/10 | Built ROI models for technical investments |

### Value Proposition Alignment
**For ${company}**: Proven ability to build scalable platforms while maintaining velocity and quality
**For Career Goals**: Executive role with direct business impact and technical innovation

### Unique Differentiators
1. **Platform-Scale Experience**: [Specific experience relevant to their challenges]
2. **Business Orientation**: Track record of connecting technical decisions to revenue impact
3. **Culture Building**: Experience scaling engineering culture during rapid growth
4. **Strategic Vision**: Ability to balance technical debt with feature delivery

---

## Competitive Analysis & Positioning

### Likely Competition Profile
- **Internal Candidates**: Senior engineering managers seeking promotion
- **Big Tech**: Staff/Principal engineers from Google, Meta, etc.
- **Startup Veterans**: CTOs/VPs from successful scale-ups
- **Industry Experts**: Leaders with domain-specific experience

### Competitive Advantages
1. **Right-Sized Experience**: Not over-qualified, not under-experienced
2. **Growth-Stage Fit**: Experience scaling during similar growth phases
3. **Technical Depth**: Hands-on background with strategic thinking
4. **Cultural Alignment**: Values and approach match company culture

### Positioning Strategy
- Emphasize **growth-stage expertise** over pure scale
- Highlight **business impact** of technical decisions
- Demonstrate **team development** and culture building
- Show **pragmatic innovation** balancing risk and opportunity

---

## Interview Strategy & Preparation

### Interview Panel Analysis
Based on LinkedIn research and company structure:

#### Primary Decision Makers
1. **CEO/Hiring Manager**: Focus on strategic vision and business alignment
2. **Current CTO/VP Eng**: Technical depth and architecture philosophy
3. **Product Leadership**: Cross-functional collaboration and shared metrics
4. **Board Member/Advisor**: Executive presence and business acumen

### Preparation Priorities

#### Technical Preparation (40%)
- **Architecture Scenarios**: Platform scaling, microservices, cost optimization
- **System Design**: Focus on [Company]'s specific technical challenges
- **Technology Strategy**: Modernization roadmap and investment priorities
- **Engineering Metrics**: Velocity, quality, and business impact measurement

#### Leadership Preparation (35%)
- **Team Scaling**: Specific experience and methodology
- **Culture Building**: Values-driven engineering organization
- **Cross-functional Partnership**: Product, Sales, Customer Success alignment
- **Change Management**: Leading transformation initiatives

#### Business Preparation (25%)
- **Revenue Impact**: How technical decisions drive business outcomes
- **Cost Optimization**: Infrastructure efficiency and margin improvement
- **Competitive Strategy**: Technical differentiation and moat building
- **Strategic Planning**: 18-month platform roadmap with ROI

### Key Messages to Convey
1. **Business-Oriented Technologist**: Technical depth with P&L understanding
2. **Scale-Appropriate Experience**: Right level for their growth stage
3. **Culture-First Leader**: People and team development focus
4. **Strategic Executor**: Vision combined with pragmatic delivery

---

## Risk Assessment & Mitigation

### Application Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Over-qualified Perception** | Medium | High | Emphasize growth alignment, not step-down |
| **Culture Fit Concerns** | Low | Medium | Demonstrate values alignment through examples |
| **Technical Depth Questions** | Low | High | Prepare detailed architecture scenarios |
| **Competition from Big Tech** | High | Medium | Highlight growth-stage specific experience |

### Interview Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Generic Responses** | Medium | High | Company-specific preparation and examples |
| **Insufficient Business Context** | Medium | High | Frame all technical decisions in business terms |
| **Weak Strategic Vision** | Low | High | Prepare 18-month roadmap with clear priorities |
| **Poor Cultural Signals** | Low | Medium | Research team values and adapt communication style |

---

## Next Steps & Action Plan

### Immediate Actions (This Week)
- [ ] Complete LinkedIn relationship mapping for warm introductions
- [ ] Deep-dive research on [Company]'s specific technical architecture
- [ ] Prepare 3 detailed STAR stories relevant to their challenges
- [ ] Practice architecture scenarios with business context

### Application Process
- [ ] Submit application with cover letter emphasizing strategic fit
- [ ] Follow up through warm introductions within 1 week
- [ ] Prepare portfolio of relevant technical leadership examples
- [ ] Schedule informational interviews with current team members

### Interview Preparation (2 Weeks)
- [ ] Complete mock interviews focusing on architecture scenarios
- [ ] Prepare detailed 30-60-90 day plan specific to ${company}
- [ ] Research each interview panel member's background and interests
- [ ] Practice executive presence and strategic communication

### Post-Interview Strategy
- [ ] Send personalized thank you notes within 24 hours
- [ ] Provide additional technical documentation if requested
- [ ] Maintain relationships regardless of outcome
- [ ] Gather feedback for continuous improvement

---

## Success Metrics & Timeline

### Application Success Indicators
- **Response Rate**: Interview invitation within 2 weeks
- **Warm Introduction Success**: >50% response rate from mutual connections
- **Initial Screen**: Progress to technical/hiring manager interview
- **Pipeline Progression**: Advance through all interview stages

### Interview Performance Metrics
- **Technical Depth**: Detailed architecture discussions, not surface-level Q&A
- **Strategic Vision**: Questions evolve to collaborative planning discussions
- **Cultural Fit**: Interviewers discuss team dynamics and working style
- **Business Acumen**: Finance/revenue questions demonstrate P&L understanding

### Timeline Expectations
- **Week 1**: Application submission and warm introductions
- **Week 2-3**: Initial screen and technical interviews
- **Week 4**: Final round with leadership and culture fit
- **Week 5**: Reference checks and offer negotiation
- **Week 6**: Decision and start date coordination

---

## Compensation & Negotiation Strategy

### Market Research
**${role} Compensation Bands** (Based on company stage and market):
- **Base Salary**: $280K - $350K
- **Equity**: 0.5% - 1.2% (vesting over 4 years)
- **Bonus**: 20% - 40% of base salary
- **Total Compensation**: $400K - $600K

### Negotiation Priorities
1. **Equity Percentage**: Focus on ownership upside in growth company
2. **Success Metrics**: Clear definition of role success and review criteria
3. **Team Budget**: Headcount and infrastructure investment authority
4. **Learning & Development**: Conference budget, coaching, board exposure

### Value-Based Negotiation
- **Platform Impact**: Quantified improvements to cost/performance
- **Team Development**: Retention and productivity improvements
- **Revenue Enablement**: Technical capabilities driving business growth
- **Strategic Contribution**: Board-level technical strategy and planning

---

## Relationship Management Strategy

### Key Relationships to Develop
1. **Hiring Manager**: Regular communication and strategic alignment
2. **Team Members**: Build rapport and understand team dynamics
3. **Cross-functional Partners**: Demonstrate collaborative leadership
4. **Industry Connections**: Leverage mutual connections for insights

### Long-term Relationship Building
- **Company Engagement**: Follow engineering blog, share relevant content
- **Industry Participation**: Attend conferences where team members speak
- **Technical Community**: Contribute to open source projects they use
- **Professional Network**: Maintain relationships regardless of outcome

---

## Decision Framework

### Go/No-Go Criteria
**Proceed if 3+ criteria met**:
- [ ] Role aligns with 3-5 year career objectives
- [ ] Company demonstrates strong growth trajectory and market position
- [ ] Technical challenges match expertise and interests
- [ ] Team and culture fit based on research and interviews
- [ ] Compensation meets market expectations and value delivery

### Success Definition
**12-Month Success Metrics**:
- Platform performance improvement (latency, reliability, cost)
- Team scaling and development (headcount, retention, satisfaction)
- Business impact (revenue enablement, cost optimization)
- Strategic contribution (roadmap influence, cross-functional partnerships)
- Personal growth (expanded responsibilities, industry recognition)

---

*This executive brief provides a comprehensive strategy for pursuing the ${role} opportunity at ${company}. Regular updates and refinement based on new information and interview feedback will optimize success probability.*

**Generated by HeadHunter MCP Server - Executive Brief v1.0**
*Confidential - For career development and interview preparation use only*`;

    return template;
  }
}