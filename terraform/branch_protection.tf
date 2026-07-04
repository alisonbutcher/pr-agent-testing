# Ruleset — blocks direct pushes to main, requires a PR
resource "github_repository_ruleset" "require_pr" {
  name        = "Require PR before merging"
  repository  = github_repository.repo.name
  target      = "branch"
  enforcement = "active"

  conditions {
    ref_name {
      include = ["~DEFAULT_BRANCH"]
      exclude = []
    }
  }

  rules {
    pull_request {
      required_approving_review_count   = 0
      dismiss_stale_reviews_on_push     = false
      require_code_owner_review         = false
      require_last_push_approval        = false
      required_review_thread_resolution = true
    }
  }
}

# Classic branch protection — requires all PR review conversations to be resolved
resource "github_branch_protection" "main" {
  repository_id = github_repository.repo.node_id
  pattern       = "main"

  require_conversation_resolution = true

  required_pull_request_reviews {
    required_approving_review_count = 0
    dismiss_stale_reviews           = false
  }

  depends_on = [github_repository_ruleset.require_pr]
}
