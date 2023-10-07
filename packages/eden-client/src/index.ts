import { edenTreaty } from '@elysiajs/eden'
import type { App } from 'server/src'

export const eden = edenTreaty<App>("http://localhost:3000")