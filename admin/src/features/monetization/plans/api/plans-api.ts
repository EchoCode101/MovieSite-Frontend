import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  CreatePlanPayload,
  Plan,
  PlanListParams,
  PlanListResponse,
  UpdatePlanPayload,
} from '../types'

const PLANS_BASE_PATH = '/subscriptions/plans'

/**
 * Get paginated list of subscription plans
 *
 * Maps to: GET /api/subscriptions/plans
 */
export async function getPlans(
  params: PlanListParams,
): Promise<PlanListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<PlanListResponse>>(
      PLANS_BASE_PATH,
      { params },
    )) as unknown as ApiResponse<PlanListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getPlans failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('plans'))
  }
}

/**
 * Get plan by ID
 *
 * Maps to: GET /api/subscriptions/plans/:id
 */
export async function getPlanById(id: string): Promise<Plan> {
  try {
    const response = (await apiClient.get<ApiResponse<Plan>>(
      `${PLANS_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<Plan>

    return extractData(response)
  } catch (error) {
    logger.error('getPlanById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('plan'))
  }
}

/**
 * Create a new plan
 *
 * Note: Backend currently only documents GET endpoints for plans.
 * This function assumes a POST /api/subscriptions/plans endpoint exists.
 */
export async function createPlan(
  payload: CreatePlanPayload,
): Promise<Plan> {
  try {
    const response = (await apiClient.post<ApiResponse<Plan>>(
      PLANS_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<Plan>

    return extractData(response)
  } catch (error) {
    logger.error('createPlan failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('plan'))
  }
}

/**
 * Update an existing plan
 *
 * Assumes PUT /api/subscriptions/plans/:id exists on the backend.
 */
export async function updatePlan(
  id: string,
  payload: UpdatePlanPayload,
): Promise<Plan> {
  try {
    const response = (await apiClient.put<ApiResponse<Plan>>(
      `${PLANS_BASE_PATH}/${id}`,
      payload,
    )) as unknown as ApiResponse<Plan>

    return extractData(response)
  } catch (error) {
    logger.error('updatePlan failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('plan'))
  }
}

/**
 * Delete a plan
 *
 * Assumes DELETE /api/subscriptions/plans/:id exists on the backend.
 */
export async function deletePlan(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${PLANS_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deletePlan failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('plan'))
  }
}


