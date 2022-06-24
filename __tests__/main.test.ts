import { expect, test, jest, describe } from '@jest/globals'
import { updateService } from '../src/updateService'

const mockUpdateService = jest.fn(() => ({
  promise: async () => ({ $response: {} })
}))

jest.mock('aws-sdk', () => {
  return {
    ECS: class {
      updateService = mockUpdateService
    }
  }
})

describe('ECS Update service is called with correct parameters', () => {
  test('ECS Update service is called with correct parameters', async () => {
    const input: Parameters<typeof updateService>[0] = {
      service: 'service-name',
      cluster: 'cluster-name',
      forceNewDeployment: true
    }

    await updateService(input)

    expect(mockUpdateService).toHaveBeenCalledWith({
      service: 'service-name',
      cluster: 'cluster-name',
      forceNewDeployment: true
    })
  })
})
