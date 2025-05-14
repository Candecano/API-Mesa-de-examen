import { test, expect } from '@playwright/test';

const { chromium } = require('playwright');
test('Inicio de sesion exitoso', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.pause(); 

   await page.fill('#username', 'profesor');
  await page.fill('#password', 'clave');
   await page.getByRole('button', { name: 'Ingresar' }).click();
 
});

test('redireccion de pagina', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.pause(); 
 

   await page.fill('#username', 'profesor');

  // Rellenar el campo de contraseña
  await page.fill('#password', 'clave');
   await page.getByRole('button', { name: 'Ingresar' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Suscribirse a Notificaciones' }).click();

  // ---------------------
 await page.pause();
    const browser = await chromium.launch({
      headless: false
    });
    const context = await browser.newContext();
     await context.close();
    await browser.close();


});

test('inicio de sesion con credencailes incorrectas', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.pause(); 

   await page.fill('#username', 'hola');

  await page.fill('#password', 'chat');
   
await page.pause();
    const browser = await chromium.launch({
      headless: false
    });
    const context = await browser.newContext();
     await context.close();
    await browser.close();


});