#!/usr/bin/env node

/**
 * HeadHunter MCP Server
 * Executive Technology Leadership Placement System
 *
 * Provides tools for:
 * - Company research and intelligence
 * - LinkedIn relationship mapping
 * - Revenue engine analysis
 * - Strategic interview preparation
 * - Executive coaching integration
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

import { CompanyResearchTool } from './tools/company-research.js';
import { LinkedInIntelligenceTool } from './tools/linkedin-intelligence.js';
import { RevenueEngineTool } from './tools/revenue-engine.js';
import { InterviewPrepTool } from './tools/interview-prep.js';
import { ExecutiveBriefTool } from './tools/executive-brief.js';

/**
 * Tool definitions for the HeadHunter MCP server
 */
const TOOLS = [
  {
    name: "research_company",
    description: "Research a company for executive technology roles. Provides comprehensive analysis including business model, technology stack, competitive position, and strategic challenges.",
    inputSchema: {
      type: "object",
      properties: {
        company: {
          type: "string",
          description: "Company name to research"
        },
        role: {
          type: "string",
          description: "Target role (e.g., 'VP Engineering', 'CTO', 'Head of Platform')",
          default: "VP Engineering"
        },
        focus_areas: {
          type: "array",
          items: { type: "string" },
          description: "Specific areas to focus on (e.g., 'revenue_engine', 'tech_stack', 'team_analysis')",
          default: ["overview", "technology", "business_model", "challenges"]
        }
      },
      required: ["company"]
    }
  },
  {
    name: "analyze_revenue_engine",
    description: "Map how company's technical systems drive revenue and costs. Creates P&L impact analysis for executive-level conversations.",
    inputSchema: {
      type: "object",
      properties: {
        company: {
          type: "string",
          description: "Company name to analyze"
        },
        business_model: {
          type: "string",
          description: "Primary business model (e.g., 'B2B SaaS', 'Marketplace', 'E-commerce')"
        },
        focus: {
          type: "string",
          enum: ["cost_optimization", "growth_levers", "risk_assessment", "comprehensive"],
          description: "Analysis focus area",
          default: "comprehensive"
        }
      },
      required: ["company"]
    }
  },
  {
    name: "linkedin_intelligence",
    description: "Analyze LinkedIn relationships and find warm introduction paths to target company. ToS-compliant research approach.",
    inputSchema: {
      type: "object",
      properties: {
        company: {
          type: "string",
          description: "Target company name"
        },
        role: {
          type: "string",
          description: "Target role to research team for"
        },
        export_data: {
          type: "string",
          description: "Path to LinkedIn export data (optional)"
        },
        research_depth: {
          type: "string",
          enum: ["basic", "detailed", "comprehensive"],
          description: "Depth of LinkedIn research",
          default: "detailed"
        }
      },
      required: ["company"]
    }
  },
  {
    name: "interview_preparation",
    description: "Generate comprehensive interview preparation including architecture scenarios, business cases, and executive questions.",
    inputSchema: {
      type: "object",
      properties: {
        company: {
          type: "string",
          description: "Company name"
        },
        role: {
          type: "string",
          description: "Target role"
        },
        interview_type: {
          type: "string",
          enum: ["technical", "behavioral", "case_study", "comprehensive"],
          description: "Type of interview preparation",
          default: "comprehensive"
        },
        focus_areas: {
          type: "array",
          items: { type: "string" },
          description: "Specific preparation areas (e.g., 'architecture', 'leadership', 'strategy')",
          default: ["architecture", "leadership", "strategy", "culture"]
        }
      },
      required: ["company", "role"]
    }
  },
  {
    name: "executive_brief",
    description: "Generate executive summary brief for target role application including key insights, strategies, and next steps.",
    inputSchema: {
      type: "object",
      properties: {
        company: {
          type: "string",
          description: "Company name"
        },
        role: {
          type: "string",
          description: "Target role"
        },
        application_stage: {
          type: "string",
          enum: ["research", "application", "interview", "negotiation"],
          description: "Current application stage",
          default: "research"
        },
        include_sections: {
          type: "array",
          items: { type: "string" },
          description: "Sections to include in brief",
          default: ["company_overview", "strategic_fit", "key_challenges", "interview_strategy", "next_steps"]
        }
      },
      required: ["company", "role"]
    }
  },
  {
    name: "create_30_60_90_plan",
    description: "Create a detailed 30-60-90 day plan for executive technology role showing strategic priorities and success metrics.",
    inputSchema: {
      type: "object",
      properties: {
        company: {
          type: "string",
          description: "Company name"
        },
        role: {
          type: "string",
          description: "Target role"
        },
        team_size: {
          type: "number",
          description: "Expected team size (if known)"
        },
        key_challenges: {
          type: "array",
          items: { type: "string" },
          description: "Known key challenges facing the role"
        },
        focus_style: {
          type: "string",
          enum: ["transformation", "growth", "optimization", "startup"],
          description: "Leadership style focus",
          default: "growth"
        }
      },
      required: ["company", "role"]
    }
  }
] as const;

class HeadHunterMCPServer {
  private server: Server;
  private companyResearch: CompanyResearchTool;
  private linkedinIntel: LinkedInIntelligenceTool;
  private revenueEngine: RevenueEngineTool;
  private interviewPrep: InterviewPrepTool;
  private executiveBrief: ExecutiveBriefTool;

  constructor() {
    this.server = new Server(
      {
        name: "headhunter-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Initialize tool handlers
    this.companyResearch = new CompanyResearchTool();
    this.linkedinIntel = new LinkedInIntelligenceTool();
    this.revenueEngine = new RevenueEngineTool();
    this.interviewPrep = new InterviewPrepTool();
    this.executiveBrief = new ExecutiveBriefTool();

    this.setupHandlers();
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: TOOLS
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        const { name, arguments: args } = request.params;

        switch (name) {
          case "research_company":
            return await this.companyResearch.execute(args as any);

          case "analyze_revenue_engine":
            return await this.revenueEngine.execute(args as any);

          case "linkedin_intelligence":
            return await this.linkedinIntel.execute(args as any);

          case "interview_preparation":
            return await this.interviewPrep.execute(args as any);

          case "executive_brief":
            return await this.executiveBrief.execute(args as any);

          case "create_30_60_90_plan":
            return await this.interviewPrep.create30_60_90Plan(args as any);

          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`
            );
        }
      } catch (error) {
        if (error instanceof McpError) {
          throw error;
        }

        throw new McpError(
          ErrorCode.InternalError,
          `Tool execution failed: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    // Server is running
    console.error("HeadHunter MCP Server running on stdio");
  }
}

// Start the server
const server = new HeadHunterMCPServer();
server.run().catch((error) => {
  console.error("Failed to start HeadHunter MCP Server:", error);
  process.exit(1);
});