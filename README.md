# HeadHunter MCP Server

Executive Technology Leadership Placement System - A comprehensive MCP server for researching companies, analyzing job opportunities, and preparing for executive technology roles.

[![npm version](https://badge.fury.io/js/@gnivildev/headhunter-mcp-server.svg)](https://badge.fury.io/js/@gnivildev/headhunter-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-stricher05%2Fheadhunter--mcp--server-blue)](https://github.com/stricher05/headhunter-mcp-server)

## Overview

HeadHunter MCP Server provides AI-powered tools for executive job hunting and career advancement in technology leadership roles. It offers comprehensive company research, LinkedIn intelligence, revenue engine analysis, and strategic interview preparation.

### Key Features

- 🏢 **Company Research**: Deep analysis of business models, technology stacks, and strategic challenges
- 🔗 **LinkedIn Intelligence**: ToS-compliant relationship mapping and warm introduction pathfinding
- 💰 **Revenue Engine Mapping**: P&L impact analysis for technical decisions and platform investments
- 🎯 **Interview Preparation**: Architecture scenarios, business cases, and executive-level questions
- 📋 **Executive Briefing**: Comprehensive summaries and strategic preparation materials
- 📅 **30-60-90 Day Planning**: Strategic onboarding plans for executive roles

## Installation

### NPM Package
```bash
npm install -g @gnivildev/headhunter-mcp-server
```

### Claude Desktop Configuration
Add to your Claude Desktop MCP configuration (`%APPDATA%\Claude\claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "headhunter": {
      "command": "npx",
      "args": ["-y", "@gnivildev/headhunter-mcp-server"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Development Setup
```bash
git clone https://github.com/stricher05/headhunter-mcp-server
cd headhunter-mcp-server
npm install
npm run build
npm run dev
```

### Testing the Installation
```bash
# Test global CLI installation
headhunter-mcp --help

# Test MCP server functionality
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | headhunter-mcp
```

## Available Tools

### `research_company`
Research a company for executive technology roles with comprehensive business and technical analysis.

**Parameters:**
- `company` (required): Company name to research
- `role` (optional): Target role (default: "VP Engineering")
- `focus_areas` (optional): Specific areas to analyze

**Example:**
```json
{
  "name": "research_company",
  "arguments": {
    "company": "Stripe",
    "role": "CTO",
    "focus_areas": ["revenue_engine", "tech_stack", "team_analysis"]
  }
}
```

### `analyze_revenue_engine`
Map how company's technical systems drive revenue and costs for P&L impact analysis.

**Parameters:**
- `company` (required): Company name to analyze
- `business_model` (optional): Primary business model
- `focus` (optional): Analysis focus area

**Example:**
```json
{
  "name": "analyze_revenue_engine",
  "arguments": {
    "company": "Notion",
    "business_model": "B2B SaaS",
    "focus": "growth_levers"
  }
}
```

### `linkedin_intelligence`
Analyze LinkedIn relationships and find warm introduction paths (ToS-compliant).

**Parameters:**
- `company` (required): Target company name
- `role` (optional): Target role for team research
- `export_data` (optional): Path to LinkedIn export data
- `research_depth` (optional): Depth of research

**Example:**
```json
{
  "name": "linkedin_intelligence",
  "arguments": {
    "company": "Figma",
    "role": "VP Engineering",
    "research_depth": "comprehensive"
  }
}
```

### `interview_preparation`
Generate comprehensive interview preparation including scenarios and questions.

**Parameters:**
- `company` (required): Company name
- `role` (required): Target role
- `interview_type` (optional): Type of preparation
- `focus_areas` (optional): Specific preparation areas

**Example:**
```json
{
  "name": "interview_preparation",
  "arguments": {
    "company": "Airbnb",
    "role": "Head of Platform",
    "interview_type": "comprehensive",
    "focus_areas": ["architecture", "leadership", "strategy"]
  }
}
```

### `executive_brief`
Generate executive summary brief for target role application.

**Parameters:**
- `company` (required): Company name
- `role` (required): Target role
- `application_stage` (optional): Current stage
- `include_sections` (optional): Sections to include

**Example:**
```json
{
  "name": "executive_brief",
  "arguments": {
    "company": "Datadog",
    "role": "VP Engineering",
    "application_stage": "interview"
  }
}
```

### `create_30_60_90_plan`
Create detailed 30-60-90 day plan for executive technology role.

**Parameters:**
- `company` (required): Company name
- `role` (required): Target role
- `team_size` (optional): Expected team size
- `key_challenges` (optional): Known challenges
- `focus_style` (optional): Leadership style focus

**Example:**
```json
{
  "name": "create_30_60_90_plan",
  "arguments": {
    "company": "Slack",
    "role": "CTO",
    "team_size": 120,
    "focus_style": "transformation"
  }
}
```

## Real-World Example

### McCain Foods Head of AI Analysis
We tested the HeadHunter system with a real LinkedIn job posting for McCain Foods' Head of AI position. The analysis generated:

- **Company Intelligence**: $10B+ revenue, global leader in frozen potato products, 60+ countries
- **Revenue Engine Mapping**: $50-100M AI opportunity in supply chain optimization
- **Strategic Positioning**: Ground-floor AI leadership role with significant business impact potential
- **Interview Strategy**: Focus on traditional industry transformation and P&L impact
- **30-60-90 Plan**: Supply chain quick wins → manufacturing AI → comprehensive transformation

See the complete analysis in our [applications directory](./applications/2025-09-19-mccain-foods-head-of-ai/).

## Usage Examples

### Basic Company Research
```javascript
// Research a company for VP Engineering role
const result = await client.callTool({
  name: "research_company",
  arguments: {
    company: "Stripe",
    role: "VP Engineering",
    focus_areas: ["technology", "business_model", "challenges"]
  }
});
```

### Complete Application Preparation
```javascript
// 1. Company research
const research = await client.callTool({
  name: "research_company",
  arguments: { company: "Notion", role: "CTO" }
});

// 2. Revenue engine analysis
const revenue = await client.callTool({
  name: "analyze_revenue_engine",
  arguments: { company: "Notion", focus: "comprehensive" }
});

// 3. LinkedIn intelligence
const linkedin = await client.callTool({
  name: "linkedin_intelligence",
  arguments: { company: "Notion", research_depth: "detailed" }
});

// 4. Interview preparation
const interview = await client.callTool({
  name: "interview_preparation",
  arguments: { company: "Notion", role: "CTO" }
});

// 5. Executive brief
const brief = await client.callTool({
  name: "executive_brief",
  arguments: { company: "Notion", role: "CTO" }
});
```

## Privacy & Compliance

### LinkedIn Terms of Service Compliance
- **Export-First**: Prioritizes LinkedIn data export over automated scraping
- **Rate Limiting**: Respects platform rate limits and usage guidelines
- **User Consent**: Only processes data with explicit user permission
- **Public Data Only**: When not using exports, only accesses publicly available information

### Data Privacy
- **Local Processing**: All data processing happens locally by default
- **No Data Storage**: Does not store personal or professional data persistently
- **Encryption**: Sensitive data encrypted in transit and at rest
- **GDPR Compliant**: Respects user privacy rights and data protection regulations

## Development

### Project Structure
```
mcp-server/
├── src/
│   ├── index.ts          # Main MCP server implementation
│   ├── tools/            # Individual tool implementations
│   │   ├── company-research.ts
│   │   ├── linkedin-intelligence.ts
│   │   ├── revenue-engine.ts
│   │   ├── interview-prep.ts
│   │   └── executive-brief.ts
│   └── utils/            # Utility modules
│       ├── template-engine.ts
│       └── data-sources.ts
├── templates/            # Document templates
├── package.json
├── tsconfig.json
└── README.md
```

### Building and Testing
```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run in development mode (for debugging)
npm run dev

# Test MCP server functionality
npm run test

# Lint code
npm run lint

# Clean build artifacts
npm run clean
```

### Publishing Process
```bash
# Build the package
npm run build

# Test locally
npm link
npm link @gnivildev/headhunter-mcp-server

# Publish to npm (requires 2FA)
npm login
npm publish --access public --otp=XXXXXX

# Push to GitHub
git add .
git commit -m "feat: update package version"
git push origin main
```

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Tools
- **TypeScript**: Strongly typed development
- **ESLint**: Code quality and consistency
- **Jest**: Testing framework
- **GitHub Actions**: CI/CD pipeline
- **npm**: Package management and publishing

## Configuration

### Environment Variables
```bash
# Optional: API keys for enhanced data sources
CLEARBIT_API_KEY=your_clearbit_key
CRUNCHBASE_API_KEY=your_crunchbase_key
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Optional: Custom data source URLs
COMPANY_DATA_API_URL=https://api.example.com
NEWS_API_KEY=your_news_api_key
```

### Advanced Configuration
Create a `.headhunterrc.json` file in your project directory:

```json
{
  "dataSources": {
    "enableWebScraping": true,
    "respectRobotsTxt": true,
    "rateLimitMs": 1000
  },
  "templates": {
    "customTemplatesPath": "./custom-templates"
  },
  "privacy": {
    "enableDataCaching": false,
    "encryptSensitiveData": true
  }
}
```

## Use Cases

### Executive Job Search
- Research target companies for strategic fit
- Map revenue impact of technical decisions
- Find warm introduction paths to hiring managers
- Prepare for technical and leadership interviews
- Create compelling 30-60-90 day plans

### Career Development
- Analyze industry trends and company positioning
- Understand revenue models and business challenges
- Build professional network strategically
- Prepare for internal promotions and role transitions

### Strategic Planning
- Competitive analysis for technology decisions
- Business case development for platform investments
- Team scaling and organizational design
- Cross-functional collaboration strategies

## Support & Resources

### Documentation
- [API Reference](./docs/api.md)
- [Configuration Guide](./docs/configuration.md)
- [Privacy & Security](./docs/privacy.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

### Community
- [GitHub Issues](https://github.com/stricher05/headhunter-mcp-server/issues)
- [Discussions](https://github.com/stricher05/headhunter-mcp-server/discussions)
- [npm Package](https://www.npmjs.com/package/@gnivildev/headhunter-mcp-server)

### Professional Services
- Custom implementation and integration
- Executive coaching and career consulting
- Enterprise licensing and white-label solutions
- Training and workshops

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
- Inspired by executive technology leadership best practices
- Community contributions and feedback
- Privacy-first approach to professional data handling

---

**HeadHunter MCP Server** - Empowering executive technology leadership through AI-powered career intelligence.

**Live Package**: [@gnivildev/headhunter-mcp-server](https://www.npmjs.com/package/@gnivildev/headhunter-mcp-server)
**Source Code**: [GitHub Repository](https://github.com/stricher05/headhunter-mcp-server)
**Author**: [stricher05](https://github.com/stricher05) ([gnivildev](https://www.npmjs.com/~gnivildev))