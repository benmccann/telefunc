import { page, run, urlBase, autoRetry, isGithubAction } from '../../libframe/test/setup'

export { testRun }

function testRun(cmd: 'npm run prod' | 'npm run dev') {
  if (cmd === 'npm run prod' && isGithubAction()) {
    test("SKIPED: Next.js prod build doesn't work in GitHub Actions", () => {})
    return
  }

  run(cmd, {
    serverIsReadyMessage: 'started server on',
    /* Attempt to figure out why Next.js doesn't properly run in GitHub Actions:
    debug: true,
    additionalTimeout: 240 * 1000,
    serverIsReadyDelay: 20 * 1000,
    //*/
  })

  test('telefunction call', async () => {
    await page.goto(`${urlBase}/`)

    await autoRetry(async () => {
      const text = await page.textContent('#view')
      expect(text).toContain('First name: Alan')
    })

    const text = await page.textContent('#view')
    expect(text).toContain('Last name: Turing')
    expect(text).toContain('server: true')
  })
}
