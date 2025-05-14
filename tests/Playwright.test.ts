import { chromium, Browser, Page } from "playwright";  

describe("Pruebas con Playwright", () => {
  let browser: Browser;  // Especifica el tipo como Browser
  let page: Page;  // Especifica el tipo como Page

  beforeAll(async () => {
    // Inicia el navegador (headless: true ejecuta el navegador en segundo plano)
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    // Cierra el navegador después de todas las pruebas
    await browser.close();
  });

  it("Debería cargar la página de inicio correctamente", async () => {
    jest.setTimeout(20000);  // Aumenta el tiempo de espera a 20 segundos

    await page.goto("http://localhost:3000", { waitUntil: "load" });  /
    const title = await page.title();
    expect(title).toBe("Página de Examen");  
  });

  it("Debería realizar login correctamente", async () => {
    await page.goto("http://localhost:3000/login");

    await page.fill("input[name='username']", "miUsuario");
    await page.fill("input[name='password']", "miContraseña");
    await page.click("button[type='submit']");

    // Espera que la siguiente página se cargue correctamente, puedes aumentar el tiempo de espera si es necesario
    await page.waitForSelector("h1");  // Espera a que aparezca un h1
    const content = await page.textContent("h1");  // Obtiene el texto del h1
    expect(content).toBe("Bienvenido");  
  });
});
