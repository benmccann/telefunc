import { page, run, urlBase, autoRetry } from '../../libframe/test/setup'

export { testRun }

function testRun(cmd: 'npm run dev' | 'npm run prod') {
  run(cmd)

  test('remote shell with telefunc', async () => {
    page.goto(`${urlBase}/`)
    expect(await page.textContent('body')).not.toContain('node_modules')
    await page.click('button#cmd-ls')
    // `autoRetry` to ensure JavaScript has loaded & executed
    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('node_modules')
    })
  })

  test('telefunc context', async () => {
    await page.click('button#wrong-cmd')
    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('userAgent')
    })
    expect(await page.textContent('body')).toContain('HeadlessChrome/')
  })
}
