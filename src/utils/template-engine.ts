/**
 * Template Engine Utility
 * Handles template loading, processing, and variable substitution
 */

export class TemplateEngine {
  private templates: Map<string, string> = new Map();

  constructor() {
    this.loadTemplates();
  }

  private loadTemplates() {
    // In a real implementation, this would load templates from files
    // For now, we'll use inline templates
    this.templates.set('company-research', this.getCompanyResearchTemplate());
    this.templates.set('revenue-engine', this.getRevenueEngineTemplate());
    this.templates.set('linkedin-intelligence', this.getLinkedInTemplate());
    this.templates.set('interview-prep', this.getInterviewPrepTemplate());
    this.templates.set('executive-brief', this.getExecutiveBriefTemplate());
  }

  processTemplate(templateName: string, variables: Record<string, any>): string {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }

    return this.substituteVariables(template, variables);
  }

  private substituteVariables(template: string, variables: Record<string, any>): string {
    let result = template;

    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{{${key}}}`;
      result = result.replace(new RegExp(placeholder, 'g'), String(value));
    }

    return result;
  }

  private getCompanyResearchTemplate(): string {
    return `# Company Research Template for {{company}}
Generated on {{date}} for {{role}} position.

## Company Overview
{{company_overview}}

## Technology Stack
{{technology_stack}}

## Business Model
{{business_model}}

## Challenges and Opportunities
{{challenges_opportunities}}
`;
  }

  private getRevenueEngineTemplate(): string {
    return `# Revenue Engine Analysis for {{company}}
Business Model: {{business_model}}
Analysis Focus: {{focus}}

## Revenue Streams
{{revenue_streams}}

## System Mappings
{{system_mappings}}

## Optimization Opportunities
{{optimization_opportunities}}
`;
  }

  private getLinkedInTemplate(): string {
    return `# LinkedIn Intelligence for {{company}}
Target Role: {{role}}
Research Depth: {{depth}}

## Team Analysis
{{team_analysis}}

## Connection Paths
{{connection_paths}}

## Outreach Strategy
{{outreach_strategy}}
`;
  }

  private getInterviewPrepTemplate(): string {
    return `# Interview Preparation for {{role}} at {{company}}
Interview Type: {{interview_type}}
Focus Areas: {{focus_areas}}

## Architecture Scenarios
{{architecture_scenarios}}

## Leadership Questions
{{leadership_questions}}

## Business Cases
{{business_cases}}
`;
  }

  private getExecutiveBriefTemplate(): string {
    return `# Executive Brief: {{role}} at {{company}}
Application Stage: {{application_stage}}

## Strategic Summary
{{strategic_summary}}

## Interview Strategy
{{interview_strategy}}

## Next Steps
{{next_steps}}
`;
  }
}