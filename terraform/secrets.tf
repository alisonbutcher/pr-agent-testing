resource "github_actions_secret" "anthropic_api_key" {
  repository      = github_repository.repo.name
  secret_name     = "ANTHROPIC_API_KEY"
  plaintext_value = var.anthropic_api_key
}

resource "github_actions_variable" "quality_gate_min_score" {
  repository    = github_repository.repo.name
  variable_name = "QUALITY_GATE_MIN_SCORE"
  value         = tostring(var.quality_gate_min_score)
}

resource "github_actions_variable" "pr_agent_model" {
  repository    = github_repository.repo.name
  variable_name = "PR_AGENT_MODEL"
  value         = var.pr_agent_model
}

resource "github_actions_variable" "pr_agent_fallback_model" {
  repository    = github_repository.repo.name
  variable_name = "PR_AGENT_FALLBACK_MODEL"
  value         = var.pr_agent_fallback_model
}
