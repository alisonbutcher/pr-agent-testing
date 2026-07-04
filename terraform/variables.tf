variable "github_token" {
  type        = string
  sensitive   = true
  description = "GitHub personal access token — needs repo, admin:repo_hook, and read:org scopes"
}

variable "github_owner" {
  type        = string
  description = "GitHub username or organisation that owns the repository"
}

variable "repository_name" {
  type        = string
  description = "Name of the repository to create and configure"
}

variable "repository_description" {
  type        = string
  default     = ""
  description = "Short description shown on the GitHub repo page"
}

variable "anthropic_api_key" {
  type        = string
  sensitive   = true
  description = "Anthropic API key — stored as ANTHROPIC_API_KEY Actions secret"
}

variable "quality_gate_min_score" {
  type        = number
  default     = 60
  description = "Minimum PR-Agent score (0-100) required to pass the quality gate"
}

variable "pr_agent_model" {
  type        = string
  default     = "anthropic/claude-sonnet-4-6"
  description = "LiteLLM model string for PR-Agent to use"
}

variable "pr_agent_fallback_model" {
  type        = string
  default     = "anthropic/claude-haiku-4-5-20251001"
  description = "LiteLLM fallback model string for PR-Agent"
}
