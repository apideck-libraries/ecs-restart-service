import AWS from 'aws-sdk'
import { PromiseResult } from 'aws-sdk/lib/request'

export async function updateService({
  service,
  cluster,
  forceNewDeployment
}: {
  service: string
  cluster?: string
  forceNewDeployment: boolean
}): Promise<PromiseResult<AWS.ECS.UpdateServiceResponse, AWS.AWSError>> {
  const ecs = new AWS.ECS({
    customUserAgent: 'apideck-ecs-restart-service-for-github-actions'
  })

  return ecs
    .updateService({
      service,
      cluster,
      forceNewDeployment
    })
    .promise()
}
