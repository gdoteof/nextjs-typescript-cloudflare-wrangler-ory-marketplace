import fetch from 'cross-fetch';
import { setup, teardown } from 'jest-process-manager';
import {describe, expect, test} from '@jest/globals';


const SERVER_TIMEOUT = 30_000;
jest.setTimeout(SERVER_TIMEOUT);

describe('#handleRequest', () => {

    beforeAll(async () => {
        await setup({
            command: 'npx wrangler dev',
            launchTimeout: SERVER_TIMEOUT,
            port: 8787,
            usedPortAction: 'kill',
        })
    })

    afterAll(async () => {
        await teardown()
    })

    describe('when handler is called', () => {
        describe('and when the verb is options', () => {
            let response: Response;
            beforeAll(async () => {
                response = await fetch('http://localhost:8787', {
                    method: 'OPTIONS',
                })
            })

            test('responds with 200 status', () => {
                expect(response.status).toBe(200)
            })
        })
    })
})