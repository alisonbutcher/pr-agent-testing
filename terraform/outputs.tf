output "repository_url" {
  value       = github_repository.repo.html_url
  description = "URL of the created repository"
}

output "repository_clone_url" {
  value       = github_repository.repo.ssh_clone_url
  description = "SSH clone URL"
}

output "repository_name" {
  value       = github_repository.repo.name
  description = "Repository name"
}
