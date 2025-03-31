/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * To mock dependencies in ESM, you can create fixtures that export mock
 * functions and objects. For example, the core module is mocked in this test,
 * so that the actual '@actions/core' module is not imported.
 */
import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'

// Mocks should be declared before the module being tested is imported.
jest.unstable_mockModule('@actions/core', () => core)

// The module being tested should be imported dynamically. This ensures that the
// mocks are used in place of any actual dependencies.
const { run } = await import('../src/main.js')

describe('main.ts', () => {
  beforeEach(() => {
    // Set the action's inputs as return values from core.getInput().
    core.getInput.mockImplementation((name: string) => {
      switch (name) {
        case 'service':
          return 'sandbox'
        case 'version':
          return '6a42253902fc95dd8a63a69185ffbc5a0c8a0635'
        case 'environment':
          return 'development'
        case 'gitops-repo':
          return 'aisrael/gitops'
        case 'path-to-chart':
          return 'helm/charts'
        case 'path-to-env-vars':
          return 'vars'
        default:
          return ''
      }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Sets the commit-sha and commit-message outputs', async () => {
    await run()

    // Verify the commit-sha output was set.
    expect(core.setOutput).toHaveBeenNthCalledWith(
      1,
      'commit-sha',
      expect.stringMatching(/^[a-f0-9]{40}$/)
    )

    // Verify the commit-message output was set.
    expect(core.setOutput).toHaveBeenNthCalledWith(
      2,
      'commit-message',
      expect.any(String)
    )
  })
})
