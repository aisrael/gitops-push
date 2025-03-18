import * as core from '@actions/core'
import { wait } from './wait.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const service: string = core.getInput('service')
    const version: string = core.getInput('version')
    const pathToChart: string = core.getInput('path-to-chart')
    const pathToEnvVars: string = core.getInput('path-to-env-vars')
    const gitopsRepo: string = core.getInput('gitops-repo')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Pushing ${service} version ${version} to ${gitopsRepo}`)

    // TODO: Implement the actual logic for pushing the chart

    // Set outputs for other workflow steps to use
    core.setOutput('commit-sha', 'TODO')
    core.setOutput('commit-message', 'TODO')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
