import * as core from '@actions/core'
import { updateService } from './updateService'

async function run(): Promise<void> {
  try {
    const service = core.getInput('service')
    const cluster: string | undefined = core.getInput('cluster')
    const forceNewDeployment = core.getInput('force-new-deployment') === 'true'

    core.info('Restarting the service')

    const result = await updateService({ service, cluster, forceNewDeployment })

    core.info(
      `Service successfully restarted: ${result.$response.httpResponse.statusMessage}`
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

void run()
