resource "github_repository" "repo" {
  name        = var.repository_name
  description = var.repository_description

  visibility   = "public"
  has_issues   = true
  has_projects = false
  has_wiki     = false

  delete_branch_on_merge = true
  allow_squash_merge     = true
  allow_merge_commit     = false
  allow_rebase_merge     = false

  # Dependabot vulnerability alerts
  vulnerability_alerts = true

  # Secret scanning — enabled by default for public repos;
  # for private repos requires GitHub Advanced Security
  security_and_analysis {
    secret_scanning {
      status = "enabled"
    }
    secret_scanning_push_protection {
      status = "enabled"
    }
  }
}
