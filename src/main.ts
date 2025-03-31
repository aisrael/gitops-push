import * as core from '@actions/core'
import * as path from 'path'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const service: string = core.getInput('service')
    const version: string = core.getInput('version')
    const environment: string = core.getInput('environment')
    const pathToChart: string = core.getInput('path-to-chart')
    const pathToEnvVars: string = core.getInput('path-to-env-vars')
    const gitopsRepo: string = core.getInput('gitops-repo')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(
      `Pushing ${service} version ${version} to ${environment} in ${gitopsRepo}`
    )

    const fullPathToChart: string = path.join(pathToChart, service)
    const fullPathToEnvVars: string = path.join(fullPathToChart, pathToEnvVars)

    core.debug(`Full path to chart: ${fullPathToChart}`)
    core.debug(`Full path to env vars: ${fullPathToEnvVars}`)

    // TODO: Implement the actual logic for pushing the chart
    // 1. checkout the source repo
    // 2. update the chart appVersion
    // 3. generate the ArgoCD Application YAML
    // 4. checkout the gitops-repo
    // 5. update the ArgoCD Application YAML

    // Set outputs for other workflow steps to use
    core.setOutput('commit-sha', '40365df9d45b56c6a73bd3dfdd442a6420ad4fba') // use a random string for now
    core.setOutput('commit-message', 'TODO')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
