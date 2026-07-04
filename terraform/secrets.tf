resource "github_actions_secret" "anthropic_api_key" {
  repository      = github_repository.repo.name
  secret_name     = "ANTHROPIC_API_KEY"
  plaintext_value = var.anthropic_api_key
}
